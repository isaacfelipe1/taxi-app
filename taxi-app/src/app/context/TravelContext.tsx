'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { TravelData } from '@/app/types/travel';

interface TravelContextProps {
  travelData: TravelData | null;
  setTravelData: (data: TravelData) => void;
}
const TravelContext = createContext<TravelContextProps | undefined>(undefined);

export const TravelProvider = ({ children }: { children: ReactNode }) => {
  const [travelData, setTravelData] = useState<TravelData | null>(null);

  const wrappedSetTravelData = (data: TravelData) => {
    if (!data.static_map || !data.ride || !data.drivers) {
      console.error('Dados incompletos fornecidos:', data);
      return;
    }
    setTravelData(data);
  };

  return (
    <TravelContext.Provider
      value={{ travelData, setTravelData: wrappedSetTravelData }}
    >
      {children}
    </TravelContext.Provider>
  );
};
export const useTravelContext = () => {
  const context = useContext(TravelContext);
  if (!context) {
    throw new Error('useTravelContext must be used within a TravelProvider');
  }
  return context;
};
