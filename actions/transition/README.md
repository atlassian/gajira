# Jira Transition
Transition Jira issue

## Usage:
![Issue Transition](../../../assets/transition/example.gif?raw=true)

Example usage args:

    deployed to production --issue=GA-182

You can omit `--issue` parameter if preceding action is [`Create`](../create) or [`Find Issue Key`](../find-issue-key) and just specify a transition name in action args:

    deployed to production

----
## Action Spec:

### Environment variables
- None

### Arguments
- `<transition name>` - A name of transition to apply. Example: `Cancel` or `Accept`
- `--issue=<KEY-NUMBER>` - issue key to perform a transition on
- `--id=<transition id>` - transition id to apply to an issue

### Reads fields from config file at $HOME/jira/config.yml
- `issue`
- `transitionId`

### Writes fields to config file at $HOME/jira/config.yml
- None