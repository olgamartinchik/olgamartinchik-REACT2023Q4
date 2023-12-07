import { FC } from 'react';
import { FormType } from '../../store/form';
import { Button } from '../button/Button';
import './UserContainer.scss';

interface UserContainerProps {
  formData: FormType;
  btnText: string;
  handleClearForm: () => void;
}

const UserContainer: FC<UserContainerProps> = ({
  formData,
  handleClearForm,
  btnText,
}) => {
  const { name, email, age, picture, country, gender } = formData;
  const handleButton = () => {
    handleClearForm();
  };
  return (
    <div>
      <div className="img-container">
        <img src={picture as string} alt="" />
      </div>
      <h2>
        Hello {name} from {country}
      </h2>
      <h3>Check your data:</h3>
      <p>
        <span className="bold">Email:</span> {email}
      </p>
      <p>
        <span className="bold">Age:</span> {age}
      </p>
      <p>
        <span className="bold">Gender:</span> {gender}
      </p>
      <Button text={btnText} handleButton={handleButton} />
    </div>
  );
};
export default UserContainer;
