#! /bin/bash
# exit script when any command ran here returns with non-zero exit code
set -e

git add .

git commit -m "$1"
