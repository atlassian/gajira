# Jira TODO
Create issue for TODO comments

## Usage

Create Jira issue from TODO comments in pushed code.

Single-line comments in these formats:

```go
// TODO: refactor this callback mess
```
```ruby
# TODO: rewrite api client
```

----
## Action Spec:

### Environment variables
- GITHUB_TOKEN

### Arguments

- `--project=<project key>` - Key of the project
- `--issuetype=<issue type>` - Type of the issue to be created. Example: 'Task'
