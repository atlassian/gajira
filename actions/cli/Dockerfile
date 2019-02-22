FROM ubuntu

LABEL "name"="Jira CLI"
LABEL "maintainer"="Dima Rudzik <githubactions+drudzik@atlassian.net>"
LABEL "version"="1.0.0"

LABEL "com.github.actions.name"="Jira CLI"
LABEL "com.github.actions.description"="Wraps the Jira CLI to enable Jira commands."
LABEL "com.github.actions.icon"="check-square"
LABEL "com.github.actions.color"="blue"

RUN apt-get update && apt-get install -yq wget && apt-get clean
RUN wget -q https://github.com/Netflix-Skunkworks/go-jira/releases/download/v1.0.20/jira-linux-amd64 \
    && chmod +x jira-linux-amd64

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]