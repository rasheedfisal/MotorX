import React, { useState, useEffect } from 'react';
import { AiOutlineEye } from 'react-icons/ai';
import { IoIosMore } from 'react-icons/io';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

import { Button } from '../components';
import { earningData, weeklyStats } from '../data/siteInfo';
import useAuth from '../hooks/useAuth';

const Home = () => {
  const axiosPrivate = useAxiosPrivate();
  const { currentColor } = useAuth();
  const [count, setCount] = useState(0);
  const ReadResponseList = async () => {
    let isMounted = true;
    const controller = new AbortController();
    try {
      const response = await axiosPrivate.get(`/CustomerSummary/GetCount`, {
        ContentType: 'application/json',
        signal: controller.signal
      });

      isMounted && setCount(response?.data);
      //console.log(response?.data);
    } catch (err) {
      console.log(err);
    }
    return () => {
      isMounted = false;
      controller.abort();
    };
  };

  useEffect(() => {
    ReadResponseList();
  }, []);

  return (
    <div className="mt-24">
      <div className="flex flex-wrap lg:flex-nowrap justify-center ">
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-44 rounded-xl w-full lg:w-80 p-8 pt-9 m-3 bg-hero-pattern bg-no-repeat bg-cover bg-center">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-bold text-gray-400">Visits</p>
              <p className="text-2xl">{count}</p>
            </div>
            <button
              type="button"
              style={{ backgroundColor: currentColor }}
              className="text-2xl opacity-0.9 text-white hover:drop-shadow-xl rounded-full  p-4"
            >
              <AiOutlineEye />
            </button>
          </div>
          <div className="mt-6">
            <Button
              color="white"
              bgColor={currentColor}
              text="Explore"
              borderRadius="10px"
            />
          </div>
        </div>
        <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
          {earningData.map((item) => (
            <div
              key={item.title}
              className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl "
            >
              <button
                type="button"
                style={{ color: item.iconColor, backgroundColor: item.iconBg }}
                className="text-2xl opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl"
              >
                {item.icon}
              </button>
              <p className="mt-3">
                <span className="text-lg font-semibold">{item.amount}</span>
                <span className={`text-sm text-${item.pcColor} ml-2`}>
                  {item.percentage}
                </span>
              </p>
              <p className="text-sm text-gray-400  mt-1">{item.title}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap justify-center">
        <div className="md:w-400 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-6 m-3">
          <div className="flex justify-between">
            <p className="text-xl font-semibold">Weekly Stats</p>
            <button
              type="button"
              className="text-xl font-semibold text-gray-500"
            >
              <IoIosMore />
            </button>
          </div>

          <div className="mt-10 ">
            {weeklyStats.map((item) => (
              <div
                key={item.title}
                className="flex justify-between mt-4 w-full"
              >
                <div className="flex gap-4">
                  <button
                    type="button"
                    style={{ background: item.iconBg }}
                    className="text-2xl hover:drop-shadow-xl text-white rounded-full p-3"
                  >
                    {item.icon}
                  </button>
                  <div>
                    <p className="text-md font-semibold">{item.title}</p>
                    <p className="text-sm text-gray-400">{item.desc}</p>
                  </div>
                </div>

                <p className={`text-${item.pcColor}`}>{item.amount}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
