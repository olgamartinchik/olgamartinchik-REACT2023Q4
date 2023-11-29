import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { Button } from '../button/Button';
import Input from '../input/Input';
import './Form.scss';
import Autocomplete from '../autocomplete/Autocomplete';
import { useDispatch } from 'react-redux';
import { selectCountry } from '../../store';
import * as yup from 'yup';
import formSchema from '../../Validations/FormValidation';

interface FormData {
  name: string;
  email: string;
  age: number;
  gender: string;
  country: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}
const Form = () => {
  const [isDisplay, setIsDisplay] = useState(false);
  const [countryValue, setCountryValue] = useState('');
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});
  // const [isValidate, setIsValidate]=useState()
  // const passwordRef = useRef<HTMLInputElement>(null);
  // const pictureRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const dispatch = useDispatch();

  const handleCountryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCountryValue(e.target.value);

    setIsDisplay(true);
  };
  const handlerVisibleList = (country: string) => {
    setIsDisplay(false);
    setCountryValue(country);
    dispatch(selectCountry(country));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('submite');
    const data = new FormData(formRef.current!);
    console.log('data', data.get('name'));
    const formData = {
      name: data.get('name'),
      email: data.get('email'),
      age: data.get('age'),
      picture: data.get('picture'),
      password: data.get('password'),
      confirmPassword: data.get('confirmPassword'),
      gender: data.get('gender'),
      accept: data.get('accept'),
      country: data.get('country'),
    };
    try {
      const isValidate = await formSchema.isValid(formData, {
        abortEarly: false,
      });
      console.log('isValidate', isValidate);
      const validationData = await formSchema.validate(formData, {
        abortEarly: false,
      });
      setValidationErrors({});
      console.log('validationData', validationData);
    } catch (validationError) {
      if (validationError instanceof yup.ValidationError) {
        const errors: Record<string, string> = {};
        validationError.inner.forEach((err) => {
          errors[err.path as string] = err.message;
        });
        setValidationErrors(errors);
        console.log('Validation errors:', errors);
      }
    }
  };

  return (
    <form className="form" ref={formRef} onSubmit={handleSubmit}>
      <div className="form__label">
        <label className="label">
          Name:{' '}
          <Input
            type="text"
            placeholder="Name..."
            name="name"
            error={validationErrors.name}
            required
          />
        </label>
        <label className="label">
          Email:
          <Input
            type="email"
            placeholder="Email@email.com"
            name="email"
            error={validationErrors.email}
            required
          />
        </label>
      </div>
      <div className="form__label">
        <label className="label">
          Age:
          <Input
            type="number"
            placeholder="Age"
            min={1}
            max={100}
            name="age"
            error={validationErrors.age}
            required
          />
        </label>

        <label className="label">
          Gender:
          <select name="gender">
            <option value={'male'}>Male</option>
            <option value={'female'}>Female</option>
          </select>
        </label>
      </div>

      <div className="form__label">
        <label className="label">
          Country:
          <Input
            type="text"
            placeholder="Your country"
            name="country"
            onChange={handleCountryChange}
            value={countryValue}
            error={validationErrors.country}
          />
        </label>
        {isDisplay && countryValue.length >= 1 && (
          <Autocomplete
            countryInputValue={countryValue}
            handlerVisibleList={handlerVisibleList}
          />
        )}

        <label className="label" htmlFor="file">
          Upload Picture:
          <Input
            type="file"
            placeholder="Email"
            name="picture"
            error={validationErrors.picture}
          />
        </label>
      </div>
      <div className="form__label">
        <label className="label">
          Password:
          <Input
            type="password"
            placeholder="Password123"
            name="password"
            error={validationErrors.password}
            required
          />
        </label>
        <label className="label">
          Check Password:
          <Input
            type="password"
            placeholder="Password123"
            name="confirmPassword"
            error={validationErrors.confirmPassword}
            required
          />
        </label>
      </div>
      <div className="label label--checked">
        <label htmlFor="accept">Accept Terms and Conditions</label>
        <Input
          id="accept"
          type="checkbox"
          name="accept"
          error={validationErrors.accept}
        />
      </div>
      <div>
        <Button text={'Submit'} type="submit" />
      </div>
    </form>
  );
};
export default Form;
