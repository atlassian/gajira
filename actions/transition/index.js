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
      const yamledResult = YAML.stringify(result)
      const extendedConfig = Object.assign({}, config, result)

      fs.writeFileSync(configPath, YAML.stringify(extendedConfig))

      return fs.appendFileSync(cliConfigPath, yamledResult)
    }

    console.log('Failed to transition issue.')
    process.exit(78)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

function parseArgs () {
  yargs
    .option('issue', {
      alias: 'i',
      describe: 'Provide an issue key to perform a transition on',
      demandOption: !config.issue,
      default: config.issue,
      type: 'string',
    })
    .option('id', {
      describe: 'Provide a transition id to apply to an issue',
      default: config.transtionId,
      type: 'string',
    })

  yargs
    .parserConfiguration({
      'parse-numbers': false,
    })

  return yargs.argv
}

exec()
