import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useDispatch } from '../../services/store';
import { userRegister } from '../../services/slices/userSlice';
import { useNavigate } from 'react-router-dom';

export const Register: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const argToRegister = { email: email, name: userName, password: password };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(userRegister(argToRegister));

    const resultAction = await dispatch(userRegister(argToRegister));

    if (userRegister.fulfilled.match(resultAction)) {
      navigate('/');
    } else {
      console.error('Registration failed:', resultAction.error);
    }
  };

  return (
    <RegisterUI
      errorText=''
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
