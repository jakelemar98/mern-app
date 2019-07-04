#! /bin/bash
# exit script when any command ran here returns with non-zero exit code
set -e

COMMIT_SHA1=$CIRCLE_SHA1

# We must export it so it's available for envsubst
export COMMIT_SHA1=$COMMIT_SHA1

# since the only way for envsubst to work on files is using input/output redirection,
#  it's not possible to do in-place substitution, so we need to save the output to another file
#  and overwrite the original with that one.
envsubst <./k8s/mern-deployment.yml >./k8s/mern-deployment.yml.out
mv ./k8s/mern-deployment.yml.out ./k8s/mern-deployment.yml

# echo "$KUBERNETES_CLUSTER_CERTIFICATE" | base64 -di > cert.crt

./kubectl \
  --kubeconfig config \
  apply -f ./k8s/