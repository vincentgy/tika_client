//
//  UpdateModule.h
//  tika
//
//  Created by  方正 on 2018/9/10.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
//#import "RCTBridgeModule.h"
#import <React/RCTBridgeModule.h>

@interface UpdateModule : NSObject<RCTBridgeModule>

+ (NSURL *)bundleURL;

@end

