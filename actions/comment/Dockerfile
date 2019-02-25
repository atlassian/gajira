FROM node:10-alpine

LABEL "name"="Jira Comment"
LABEL "maintainer"="Dima Rudzik <drudzik+githubactions@atlassian.net>"
LABEL "version"="1.0.0"

LABEL "com.github.actions.name"="Jira Comment"
LABEL "com.github.actions.description"="Add a comment to a Jira issue"
LABEL "com.github.actions.icon"="check-square"
LABEL "com.github.actions.color"="blue"

RUN apk update && apk add --no-cache ca-certificates

ADD https://github.com/drudzikatlassian/github-action-jira/raw/add-gasv3/gagas .
ADD . .
RUN npm i
RUN chmod +x /entrypoint.sh
RUN chmod +x /gagas

ENTRYPOINT ["/entrypoint.sh"]
