#!/bin/sh
set -eu

sh -c "node /index.js $*"

actionSubjectId="transition"
containerId=`echo $GITHUB_REPOSITORY | sha1sum | cut -c1-41`
anonymousId=`echo $GITHUB_ACTOR | sha1sum | cut -c1-41`

/gagas --container-id="$containerId" --action-subject-id="$actionSubjectId" --anonymous-id="$anonymousId"
