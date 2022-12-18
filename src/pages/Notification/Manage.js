import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { axiosNotify } from '../../api/axios';
import { Loader } from '../../components';

const Manage = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isResend, setIsResend] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const override = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,.5)'
  };
  useEffect(() => {
    ReadNotifications();
  }, []);

  const ReadNotifications = async () => {
    let isMounted = true;
    const controller = new AbortController();
    try {
      setLoading(true);
      const response = await axiosPrivate.get('/Notification/GetAll', {
        signal: controller.signal
      });
      setLoading(false);
      isMounted && setNotifications(response?.data);
    } catch (err) {
      setLoading(false);
    }

    return () => {
      isMounted = false;
      controller.abort();
    };
  };

  const ReSend = async (title, description, img) => {
    //send the Notification again
    console.log(img);
    if (window.confirm('are you sure you want to Re-Send?')) {
      setIsResend(true);
      const controller = new AbortController();
      try {
        const response = await axiosNotify.post(
          '',
          JSON.stringify({
            to: '/topics/test',
            notification: {
              title,
              body: description,
              image: img
            }
          })
        );

        if (response?.status === 200) {
          alert('Message sent successfully');
        } else {
          alert('Message Failed');
        }
      } catch (err) {
        console.log(err);
      }
      setIsResend(false);
      return () => {
        controller.abort();
      };
    }
  };
  const Delete = async (id) => {
    if (window.confirm('are you sure you want to delete?')) {
      const controller = new AbortController();
      try {
        const config = {
          headers: {
            signal: controller.signal
          }
        };

        const response = await axiosPrivate.delete(
          `/Notification/Remove?bid=${id}`,
          config
        );

        if (response?.status === 200) {
          ReadNotifications();
        } else {
          alert('Failed');
        }
      } catch (err) {
        console.log(err);
      }
      return () => {
        controller.abort();
      };
    }
  };

  return (
    <>
      <div className="flex flex-col mt-12">
        <div className="my-2 overflow-x-auto">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="lg:flex lg:items-center lg:justify-between px-20 py-2">
              <div className="flex-1 min-w-0">
                <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate dark:text-white">
                  Manage Notification
                </h2>
              </div>
              <div className="mt-5 flex lg:mt-0 lg:ml-4">
                <span className="sm:block">
                  <Link to="/Notifications/Add">
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <svg
                        className="-ml-1 mr-2 h-5 w-5 text-gray-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                      CREATE
                    </button>
                  </Link>
                </span>
              </div>
            </div>
            <div className="shadow overflow-hidden flex justify-center  items-center border-b border-gray-400 sm:rounded-lg">
              <div className="inline-block w-full">
                <Loader loading={loading} override={override} />
                <table className="min-w-full divide-y divide-gray-400">
                  <thead className="bg-gray-100">
                    <tr>
                      <th
                        scope="col"
                        className="px-10 py-1 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
                      >
                        ID
                      </th>
                      <th
                        scope="col"
                        className="px-10 py-1 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
                      >
                        Notification
                      </th>

                      <th scope="col" className="relative px-6 py-1">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>

                  <tbody className="bg-white divide-y divide-gray-200">
                    {notifications.map((notify) => (
                      <tr key={notify.id}>
                        <td className="px-10 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {notify.id}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <img
                                className="h-10 w-10 rounded-full"
                                src={notify.imgPath}
                                alt=""
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                <p>
                                  {' '}
                                  {notify.title} [ {notify.description} ]
                                </p>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 space-x-2 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            className="inline-block text-sm px-4 py-2 leading-none border rounded text-blue-800 border-blue-600 hover:bg-blue-300 hover:text-blue-500 mt-4 lg:mt-0"
                            disabled={isResend}
                            onClick={async () =>
                              ReSend(
                                notify.title,
                                notify.description,
                                notify.imgPath
                              )
                            }
                          >
                            {isResend ? (
                              <>
                                <svg
                                  className="w-6 h-3 mr-0 -ml-1 animate-spin"
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
                                <div className="font-bold"></div>
                              </>
                            ) : (
                              <div className="font-bold">Resend</div>
                            )}
                          </button>
                          <button
                            className="inline-block text-sm px-4 py-2 leading-none border rounded text-red-800 border-red-600 hover:bg-red-300 hover:text-red-500 mt-4 lg:mt-0"
                            onClick={async () => Delete(notify.id)}
                          >
                            DELETE
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Manage;
