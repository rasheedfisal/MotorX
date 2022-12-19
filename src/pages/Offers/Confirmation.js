import { useState, useRef, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import { Loader } from '../../components';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const Confirmation = ({
  handleClick,
  pageVariants,
  pageTransition,
  features,
  setFeatures
}) => {
  const [isHovering, setIsHovering] = useState(false);
  const { currentColor, multiData, setCurrentStep, setMultiData } = useAuth();
  const [loading, setLoading] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const [errMsg, setErrMsg] = useState('');
  const errRef = useRef();

  const override = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };
  const handleMouseLeave = () => {
    setIsHovering(false);
  };
  const allAreEqual = (obj) => {
    delete obj.features;
    return new Set(Object.values(obj)).size === 1;
  };
  const onSubmit = async () => {
    setErrMsg('');
    if (multiData?.files?.length == 0) {
      errRef.current.focus();
      setErrMsg('gallary is empty');
      return;
    }
    if (!multiData?.features) {
      errRef.current.focus();
      setErrMsg('features is empty');
      return;
    }

    if (allAreEqual(multiData?.features)) {
      if (!Object.values(multiData?.features)[0]) {
        errRef.current.focus();
        setErrMsg('select at least one feature');
        return;
      }
    }

    setLoading(true);
    const controller = new AbortController();
    try {
      const formData = new FormData(); //formdata object

      formData.append('Description', multiData.description); //append the values with key, value pair
      formData.append('BrandModelId', multiData.models.value);
      formData.append('TrimId', multiData.trims.value);
      formData.append('YearId', multiData.years.value);
      formData.append('ColorId', multiData.colors.value);
      formData.append('cartypeid', multiData.carTypes.value);
      formData.append('GearboxId', multiData.gearbox.value);
      formData.append('SpecsId', multiData.specs.value);
      formData.append('LocationId', multiData.locations.value);
      formData.append('Seats', multiData.seats);
      formData.append('Kilometer', multiData.kilometer);
      formData.append('Price', multiData.price);
      formData.append('CurrencyId', multiData.currencies.value);
      formData.append('IsActive', multiData.isActive);

      let counter = 0;
      for (
        let index = 0;
        index < Object.keys(multiData?.features).length;
        index++
      ) {
        if (Object.values(multiData?.features)[index] !== undefined) {
          if (Object.values(multiData?.features)[index]) {
            formData.append(
              `CarFeatures[${counter}].FeatureId`,
              Object.keys(multiData?.features)[index]
            );
            counter++;
          }
        }
      }

      multiData?.files?.forEach((file) => {
        formData.append('ImageGallaries', file.fileInput);
      });

      formData.append('YTLink', multiData.ytLink);

      const config = {
        headers: {
          'content-type': 'multipart/form-data',
          signal: controller.signal
        }
      };
      const response = await axiosPrivate.post('/Offer/Add', formData, config);
      setLoading(false);
      if (response?.status === 201) {
        setIsConfirmed(true);
        setMultiData({});
        const resetFeature = [...features];

        resetFeature.forEach((feat) => {
          feat.features.forEach((feature) => {
            feature.isSelected = false;
          });
        });
        setFeatures(resetFeature);
      } else {
        setLoading(false);
        setIsFailed(true);
      }
    } catch (err) {
      setLoading(false);
      setIsFailed(true);
      // console.log(err);
    }
    //setLoading(false);
    return () => {
      controller.abort();
    };
  };

  const reset = () => {
    setCurrentStep(1);
  };

  return (
    <AnimatePresence>
      {loading && <Loader loading={loading} override={override} />}
      {!isConfirmed && !isFailed && !loading && (
        <motion.div
          key="step4"
          initial="initial"
          animate="in"
          variants={pageVariants}
          transition={pageTransition}
        >
          <div className="max-w-3xl mx-auto px-4 py-10">
            <div className="bg-white rounded-lg p-10 flex items-center shadow justify-center">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mb-4 h-20 w-20 text-blue-500 mx-auto"
                  width="44"
                  height="44"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="#00abfb"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <line x1="12" y1="8" x2="12.01" y2="8" />
                  <rect x="4" y="4" width="16" height="16" rx="2" />
                  <polyline points="11 12 12 12 12 16 13 16" />
                </svg>

                <h2 className="text-2xl mb-4 text-gray-800 text-center font-bold">
                  Offer Confirmation
                </h2>

                <div className="text-gray-600 mb-8">
                  click on confirm to complete the process,
                  <p
                    ref={errRef}
                    className={errMsg ? 'text-red-500' : 'text-gray-800'}
                    aria-live="assertive"
                  >
                    {errMsg}
                  </p>
                </div>
              </div>
              <div className="mx-4 p-4 flex justify-between items-center">
                <div className="w-full flex justify-around items-center">
                  <button
                    onClick={() => handleClick()}
                    type="button"
                    className="btn-primary transition duration-300 ease-in-out focus:outline-none focus:shadow-outline text-white font-normal py-2 px-4 mr-1 rounded"
                    style={{ backgroundColor: currentColor }}
                  >
                    {' '}
                    Previous{' '}
                  </button>
                  <button
                    onClick={() => onSubmit()}
                    type="submit"
                    className="btn-outline-primary transition duration-300 ease-in-out focus:outline-none focus:shadow-outline border border-orange-700 hover:bg-orange-700 text-orange-700 hover:text-white font-normal py-2 px-4 rounded"
                    style={{
                      borderColor: currentColor,
                      color: isHovering ? 'white' : currentColor,
                      backgroundColor: isHovering ? currentColor : ''
                    }}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    {' '}
                    Confirm{' '}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
      {isConfirmed && !isFailed && !loading && (
        <motion.div
          key="step4"
          initial="initial"
          animate="in"
          variants={pageVariants}
          transition={pageTransition}
        >
          <div className="max-w-3xl mx-auto px-4 py-10">
            <div className="bg-white rounded-lg p-10 flex items-center shadow justify-center">
              <div>
                <svg
                  className="mb-4 h-20 w-20 text-green-500 mx-auto"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  {' '}
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>

                <h2 className="text-2xl mb-4 text-gray-800 text-center font-bold">
                  Success
                </h2>

                <div className="text-gray-600 mb-8">
                  offer was added successfully
                </div>
              </div>
              <button
                className="text-white bg-green-500 hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2"
                onClick={reset}
              >
                add another offer
              </button>
              <button
                className="text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2"
                onClick={() => navigate('/Offers')}
              >
                back to manage
              </button>
            </div>
          </div>
        </motion.div>
      )}
      {isFailed && !isConfirmed && !loading && (
        <motion.div
          key="step4"
          initial="initial"
          animate="in"
          variants={pageVariants}
          transition={pageTransition}
        >
          <div className="max-w-3xl mx-auto px-4 py-10">
            <div className="bg-white rounded-lg p-10 flex items-center shadow justify-center">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="red"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mb-4 h-20 w-20 text-red-500 mx-auto"
                >
                  <polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"></polygon>
                  <line x1="15" y1="9" x2="9" y2="15"></line>
                  <line x1="9" y1="9" x2="15" y2="15"></line>
                </svg>
                <h2 className="text-2xl mb-4 text-gray-800 text-center font-bold">
                  Failed
                </h2>

                <div className="text-gray-600 mb-8">
                  offer confirmation failed, please contact support,
                </div>
              </div>

              <div className="mx-4 p-4 flex justify-between items-center">
                <div className="w-full flex justify-around items-center">
                  <button
                    onClick={() => handleClick()}
                    type="button"
                    className="btn-primary transition duration-300 ease-in-out focus:outline-none focus:shadow-outline text-white font-normal py-2 px-4 mr-1 rounded"
                    style={{ backgroundColor: currentColor }}
                  >
                    {' '}
                    Previous{' '}
                  </button>
                  <button
                    onClick={() => onSubmit()}
                    type="submit"
                    className="btn-outline-primary transition duration-300 ease-in-out focus:outline-none focus:shadow-outline border border-orange-700 hover:bg-orange-700 text-orange-700 hover:text-white font-normal py-2 px-4 rounded"
                    style={{
                      borderColor: currentColor,
                      color: isHovering ? 'white' : currentColor,
                      backgroundColor: isHovering ? currentColor : ''
                    }}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    {' '}
                    Retry{' '}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Confirmation;
