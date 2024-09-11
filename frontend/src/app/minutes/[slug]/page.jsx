'use client';
import TemperatureChart from '@/components/charts/TemperatureChart';
import HumidityChart from '@/components/charts/HumidityChart';
import { useQuery } from '@tanstack/react-query';
import { getDataByMinute } from '@/utils/api';
import { useParams } from 'next/navigation';
import Loading from '@/utils/Loading';
import { useTheme } from '@/context/ThemeContext';

export default function MinutesPage() {
    const params = useParams();
    const minutes = parseInt(params.slug);

    const { data, isLoading, isError } = useQuery({
        queryKey: ['dataInMinutes', minutes],
        queryFn: () => getDataByMinute(minutes),
        refetchInterval: 5000,
    });

    const { theme } = useTheme();

    return (
        <div className={`flex min-h-screen flex-col items-center justify-between p-24 text-foreground ${theme === 'light' ? 'bg-slate-100 light' : 'bg-base-100 dark'}`}>
            <h1 className="font-medium text-lg">
                Data From <span className="text-primary">{minutes} Minutes Ago</span>
            </h1>
            <div className="w-full max-lg:px-6 grid grid-cols-1 lg:grid-cols-2 gap-6 pt-12">
                <div className="p-6 bg-white dark:bg-base-200 text-black rounded-lg w-full h-[410px]">{isLoading ? <Loading /> : <TemperatureChart data={data} />}</div>
                <div className="p-6 bg-white dark:bg-base-200 text-black rounded-lg w-full h-[410px]">{isLoading ? <Loading /> : <HumidityChart data={data} />}</div>
            </div>
        </div>
    );
}
