import * as React from 'react';

type IconFunctionOption = {focused: bool; tintColor: string};
interface IconFunction {
  (option: IconFunctionOption): React.ReactNode;
}

type tabBarOnPressOption = {navigation: any; defaultHandler: any};
interface TabBarOnPress {
  (options: tabBarOnPressOption): void;
}

interface Options {
  /**
   * 标题
   * 在有 header 的时候生效，默认情况下 tab navigation 是没有 header 的
   * 必须要配合 stack 使用
   */
  title: React.ReactNode;
  /**
   * 是否显示 tabBar
   */
  tabBarVisible: bool;
  /**
   * 自定义 Icon
   */
  tabBarIcon: React.ReactNode | IconFunction;
  /**
   * 点击 tab 的回调
   */
  tabBarOnPress: TabBarOnPress;
  /**
   * 每个按钮的描述
   */
  tabBarLabel: React.ReactNode;
}

interface HOC {
  (component: React.ComponentClass): React.ComponentClass;
}

interface PageWithOption {
  (optins: Options): HOC;
}

export const Page: PageWithOption;
