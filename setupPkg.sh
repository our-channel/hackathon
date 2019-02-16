#!/bin/sh

PKG="$1";
if [ -z "$PKG" ]; then
  echo "Usage: <pkg-name>";
  exit 1;
fi

if [ -d "packages/$PKG" ]; then
   echo "Package exists, assuming post-creation setup";
else 
   echo "Creating packages/$PKG...";
   mkdir -p packages/$PKG;
   mkdir packages/$PKG/src
   touch packages/$PKG/src/index.js
fi

cd packages/$PKG;
cp ../../.babelrc .
cp ../../.gitignore .

if [ -f "./package.json" ]; then
  echo "Package.json exists, assuming npm init already happened";
else 
  echo "Initializing node...";
  npm init
fi

node ../../mergeDevDeps.js ../../babelDeps.json ./package.json
npm i
npm run build
