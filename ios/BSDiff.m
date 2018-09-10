//
//  BSDiff.m
//  tika
//
//  Created by  方正 on 2018/9/10.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "BSDiff.h"
#include "bspatch.h"

@implementation BSDiff

+ (BOOL)bsdiffPatch:(NSString *)patchPath
             origin:(NSString *)origin
      toDestination:(NSString *)destination
{
  if (![[NSFileManager defaultManager] fileExistsAtPath:patchPath]) {
    return NO;
  }
  if (![[NSFileManager defaultManager] fileExistsAtPath:origin]) {
    return NO;
  }
  
  int err = patch([origin UTF8String], [destination UTF8String], [patchPath UTF8String]);
  if (err) {
    return NO;
  }
  return YES;
}

@end
