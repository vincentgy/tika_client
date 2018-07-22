import React from 'react';

interface OnChnageType {
  key: string;
  value: string | number;
}

type OnChangeFunction = (OnChnageType) => void;
type OnSubmitFunction = () => void;

interface FormProps {
  children: (OnChangeFunction, OnSubmitFunction) => React.ReactElement;
}

export default class Form extends React.Component<FormProps, {}> {}
