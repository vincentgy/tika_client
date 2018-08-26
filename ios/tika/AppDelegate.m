/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>


@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  
  _bridge = [[RCTBridge alloc] initWithDelegate:self
                                  launchOptions:launchOptions];
  
  
//  NSURL *jsCodeLocation;
//
//  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
//
//  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
//                                                      moduleName:@"tika"
//                                               initialProperties:nil
//                                                   launchOptions:launchOptions];
  
  
  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:_bridge
                                            moduleName:@"tika"
                                     initialProperties:@{}];
  
//  RCTRootView *r = [[RCTRootView alloc] initWithBridge:_bridge
//                                                   moduleName:@"t"
//                                            initialProperties:@{}];
  
  
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];
//  [rootView addSubview:r];

  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];
  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  return YES;
}

- (NSURL *)sourceURLForBridge:(__unused RCTBridge *)bridge
{
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"
                                                        fallbackResource:nil];
}

@end
