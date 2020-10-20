# GitHub Actions for Jira

The GitHub Actions for [Jira](https://www.atlassian.com/software/jira) to create and edit Jira issues.
In the [demo-gajira](https://github.com/atlassian/gajira-demo) repository you'll find examples of what you can do with these actions, in particular:

- Automatically transition an issue to done when a pull request whose name contains the issue key is merged
- Automatically create a new Jira issue when a GitHub issue is created
- Automatically add a comment to a Jira issue when a commit message contains the issue key
- Automatically create a Jira issue for each `// TODO:` in code

## Actions

- [`Login`](https://github.com/marketplace/actions/jira-login) - Log in to the Jira API
- [`CLI`](https://github.com/marketplace/actions/setup-jira) - Wrapped [go-jira](https://github.com/Netflix-Skunkworks/go-jira) CLI for common Jira actions
- [`Find issue key`](https://github.com/marketplace/actions/jira-find-issue-key) - Search for an issue key in commit message, branch name, etc. This issue key is then saved and used by the next actions in the same workflow
- [`Create`](https://github.com/marketplace/actions/jira-create-issue) - Create a new Jira issue
- [`Transition`](https://github.com/marketplace/actions/jira-issue-transition) - Transition a Jira issue
- [`Comment`](https://github.com/marketplace/actions/jira-add-comment) - Add a comment to a Jira issue
- [`TODO`](https://github.com/marketplace/actions/jira-issue-from-todo) - Create a Jira issue for each TODO comment in committed code

Each action supports command line parameters (e.g. `--from=branch`) and lodash (e.g. `{{event.ref}}` which is its equivalent) as input.

## Usage
An example workflow to create a Jira issue for each `//TODO` in code:

```
workflow "Todo issue" {
  on = "push"
  resolves = ["Jira Login"]
}

action "Jira Login" {
  uses = "atlassian/gajira-login@master"
  secrets = ["JIRA_BASE_URL", "JIRA_API_TOKEN", "JIRA_USER_EMAIL"]
}

action "Jira TODO" {
  needs = "Jira Login"
  uses = "atlassian/gajira-todo@master"
  secrets = ["GITHUB_TOKEN"]
  args = "--project=GA --issuetype=Task"
}
```

More examples at [gajira-demo](https://github.com/atlassian/gajira-demo) repository
