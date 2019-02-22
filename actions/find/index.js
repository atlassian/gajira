const fs = require('fs')
const YAML = require('yaml')
const yargs = require('yargs')

const cliConfigPath = `${process.env.HOME}/.jira.d/config.yml`
const configPath = `${process.env.HOME}/jira/config.yml`
const Action = require('./action')

// eslint-disable-next-line import/no-dynamic-require
const githubEvent = require(process.env.GITHUB_EVENT_PATH)
const config = YAML.parse(fs.readFileSync(configPath, 'utf8'))

async function exec () {
  try {
    const result = await new Action({
      githubEvent,
      argv: parseArgs(),
      config,
    }).execute()

    if (result) {
      console.log(`Detected issueKey: ${result.issue}`)
      console.log(`Saving ${result.issue} to ${cliConfigPath}`)
      console.log(`Saving ${result.issue} to ${configPath}`)

      const yamledResult = YAML.stringify(result)
      const extendedConfig = Object.assign({}, config, result)

      fs.writeFileSync(configPath, YAML.stringify(extendedConfig))

      return fs.appendFileSync(cliConfigPath, yamledResult)
    }

    console.log('No issueKeys found.')
    process.exit(78)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

function parseArgs () {
  yargs
    .option('event', {
      alias: 'e',
      describe: 'Provide jsonpath for the GitHub event to extract issue from',
      default: config.event,
      type: 'string',
    })
    .option('string', {
      alias: 's',
      describe: 'Provide a string to extract issue key from',
      default: config.string,
      type: 'string',
    })
    .option('from', {
      describe: 'Find from predefined place',
      type: 'string',
      choices: ['branch', 'commits'],
    })

  yargs
    .parserConfiguration({
      'parse-numbers': false,
    })

  return yargs.argv
}

exec()
