import React, { useEffect, useState } from "react";
import SummaryApi from "../common/SummaryApi";
import { FaUsers, FaBox, FaTags, FaShoppingCart } from "react-icons/fa";
import { Bar } from "react-chartjs-2";
import Axios from "../utils/Axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const StatsCard = ({ label, value, Icon }) => (
  <div className="bg-white shadow-md border-2 border-green-600 rounded-lg p-4 flex items-center space-x-4 hover:shadow-lg transition-shadow duration-300">
    <div className="flex items-center justify-center w-12 h-12 bg-green-100 text-green-700 rounded-full">
      <Icon className="w-6 h-6" />
    </div>
    <div>
      <h3 className="text-3xl font-bold text-green-800">{value}</h3>
      <p className="text-gray-600">{label}</p>
    </div>
  </div>
);

const StarsAdmin = () => {
  const [stats, setStats] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStatsTotal = async () => {
      try {
        const response = await Axios({
          ...SummaryApi.getStarsTotal,
        });
        setStats(response.data.data);
      } catch (err) {
        setError("Error fetching total stats");
        console.error(err);
      }
    };

    const fetchChartData = async () => {
      try {
        const response = await Axios({
          ...SummaryApi.getStarsChart,
          params: { type: "daily" },
        });
        setChartData(response.data.data);
      } catch (err) {
        setError("Failed to fetch chart data.");
        console.error(err);
      }
    };

    const fetchAll = async () => {
      setLoading(true);
      await Promise.all([fetchStatsTotal(), fetchChartData()]);
      setLoading(false);
    };

    fetchAll();
  }, []);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  const userChartData = chartData
    ? {
        labels: chartData.userStats.map((item) => item._id),
        datasets: [
          {
            label: "User Registrations",
            data: chartData.userStats.map((item) => item.count),
            backgroundColor: "rgba(0, 0, 255, 0.2)",
            borderColor: "blue",
            borderWidth: 1,
            hoverBackgroundColor: "rgba(0, 0, 255, 0.5)",
          },
        ],
      }
    : null;

  const orderChartData = chartData
    ? {
        labels: chartData.orderStats.map((item) => item._id),
        datasets: [
          {
            label: "Orders",
            data: chartData.orderStats.map((item) => item.count),
            backgroundColor: "rgba(0, 255, 0, 0.2)",
            borderColor: "green",
            borderWidth: 1,
          },
          {
            label: "Revenue",
            data: chartData.orderStats.map((item) => item.revenue),
            backgroundColor: "rgba(255, 165, 0, 0.2)",
            borderColor: "orange",
            borderWidth: 1,
          },
        ],
      }
    : null;

  const chartOptions = {
    responsive: true,
    plugins: {
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        title: {
          display: true,
          text: "Count / Revenue",
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-100 ">
      <div className="bg-white shadow-md p-4 font-semibold text-gray-800">
        <h1 className="text-2xl">Dashboard Statistics</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6 px-6">
        <StatsCard
          label="Total Users"
          value={stats.totalUsers}
          Icon={FaUsers}
        />
        <StatsCard
          label="Total Products"
          value={stats.totalProducts}
          Icon={FaBox}
        />
        <StatsCard
          label="Total Categories"
          value={stats.totalCategories}
          Icon={FaTags}
        />
        <StatsCard
          label="Total Orders"
          value={stats.totalOrders}
          Icon={FaShoppingCart}
        />
      </div>

      <div className="mt-12 mb-12 px-6 grid grid-cols-2 gap-6">
        {userChartData && (
          <div className="flex flex-col items-center">
            <h2 className="text-xl font-semibold mb-4">User Registrations</h2>
            <Bar data={userChartData} options={chartOptions} />
          </div>
        )}
        {orderChartData && (
          <div className="flex flex-col items-center">
            <h2 className="text-xl font-semibold mb-4">Orders & Revenue</h2>
            <Bar data={orderChartData} options={chartOptions} />
          </div>
        )}
      </div>
    </div>
  );
};

export default StarsAdmin;
