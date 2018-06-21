export interface MyButtonClasses {
  root?: string;
  rootPosition?: string;
  rootStyle?: string;
  content?: string;
  types?: {
    primary?: string;
    secondary?: string;
  };
}

declare const myButtonClasses: MyButtonClasses;
export default myButtonClasses;
