FROM node:10-alpine

LABEL "name"="Jira Find"
LABEL "maintainer"="Dima Rudzik <githubactions+drudzik@atlassian.net>"
LABEL "version"="1.0.0"

LABEL "com.github.actions.name"="Jira Find"
LABEL "com.github.actions.description"="Find an issue inside event"
LABEL "com.github.actions.icon"="check-square"
LABEL "com.github.actions.color"="blue"


COPY package*.json ./
RUN npm i
COPY . .
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]