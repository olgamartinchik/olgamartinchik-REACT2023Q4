import { Route, Routes } from 'react-router-dom';
import NotFound from '../pages/NotFound';
import Main from '../pages/Main';
import FormPage from '../pages/FormPage';
import HookFormPage from '../pages/HookFormPage';

export const RoutesApp = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />}>
        <Route path="/form" element={<FormPage />} />
        <Route path="/hookform" element={<HookFormPage />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
