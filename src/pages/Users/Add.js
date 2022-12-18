import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useNavigate, NavLink } from 'react-router-dom';
import { Loader } from '../../components';

const Add = () => {
  const errRef = useRef();
  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState('');
  const { currentColor } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const [clicked, setClicked] = useState(false);
  const [loading, setLoading] = useState(false);
  const override = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {
    setClicked(true);
    const controller = new AbortController();
    try {
      const addItem = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        password: data.password
      };
      const config = {
        headers: {
          ContentType: 'application/json',
          signal: controller.signal
        }
      };

      const response = await axiosPrivate.post(
        '/Accounts/Register',
        addItem,
        config
      );

      if (response?.data) {
        navigate('/Users');
      }
    } catch (err) {
      errRef.current.focus();
      if (!err?.response) {
        setErrMsg('no server response');
      } else if (err.response?.status === 400) {
        let errors = err?.response?.data?.errors.map((err) => err + '|');
        // setErrMsg('old password not match');
        setErrMsg(errors);
      } else {
        setErrMsg('something went wrong, information not submitted');
      }
    }
    setClicked(false);
    return () => {
      controller.abort();
    };
  };
  return (
    <>
      <h1 className="text-center text-4xl font-semibold mt-10 dark:text-white">
        Add User
      </h1>

      <form
        className="max-w-xl m-auto py-10 mt-10 px-12 mb-5 border"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Loader loading={loading} override={override} />
        <p
          ref={errRef}
          className={errMsg ? 'text-red-500' : 'text-gray-800'}
          aria-live="assertive"
        >
          {errMsg}
        </p>
        <label className="text-gray-600 font-medium dark:text-white">
          First Name
        </label>
        <input
          className="border-solid border-gray-300 border py-2 px-4 w-full rounded text-gray-700"
          name="firstName"
          placeholder=""
          autoFocus
          {...register('firstName', { required: 'This field is required' })}
        />
        {errors.firstName && (
          <div className="mb-3 text-normal text-red-500">
            {errors.firstName.message}
          </div>
        )}

        <label className="text-gray-600 font-medium block mt-4 dark:text-white">
          Last Name
        </label>
        <input
          className="border-solid border-gray-300 border py-2 px-4 w-full rounded text-gray-700"
          name="lastName"
          type="text"
          placeholder=""
          {...register('lastName', { required: 'This field is required' })}
        />
        {errors.lastName && (
          <div className="mb-3 text-normal text-red-500 ">
            {errors.lastName.message}
          </div>
        )}

        <label className="text-gray-600 font-medium block mt-4 dark:text-white">
          Email
        </label>
        <input
          className="border-solid border-gray-300 border py-2 px-4 w-full rounded text-gray-700"
          name="email"
          type="text"
          placeholder=""
          {...register('email', { required: 'This field is required' })}
        />
        {errors.email && (
          <div className="mb-3 text-normal text-red-500 ">
            {errors.email.message}
          </div>
        )}

        <label className="text-gray-600 font-medium block mt-4 dark:text-white">
          Phone Number
        </label>
        <input
          className="border-solid border-gray-300 border py-2 px-4 w-full rounded text-gray-700"
          name="phoneNumber"
          type="text"
          placeholder=""
          {...register('phoneNumber', { required: 'This field is required' })}
        />
        {errors.phoneNumber && (
          <div className="mb-3 text-normal text-red-500 ">
            {errors.phoneNumber.message}
          </div>
        )}

        <label className="text-gray-600 font-medium block mt-4 dark:text-white">
          Password
        </label>
        <input
          className="border-solid border-gray-300 border py-2 px-4 w-full rounded text-gray-700"
          name="password"
          type="text"
          placeholder=""
          {...register('password', { required: 'This field is required' })}
        />
        {errors.password && (
          <div className="mb-3 text-normal text-red-500 ">
            {errors.password.message}
          </div>
        )}
        <label className="text-gray-600 font-medium block mt-4 dark:text-white">
          Confirm Password
        </label>
        <input
          className="border-solid border-gray-300 border py-2 px-4 w-full rounded text-gray-700"
          name="repassword"
          type="text"
          placeholder=""
          {...register('repassword', {
            required: true,
            validate: (val) => {
              if (watch('password') != val) {
                // return (
                //   <div className="mb-3 text-normal text-red-500 ">
                //     Your passwords do no match
                //   </div>
                // );
                return 'Your passwords do no match';
              }
            }
          })}
        />
        {errors.repassword && (
          <div className="mb-3 text-normal text-red-500 ">
            {errors.repassword.message}
          </div>
        )}

        <button
          className={
            clicked
              ? 'inline-flex justify-center text-white items-center mt-4 w-full py-3 px-6 leading-6 transition duration-150 ease-in-out rounded-md shadow cursor-not-allowed'
              : 'mt-4 w-full text-white border py-3 px-6 font-semibold text-md rounded'
          }
          style={{ background: currentColor }}
          type="submit"
          disabled={clicked}
        >
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
            <div className="font-bold">Register</div>
          )}
        </button>
        <NavLink
          className="mt-4 w-full underline"
          style={{ color: currentColor }}
          to="/Users"
        >
          Return to Manage Users
        </NavLink>
      </form>
    </>
  );
};

export default Add;
