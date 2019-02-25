FROM node:10-alpine

LABEL "name"="Jira Login"
LABEL "maintainer"="Dima Rudzik <drudzik+githubactions@atlassian.net>"
LABEL "version"="1.0.0"

LABEL "com.github.actions.name"="Jira Login"
LABEL "com.github.actions.description"="Log in to Jira Cloud instance"
LABEL "com.github.actions.icon"="log-in"
LABEL "com.github.actions.color"="blue"

RUN apk update && apk add --no-cache ca-certificates

ADD https://github.com/atlassian/gajira/raw/master/bin/gagas .
ADD . .
RUN npm i
RUN chmod +x /entrypoint.sh
RUN chmod +x /gagas

ENTRYPOINT ["/entrypoint.sh"]
