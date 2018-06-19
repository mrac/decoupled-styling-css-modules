import { MyButtonClasses } from 'src/my-button/my-button.css';

export interface AppClasses {
  root?: string;
  logo?: string;
  header?: string;
  title?: string;
  intro?: string;
  okButton?: MyButtonClasses;
  links?: string;
}

declare const appClasses: AppClasses;
export default appClasses;
