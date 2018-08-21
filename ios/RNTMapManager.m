//
//  RNTMapManager.m
//  tika
//
//  Created by zhengfang on 2018/8/21.
//  Copyright © 2018年 Facebook. All rights reserved.
//

// RNTMapManager.m
#import <MapKit/MapKit.h>

#import <React/RCTViewManager.h>

@interface RNTMapManager : RCTViewManager
@end

@implementation RNTMapManager

RCT_EXPORT_MODULE()

- (UIView *)view
{
  MKMapView * map = [[MKMapView alloc] init];
  
//  MKCoordinateRegion region =  MKCoordinateRegionMake(map.userLocation.location.coordinate, changeSpan);
  CLLocationCoordinate2D coord = {.latitude =  31.238184222049302, .longitude =  121.44425335351512};
  MKCoordinateSpan span = {.latitudeDelta =  0.01, .longitudeDelta =  0.01};
  MKCoordinateRegion region = {coord, span};
  [map setRegion:region];
  
  [map setUserTrackingMode:MKUserTrackingModeFollow animated:YES];
  return map;
}

@end
