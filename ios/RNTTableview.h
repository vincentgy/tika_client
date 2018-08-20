//
//  RNTTableview.h
//  tika
//
//  Created by zhengfang on 2018/8/17.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#if __has_include("RCTViewManager.h")
#import "RCTComponent.h"
#else
#import <React/RCTComponent.h>
#endif
#import <UIKit/UITableView.h>
#import <UIKit/UIKit.h>

@interface RNTTableView : UITableView

@property (nonatomic, strong) NSNumber *cellHeight;

@end
