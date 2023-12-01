import { Outlet, useLocation } from 'react-router-dom';

import Header from '../components/header/Header';
import { useAppSelector } from '../store/store';
import UserContainer from '../components/userContainer/UserContainer';
import { useDispatch } from 'react-redux';
import {
  FormType,
  setReactForm,
  setReactFormLoading,
  setReactHookForm,
  setReactHookFormLoading,
} from '../store/form';
import './Main.scss';

const Main = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const {
    reactForm,
    reactHookForm,
    isLoadingReactForm,
    isLoadingReactHookForm,
  } = useAppSelector((state) => state.form);
  const handleClearReactForm = () => {
    dispatch(setReactFormLoading(false));
    dispatch(setReactForm({} as FormType));
  };
  const handleClearReactFormForm = () => {
    dispatch(setReactHookFormLoading(false));
    dispatch(setReactHookForm({} as FormType));
  };

  return (
    <>
      <Header />
      <section>
        {location.pathname === '/' && (
          <>
            <h2>Home Page</h2>
            <div className="user-data">
              {isLoadingReactForm && (
                <UserContainer
                  btnText="Clear Form Data"
                  formData={reactForm}
                  handleClearForm={handleClearReactForm}
                />
              )}
              {isLoadingReactHookForm && (
                <UserContainer
                  btnText="Clear Hook Form Data"
                  formData={reactHookForm}
                  handleClearForm={handleClearReactFormForm}
                />
              )}
            </div>
          </>
        )}
        <Outlet />
      </section>
    </>
  );
};
export default Main;
