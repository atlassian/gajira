FROM node:10-alpine

LABEL "name"="Jira TODO"
LABEL "maintainer"="Dima Rudzik <githubactions+drudzik@atlassian.net>"
LABEL "version"="1.0.0"

LABEL "com.github.actions.name"="Jira TODO"
LABEL "com.github.actions.description"="Create Jira issue for TODO comments"
LABEL "com.github.actions.icon"="check-square"
LABEL "com.github.actions.color"="blue"


COPY package*.json ./
RUN npm i
COPY . .
RUN chmod +x /entrypoint.sh
RUN chmod +x /test.sh

ENTRYPOINT ["/entrypoint.sh"]
