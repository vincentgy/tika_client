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


#import <React/RCTConvert.h>
#import <CoreLocation/CoreLocation.h>
#import <React/RCTConvert+CoreLocation.h>
#import "RNTMapview.h"

@interface RCTConvert (Mapkit)

+ (MKCoordinateSpan)MKCoordinateSpan:(id)json;
+ (MKCoordinateRegion)MKCoordinateRegion:(id)json;

@end

@implementation RCTConvert(MapKit)

+ (MKCoordinateSpan)MKCoordinateSpan:(id)json
{
  json = [self NSDictionary:json];
  return (MKCoordinateSpan){
    [self CLLocationDegrees:json[@"latitudeDelta"]],
    [self CLLocationDegrees:json[@"longitudeDelta"]]
  };
}

+ (MKCoordinateRegion)MKCoordinateRegion:(id)json
{
  return (MKCoordinateRegion){
    [self CLLocationCoordinate2D:json],
    [self MKCoordinateSpan:json]
  };
}

@end


@interface RNTMapManager : RCTViewManager
@end

@implementation RNTMapManager

RCT_EXPORT_MODULE()

- (UIView *)view
{
  RNTMapView * mapview = [[RNTMapView alloc] init];
  mapview.userTrackingMode = MKUserTrackingModeFollow;
  
  return mapview;
}

RCT_EXPORT_VIEW_PROPERTY(scrollEnabled, BOOL)
RCT_CUSTOM_VIEW_PROPERTY(name, NSString*, RNTMapView)
{
  if (!json) {
    return;
  }
  NSString* name = [RCTConvert NSString:json];
  view.name = name;
  //  view.x = [NSJSONSerialization JSONObjectWithData:[x dataUsingEncoding:NSUTF8StringEncoding] options:NSJSONReadingMutableContainers error:nil];
  if (!view.name) {
    view.name = name;
  }
}

RCT_CUSTOM_VIEW_PROPERTY(desc, NSString*, RNTMapView)
{
  if (!json) {
    return;
  }
  NSString* desc = [RCTConvert NSString:json];
  view.desc = desc;
  //  view.x = [NSJSONSerialization JSONObjectWithData:[x dataUsingEncoding:NSUTF8StringEncoding] options:NSJSONReadingMutableContainers error:nil];
  if (!view.desc) {
    view.desc = desc;
  }
   [view addMark];
}


RCT_CUSTOM_VIEW_PROPERTY(x, double, RNTMapView)
{
  if (!json) {
    return;
  }
  double x = [RCTConvert double:json];
  view.x = x;
//  view.x = [NSJSONSerialization JSONObjectWithData:[x dataUsingEncoding:NSUTF8StringEncoding] options:NSJSONReadingMutableContainers error:nil];
  if (!view.x) {
    view.x = x;
  }
  
}
RCT_CUSTOM_VIEW_PROPERTY(y, double, RNTMapView)
{
  if (!json) {
    return;
  }
  double y = [RCTConvert double:json];
  view.y = y;
//  view.y = [NSJSONSerialization JSONObjectWithData:[y dataUsingEncoding:NSUTF8StringEncoding] options:NSJSONReadingMutableContainers error:nil];
  if (!view.y) {
    view.y = y;
  }
 
}


RCT_CUSTOM_VIEW_PROPERTY(region, MKCoordinateRegion, RNTMapView)
{
  [view setRegion:json ? [RCTConvert MKCoordinateRegion:json] : defaultView.region animated:YES];
}
@end
