# https://blog.csdn.net/u011272795/article/details/77161942

buiding js-local-bundle
echo "packing js-bundle"
npm run build-android

# build apk
echo "building apk"
cd ./android
. gradlew assembleRelease

