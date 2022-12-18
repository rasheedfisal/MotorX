import React, { useCallback, useState, useRef, useEffect } from 'react';
import { DropBox, ShowImage, Loader } from '../../components';
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import FormData from 'form-data';
import { useNavigate, NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const Update = () => {
  const { state } = useLocation();
  const { id } = state;
  const [loading, setLoading] = useState(true);
  const [logo, setLogo] = useState([]);
  const [item, setItem] = useState(null);
  const errRef = useRef();
  const [errMsg, setErrMsg] = useState('');
  const { currentColor } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const [clicked, setClicked] = useState(false);
  const override = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.map((file, index) => {
      const reader = new FileReader();

      reader.onload = function (e) {
        setLogo((prevState) => [
          ...prevState,
          { id: index, src: e.target.result, filePath: file }
        ]);
      };
      reader.readAsDataURL(file);

      return file;
    });
  }, []);

  useEffect(() => {
    let isMounted = true;
    //setLoading(true);
    const controller = new AbortController();
    const ReadItem = async () => {
      try {
        const response = await axiosPrivate.get(
          `/CarType/GetCarType?bid=${id}`,
          {
            signal: controller.signal
          }
        );
        if (isMounted) {
          const data = response?.data;
          console.log(data);
          setItem(data);

          setLogo((prevState) => [
            ...prevState,
            { id: data.id, src: data.imgPath }
          ]);
        }
      } catch (err) {}
    };
    ReadItem();

    return () => {
      isMounted = false;
      setLoading(false);
      controller.abort();
    };
  }, []);
  useEffect(() => {
    // reset form with fetched data
    reset(item);
  }, [item]);

  const onSubmit = async (data) => {
    setErrMsg('');
    setClicked(true);
    if (logo.length === 0) {
      errRef.current.focus();
      setClicked(false);
      setErrMsg('logo field is requeird');
      return;
    }
    if (logo.length > 1) {
      errRef.current.focus();
      setClicked(false);
      setErrMsg('only one file is allowed');
      return;
    }

    const controller = new AbortController();
    try {
      const formData = new FormData(); //formdata object

      formData.append('Id', id); //append the values with key, value pair
      formData.append('TypeName', data.typeName); //append the values with key, value pair
      formData.append('typeNameAr', data.typeNameAr);
      logo.length > 0 && formData.append('ImgPath', logo[0].filePath);
      //console.log(logo);
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
          signal: controller.signal
        }
      };

      const response = await axiosPrivate.put(
        '/CarType/Update',
        formData,
        config
      );
      console.log(response?.data);
      if (response?.data) {
        navigate('/Category');
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
        Update Category
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
          Category
        </label>
        <input
          className="border-solid border-gray-300 border py-2 px-4 w-full rounded text-gray-700"
          name="typeName"
          placeholder=""
          autoFocus
          {...register('typeName', { required: 'This field is required' })}
        />
        {errors.typeName && (
          <div className="mb-3 text-normal text-red-500">
            {errors.typeName.message}
          </div>
        )}

        <label className="text-gray-600 font-medium block mt-4 dark:text-white">
          Category (ar)
        </label>
        <input
          className="border-solid border-gray-300 border py-2 px-4 w-full rounded text-gray-700"
          name="typeNameAr"
          type="text"
          placeholder=""
          {...register('typeNameAr')}
        />
        {errors.typeNameAr && (
          <div className="mb-3 text-normal text-red-500 ">
            {errors.typeNameAr.message}
          </div>
        )}

        <div className="flex flex-wrap mx-3 mb-2 mt-2">
          <div className="w-full px-3 mb-6 md:mb-0">
            <DropBox onDrop={onDrop} isMultiple={false} />
            <ShowImage images={logo} setParentState={setLogo} />
          </div>
          {/* <div className="w-full px-3 mb-6 md:mb-0">
          </div> */}
        </div>

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
          to="/Category"
        >
          Return to Manage Categories
        </NavLink>
      </form>
    </>
  );
};

export default Update;
