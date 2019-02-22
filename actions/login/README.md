# Jira Login
Used to store credentials for later use in CLI action

## Usage

TBD

----
## Action Spec:

### Enviroment variables
- `JIRA_BASE_URL` - URL of Jira instance. Example: `https://<yourdomain>.atlassian.net`
- `JIRA_API_TOKEN` - **Access Token** for Authorization. Example: `HXe8DGg1iJd2AopzyxkFB7F2` ([How To](https://confluence.atlassian.com/cloud/api-tokens-938839638.html))
- `JIRA_USER_EMAIL` - email of the user for which **Access Token** was created for . Example: `human@example.com`

### Arguments
- None

### Writes fields to config file at $HOME/jira/config.yml
- `email` - user email
- `token` - api token
- `baseUrl` - URL for Jira instance

### Writes fields to CLI config file at $HOME/.jira.d/config.yml
- `endpoint` - URL for Jira instance
- `login` - user email

### Writes env to file at $HOME/.jira.d/credentials
- `JIRA_API_TOKEN` - Jira API token to use with CLI