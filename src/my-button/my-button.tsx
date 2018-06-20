import * as React from 'react';

import myButtonClasses, { MyButtonClasses } from './my-button.css';
import { mergeStyles } from '../util/merge-styles';

interface MyButtonProps {
  classes?: MyButtonClasses;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  children?: any;
  label?: string;
}

export function MyButton(props: MyButtonProps) {
  const classes = mergeStyles(myButtonClasses, props.classes);

  return (
    <button
      className={`${classes.root} ${classes.rootStyle} ${classes.rootPosition}`}
      disabled={props.disabled}
      onClick={props.onClick}
    >
      <div className={classes.content}>{props.children || 'Click'}</div>
    </button>
  );
}
