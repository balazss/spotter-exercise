#!/bin/bash

# This script is to copy some environment variables to be used by the browser.
# It's not a good practice to expose environment variables to the browser, but
# it's done for the purpose of running the spotter-exercise demo app on ECS.

# Recreate config file
rm -rf ./env-config.js
touch ./env-config.js

# Add assignment 
echo "window._env_ = {" >> ./env-config.js

# Get the value of the REACT_APP_API_HOST env var from the ECS container and
# write it to the config file
echo "  REACT_APP_API_HOST: \"$REACT_APP_API_HOST\"," >> ./env-config.js

echo "}" >> ./env-config.js