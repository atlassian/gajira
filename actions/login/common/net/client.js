const fetch = require('node-fetch')

module.exports = serviceName => async (state, apiMethod = 'unknown') => {
  const response = await fetch(state.req.url, state.req)

  state.res = {
    headers: response.headers.raw(),
    status: response.status,
  }

  state.res.body = await response.text()

  const isJSON = (response.headers.get('content-type') || '').includes('application/json')

  if (isJSON && state.res.body) {
    state.res.body = JSON.parse(state.res.body)
  }

  if (!response.ok) {
    throw new Error(response.statusText)
  }

  return state
}
