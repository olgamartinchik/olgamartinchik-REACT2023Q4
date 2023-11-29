import * as yup from 'yup';

interface FileObject {
  size: number;
  type: string;
}

interface FormData {
  name: string;
  email: string;
  age: number;
  picture?: FileObject | null;
  password: string;
  confirmPassword: string;
  gender: string;
  accept: boolean;
  country: string;
}

const formSchema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required!')
    .matches(/^[A-Z][a-z]*$/, 'Name should start with an uppercase letter'),
  email: yup.string().email().required('Email is required!'),
  age: yup.number().positive().integer().required('Age is required!'),
  picture: yup
    .mixed<FileObject>()
    .transform((originalValue, originalObject) =>
      originalObject === null ? undefined : originalValue
    )
    .nullable()
    .test({
      name: 'fileSize',
      message: 'File size is too large',
      test: (value) => {
        if (value) {
          const maxSize = 2 * 1024 * 1024;
          return value.size <= maxSize;
        }
        return true;
      },
    })
    .test({
      name: 'fileFormat',
      message: 'Unsupported file format',
      test: (value) => {
        if (value) {
          const supportedFormats = ['image/png', 'image/jpeg'];
          return supportedFormats.includes(value.type);
        }
        return true;
      },
    }),
  password: yup
    .string()
    .min(4, 'Password should be at least 4 characters')
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{4,}$/,
      'Should contain at least 1 number, 1 uppercase letter, 1 lowercase letter, and 1 special character'
    )
    .required('Password is required!'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm password'),
  gender: yup.string().required(),
  accept: yup.boolean().oneOf([true], 'Accept Terms & Conditions is required'),
  country: yup.string().required(),
});

export default formSchema;
