const _ = require('lodash')
const Jira = require('./common/net/Jira')

module.exports = class {
  constructor ({ githubEvent, argv, config }) {
    this.Jira = new Jira({
      baseUrl: config.baseUrl,
      token: config.token,
      email: config.email,
    })

    this.config = config
    this.argv = argv
    this.githubEvent = githubEvent
  }

  async execute () {
    const issueId = this.argv.issue
    const rawComment = this.argv._.join(' ')

    _.templateSettings.interpolate = /{{([\s\S]+?)}}/g
    const compiled = _.template(rawComment)
    const interpolatedComment = compiled({ event: this.githubEvent })

    console.log(`Adding comment to ${issueId}: ${interpolatedComment}`)
    await this.Jira.addComment(issueId, { body: interpolatedComment })

    return {}
  }
}
