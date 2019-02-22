const { get } = require('lodash')

const serviceName = 'github'
const { format } = require('url')
const client = require('./client')(serviceName)

class GitHub {
  constructor ({token }) {
    this.baseUrl = 'https://api.github.com'
    this.token = token
  }

  async getCommitDiff (repo, commitId) {
    return this.fetch('getCommitDiff', 
      { pathname: `/repos/${repo}/commits/${commitId}`}, 
      {
        headers: {
          Accept: 'application/vnd.github.v3.diff',
        }
      })
  }

  async fetch (apiMethodName,
    { host, pathname, query },
    { method, body, headers = {} } = {}) {
    const url = format({
      host: host || this.baseUrl,
      pathname,
      query,
    })

    if (!method) {
      method = 'GET'
    }

    if (headers['Content-Type'] === undefined) {
      headers['Content-Type'] = 'application/json'
    }

    if (headers.Authorization === undefined) {
      headers.Authorization = `token ${this.token}`
    }

    // strong check for undefined
    // cause body variable can be 'false' boolean value
    if (body && headers['Content-Type'] === 'application/json') {
      body = JSON.stringify(body)
    }

    const state = {
      req: {
        method,
        headers,
        body,
        url,
      },
    }

    try {
      await client(state, `${serviceName}:${apiMethodName}`)
    } catch (error) {
      const fields = {
        originError: error,
        source: 'github',
      }

      delete state.req.headers

      throw Object.assign(
        new Error('GitHub API error'),
        state,
        fields,
      )
    }

    return state.res.body
  }
}

module.exports = GitHub
