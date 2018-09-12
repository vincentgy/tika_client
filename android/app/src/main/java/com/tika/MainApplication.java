package com.tika;

import android.app.Application;
import com.remobile.cordova.*;

import com.facebook.react.ReactApplication;
import com.rnfs.RNFSPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
//https://github.com/react-community/react-native-maps/blob/master/docs/installation.md
import com.airbnb.android.react.maps.MapsPackage;
// https://github.com/maxs15/react-native-spinkit/wiki/Manual-linking---Android
import com.react.rnspinkit.RNSpinkitPackage;
import com.zyu.ReactNativeWheelPickerPackage;
//https://github.com/remobile/react-native-zip
import com.remobile.zip.RCTZipPackage;
//https://github.com/remobile/react-native-file-transfer
import com.remobile.filetransfer.RCTFileTransferPackage; 

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(new MainReactPackage(),
            
            new VectorIconsPackage(),
            new LinearGradientPackage(),
            new ReactNativeWheelPickerPackage(),
            new MapsPackage(),
            new RNFSPackage(),
            new RCTZipPackage(),
            new RCTFileTransferPackage(),
            new PickerPackage(), new CustomHotUpdateModulePackage(),new RNSpinkitPackage());
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }

    @Override
    protected String getJSBundleFile() {
      // return getFilesDir().getAbsolutePath() + "/index.android.bundle";
      return super.getJSBundleFile();
    }

  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
