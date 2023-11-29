import { NavLink, useNavigate } from 'react-router-dom';
import { Button } from '../button/Button';
import './Header.scss';

const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="header">
      <div className="header__btn">
        <Button text={'Home Page'} handleButton={() => navigate('/')} />
      </div>
      <nav className="nav">
        <NavLink to={`/form/`}>
          <span>Form</span>
        </NavLink>

        <NavLink to={`/hookform/`}>
          <span>React Hook Form</span>
        </NavLink>
      </nav>
    </header>
  );
};
export default Header;
