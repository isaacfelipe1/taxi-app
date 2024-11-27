'use client';

import { useTravelContext } from '@/app/context/TravelContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { confirmRide } from '@/app/services/travelService';
import { FaCar, FaUser, FaStar } from 'react-icons/fa';
import SuccessMessage from '@/app/components/SuccessMessage';

export default function Opcoes() {
  const { travelData } = useTravelContext();
  const router = useRouter();
  const [loadingDriverId, setLoadingDriverId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!travelData) {
      console.warn('Nenhum dado de viagem encontrado. Redirecionando...');
      router.push('/');
    }
  }, [travelData, router]);

  if (!travelData) {
    return (
      <div className="text-center mt-10">
        <p>Carregando...</p>
      </div>
    );
  }

  const { static_map, drivers, ride } = travelData;

  const handleChooseDriver = async (driverId: number) => {
    if (!ride || !ride.customer_id) {
      console.error('Dados do cliente ou corrida estão ausentes.');
      setError('Não foi possível confirmar a corrida. Tente novamente.');
      return;
    }

    setLoadingDriverId(driverId);
    setError(null);

    try {
      localStorage.setItem('driverId', driverId.toString());

      await confirmRide(ride.customer_id, driverId);
      setSuccessMessage('Corrida confirmada com sucesso!');
      setTimeout(() => {
        router.push('/historico');
      }, 2000);
    } catch (err: any) {
      console.error('Erro ao confirmar a corrida:', err.message);
      setError('Erro ao confirmar a corrida. Tente novamente.');
    } finally {
      setLoadingDriverId(null);
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {successMessage && (
        <SuccessMessage
          message={successMessage}
          onClose={() => setSuccessMessage(null)}
        />
      )}
      <div className="flex flex-1 flex-col lg:flex-row overflow-hidden gap-4 p-4">
        <img
          src={static_map}
          alt="Mapa da Rota"
          className="rounded-lg shadow-lg hover:shadow-2xl w-full lg:w-1/2"
          style={{
            height: '450px',
            objectFit: 'cover',
            border: '2px solid #00b780',
            borderRadius: '12px',
          }}
        />
        <div className="w-full lg:w-1/2 rounded-lg p-4 shadow-inner overflow-y-auto">
          <div className="mb-4">
            <h2 className="text-lg font-semibold">Motoristas disponíveis</h2>
          </div>
          <div className="space-y-4">
            {drivers.length > 0 ? (
              drivers.map((driver) => (
                <div
                  key={driver.id}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-white rounded-lg shadow-sm hover:shadow-md"
                >
                  <div className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:space-x-4">
                    <div>
                      <div className="flex items-center space-x-2">
                        <FaUser
                          className="text-gray-700 text-[24px]"
                          aria-hidden="true"
                        />
                        <h3 className="text-sm font-bold text-gray-800">
                          {driver.name}
                        </h3>
                      </div>
                      {driver.description && (
                        <p className="text-xs text-gray-600 mt-1">
                          {driver.description}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col space-y-1">
                      <p className="text-xs text-gray-600 flex items-center">
                        <FaCar
                          className="mr-2 text-gray-500 text-[24px] sm:text-[30px]"
                          aria-hidden="true"
                        />
                        {driver.car}
                      </p>
                      <p className="text-xs text-gray-600 flex items-center">
                        <FaStar
                          className="mr-2 text-yellow-500 text-[24px] sm:text-[50px]"
                          aria-hidden="true"
                        />
                        {driver.rating}/5
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleChooseDriver(driver.id)}
                    disabled={loadingDriverId === driver.id}
                    className={`mt-4 sm:mt-0 px-4 py-2 rounded text-sm font-semibold ${
                      loadingDriverId === driver.id
                        ? 'bg-gray-400 text-white cursor-not-allowed'
                        : 'bg-[#0dab77] text-white hover:bg-[#00b780]'
                    }`}
                  >
                    {loadingDriverId === driver.id
                      ? 'Escolhendo...'
                      : 'Escolher'}
                  </button>
                </div>
              ))
            ) : (
              <p className="text-center text-red-500">
                Nenhum motorista disponível.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
