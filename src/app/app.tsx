import * as React from 'react';

import logo from './logo.svg';
import appClasses, { AppClasses } from './app.css';
import { MyButton } from '../my-button/my-button';
import { mergeStyles } from '../util/merge-styles';

export interface AppProps {
  classes?: AppClasses;
}

export class App extends React.Component<AppProps> {
  public render() {
    const classes = mergeStyles(appClasses, this.props.classes);

    return (
      <div className={classes.root}>
        <header className={classes.header}>
          <img className={classes.logo} src={logo} alt="logo" />
          <h1 className={classes.title}>Welcome to React</h1>
          <div className={classes.links}>
            <a href="/?theme=a">theme A</a> | <a href="/?theme=b">theme B</a>
          </div>
        </header>
        <p className={classes.intro}>
          <MyButton classes={classes.okButton}>OK</MyButton>
        </p>
      </div>
    );
  }
}
