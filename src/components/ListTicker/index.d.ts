import * as React from 'react';

interface TickerProps {
  data: Array<any>;
  onChange: (data: string, idx: Number) => null;
  currentActive: string;
  renderText: (data: string) => React.ReactNode;
}

export default class ListTicker extends React.Component<TickerProps, {}> {}
