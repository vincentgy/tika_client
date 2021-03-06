//
//  RNTMapManager.m
//  tika
//
//  Created by zhengfang on 2018/8/17.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import <MapKit/MapKit.h>

#import <React/RCTViewManager.h>
#import "RNTTableview.h"

@interface RNTTableViewManager : RCTViewManager
@end

@implementation RNTTableViewManager

RCT_EXPORT_MODULE()

- (UIView *)view
{
//  CGRect rect = CGRectMake(0.0f, 0.0f, 320.0f, 320.0f);
  RNTTableView * table = [[RNTTableView alloc] init];
  [table setBackgroundColor:[UIColor clearColor]];
  
  return table;
}

RCT_EXPORT_VIEW_PROPERTY(cellHeight, NSNumber *)

@end
