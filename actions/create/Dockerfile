FROM node:10-alpine

LABEL "name"="Jira Create"
LABEL "maintainer"="Dima Rudzik <drudzik+githubactions@atlassian.net>"
LABEL "version"="1.0.0"

LABEL "com.github.actions.name"="Jira Create"
LABEL "com.github.actions.description"="Create a new Jira issue"
LABEL "com.github.actions.icon"="check-square"
LABEL "com.github.actions.color"="blue"

RUN apk update && apk add --no-cache ca-certificates

ADD https://github.com/atlassian/gajira/raw/master/bin/gagas .
ADD . .
RUN npm i
RUN chmod +x /entrypoint.sh
RUN chmod +x /test.sh
RUN chmod +x /gagas

ENTRYPOINT ["/entrypoint.sh"]
