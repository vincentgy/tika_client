//
//  UITableViewController+RNTMapview_m.h
//  tika
//
//  Created by  方正 on 2018/9/2.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#if __has_include("RCTViewManager.h")
#import "RCTComponent.h"
#else
#import <React/RCTComponent.h>
#endif
#import <MapKit/MapKit.h>
#import <UIKit/UIKit.h>

@interface RNTMapView : MKMapView

@property (nonatomic) double x;
@property (nonatomic) double y;
@property (nonatomic,strong) NSString *name;
@property (nonatomic,strong) NSString *desc;
@property (nonatomic,strong) CLLocationManager *locationManager;

- (void) addMark;

@end
