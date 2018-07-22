// ToastModule.java

package com.tika;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.Arguments;

import java.util.Map;
import java.util.HashMap;

public class HotUpdateModule extends ReactContextBaseJavaModule {
    public HotUpdateModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "hotupdate"; // 返回的名字就是最终模块的名字，前端调用时：NativeModules.hotupdate.xxx
    }

    @ReactMethod
    public void download(final String url, String newFileName, final Promise promise) {
        final String savePath = getReactApplicationContext().getFilesDir() + "/" + newFileName;
        new Thread(new Runnable() {
            @Override
            public void run() {
                try {
                    String result = SimpleDownloadUtil.download(url, savePath);
                    WritableMap map = Arguments.createMap();
                    map.putString("result", result);
                    promise.resolve(map);
                } catch (Exception e) {
                    promise.reject("unknown error", e);
                }
            }
        }).start();
    }
}