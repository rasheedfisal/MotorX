import axios from '../api/axios';

import useAuth from './useAuth';

const useSignOut = () => {
  const { setAuth } = useAuth();
  const signOut = async () => {
    setAuth({});
    try {
      await axios.get('/Accounts/Logout', {
        withCredentials: true
      });
    } catch (err) {
      console.log(err);
    }
  };
  return signOut;
};

export default useSignOut;
