package com.tika;

import java.io.FileOutputStream;
import java.net.HttpURLConnection;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;

public class SimpleDownloadUtil {
    /**
     * 简单的下载工具类
     * 
     * @param downloadUrl
     * @param savePath
     * @return 返回保存路径，如果下载失败，返回空
     */
    public static String download(String downloadUrl, String savePath) throws Exception {
        // Log.i("info", "开始下载：" + downloadUrl);
        HttpURLConnection con = (HttpURLConnection) new URL(downloadUrl).openConnection();
        con.setRequestMethod("GET");
        con.setUseCaches(false);
        con.setInstanceFollowRedirects(true);
        con.setRequestProperty("user-agent",
                "Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.31 (KHTML, like Gecko) Chrome/26.0.1410.64 Safari/537.31");
        con.setRequestProperty("accept", "*/*");// 这个可以不设置
        con.connect();// 连接
        InputStream is = con.getInputStream();
        File file = new File(savePath);
        FileOutputStream fos = new FileOutputStream(file);
        byte[] buf = new byte[1024];
        int len = -1;
        while ((len = is.read(buf)) != -1)
            fos.write(buf, 0, len);
        is.close();
        fos.close();
        con.disconnect();// 断开连接
        // Log.i("info", "下载完毕：" + savePath);
        return savePath;
    }
}