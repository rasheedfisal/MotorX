import { useLocation, NavLink, useNavigate } from 'react-router-dom';
import { useState, useEffect, useCallback, useRef } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { AiTwotoneDelete } from 'react-icons/ai';
import { MdOutlineDragIndicator } from 'react-icons/md';
import useAuth from '../../hooks/useAuth';
import { DropBox, ShowImage } from '../../components';
import FormData from 'form-data';
import { Loader } from '../../components';

const Gallary = () => {
  const { state } = useLocation();
  const axiosPrivate = useAxiosPrivate();
  const { id } = state;
  const { currentColor } = useAuth();
  const errRef = useRef();
  const [gallary, setGallary] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState('');

  const override = {
    //position: 'absolute',
    //width: '100%',
    //height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
    //backgroundColor: 'rgba(0,0,0,.5)'
  };

  const ReadResponseList = async () => {
    let isMounted = true;
    setLoading(true);
    const controller = new AbortController();
    try {
      const response = await axiosPrivate.get(
        `/Gallary/GetCarOfferGallary?bid=${id}`,
        {
          ContentType: 'application/json',
          signal: controller.signal
        }
      );

      isMounted && setGallary(response?.data);
      console.log(response?.data);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
    return () => {
      isMounted = false;
      controller.abort();
    };
  };

  const uploadImg = async (file) => {
    let isMounted = true;
    setErrMsg('');
    setLoading(true);
    const controller = new AbortController();
    try {
      const formData = new FormData(); //formdata object

      formData.append('CarOfferId', id); //append the values with key, value pair
      formData.append('FileName', file);
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
          signal: controller.signal
        }
      };
      const response = await axiosPrivate.post(
        '/Gallary/Add',
        formData,
        config
      );

      //console.log(response?.data);
      if (response?.status === 201) {
        isMounted && setGallary((prevState) => [...prevState, response?.data]);
      } else {
        setErrMsg('upload image operation');
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
    return () => {
      isMounted = false;
      controller.abort();
    };
  };

  useEffect(() => {
    ReadResponseList();
  }, []);

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.map((file, index) => {
      uploadImg(file);
      return file;
    });
  }, []);

  const handleDragEnd = (e) => {
    if (!e.destination) return;
    //let tempData = Object.assign([], gallary);
    let tempData = Array.from(gallary);
    const [source_data] = tempData.splice(e.source.index, 1);
    tempData.splice(e.destination.index, 0, source_data);
    setGallary(tempData);
  };

  const Delete = async (id) => {
    setErrMsg('');
    let isMounted = true;
    setClicked(true);
    const controller = new AbortController();
    try {
      const config = {
        headers: {
          'content-type': 'application/json',
          signal: controller.signal
        }
      };
      const response = await axiosPrivate.delete(
        `/Gallary/Remove?bid=${id}`,
        config
      );
      if (response?.status === 200) {
        isMounted && ReadResponseList();
      } else {
        setErrMsg('delete image operation failed');
      }
    } catch (err) {
      console.log(err);
    }
    setClicked(false);
    return () => {
      isMounted = false;
      controller.abort();
    };
  };
  const submitOrder = async () => {
    setErrMsg('');
    let isMounted = true;
    setClicked(true);
    const controller = new AbortController();
    try {
      const config = {
        headers: {
          'content-type': 'application/json',
          signal: controller.signal
        }
      };
      const response = await axiosPrivate.post(
        '/Gallary/UpdateOrder',
        gallary,
        config
      );
      if (response?.status === 200) {
        navigate('/Offers');
      } else {
        setErrMsg('reorder image operation failed');
      }
    } catch (err) {
      console.log(err);
    }
    setClicked(false);
    return () => {
      isMounted = false;
      controller.abort();
    };
  };

  return (
    <>
      <div className="flex flex-col mt-12">
        <div className="-my-2 overflow-x-auto">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="lg:flex lg:items-center lg:justify-between px-20 py-2">
              <div className="flex-1 min-w-0">
                <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate dark:text-white">
                  Manage Gallary
                </h2>
              </div>
            </div>
            <div className="shadow overflow-auto flex flex-col justify-center items-center p-10 border-b border-gray-400 sm:rounded-lg">
              <p
                ref={errRef}
                className={errMsg ? 'text-red-500' : 'text-gray-800'}
                aria-live="assertive"
              >
                {errMsg}
              </p>
              <Loader loading={loading} override={override} />
              <div className="w-10/12 px-3 mb-6 md:mb-0">
                <DropBox onDrop={onDrop} isMultiple={true} />
                <p
                  className="text-gray-400 dark:text-gray-50 flex"
                  aria-live="assertive"
                >
                  <span
                    style={{ color: currentColor }}
                    className="font-bold pr-1"
                  >
                    Note:
                  </span>
                  <span className="flex items-center">
                    the first image is the main image in the mobile application,
                    drag n drop to change the order of images using{' '}
                    <MdOutlineDragIndicator className="text-black dark:text-gray-50 font-bold text-lg" />
                  </span>
                </p>
              </div>
              <div className="inline-block w-full mt-5">
                <DragDropContext onDragEnd={handleDragEnd}>
                  <table className="w-full">
                    <thead className="bg-gray-100">
                      <tr>
                        <th
                          scope="col"
                          className="px-10 py-1 text-center text-lg"
                        />
                        <th
                          scope="col"
                          className="px-10 py-1 text-center text-xs font-medium text-gray-600 uppercase tracking-wider"
                        >
                          Image
                        </th>
                        <th />
                      </tr>
                    </thead>
                    <Droppable droppableId="droppable-1">
                      {(provider) => (
                        <tbody
                          className="uppercase divide-y-2"
                          ref={provider.innerRef}
                          {...provider.droppableProps}
                        >
                          {gallary?.map((gal, index) => (
                            <Draggable
                              key={gal.id}
                              draggableId={gal.id}
                              index={index}
                            >
                              {(provider) => (
                                <tr
                                  {...provider.draggableProps}
                                  ref={provider.innerRef}
                                >
                                  <td {...provider.dragHandleProps}>
                                    {' '}
                                    <MdOutlineDragIndicator
                                      className="text-block dark:text-gray-50"
                                      size="30"
                                    />{' '}
                                  </td>
                                  <td>
                                    <img
                                      //className="h-25 w-25"
                                      style={{
                                        maxHeight: '400px',
                                        maxWidth: '100%',
                                        objectFit: 'contain'
                                      }}
                                      src={gal.filePath}
                                      alt=""
                                    />
                                  </td>
                                  <td className="px-6 py-4 space-x-2 whitespace-nowrap text-right text-sm font-medium">
                                    <span
                                      className="cursor-pointer"
                                      onClick={() => Delete(gal.id)}
                                    >
                                      <AiTwotoneDelete color="red" size="20" />
                                    </span>
                                  </td>
                                </tr>
                              )}
                            </Draggable>
                          ))}
                          {provider.placeholder}
                        </tbody>
                      )}
                    </Droppable>
                  </table>
                </DragDropContext>
              </div>
              <button
                className={
                  clicked
                    ? 'inline-flex justify-center text-white items-center mt-10 w-full py-3 px-6 leading-6 transition duration-150 ease-in-out rounded-md shadow cursor-not-allowed'
                    : 'mt-10 w-full text-white border py-3 px-6 font-semibold text-md rounded'
                }
                style={{ background: currentColor }}
                type="submit"
                disabled={clicked}
                onClick={submitOrder}
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
                  <div className="font-bold">Change Order</div>
                )}
              </button>
            </div>
            <NavLink
              className="mt-4 w-full underline"
              style={{ color: currentColor }}
              to="/Offers"
            >
              Return to Manage Offers
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default Gallary;
