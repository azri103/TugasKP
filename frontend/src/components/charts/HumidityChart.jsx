'use client';

import dynamic from 'next/dynamic';
import moment from 'moment';
import { useTheme } from '@/context/ThemeContext';

const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });

const HumidityChart = ({ data }) => {
  const { theme } = useTheme();

  // Memetakan data humidity dan timestamp dengan moment untuk parsing yang konsisten
  const humidity = data?.map((item) => item.humidity);
  const timestamp = data?.map((item) =>
    moment(item.timestamp).format('YYYY-MM-DD HH:mm:ss')
  );

  if (!data)
    return (
      <p className="text-red-500 font-medium text-lg">
        Failed fetching Humidity Data
      </p>
    );

  const series = [
    {
      name: 'Humidity',
      data: humidity,
    },
  ];

  const options = {
    chart: {
      type: 'area',
      width: '100%',
      stacked: false,
      height: 350,
      zoom: {
        type: 'x',
        enabled: true,
        autoScaleYaxis: true,
      },
      toolbar: {
        autoSelected: 'zoom',
        show: true,
        tools: {
          download: true,
          pan: true,
        },
      },
    },

    dataLabels: {
      enabled: false,
    },

    markers: {
      size: 0,
    },

    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.5,
        opacityTo: 0,
        stops: [0, 90, 100],
      },
    },

    noData: {
      text: 'No data in Database',
      align: 'center',
      verticalAlign: 'middle',
      style: {
        color: theme === 'light' ? '#1A1A1A' : '#ffffff60',
        fontSize: '14px',
      },
    },

    title: {
      text: 'Humidity Chart',
      align: 'center',
      margin: 10,
      offsetX: 0,
      offsetY: 0,
      floating: false,
      style: {
        fontSize: '18px',
        fontWeight: 600,
        color: theme === 'light' ? '#1A1A1A' : '#ffffff80',
      },
    },
    xaxis: {
      categories: timestamp,
      labels: {
        rotate: 0,
        style: {
          fontSize: '12px',
          colors: theme === 'light' ? '#1A1A1A' : '#ffffff80',
        },
        formatter: (value) => {
          // Parsing timestamp dengan moment untuk menghindari Invalid Date
          const date = moment(value, 'YYYY-MM-DD HH:mm:ss');
          return date.isValid() ? date.format('DD-MM-YYYY HH:mm:ss') : 'Invalid Date';
        },
      },
    },
    yaxis: {
      title: {
        text: 'Humidity (%)',
      },
      min: 0,
      max: 120,
      showAlways: false,
      labels: {
        formatter: (value) => value.toFixed(0),
      },
    },

    stroke: {
      show: true,
      curve: 'smooth',
      width: 2,
    },

    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (value) => value.toFixed(0),
      },
    },
  };

  return <ApexCharts options={options} series={series} type="area" height={350} />;
};

export default HumidityChart;
