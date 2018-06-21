import * as React from 'react';

import myButtonClasses, { MyButtonClasses } from './my-button.css';
import { mergeClasses } from '../util/merge-classes';

interface MyButtonProps {
  classes?: MyButtonClasses;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  children?: any;
  label?: string;
  type?: 'primary' | 'secondary';
}

export function MyButton(props: MyButtonProps) {
  const classes = mergeClasses(myButtonClasses, props.classes);
  const typeClass = props.type && classes.types![props.type];

  return (
    <button
      className={`${classes.root} ${classes.rootStyle} ${classes.rootPosition} ${typeClass}`}
      disabled={props.disabled}
      onClick={props.onClick}
    >
      <div className={classes.content}>{props.children || 'Click'}</div>
    </button>
  );
}
