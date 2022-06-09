#/bin/sh
set -eu

echo 'Overwriting build directory...'
rm -rf build
mkdir build

echo 'Linking assets...'
if [ "${CI:-}" == 'true' ]
then
    cp -a assets/. build
else
    for item in $(ls assets)
    do
        ln -sf ../assets/$item build/$item
    done
fi

echo 'Compiling html templates...'
node tools/build-html.js

echo 'Compiling sass...'
npx sass styles/main.scss build/styles.css

echo 'Bundling javascript...'
npx rollup --file build/bundle.js --sourcemap -- scripts/main.js 

echo 'Build complete!'
