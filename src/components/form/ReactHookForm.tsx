import { useForm } from 'react-hook-form';
import {
  FormType,
  setReactHookForm,
  setReactHookFormLoading,
} from '../../store/form';
import { yupResolver } from '@hookform/resolvers/yup';
import formSchema from '../../Validations/FormValidation';
import './Form.scss';
import Input from '../input/Input';
import Autocomplete from '../autocomplete/Autocomplete';
import { Button } from '../button/Button';
import { ChangeEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { convertFileToBase64 } from '../../helpers/convertFile';
import { selectCountry } from '../../store';

const ReactHookForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [convertedImageData, setConvertedImageData] = useState<string | null>(
    null
  );
  const [countryValue, setCountryValue] = useState('');
  const [isDisplay, setIsDisplay] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
    reset,
  } = useForm({
    mode: 'all',
    resolver: yupResolver(formSchema),
  });

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files: FileList | null = e.target.files;
    if (files && files.length > 0) {
      const base64String = await convertFileToBase64(files[0]);
      setConvertedImageData(base64String);
    }
  };
  const handlerVisibleList = (country: string) => {
    setIsDisplay(false);
    setValue('country', country);
    setCountryValue(country);
    dispatch(selectCountry(country));
  };

  const handleCountryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCountryValue(e.target.value);
    setIsDisplay(true);
  };
  const onSubmitHandler = async (data: FormType) => {
    dispatch(setReactHookFormLoading(false));

    if (data) {
      if (convertedImageData) {
        data.picture = convertedImageData;
      }

      dispatch(setReactHookForm(data));
      dispatch(setReactHookFormLoading(true));
      navigate('/');
    }
    setCountryValue('');
    reset();
  };

  return (
    <>
      <h2>React Hook Form</h2>
      <form className="form" onSubmit={handleSubmit(onSubmitHandler)}>
        <div className="form__label">
          <label className="label">
            Name:
            <Input
              {...register('name')}
              type="text"
              placeholder="Name..."
              error={errors.name?.message}
              required
              autoComplete="off"
            />
          </label>
          <label className="label">
            Email:
            <Input
              {...register('email')}
              type="email"
              placeholder="Email@email.com"
              error={errors.email?.message}
              required
              autoComplete="off"
            />
          </label>
        </div>
        <div className="form__label">
          <label className="label">
            Age:
            <Input
              {...register('age')}
              type="number"
              placeholder="Age"
              min={1}
              max={100}
              error={errors.age?.message}
              required
            />
          </label>

          <label className="label">
            Gender:
            <select {...register('gender')}>
              <option value={'male'}>Male</option>
              <option value={'female'}>Female</option>
            </select>
          </label>
        </div>

        <div className="form__label">
          <label className="label">
            Country:
            <Input
              {...register('country')}
              type="text"
              placeholder="Your country"
              onChange={handleCountryChange}
              value={countryValue}
              error={errors.country?.message}
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
              {...register('picture')}
              type="file"
              error={errors.picture?.message}
              onChange={handleFileChange}
              required
            />
          </label>
        </div>
        <div className="form__label">
          <label className="label">
            Password:
            <Input
              {...register('password')}
              type="password"
              placeholder="Password123"
              error={errors.password?.message}
              required
              autoComplete="off"
            />
          </label>
          <label className="label">
            Check Password:
            <Input
              {...register('confirmPassword')}
              type="password"
              placeholder="Password123"
              error={errors.confirmPassword?.message}
              required
              autoComplete="off"
            />
          </label>
        </div>
        <div className="label label--checked">
          <label htmlFor="checkbox">Accept Terms and Conditions</label>
          <Input
            {...register('accept')}
            id="checkbox"
            type="checkbox"
            error={errors.accept?.message}
            required
          />
        </div>
        <div>
          <Button
            text={'Submit React Hook Form'}
            type="submit"
            disabled={!isValid}
          />
        </div>
      </form>
    </>
  );
};
export default ReactHookForm;
