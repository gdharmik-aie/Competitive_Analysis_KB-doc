#!/bin/sh
#
#Usage ./deploy.sh <imageVersion> 
#
#
set -e
if [ -z $1 ]; then
  echo >&2 "Version must be set Usage ./deploy.sh <imageVersion>"
  exit 1
fi
cd ../api
docker build -t api:$1 .
cd ../web-react
docker build -t web-react:$1 .