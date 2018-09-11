#!/usr/bin/env python
# -*- coding: utf-8 -*-

__author__ = "eddie.zhou@bttc.com"

import hashlib, io
import oss2

def getMD5(filePath):
	m = hashlib.md5()
	file = io.FileIO(filePath, 'r')
	bytes = file.read(1024)
	while(bytes != b''):
		m.update(bytes)
		bytes = file.read(1024)
	file.close()
	return m.hexdigest()


def upload(object_name_arr, local_file_arr):
	if len(object_name_arr) != len(local_file_arr):
		return
	# 阿里云主账号AccessKey拥有所有API的访问权限，风险很高。强烈建议您创建并使用RAM账号进行API访问或日常运维，请登录 https://ram.console.aliyun.com 创建RAM账号。
	auth = oss2.Auth('LTAI6AQl1R4ChuI1', 'DzDALtBNCCqic7my63aM3VCqrlEtOJ')
	# Endpoint以杭州为例，其它Region请按实际情况填写。
	bucket = oss2.Bucket(auth, 'http://oss-cn-shanghai.aliyuncs.com', 'rn-app-resource')
	# # 必须以二进制的方式打开文件，因为需要知道文件包含的字节数。
	# with open('<yourLocalFile>', 'rb') as fileobj:
	# 	# Seek方法用于指定从第1000个字节位置开始读写。上传时会从您指定的第1000个字节位置开始上传，直到文件结束。
	# 	fileobj.seek(1000, os.SEEK_SET)
	# 	# Tell方法用于返回当前位置。
	# 	current = fileobj.tell()
	# 	bucket.put_object('<yourObjectName>', fileobj)
	for i in xrange(0, len(object_name_arr)):
		bucket.put_object_from_file(object_name_arr[i], local_file_arr[i])