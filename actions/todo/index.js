const fs = require('fs')
const YAML = require('yaml')
const yargs = require('yargs')

const cliConfigPath = `${process.env.HOME}/.jira.d/config.yml`
const configPath = `${process.env.HOME}/jira/config.yml`
const Action = require('./action')
const githubToken = process.env.GITHUB_TOKEN

// eslint-disable-next-line import/no-dynamic-require
const githubEvent = require(process.env.GITHUB_EVENT_PATH)
const config = YAML.parse(fs.readFileSync(configPath, 'utf8'))

async function exec () {
  try {
    const result = await new Action({
      githubEvent,
      argv: parseArgs(),
      config,
      githubToken,
    }).execute()

    if (result) {
      console.log(`Created issues: ${result.issues}`)

      return
    }

    process.exit(0)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

function parseArgs () {
  yargs
    .option('project', {
      alias: 'p',
      describe: 'Provide project to create issue in',
      demandOption: !config.project,
      default: config.project,
      type: 'string',
    })
    .option('issuetype', {
      alias: 't',
      describe: 'Provide type of the issue to be created',
      demandOption: !config.issuetype,
      default: config.issuetype,
      type: 'string',
    })
    .option('description', {
      alias: 'd',
      describe: 'Provide issue description',
      default: config.description,
      type: 'string',
    })

  yargs
    .parserConfiguration({
      'parse-numbers': false,
    })

  return yargs.argv
}

exec()
