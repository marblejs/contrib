#!/bin/bash

if [ "$SCOPE" == "unit" ]; then
  jest --expand --coverage --detectOpenHandles
elif [ "$SCOPE" == "watch" ]; then
  jest --expand --onlyChanged --watch
else
  jest --expand --detectOpenHandles --runInBand
fi

if [ $? -ne 0 ]; then
  exit 1
fi
