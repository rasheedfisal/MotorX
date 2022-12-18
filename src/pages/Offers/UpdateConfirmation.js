import { useState, useRef, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import { Loader } from '../../components';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const UpdateConfirmation = ({ handleClick, pageVariants, pageTransition }) => {
  const [isHovering, setIsHovering] = useState(false);
  const { currentColor, multiData, auth, setMultiData } = useAuth();
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
    //console.log(multiData);

    setLoading(true);
    const controller = new AbortController();
    try {
      const updateOffer = {
        id: multiData.id,
        description: multiData.description,
        brandModelId: multiData.models.value,
        trimId: multiData.trims.value,
        yearId: multiData.years.value,
        colorId: multiData.colors.value,
        cartTypeId: multiData.carTypes.value,
        gearboxId: multiData.gearbox.value,
        specsId: multiData.specs.value,
        locationId: multiData.locations.value,
        seats: multiData.seats,
        kilometer: multiData.kilometer,
        price: multiData.price,
        currencyId: multiData.currencies.value,
        isActive: multiData.isActive,
        ytLink: multiData.ytLink,
        userId: auth?.uid
      };

      const config = {
        headers: {
          'content-type': 'application/json',
          signal: controller.signal
        }
      };
      const response = await axiosPrivate.put(
        '/Offer/Update',
        updateOffer,
        config
      );
      // console.log(response?.data);
      setLoading(false);
      if (response?.status === 200) {
        setIsConfirmed(true);
        setMultiData({});
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
                  click on confirm to update offer,
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
                  offer was updated successfully
                </div>
              </div>
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
                  offer update failed, please contact support,
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

export default UpdateConfirmation;
