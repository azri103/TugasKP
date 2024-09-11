'use client';
import TemperatureChart from '@/components/charts/TemperatureChart';
import HumidityChart from '@/components/charts/HumidityChart';
import { useQuery } from '@tanstack/react-query';
import { getDataToday } from '@/utils/api';
import Loading from '@/utils/Loading';
import { useTheme } from '@/context/ThemeContext';

export default function Home() {
    const { data, isLoading } = useQuery({
        queryKey: ['sensorData'],
        queryFn: getDataToday,
        refetchInterval: 5000,
    });

    const { theme } = useTheme();

    return (
        <div className={`flex min-h-screen flex-col items-center justify-between p-24 text-foreground ${theme === 'light' ? 'bg-slate-100 light' : 'bg-base-100 dark'}`}>
            <h1 className="text-3xl font-medium text-base-content">
                Data From <span className="text-primary">Latest</span>
            </h1>
            <div className="w-full max-lg:px-6 grid grid-cols-1 lg:grid-cols-2 gap-6 pt-12">
                <div className="p-6 bg-primary-content border dark:border-none dark:bg-base-200 text-black rounded-lg w-full h-[410px]">{isLoading ? <Loading /> : <TemperatureChart data={data} />}</div>
                <div className="p-6 bg-primary-content border dark:border-none dark:bg-base-200 text-black rounded-lg w-full h-[410px]">{isLoading ? <Loading /> : <HumidityChart data={data} />}</div>
            </div>
        </div>
    );
}
