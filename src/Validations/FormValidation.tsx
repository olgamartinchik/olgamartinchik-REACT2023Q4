import * as yup from 'yup';
import { FileObject } from '../store/form';

const formSchema = yup.object().shape({
  name: yup
    .string()
    .min(2)
    .max(20)
    .required('Name is required!')
    .matches(/^[A-Z][a-z]*$/, 'Name should start with an uppercase letter'),
  email: yup.string().email().required('Email is required!'),
  age: yup
    .number()
    .min(16)
    .max(100)
    .positive()
    .integer()
    .required('Age is required!'),
  picture: yup
    .mixed<FileObject | string>()
    .required('Please, add photo')
    .transform((originalValue, originalObject) =>
      originalObject === null ? undefined : originalValue
    )
    .nullable()
    .test({
      name: 'fileFormat',
      message: 'Unsupported file format',
      test: (value) => {
        if (value && value instanceof FileList) {
          const supportedFormats = ['image/png', 'image/jpeg', 'image/jpg'];
          return supportedFormats.includes(value[0]?.type);
        }
        return true;
      },
    })
    .test({
      name: 'fileSize',
      message: 'File size is too large',
      test: (value) => {
        if (value && value instanceof FileList) {
          const maxSize = 2 * 1024 * 1024;
          return value[0]?.size <= maxSize;
        }
        return true;
      },
    }),
  password: yup
    .string()
    .min(4, 'Password should be at least 4 characters')
    .max(20)
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
  accept: yup
    .boolean()
    .transform((value, originalValue) =>
      originalValue === 'on' ? true : value
    )
    .oneOf([true], 'Accept Terms & Conditions is required')
    .required(),
  country: yup.string().required(),
});

export default formSchema;
