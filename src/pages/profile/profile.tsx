import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { changeUserInfo } from '../../services/slices/userSlice';

export const Profile: FC = () => {
  const user = useSelector((state) => state.user.data);
  const dispatch = useDispatch();

  const [formValue, setFormValue] = useState({
    email: '',
    name: '',
    password: ''
  });

  useEffect(() => {
    if (user) {
      setFormValue((prev) => ({
        ...prev,
        email: user.email,
        name: user.name
      }));
    }
  }, [user]);

  const isFormChanged =
    formValue.name !== user?.name ||
    formValue.email !== user?.email ||
    !!formValue.password;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(changeUserInfo(formValue));
    formValue.password = '';
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue({
      name: user.name,
      email: user.email,
      password: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );
};
