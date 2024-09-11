'use client';
import TemperatureChart from '@/components/charts/TemperatureChart';
import HumidityChart from '@/components/charts/HumidityChart';
import Loading from '@/utils/Loading';
import moment from 'moment';
import { useQuery } from '@tanstack/react-query';
import { Suspense } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { getDataByRange } from '@/utils/api';
import { useSearchParams } from 'next/navigation';

function DateRangeContent() {
    const dates = useSearchParams();
    const startDate = dates.get('start');
    const endDate = dates.get('end');

    const { data, isLoading } = useQuery({
        queryKey: ['dataRange', startDate, endDate],
        queryFn: () => getDataByRange({ start: startDate, end: endDate }),
        refetchInterval: 5000,
    });

    return (
        <>
            <h1 className="font-medium text-lg">
                Data From <span className="text-primary">{moment(startDate).format('LL')}</span> to <span className="text-primary">{moment(endDate).format('LL')}</span>
            </h1>
            <div className="w-full max-lg:px-6 grid grid-cols-1 lg:grid-cols-2 gap-6 pt-12">
                <div className="p-6 bg-white dark:bg-base-200 text-black dark:text-white rounded-lg w-full h-[410px]">{isLoading ? <Loading /> : <TemperatureChart data={data} />}</div>
                <div className="p-6 bg-white dark:bg-base-200 text-black dark:text-white rounded-lg w-full h-[410px]">{isLoading ? <Loading /> : <HumidityChart data={data} />}</div>
            </div>
        </>
    );
}

export default function DateRangePage() {
    const { theme } = useTheme();

    return (
        <div className={`flex min-h-screen flex-col items-center justify-between p-24 text-foreground ${theme === 'light' ? 'bg-slate-100 light' : 'bg-base-100 dark'}`}>
            <Suspense fallback={<Loading />}>
                <DateRangeContent />
            </Suspense>
        </div>
    );
}
