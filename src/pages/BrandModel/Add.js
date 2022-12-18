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
  //const navigate = useNavigate();
  const [clicked, setClicked] = useState(false);
  const [brands, setBrands] = useState([]);
  //  const [selectedValue, setSelectedValue] = useState(null);
  //const [value, setValue] = useState('');
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

  const fetchBrands = async () => {
    const controller = new AbortController();
    try {
      setLoading(true);
      const response = await axiosPrivate.get('/Brand/GetAll', {
        signal: controller.signal
      });
      setLoading(false);
      //controller.abort();
      //console.log(response?.data.data);
      //return response?.data;
      setBrands(response?.data);

      // console.log(brands);
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
    fetchBrands();
  }, []);

  const onSubmit = async (data) => {
    setClicked(true);
    const controller = new AbortController();
    try {
      const addItem = {
        ModelName: data.modelName,
        ModelNameAr: data.modelNameAr,
        BrandId: data.brandId.value
      };

      //   console.log(data);
      //   console.log(addItem);
      const config = {
        headers: {
          ContentType: 'application/json',
          signal: controller.signal
        }
      };

      const response = await axiosPrivate.post(
        '/BrandModel/Add',
        addItem,
        config
      );

      //console.log(response);
      if (response?.data) {
        navigate('/Models');
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

  //   const handleInputChange = (value) => {
  //     setValue(value);
  //   };
  //   const handleChange = (value) => {
  //     setSelectedValue(value);
  //   };
  return (
    <>
      <h1 className="text-center text-4xl font-semibold mt-10 dark:text-white">
        Add Model
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
          Model
        </label>
        <input
          className="border-solid border-gray-300 border py-2 px-4 w-full rounded text-gray-700"
          name="modelName"
          placeholder=""
          autoFocus
          {...register('modelName', { required: 'This field is required' })}
        />
        {errors.modelName && (
          <div className="mb-3 text-normal text-red-500">
            {errors.modelName.message}
          </div>
        )}

        <label className="text-gray-600 font-medium block mt-4 dark:text-white">
          Model (ar)
        </label>
        <input
          className="border-solid border-gray-300 border py-2 px-4 w-full rounded text-gray-700"
          name="modelNameAr"
          type="text"
          placeholder=""
          {...register('modelNameAr')}
        />
        {errors.modelNameAr && (
          <div className="mb-3 text-normal text-red-500 ">
            {errors.modelNameAr.message}
          </div>
        )}

        <label className="text-gray-600 font-medium block mt-4 dark:text-white">
          Brand
        </label>
        {/* <Select
          cacheOptions
          //defaultOptions
          value={selectedValue}
          getOptionLabel={(e) => e.name}
          getOptionValue={(e) => e.id}
          options={brands}
          onInputChange={handleInputChange}
          onChange={handleChange}
        /> */}
        <Controller
          name="brandId"
          control={control}
          {...register('brandId', { required: 'This field is required' })}
          render={({ field: { value, onChange } }) => (
            <Select
              cacheOptions
              //defaultValue={'[Select]'}
              //defaultOptions
              value={value}
              isClearable
              //name={name}
              //getOptionLabel={(e) => e.name}
              //getOptionValue={(e) => e.id}
              options={brands.map(({ id, name }) => ({
                value: id,
                label: name
              }))}
              //onInputChange={handleInputChange}
              onChange={onChange}
            />
          )}
        />
        {errors.brandId && (
          <div className="mb-3 text-normal text-red-500 ">
            {errors.brandId.message}
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
          to="/Models"
        >
          Return to Manage Brands
        </NavLink>
      </form>
    </>
  );
};

export default Add;
