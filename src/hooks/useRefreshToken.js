import axios from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.get('/Accounts/RefreshToken', {
      withCredentials: true
    });

    setAuth((prev) => {
      //console.log(JSON.stringify(prev));
      //console.log(response?.data?.token);
      return {
        ...prev,
        username: response?.data?.userName,
        accessToken: response?.data?.token
      };
    });

    return response?.data?.accessToken;
  };

  return refresh;
};

export default useRefreshToken;
