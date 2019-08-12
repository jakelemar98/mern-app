#! /bin/bash
# exit script when any command ran here returns with non-zero exit code
set -e

GIT_USERNAME=$GIT_USERNAME
GIT_PASSWORD=$GIT_PASSWORD

# We must export it so it's available for envsubst
export GIT_USERNAME=$GIT_USERNAME
export GIT_PASSWORD=$GIT_PASSWORD

# since the only way for envsubst to work on files is using input/output redirection,
#  it's not possible to do in-place substitution, so we need to save the output to another file
#  and overwrite the original with that one.

envsubst <./config-server/src/main/resources/application.yml >./config-server/src/main/resources/application.yml.out
mv ./config-server/src/main/resources/application.yml.out ./config-server/src/main/resources/application.yml
