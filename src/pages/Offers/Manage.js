import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { Loader } from '../../components';
import useAuth from '../../hooks/useAuth';
import ReactPaginate from 'react-paginate';

const Manage = () => {
  const { setCurrentStep } = useAuth();
  const [list, setList] = useState([]);

  const [loading, setLoading] = useState(false);
  const [pages, setPages] = useState(0);
  const [records, setRecords] = useState(0);
  const [pageNamber, setPageNamber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
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
    ReadResponseList(pageNamber, pageSize);
  }, []);

  const ReadResponseList = async (pageNumber, pageSize) => {
    let isMounted = true;
    const controller = new AbortController();
    try {
      setLoading(true);
      const response = await axiosPrivate.post(
        `/Offer/MGetAllDev?PageNumber=${pageNumber}&PageSize=${pageSize}`,
        {
          ContentType: 'application/json',
          signal: controller.signal
        },
        {}
      );
      setLoading(false);
      if (isMounted) {
        setList(response?.data);
        setPages(response?.data?.totalPages);
        setRecords(response?.data?.totalRecords);
      }
      //console.log(response?.data);
    } catch (err) {
      setLoading(false);
    }
    return () => {
      isMounted = false;
      controller.abort();
    };
  };

  const Update = (id) => {
    setCurrentStep(1);
    navigate('/Offers/Update', { state: { id } });
  };
  const Details = (id) => {
    navigate('/Offers/Details', { state: { id } });
  };
  const EditFeatures = (id) => {
    navigate('/Offers/Features', { state: { id } });
  };
  const EditGallary = (id) => {
    navigate('/Offers/Gallary', { state: { id } });
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
          `/Offer/Remove?bid=${id}`,
          config
        );

        if (response?.status === 200) {
          ReadResponseList(pageNamber, pageSize);
        }
      } catch (err) {
        console.log(err);
      }
      return () => {
        controller.abort();
      };
    }
  };

  const handlePageClick = (event) => {
    //console.log(`User requested page number ${event.selected + 1}`);
    setPageNamber(event.selected + 1);
    ReadResponseList(event.selected + 1, pageSize);
  };

  return (
    <>
      {/* <div className="flex sm:justify-start md:justify-center mt-12"> */}
      <div className="flex flex-col mt-12">
        <div className="mx-5">
          {/* <div className="-my-2 overflow-x-auto"> */}
          <div className="w-full">
            {/* <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8"> */}
            <div className="flex items-center justify-between py-5">
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate dark:text-white">
                Manage Offers
              </h2>
              <div className="flex lg:ml-4">
                <span>
                  <Link to="/Offers/Add">
                    <button
                      onClick={() => setCurrentStep(1)}
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
            <div className="shadow overflow-hidden hidden  md:block border-b border-gray-400 sm:rounded-lg">
              <div className="inline-block w-full">
                <Loader loading={loading} override={override} />
                <table className="w-full divide-y divide-gray-400">
                  <thead className="bg-gray-100">
                    <tr>
                      <th
                        scope="col"
                        className="px-10 py-1 text-center text-xs font-medium text-gray-600 uppercase tracking-wider"
                      >
                        Model
                      </th>
                      <th
                        scope="col"
                        className="px-10 py-1 text-center text-xs font-medium text-gray-600 uppercase tracking-wider"
                      >
                        Category
                      </th>
                      <th
                        scope="col"
                        className="px-10 py-1 text-center text-xs font-medium text-gray-600 uppercase tracking-wider"
                      >
                        Year
                      </th>
                      <th
                        scope="col"
                        className="px-10 py-1 text-center text-xs font-medium text-gray-600 uppercase tracking-wider"
                      >
                        Price
                      </th>
                      <th
                        scope="col"
                        className="px-10 py-1 text-center text-xs font-medium text-gray-600 uppercase tracking-wider"
                      >
                        Active
                      </th>
                      <th scope="col" className="relative px-6 py-1">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {list?.data?.map((res) => (
                      <tr key={res.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900 flex items-center justify-center">
                            {res.brandModel.modelName} - [
                            {res.brandModel.brand.name}]
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500 font-medium flex items-center justify-center">
                            {res.cartype.typeName}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500 font-medium flex items-center justify-center">
                            {res.year.yearName}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500 font-medium flex items-center justify-center">
                            {res.price} {res.currency.currencyName}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500 font-medium flex items-center justify-center">
                            <input
                              type="checkbox"
                              checked={res.isActive}
                              readOnly
                            />
                          </div>
                        </td>

                        <td className="px-6 py-4 space-x-2 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            className="inline-block text-sm px-4 py-2 leading-none border rounded text-orange-800 border-orange-600 hover:bg-orange-300 hover:text-orange-500 mt-4 lg:mt-0"
                            onClick={() => Details(res.id)}
                          >
                            Details
                          </button>
                          <button
                            className="inline-block text-sm px-4 py-2 leading-none border rounded text-purple-800 border-purple-600 hover:bg-purple-300 hover:text-purple-500 mt-4 lg:mt-0"
                            onClick={() => EditFeatures(res.id)}
                          >
                            Features
                          </button>
                          <button
                            className="inline-block text-sm px-4 py-2 leading-none border rounded text-teal-800 border-teal-600 hover:bg-teal-300 hover:text-teal-500 mt-4 lg:mt-0"
                            onClick={() => EditGallary(res.id)}
                          >
                            Gallary
                          </button>
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
                  {/* <tfoot>
                    <tr>
                     
                    </tr>
                  </tfoot> */}
                </table>
              </div>
            </div>
            <div className="grid grid-cols-1 relative gap-4 md:hidden">
              <Loader loading={loading} override={override} />
              {list?.data?.map((res) => (
                <div
                  key={res.id}
                  className="bg-white p-4 rounded-lg shadow text-gray-500"
                >
                  <div className="flex justify-start items-center">
                    <h3 className="font-bold uppercase">
                      Model: {res.brandModel.modelName} - [
                      {res.brandModel.brand.name}]
                    </h3>
                  </div>
                  <div>
                    <h3 className="font-bold uppercase">
                      Category: {res.cartype.typeName}
                    </h3>
                  </div>
                  <div>
                    <h3 className="font-bold uppercase">
                      Year: {res.year.yearName}
                    </h3>
                  </div>
                  <div>
                    <h3 className="font-bold uppercase">
                      Price: {res.price} {res.currency.currencyName}
                    </h3>
                  </div>
                  <div className="inline-block">
                    <span className="font-bold uppercase">
                      Active:{' '}
                      <input type="checkbox" readOnly checked={res.isActive} />
                    </span>
                  </div>
                  <div>
                    <button
                      className="inline-block text-sm px-4 py-2 leading-none border rounded text-orange-800 border-orange-600 hover:bg-orange-300 hover:text-orange-500 mt-4 lg:mt-0"
                      onClick={() => Details(res.id)}
                    >
                      Details
                    </button>
                    <button
                      className="inline-block text-sm px-4 py-2 leading-none border rounded text-purple-800 border-purple-600 hover:bg-purple-300 hover:text-purple-500 mt-4 lg:mt-0"
                      onClick={() => EditFeatures(res.id)}
                    >
                      Features
                    </button>
                    <button
                      className="inline-block text-sm px-4 py-2 leading-none border rounded text-teal-800 border-teal-600 hover:bg-teal-300 hover:text-teal-500 mt-4 lg:mt-0"
                      onClick={() => EditGallary(res.id)}
                    >
                      Gallary
                    </button>
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
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-1 items-center justify-evenly mt-5">
              <div>
                <p className="text-sm text-gray-700">
                  Showing
                  <span className="font-medium pr-1 pl-1">1</span>
                  to
                  <span className="font-medium pr-1 pl-1">10</span>
                  of
                  <span className="font-medium pr-1 pl-1">{records}</span>
                  results
                </p>
              </div>
              <div>
                <ReactPaginate
                  breakLabel="..."
                  nextLabel="next >"
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={10}
                  pageCount={pages}
                  previousLabel="< previous"
                  renderOnZeroPageCount={null}
                  containerClassName="isolate inline-flex -space-x-px rounded-md shadow-sm"
                  pageLinkClassName="hidden items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 md:inline-flex"
                  previousLinkClassName="inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
                  nextLinkClassName="inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
                  activeLinkClassName="z-10 inline-flex items-center border border-indigo-500 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600 focus:z-20"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Manage;
