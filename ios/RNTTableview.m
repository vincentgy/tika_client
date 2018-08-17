//
//  RNTTableview.m
//  tika
//
//  Created by zhengfang on 2018/8/17.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "RNTTableview.h"

@interface RNTTableView()<UITableViewDataSource, UITableViewDelegate, UIScrollViewDelegate>
@end

@implementation RNTTableView
- (instancetype)init{
  self = [super init];
  if (self) {
    self.delegate = self;
    self.dataSource = self;
    self.showsVerticalScrollIndicator = YES;
    self.showsHorizontalScrollIndicator = NO;
    self.sectionHeaderHeight = 0;
    self.sectionFooterHeight = 0;
    self.keyboardDismissMode = UIScrollViewKeyboardDismissModeOnDrag;
    
  }
  return self;
}

#pragma mark - UITableViewDelegate

- (NSInteger)numberOfSectionsInTableView:(UITableView *)theTableView{
  return 1;
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section{
  return 10;
}

- (NSString *)tableView:(UITableView *)tableView titleForHeaderInSection:(NSInteger)section
{
  return @"分区开始";
}


- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath{
  UITableViewCell * cell = [[UITableViewCell alloc] init];
  cell.textLabel.text = @"asdasd";
  
  return cell;
}

@end

