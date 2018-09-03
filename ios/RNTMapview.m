//
//  UITableViewController+RNTMapview_m.m
//  tika
//
//  Created by  方正 on 2018/9/2.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "RNTMapview.h"

@interface RNTMapView()<MKMapViewDelegate,CLLocationManagerDelegate>
@end

@implementation RNTMapView
- (instancetype)init
{
  self = [super init];
  if(self){
    
//    self.locationManager = [[CLLocationManager alloc] init];
//    self.locationManager.delegate = self;
//    self.locationManager.desiredAccuracy = kCLLocationAccuracyBest;
//    self.locationManager.distanceFilter = 10.0f;
//    [self.locationManager requestAlwaysAuthorization];
//    [self.locationManager startUpdatingLocation];
//    MKCoordinateRegion theRegion;
//    theRegion.center=[[self.locationManager location] coordinate];
//    double x =[[self.locationManager location] coordinate].latitude;
//    double y = [[self.locationManager location] coordinate].longitude;
//    
//    [self addMark:x second:y];
  }
  return self;
}

- (void)locationManager:(CLLocationManager *)manager didFailWithError:(NSError *)error {
  if ([error code] == kCLErrorDenied) {
//    CLog(@"访问被拒绝");
  }
  if ([error code] == kCLErrorLocationUnknown) {
//    CLog(@"无法获取位置信息");
  }
}

- (void) addMark:(double)x second:(double)y{
  MKPointAnnotation *annotation0 = [[MKPointAnnotation alloc] init];
  
  [annotation0 setCoordinate:CLLocationCoordinate2DMake(x, y)];
  [annotation0 setTitle:@"重庆理工大学"];
  [annotation0 setSubtitle:@"重庆市巴南区红光大道69号"];
  [self addAnnotation:annotation0];
}


- (void) addMark{
  MKPointAnnotation *annotation0 = [[MKPointAnnotation alloc] init];
  
  [annotation0 setCoordinate:CLLocationCoordinate2DMake(self.x, self.y)];
  [annotation0 setTitle:@"重庆理工大学"];
  [annotation0 setSubtitle:@"重庆市巴南区红光大道69号"];
  [self addAnnotation:annotation0];
}

//// 每次添加大头针都会调用此方法  可以设置大头针的样式
//- (MKAnnotationView *)mapView:(MKMapView *)mapView viewForAnnotation:(id<MKAnnotation>)annotation
//{
//  // 判断大头针位置是否在原点,如果是则不加大头针
//  if([annotation isKindOfClass:[mapView.userLocation class]])
//    return nil;
//  static NSString *annotationName = @"annotation";
//  MKPinAnnotationView *anView = (MKPinAnnotationView *)[mapView dequeueReusableAnnotationViewWithIdentifier:annotationName];
//  if(anView == nil)
//  {
//    anView = [[MKPinAnnotationView alloc]initWithAnnotation:annotation reuseIdentifier:annotationName];
//  }
//  anView.animatesDrop = YES;
//  //    // 显示详细信息
//  anView.canShowCallout = YES;
//  //    anView.leftCalloutAccessoryView   可以设置左视图
//  //    anView.rightCalloutAccessoryView   可以设置右视图
//  return anView;
//}


@end
