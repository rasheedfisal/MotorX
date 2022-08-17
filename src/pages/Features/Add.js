import React, { useEffect, useState, useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useNavigate, NavLink } from 'react-router-dom';
import Select from 'react-select';
import { Loader } from '../../components';

const Add = () => {
  const errRef = useRef();
  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState('');
  const { currentColor } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const [clicked, setClicked] = useState(false);
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const override = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm();

  const fetchTypes = async () => {
    const controller = new AbortController();
    try {
      setLoading(true);
      const response = await axiosPrivate.get('/FeatureTypes/GetAll', {
        signal: controller.signal
      });
      setLoading(false);
      setTypes(response?.data);
    } catch (error) {
      setLoading(false);
      controller.abort();
      console.log(error);
    }

    return () => {
      controller.abort();
    };
  };

  useEffect(() => {
    fetchTypes();
  }, []);

  const onSubmit = async (data) => {
    setClicked(true);
    const controller = new AbortController();
    try {
      const addItem = {
        FeatureName: data.featureName,
        FeatureNameAr: data.featureNameAr,
        FeaturetypeId: data.featuretypeId.value
      };
      const config = {
        headers: {
          ContentType: 'application/json',
          signal: controller.signal
        }
      };

      const response = await axiosPrivate.post(
        '/Features/Add',
        addItem,
        config
      );

      //console.log(response);
      if (response?.data) {
        navigate('/Features');
      }
    } catch (err) {
      errRef.current.focus();
      setErrMsg('something went wrong, information not submitted');
      console.log(err);
    }
    setClicked(false);
    return () => {
      controller.abort();
    };
  };
  return (
    <>
      <h1 className="text-center text-4xl font-semibold mt-10 dark:text-white">
        Add Feature
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
          Feature
        </label>
        <input
          className="border-solid border-gray-300 border py-2 px-4 w-full rounded text-gray-700"
          name="featureName"
          placeholder=""
          autoFocus
          {...register('featureName', { required: 'This field is required' })}
        />
        {errors.featureName && (
          <div className="mb-3 text-normal text-red-500">
            {errors.featureName.message}
          </div>
        )}

        <label className="text-gray-600 font-medium block mt-4 dark:text-white">
          Feature (ar)
        </label>
        <input
          className="border-solid border-gray-300 border py-2 px-4 w-full rounded text-gray-700"
          name="featureNameAr"
          type="text"
          placeholder=""
          {...register('featureNameAr', { required: 'This field is required' })}
        />
        {errors.featureNameAr && (
          <div className="mb-3 text-normal text-red-500 ">
            {errors.featureNameAr.message}
          </div>
        )}

        <label className="text-gray-600 font-medium block mt-4 dark:text-white">
          Feature Types
        </label>
        <Controller
          name="featuretypeId"
          control={control}
          {...register('featuretypeId', { required: 'This field is required' })}
          render={({ field: { value, onChange } }) => (
            <Select
              cacheOptions
              value={value}
              isClearable
              options={types.map(({ id, typeName }) => ({
                value: id,
                label: typeName
              }))}
              onChange={onChange}
            />
          )}
        />
        {errors.featuretypeId && (
          <div className="mb-3 text-normal text-red-500 ">
            {errors.featuretypeId.message}
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
            <div className="font-bold">Submit</div>
          )}
        </button>
        <NavLink
          className="mt-4 w-full underline"
          style={{ color: currentColor }}
          to="/Features"
        >
          Return to Manage Features
        </NavLink>
      </form>
    </>
  );
};

export default Add;
