//
//  BSDiff.h
//  tika
//
//  Created by  方正 on 2018/9/10.
//  Copyright © 2018年 Facebook. All rights reserved.
//




#import <Foundation/Foundation.h>

@interface BSDiff : NSObject

+ (BOOL)bsdiffPatch:(NSString *)path
             origin:(NSString *)origin
      toDestination:(NSString *)destination;

@end
