import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useRefreshToken from '../hooks/useRefreshToken';
import useAuth from '../hooks/useAuth';
import { Loader } from '.';

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth, currentColor, persist } = useAuth();
  const override = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  };
  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
      } finally {
        setIsLoading(false);
      }
    };

    !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);
  }, []);

  useEffect(() => {
    //console.log(`isLoading: ${isLoading}`);
    //console.log(`aT: ${JSON.stringify(auth?.accessToken)}`);
  }, [isLoading]);

  return (
    <>
      {!persist ? (
        <Outlet />
      ) : isLoading ? (
        <Loader loading={isLoading} override={override} />
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default PersistLogin;
