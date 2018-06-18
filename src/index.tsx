import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from './app/app';
import themeA from './themes/theme-a.css';
import themeB from './themes/theme-b.css';
import { AppClasses } from 'src/app/app.css';

const search = location.search.replace('?theme=', '');
let theme: AppClasses;

switch (search) {
  case 'a':
    theme = themeA;
    break;
  case 'b':
    theme = themeB;
    break;
  default:
    theme = themeB;
}

ReactDOM.render(<App classes={theme} />, document.getElementById('root') as HTMLElement);
