import './globals.css';
import { TravelProvider } from '@/app/context/TravelContext';
import Navbar from '@/app/components/nav';
import Footer from '@/app/components/footer';

export const metadata = {
  title: 'Taxi App',
  description: 'Solicite e gerencie viagens facilmente.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full w-full overflow-x-hidden">
      <body className="h-full w-full flex flex-col">
        <TravelProvider>
          <Navbar />
          <main className="flex-grow w-full max-w-screen-xl mx-auto px-4">
            {children}
          </main>
          <Footer />
        </TravelProvider>
      </body>
    </html>
  );
}
