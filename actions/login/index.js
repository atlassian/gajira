const fs = require('fs')
const path = require('path')
const YAML = require('yaml')

const cliConfigPath = `${process.env.HOME}/.jira.d/config.yml`
const cliCredentialsPath = `${process.env.HOME}/.jira.d/credentials`
const configPath = `${process.env.HOME}/jira/config.yml`

const Action = require('./action')

// eslint-disable-next-line import/no-dynamic-require
const githubEvent = require(process.env.GITHUB_EVENT_PATH)

async function exec () {
  try {
    if (!process.env.JIRA_BASE_URL) throw new Error('Please specify JIRA_BASE_URL env')
    if (!process.env.JIRA_API_TOKEN) throw new Error('Please specify JIRA_API_TOKEN env')
    if (!process.env.JIRA_USER_EMAIL) throw new Error('Please specify JIRA_USER_EMAIL env')

    const config = {
      baseUrl: process.env.JIRA_BASE_URL,
      token: process.env.JIRA_API_TOKEN,
      email: process.env.JIRA_USER_EMAIL,
    }

    const result = await new Action({
      githubEvent,
      argv: {},
      config,
    }).execute()

    if (result) {
      const extendedConfig = Object.assign({}, config, result)

      if (!fs.existsSync(configPath)) {
        fs.mkdirSync(path.dirname(configPath), { recursive: true })
      }

      fs.writeFileSync(configPath, YAML.stringify(extendedConfig))

      if (!fs.existsSync(cliConfigPath)) {
        fs.mkdirSync(path.dirname(cliConfigPath), { recursive: true })
      }

      fs.writeFileSync(cliConfigPath, YAML.stringify({
        endpoint: result.baseUrl,
        login: result.email,
      }))

      fs.writeFileSync(cliCredentialsPath, `JIRA_API_TOKEN=${result.token}`)

      return
    }

    console.log('Failed to login.')
    process.exit(78)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

exec()
