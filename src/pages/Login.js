import React from 'react';
import { useRef, useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

const LOGIN_URL = '/Accounts/Login';

function Login() {
  const navigate = useNavigate();

  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    currentColor,
    setAuth,
    persist,
    setPersist
  } = useAuth();

  useEffect(() => {
    const currentThemeColor = localStorage.getItem('colorMode');
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);
  useEffect(() => {
    setErrMsg('');
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setClicked(true);
    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ email: user, password: pwd }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );
      //console.log(JSON.stringify(response));
      const accessToken = response?.data?.token;
      const username = response?.data?.userName;
      setAuth({ username, user, accessToken });
      setUser('');
      setPwd('');
      navigate('/home', { replace: true });
    } catch (err) {
      console.log(err);
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 400) {
        setErrMsg('Invalid Credentials');
      } else if (err.response?.status === 401) {
        setErrMsg('Unauthorized');
      } else {
        setErrMsg('Login Failed');
      }
      setClicked(false);
      errRef.current.focus();
    }
  };

  const togglePersist = () => {
    setPersist((prev) => !prev);
  };

  useEffect(() => {
    localStorage.setItem('persist', persist);
  }, [persist]);

  return (
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
      <div className="flex relative dark:bg-main-dark-bg">
        <div className="container px-6 mx-auto">
          <div className="flex flex-col text-center md:text-left md:flex-row h-screen justify-evenly md:items-center">
            <div className="flex flex-col w-full">
              <div>
                <svg
                  className="w-20 h-20 mx-auto md:float-left fill-stroke text-gray-800 dark:text-white"
                  fill="none"
                  stroke={currentColor}
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                  ></path>
                </svg>
              </div>
              <h1
                className={`text-5xl font-bold`}
                style={{ color: currentColor }}
              >
                Client Area
              </h1>
              <p className="w-5/12 mx-auto md:mx-0 text-gray-500 dark:text-gray-200">
                Control and monitorize your website data from dashboard.
              </p>
            </div>
            <div className="w-full md:w-full lg:w-9/12 mx-auto md:mx-0 ">
              <div className="bg-white dark:bg-gray-200 p-10 flex flex-col w-full shadow-xl rounded-xl">
                <p
                  ref={errRef}
                  className={errMsg ? 'text-red-500' : 'text-gray-800'}
                  aria-live="assertive"
                >
                  {errMsg}
                </p>
                <h2 className="text-2xl font-bold text-gray-800 text-left mb-5">
                  SIGNIN
                </h2>
                <form className="w-full" onSubmit={handleSubmit}>
                  <div id="input" className="flex flex-col w-full my-5">
                    <label htmlFor="username" className="text-gray-500 mb-2">
                      Username
                    </label>
                    <input
                      type="text"
                      id="username"
                      ref={userRef}
                      placeholder="Please insert your Email"
                      className={`appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:shadow-lg`}
                      onChange={(e) => setUser(e.target.value)}
                      value={user}
                      required
                    />
                  </div>
                  <div id="input" className="flex flex-col w-full my-5">
                    <label htmlFor="password" className="text-gray-500 mb-2">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      placeholder="Please insert your password"
                      className={`appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:shadow-lg`}
                      onChange={(e) => setPwd(e.target.value)}
                      value={pwd}
                      required
                    />
                  </div>
                  <div id="button" className="flex flex-col w-full my-5">
                    <button
                      type="submit"
                      className={
                        clicked
                          ? 'inline-flex justify-center items-center py-4  leading-6 transition duration-150 ease-in-out rounded-md shadow cursor-not-allowed'
                          : 'w-full py-4'
                      }
                      style={{ backgroundColor: currentColor, color: 'white' }}
                      disabled={clicked}
                    >
                      <div className="flex flex-row items-center justify-center">
                        {clicked ? (
                          <>
                            <svg
                              className="w-6 h-6 mr-3 -ml-1 animate-spin"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            <div className="font-bold">Loading...</div>
                          </>
                        ) : (
                          <>
                            <div className="mr-2">
                              <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                                ></path>
                              </svg>
                            </div>
                            <div className="font-bold">Signin</div>
                          </>
                        )}
                      </div>
                    </button>
                    <div className="flex  w-full my-5">
                      <input
                        type="checkbox"
                        id="persist"
                        className="form-check-input w-4 cursor-pointer"
                        onChange={togglePersist}
                        checked={persist}
                      />
                      <label
                        htmlFor="persist"
                        className="ml-2 text-sm  font-bold  text-gray-900"
                      >
                        Trust this Device
                      </label>
                    </div>
                    {/* <div className="flex justify-evenly mt-5">
                      <a
                        href="#"
                        className="w-full text-center font-medium text-gray-500"
                      >
                        Recover password!
                      </a>
                      <a
                    href="#"
                    className="w-full text-center font-medium text-gray-500"
                    >Singup!</a
                  >
                    </div> */}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
