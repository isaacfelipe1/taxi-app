'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { estimateRide } from '@/app/services/travelService';
import { useTravelContext } from '@/app/context/TravelContext';
import { FaMapMarkerAlt, FaUser, FaRoute } from 'react-icons/fa';
import Taxi from '@/app/components/taxi';

export default function SolicitarViagem() {
  const [formData, setFormData] = useState({
    userId: '',
    origem: '',
    destino: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { setTravelData } = useTravelContext();
  const formRef = useRef<HTMLDivElement>(null);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEstimativa = async () => {
    if (!formData.userId || !formData.origem || !formData.destino) {
      setError('Todos os campos são obrigatórios.');
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const data = await estimateRide(
        formData.userId,
        formData.origem,
        formData.destino,
      );
      setTravelData({
        drivers: data.drivers,
        ride: data.ride,
        static_map: data.static_map,
      });

      router.push('/opcoes');
    } catch (err: any) {
      setError(
        'Erro, os endereços de origem e destino não podem ser o mesmo endereço.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-col lg:flex-row gap-6 items-start justify-center w-full max-w-7xl mx-auto px-4 py-6 flex-grow">
        <div
          ref={formRef}
          className="bg-white p-6 shadow-lg rounded-lg w-full max-w-sm"
        >
          <h1 className="text-xl font-bold text-gray-800 text-center mb-4">
            Solicitar Viagem
          </h1>

          {error && (
            <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-3 text-sm">
              {error}
            </div>
          )}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleEstimativa();
            }}
            className="space-y-4"
          >
            <div className="relative">
              <label
                htmlFor="userId"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                ID do Usuário
              </label>
              <div className="flex items-center border border-gray-300 rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-[#060937] focus-within:outline-none">
                <span className="pl-3 text-gray-400">
                  <FaUser size={16} />
                </span>
                <input
                  type="text"
                  id="userId"
                  name="userId"
                  value={formData.userId}
                  onChange={handleInputChange}
                  placeholder="Informe o ID do usuário"
                  className="block w-full p-2 pl-2 focus:outline-none rounded-lg"
                />
              </div>
            </div>

            <div className="relative">
              <label
                htmlFor="origem"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Endereço de Origem
              </label>
              <div className="flex items-center border border-gray-300 rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-[#060937] focus-within:outline-none">
                <span className="pl-3 text-gray-400">
                  <FaMapMarkerAlt size={16} />
                </span>
                <input
                  type="text"
                  id="origem"
                  name="origem"
                  value={formData.origem}
                  onChange={handleInputChange}
                  placeholder="Informe o endereço de origem"
                  className="block w-full p-2 pl-2 focus:outline-none rounded-lg"
                />
              </div>
            </div>

            <div className="relative">
              <label
                htmlFor="destino"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Endereço de Destino
              </label>
              <div className="flex items-center border border-gray-300 rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-[#060937] focus-within:outline-none">
                <span className="pl-3 text-gray-400">
                  <FaRoute size={16} />
                </span>
                <input
                  type="text"
                  id="destino"
                  name="destino"
                  value={formData.destino}
                  onChange={handleInputChange}
                  placeholder="Informe o endereço de destino"
                  className="block w-full p-2 pl-2 focus:outline-none rounded-lg"
                />
              </div>
            </div>

            <button
              type="submit"
              className={`w-full text-lg font-semibold py-2 rounded-lg ${
                loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-[#0dab77] hover:bg-[#07a776] text-white'
              }`}
              disabled={loading}
            >
              {loading ? 'Calculando...' : 'Estimar Valor da Viagem'}
            </button>
          </form>
        </div>
        <div className="w-full lg:w-1/2">
          <Taxi />
        </div>
      </div>
    </div>
  );
}
