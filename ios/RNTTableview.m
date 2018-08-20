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
    UIRefreshControl * refreshControl = [[UIRefreshControl alloc] init];
    refreshControl.tintColor = [UIColor grayColor];
    refreshControl.attributedTitle = [[NSAttributedString alloc] initWithString:@"下拉刷新"];
    
    
    [refreshControl addTarget:self action:@selector(refreshAction) forControlEvents:UIControlEventValueChanged];
    
    
    self.refreshControl = refreshControl;
    [self setBackgroundColor:[UIColor clearColor]];
    
  }
  return self;
}

-(void)refreshAction
{
  NSLog(@"下拉刷新");
  dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(2 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
    [self.refreshControl endRefreshing]; //结束刷新
  });
}

#pragma mark - UITableViewDelegate

- (NSInteger)numberOfSectionsInTableView:(UITableView *)theTableView{
  return 1;
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section{
  return 500;
}


- (CGFloat)tableView:(UITableView *)tableView heightForRowAtIndexPath:(NSIndexPath *)indexPath{
  NSNumber * num = [(RNTTableView*)tableView cellHeight];
  
  return [num doubleValue];
}
- (NSString *)tableView:(UITableView *)tableView titleForHeaderInSection:(NSInteger)section{
  return @"分区开始";
}


- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath{
  UITableViewCell * cell = [[UITableViewCell alloc] init];
  cell.textLabel.text = @"asdasd";
  [cell addSubview: self.Item];
  return cell;
}

@end

