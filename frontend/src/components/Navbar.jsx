'use client';

import Link from 'next/link';
import { ThemeController } from './ThemeController';
import { links } from '@/utils/links';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import Datepicker from 'react-tailwindcss-datepicker';
import { formatDate } from '@/utils/dateFormatter';
import { useTheme } from '@/context/ThemeContext';
import moment from 'moment';

export const Navbar = () => {
    const [dateRange, setDateRange] = useState({
        startDate: null,
        endDate: null,
    });
    const router = useRouter();
    const pathname = usePathname();
    const { theme } = useTheme();

    return (
        <div className="navbar bg-base-100 px-10 py-6 flex justify-between items-center">
            <ThemeController />
            <div className="flex gap-x-4">
                <Datepicker
                    value={dateRange}
                    onChange={(newDateRange) => {
                        setDateRange(newDateRange);
                        router.push(`/date?start=${moment(newDateRange.startDate).format('l')}&end=${moment(newDateRange.endDate).format('l')}`);
                    }}
                    primaryColor="indigo"
                    placeholder="Select Date Range"
                    separator="to"
                    displayFormat="MM/DD/YYYY"
                    popoverDirection="down"
                    showShortcuts
                    showFooter
                    inputClassName={`relative transition-all duration-300 pl-4 pr-14 w-full border-gray-300 rounded-lg tracking-wide font-light text-sm ${
                        theme === 'light' ? '!bg-white !border-blue-500' : 'bg-ghost placeholder-gray-400 bg-slate-800 text-white/80 border-slate-600'
                    } focus:ring disabled:opacity-40 disabled:cursor-not-allowed focus:border-indigo-500 focus:ring-indigo-500/20 btn`}
                />

                {links.map((link) => (
                    <Link key={link.href} href={link.href} className={`btn ${pathname === link.href ? 'btn-primary' : 'btn-ghost'}`}>
                        {link.label}
                    </Link>
                ))}
            </div>
        </div>
    );
};
