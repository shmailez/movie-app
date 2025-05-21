import "../styles/globals.css";
import { ReactNode } from 'react';
import { Providers } from './provider';

export const metadata = {
  title: 'Поиск фильмов',
  description: 'Приложение для поиска фильмов с OMDb API',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru">
      <body className="bg-gray-400 text-gray-900">
        <Providers>
          <header className="p-4 bg-gray-500 top-0 shadow sticky z-10">
            <h1 className="text-2xl font-bold text-center">Поиск фильмов</h1>
          </header>
          {children}
        </Providers>
      </body>
    </html>
  );
}
