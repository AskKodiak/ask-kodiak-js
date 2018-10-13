#!/bin/bash

# before running install node-minify
#   sudo npm install -g node-minify
node-minify --compressor uglifyjs --input 'index.js' --output 'dist/ask-kodiak-js-min.js'
cp index.js dist/ask-kodiak-js.js
