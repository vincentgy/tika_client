buiding js-local-bundle
echo "packing js-bundle"
npm run build-android

# build apk
echo "building apk"
cd ./android
. gradlew assembleDebug

