import { Inter } from 'next/font/google';
import { Navbar } from '@/components/Navbar';
import QueryWrapper from './providers/QueryWrapper';
import { ThemeProvider } from '@/context/ThemeContext';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: 'Tempture',
    description: 'Tracking Temperature and Humidity',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <QueryWrapper>
                    <ThemeProvider>
                        <Navbar />
                        <main>{children}</main>
                    </ThemeProvider>
                </QueryWrapper>
            </body>
        </html>
    );
}
