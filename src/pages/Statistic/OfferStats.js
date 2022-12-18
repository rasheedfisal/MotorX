import { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const OfferStats = () => {
  const axiosPrivate = useAxiosPrivate();
  const [userStats, setUserStats] = useState([]);
  const [offerStats, setOfferStats] = useState([]);
  const [names, setNames] = useState([]);

  const ReadResponseList = async () => {
    let isMounted = true;
    const controller = new AbortController();
    try {
      const response = await axiosPrivate.get(
        `/CustomerSummary/GetCategoryStats`,
        {
          ContentType: 'application/json',
          signal: controller.signal
        }
      );

      if (isMounted) {
        setUserStats(response?.data?.userStats);
        setOfferStats(response?.data?.offerStats);
        setNames(response?.data?.categoryNames);
      }
      //console.log(response?.data?.stats);
    } catch (err) {
      console.log(err);
    }
    return () => {
      isMounted = false;
      controller.abort();
    };
  };

  //   const labels = [
  //     'January',
  //     'February',
  //     'March',
  //     'April',
  //     'May',
  //     'June',
  //     'July'
  //   ];

  const data = {
    labels: names,
    datasets: [
      {
        label: 'Views per Category',
        data: userStats,
        backgroundColor: 'rgba(255, 99, 132, 0.5)'
      },
      {
        label: 'Offers per Category',
        data: offerStats,
        backgroundColor: 'rgba(53, 162, 235, 0.5)'
      }
    ]
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: 'Offers'
      }
    }
  };

  useEffect(() => {
    ReadResponseList();
  }, []);

  return (
    <div className="w-10/12 mx-auto">
      <Bar options={options} data={data} />;
    </div>
  );
};

export default OfferStats;
