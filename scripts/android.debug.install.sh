# install apk
echo "reinstall apk"
adb uninstall com.tika
adb install ./android/app/build/outputs/apk/debug/app-debug.apk