# Jira Comment
Add a comment to an issue


## Usage
To add comment to an issue you need to specify an issue key and a comment in action args, like:

`"Hello from GitHub actions" --issue=INC-2`

You can interpolate fields from GitHub event which triggered the workflow into a comment body. For example, you can specify pusher name in comment body by including `pusher.name` field from [push](https://developer.github.com/v3/activity/events/types/#pushevent) event:

    "{{ pusher.name }} pushed to repository: {{ repository.full_name }}"

Which will result in comment:

    Codertocat pushed to repository: Codertocat/Hello-World

----
## Action Spec

### Environment variables
- None

### Arguments
- `--issue` - An issue key to add a comment for

### Reads fields from config file at $HOME/jira/config.yml
- `issue`

### Writes fields to config file at $HOME/jira/config.yml
- None