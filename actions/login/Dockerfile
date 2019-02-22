FROM node:10-alpine

LABEL "name"="Jira Login"
LABEL "maintainer"="Dima Rudzik <githubactions+drudzik@atlassian.net>"
LABEL "version"="1.0.0"

LABEL "com.github.actions.name"="Jira Login"
LABEL "com.github.actions.description"="Log in to Jira Cloud instance"
LABEL "com.github.actions.icon"="log-in"
LABEL "com.github.actions.color"="blue"

COPY package*.json ./
RUN npm i
COPY . .
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]