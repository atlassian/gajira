# Jira Create
Create new issue

## Usage

TBD

----
## Action Spec:

### Environment variables
- None

### Arguments
- `--project=<project key>` - Key of the project
- `--issuetype=<issue type>` - Type of the issue to be created. Example: 'Incident'
- `--summary=<text>` - Issue summary
- `--description=<text>` - Issue description
- `--fields.customfield_<number>.id=<custom field id>` - ID of the custom field. Example `--fields.customfield_10021.id=10001`

### Reads fields from config file at $HOME/jira/config.yml
- `project`
- `issuetype`
- `summary`
- `description`

### Writes fields to config file at $HOME/jira/config.yml
- `issue` - a key of a newly created issue

### Writes fields to CLI config file at $HOME/.jira.d/config.yml
- `issue` - a key of a newly created issue