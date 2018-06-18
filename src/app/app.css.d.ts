import { MyButtonClasses } from 'src/my-button/my-button.css';

export interface AppClasses {
  root?: string;
  logo?: string;
  header?: string;
  title?: string;
  intro?: string;
  okButton?: MyButtonClasses;
  animation?: string;
  links?: string;
}

declare const defaultClasses: AppClasses;
export default defaultClasses;
