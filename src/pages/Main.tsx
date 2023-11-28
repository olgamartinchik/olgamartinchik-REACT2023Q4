import { Outlet, useLocation } from 'react-router-dom';

import Header from '../components/header/Header';

const Main = () => {
  const location = useLocation();
  return (
    <>
      <Header />
      <section>
        {location.pathname === '/' && <p>Home Page</p>}
        <Outlet />
      </section>
    </>
  );
};
export default Main;
