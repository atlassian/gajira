const _ = require('lodash')
const fetch = require('node-fetch')
const Jira = require('./common/net/Jira')
const GitHub = require('./common/net/GitHub')

module.exports = class {
  constructor ({ githubEvent, argv, config, githubToken }) {
    this.Jira = new Jira({
      baseUrl: config.baseUrl,
      token: config.token,
      email: config.email,
    })

    this.GitHub = new GitHub({
      token: githubToken
    })

    this.config = config
    this.argv = argv
    this.githubEvent = githubEvent
    this.githubToken = githubToken
  }

  async execute () {
    const { argv, githubEvent } = this
    const projectKey = argv.project
    const issuetypeName = argv.issuetype
    let tasks = []

    if (githubEvent.commits && githubEvent.commits.length > 0) {
      tasks = _.flatten(await this.findTodoInCommits(githubEvent.repository, githubEvent.commits))
    }

    if (tasks.length === 0) {
      console.log('no TODO found')

      return
    }

    // map custom fields
    const { projects } = await this.Jira.getCreateMeta({
      expand: 'projects.issuetypes.fields',
      projectKeys: projectKey,
      issuetypeNames: issuetypeName,
    })

    if (projects.length === 0) {
      console.error(`project '${projectKey}' not found`)

      return
    }

    const [project] = projects

    if (project.issuetypes.length === 0) {
      console.error(`issuetype '${issuetypeName}' not found`)

      return
    }

    const issues = tasks.map(async ({ summary, commitUrl }) => {
      let providedFields = [{
        key: 'project',
        value: {
          key: projectKey,
        },
      }, {
        key: 'issuetype',
        value: {
          name: issuetypeName,
        },
      }, {
        key: 'summary',
        value: summary,
      }]

      if (!argv.description) {
        argv.description = `Created with Github commit ${commitUrl}`
      }

      providedFields.push({
        key: 'description',
        value: argv.description,
      })

      if (argv.fields) {
        providedFields = [...providedFields, ...this.transformFields(argv.fields)]
      }

      const payload = providedFields.reduce((acc, field) => {
        acc.fields[field.key] = field.value

        return acc
      }, {
        fields: {},
      })

      return (await this.Jira.createIssue(payload)).key
    })

    return { issues: await Promise.all(issues) }
  }

  transformFields (fields) {
    return Object.keys(fields).map(fieldKey => ({
      key: fieldKey,
      value: fields[fieldKey],
    }))
  }

  preprocessArgs () {
    _.templateSettings.interpolate = /{{([\s\S]+?)}}/g
    const descriptionTmpl = _.template(this.argv.description)

    this.argv.description = descriptionTmpl({ event: this.githubEvent })
  }

  async findTodoInCommits(repo, commits) {
    return Promise.all(commits.map(async (c) => {
      const res = await this.GitHub.getCommitDiff(repo.full_name, c.id)
      const rx = /^\+.*(?:\/\/|#)\s+TODO:(.*)$/gm
      return getMatches(res, rx, 1)
        .map(_.trim)
        .filter(Boolean)
        .map((s) => {
          return {
            commitUrl: c.url,
            summary: s,
          }
        })
    }))
  }
}

function getMatches(string, regex, index) {
  index || (index = 1)
  var matches = []
  var match
  while (match = regex.exec(string)) {
    matches.push(match[index])
  }
  return matches
}
