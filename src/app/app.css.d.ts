import { MyButtonClasses } from 'src/my-button/my-button.css';

export interface AppClasses {
  root?: string;
  logo?: string;
  header?: string;
  title?: string;
  intro?: string;
  animation?: string;
  links?: string;
  okButton?: MyButtonClasses;
}

declare const defaultClasses: AppClasses;
export default defaultClasses;
