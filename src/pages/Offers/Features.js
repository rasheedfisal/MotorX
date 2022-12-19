import { useState, useRef, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import { useForm } from 'react-hook-form';
import { useLocation, NavLink, useNavigate } from 'react-router-dom';
import { Loader } from '../../components';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const Features = () => {
  const { state } = useLocation();
  const { id } = state;
  const axiosPrivate = useAxiosPrivate();
  const { currentColor } = useAuth();
  const [loading, setLoading] = useState(true);
  const errRef = useRef();
  const navigate = useNavigate();

  const [features, setFeatures] = useState([]);

  const [clicked, setClicked] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const { register, handleSubmit } = useForm({
    mode: 'onBlur'
  });

  useEffect(() => {
    let isMounted = true;
    //setLoading(true);
    const controller = new AbortController();
    const ReadBrand = async () => {
      try {
        const response = await axiosPrivate.get(
          `/CarFeatures/GetCarFeatures?bid=${id}`,
          {
            signal: controller.signal
          }
        );
        if (isMounted) {
          const data = response?.data;
          //console.log(data);
          setFeatures(data);
        }
      } catch (err) {}
    };
    ReadBrand();
    setLoading(false);
    return () => {
      isMounted = false;

      controller.abort();
    };
  }, []);
  const override = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  };

  const onSubmit = async (data) => {
    setErrMsg('');
    setClicked(true);

    const result = [];

    for (let index = 0; index < Object.keys(data).length; index++) {
      if (Object.keys(data)[index] !== 'features') {
        if (Object.values(data)[index]) {
          result.push({ featureId: Object.keys(data)[index] });
        }
      }
    }

    const controller = new AbortController();
    try {
      const config = {
        headers: {
          'content-type': 'application/json',
          signal: controller.signal
        }
      };

      const response = await axiosPrivate.post(
        `/CarFeatures/Update?oid=${id}`,
        result,
        config
      );
      console.log(response?.data);
      if (response?.data) {
        navigate('/Offers');
      }
    } catch (err) {
      console.log(err);
      errRef.current.focus();
      setErrMsg('something went wrong, information not submitted');
    }
    setClicked(false);
    return () => {
      controller.abort();
    };
  };

  return (
    <>
      <h1 className="text-center text-4xl font-semibold mt-10 dark:text-white">
        Update Offer
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
        <div className="flex justify-center gap-5 items-start flex-wrap">
          {features.map((type, i) => (
            <div key={type.i} className="flex flex-col">
              <h3 className="text-2xl underline">{type.typeName}</h3>
              {type.features.map((feat, i) => (
                <div key={feat.i} className="flex items-center mb-4">
                  <input
                    {...register(`${feat.id}`)}
                    name={feat.id}
                    type="checkbox"
                    defaultChecked={feat.isSelected}
                    onChange={(e) => (feat.isSelected = e.target.checked)}
                    className="w-4 h-4 rounded"
                  />
                  <label
                    htmlFor={feat.id}
                    className="ml-2 text-sm font-medium text-black"
                  >
                    {feat.featureName}
                  </label>
                </div>
              ))}
            </div>
          ))}
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
          to="/Offers"
        >
          Return to Manage Offers
        </NavLink>
      </form>
    </>
  );
};
export default Features;
