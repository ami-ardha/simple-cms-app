import { LoginFormInputs } from './schema';

export type FormField = {
  id: keyof LoginFormInputs;
  label: string;
  type: React.HTMLInputTypeAttribute;
  placeholder: string;
};

export const loginFormFields: FormField[] = [
  {
    id: 'username',
    label: 'Username',
    type: 'string',
    placeholder: 'Masukkan Username Anda',
  },
  {
    id: 'password',
    label: 'Password',
    type: 'password',
    placeholder: 'password',
  },
];
