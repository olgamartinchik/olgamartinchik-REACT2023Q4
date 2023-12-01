import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { Button } from '../button/Button';
import Input from '../input/Input';
import './Form.scss';
import Autocomplete from '../autocomplete/Autocomplete';
import { useDispatch } from 'react-redux';
import { selectCountry } from '../../store';
import * as yup from 'yup';
import formSchema from '../../Validations/FormValidation';
import {
  FileObject,
  FileType,
  setReactForm,
  FormType,
  setReactFormLoading,
} from '../../store/form';
import { useNavigate } from 'react-router-dom';
import { convertFileToBase64 } from '../../helpers/convertFile';

const ReactForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isDisplay, setIsDisplay] = useState(false);
  const [countryValue, setCountryValue] = useState('');
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});
  // const [isValidate, setIsValidate]=useState()

  const formRef = useRef<HTMLFormElement>(null);

  const handleCountryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCountryValue(e.target.value);

    setIsDisplay(true);
  };
  const handlerVisibleList = (country: string) => {
    setIsDisplay(false);
    setCountryValue(country);
    dispatch(selectCountry(country));
  };
  const handleInputFocus = (fieldName: string) => {
    setValidationErrors((prevErrors) => {
      const { [fieldName]: currentFieldError, ...restErrors } = prevErrors;
      return restErrors;
    });
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(formRef.current!);

    const formData = Object.fromEntries(data.entries()) as Partial<FormType>;

    try {
      // const isValidate = await formSchema.isValid(formData, {
      //   abortEarly: false,
      // });
      // console.log('isValidate', isValidate);
      const validationData = await formSchema.validate(formData, {
        abortEarly: false,
      });
      setValidationErrors({});
      console.log('validationData', validationData);
      if (validationData) {
        if (validationData) {
          const pictureFile = data.get('picture') as FileObject;

          if (pictureFile) {
            const base64String = await convertFileToBase64(pictureFile);

            validationData.picture = base64String;
          }
        }
        dispatch(setReactForm(validationData));
        dispatch(setReactFormLoading(true));
        navigate('/');
      }
      setCountryValue('');
      formRef.current!.reset();
    } catch (validationError) {
      if (validationError instanceof yup.ValidationError) {
        const errors: Record<string, string> = {};
        validationError.inner.forEach((err) => {
          errors[err.path as string] = err.message;
        });
        setValidationErrors(errors);
        console.log('Validation errors:', errors);
      }
      dispatch(setReactFormLoading(false));
    }
  };

  return (
    <>
      <h2>React Form</h2>
      <form className="form" ref={formRef} onSubmit={handleSubmit}>
        <div className="form__label">
          <label className="label">
            Name:{' '}
            <Input
              type="text"
              placeholder="Name..."
              name="name"
              onFocus={() => handleInputFocus('name')}
              error={validationErrors.name}
              required
              autoComplete="off"
            />
          </label>
          <label className="label">
            Email:
            <Input
              type="email"
              placeholder="Email@email.com"
              name="email"
              onFocus={() => handleInputFocus('email')}
              error={validationErrors.email}
              required
              autoComplete="off"
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
              onFocus={() => handleInputFocus('age')}
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
              onFocus={() => handleInputFocus('country')}
              error={validationErrors.country}
              required
              autoComplete="off"
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
              onFocus={() => handleInputFocus('picture')}
              error={validationErrors.picture}
              required
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
              onFocus={() => handleInputFocus('password')}
              error={validationErrors.password}
              required
              autoComplete="off"
            />
          </label>
          <label className="label">
            Check Password:
            <Input
              type="password"
              placeholder="Password123"
              name="confirmPassword"
              onFocus={() => handleInputFocus('confirmPassword')}
              error={validationErrors.confirmPassword}
              required
              autoComplete="off"
            />
          </label>
        </div>
        <div className="label label--checked">
          <label htmlFor="checkbox">Accept Terms and Conditions</label>
          <Input
            id="checkbox"
            type="checkbox"
            name="accept"
            onFocus={() => handleInputFocus('accept')}
            error={validationErrors.accept}
            required
          />
        </div>
        <div>
          <Button
            text={'Submit React Form'}
            type="submit"
            disabled={Object.keys(validationErrors).length > 0}
          />
        </div>
      </form>
    </>
  );
};
export default ReactForm;
