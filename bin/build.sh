#!/bin/bash

echo 'Building Vite assets'
npm run typecheck
npm run build:vite
rm -f dist/mockServiceWorker.js