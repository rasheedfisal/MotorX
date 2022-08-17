import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { Loader } from '../../components';

const Manage = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const override = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  };
  useEffect(() => {
    ReadResponseList();
  }, []);

  const ReadResponseList = async () => {
    let isMounted = true;
    const controller = new AbortController();
    try {
      setLoading(true);
      const response = await axiosPrivate.get('/Currency/GetAll', {
        ContentType: 'application/json',
        signal: controller.signal
      });
      setLoading(false);
      isMounted && setList(response?.data);
    } catch (err) {
      setLoading(false);
    }

    return () => {
      isMounted = false;
      controller.abort();
    };
  };

  const Update = (id) => {
    navigate('/Currency/Update', { state: { id } });
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
          `/Currency/Remove?bid=${id}`,
          config
        );

        if (response?.status === 200) {
          ReadResponseList();
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
        <div className="-my-2 overflow-x-auto">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="lg:flex lg:items-center lg:justify-between px-20 py-2">
              <div className="flex-1 min-w-0">
                <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate dark:text-white">
                  Manage Currency
                </h2>
              </div>
              <div className="mt-5 flex lg:mt-0 lg:ml-4">
                <span className="hidden sm:block">
                  <Link to="/Currency/Add">
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
            <Loader loading={loading} override={override} />
            <div className="shadow overflow-hidden flex justify-center items-center border-b border-gray-400 sm:rounded-lg">
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
                      Currency
                    </th>

                    <th scope="col" className="relative px-6 py-1">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200">
                  {list.map((res) => (
                    <tr key={res.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{res.id}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {/* <div className="flex items-center"> */}
                        {/* <div className="flex-shrink-0 h-10 w-10">
                           
                          </div> */}
                        {/* <div className="ml-4"> */}
                        <div className="text-sm font-medium text-gray-900">
                          <p>
                            {' '}
                            {res.currencyName} - {res.currencyNameAr}
                          </p>
                        </div>
                        {/* </div> */}
                      </td>
                      <td className="px-6 py-4 space-x-2 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          className="inline-block text-sm px-4 py-2 leading-none border rounded text-blue-800 border-blue-600 hover:bg-blue-300 hover:text-blue-500 mt-4 lg:mt-0"
                          onClick={() => Update(res.id)}
                        >
                          EDIT
                        </button>
                        <button
                          className="inline-block text-sm px-4 py-2 leading-none border rounded text-red-800 border-red-600 hover:bg-red-300 hover:text-red-500 mt-4 lg:mt-0"
                          onClick={async () => Delete(res.id)}
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
    </>
  );
};

export default Manage;
