export type FileObject = {
  size: number;
  type: string;
};
export type FileType = FileObject | null | string;

export type FormType = {
  name: string;
  email: string;
  age: number;
  picture: FileType;
  password: string;
  confirmPassword: string;
  gender: string;
  accept: boolean;
  country: string;
};
