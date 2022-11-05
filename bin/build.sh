#!/bin/bash

echo 'Building Vite assets'
npm run typecheck
npm run build:vite
rm -f dist/mockServiceWorker.js
cp dist/index.html dist/404.html
cp -r dist/* ../basicfacts.github.io
cd ../basicfacts.github.io
git add .
git commit -m "$(date '+%s')"
git push
cd ../basicfacts