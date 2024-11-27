'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCustomerRides } from '@/app/services/travelService';
import { Ride } from '@/app/types/travel';
import ErrorMessage from '@/app/components/ErrorMessage';

export default function HistoricoViagens() {
  const router = useRouter();
  const [userId, setUserId] = useState<string>('');
  const [motoristaSelecionado, setMotoristaSelecionado] =
    useState<string>('todos');
  const [viagensOriginais, setViagensOriginais] = useState<Ride[]>([]);
  const [viagensFiltradas, setViagensFiltradas] = useState<Ride[]>([]);
  const [motoristas, setMotoristas] = useState<string[]>(['todos']);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [buscou, setBuscou] = useState<boolean>(false);
  const [driverId, setDriverId] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const totalPages = Math.ceil(viagensFiltradas.length / itemsPerPage);

  useEffect(() => {
    const id = localStorage.getItem('driverId');
    setDriverId(id);

    if (!id) {
      router.push('/');
    }
  }, [router]);

  const handleRemoveDriverId = () => {
    localStorage.removeItem('driverId');
    setDriverId(null);
    router.push('/');
  };

  const atualizarMotoristas = async (clienteId: string) => {
    if (!clienteId) {
      setMotoristas(['todos']);
      setViagensOriginais([]);
      setViagensFiltradas([]);
      setError('Por favor, insira o ID do cliente.');
      setBuscou(false);
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const data: Ride[] = await getCustomerRides(clienteId);

      if (data.length === 0) {
        setMotoristas(['todos']);
        setViagensOriginais([]);
        setViagensFiltradas([]);
        setBuscou(true);
        return;
      }

      const motoristasUnicos = Array.from(
        new Set(data.map((viagem) => viagem.driver?.name).filter(Boolean)),
      );

      setMotoristas(['todos', ...motoristasUnicos]);
      setViagensOriginais(data);
      setViagensFiltradas(data);
      setBuscou(true);
    } catch (err: any) {
      setError(
        'Erro ao carregar os dados. Verifique o ID do cliente e tente novamente.',
      );
      setBuscou(false);
    } finally {
      setLoading(false);
    }
  };

  const handleFiltro = () => {
    if (!userId) {
      setError('Por favor, insira o ID do cliente antes de aplicar o filtro.');
      setBuscou(false);
      return;
    }

    const viagensFiltradas =
      motoristaSelecionado === 'todos'
        ? viagensOriginais
        : viagensOriginais.filter(
            (viagem) => viagem.driver?.name === motoristaSelecionado,
          );

    setViagensFiltradas(viagensFiltradas);
    setCurrentPage(1);

    if (viagensFiltradas.length === 0) {
      setError('Nenhum registro encontrado com o filtro aplicado.');
    } else {
      setError(null);
    }

    setBuscou(true);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const paginatedViagens = viagensFiltradas.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <div className="min-h-screen flex flex-col p-3">
      <header className="text-[#0dab77] py-4 px-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Histórico de Viagens</h1>
        {driverId && (
          <button
            onClick={handleRemoveDriverId}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Sair
          </button>
        )}
      </header>

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto bg-white p-6 shadow-md rounded-lg mt-6">
          <div className="mb-6 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              onBlur={() => atualizarMotoristas(userId)}
              placeholder="ID do Cliente"
              className="block w-full p-2 border rounded"
            />
            <select
              id="motorista"
              name="motorista"
              value={motoristaSelecionado}
              onChange={(e) => setMotoristaSelecionado(e.target.value)}
              className="block w-full p-2 border rounded text-sm lg:text-base truncate"
            >
              {motoristas.map((motorista, index) => (
                <option key={index} value={motorista}>
                  {motorista === 'todos' ? 'Mostrar Todos' : motorista}
                </option>
              ))}
            </select>
            <button
              onClick={handleFiltro}
              className="bg-[#0dab77] text-white py-2 px-4 rounded hover:bg-[#00b780]"
            >
              Aplicar Filtro
            </button>
          </div>

          {/* Mensagem de erro utilizando o componente ErrorMessage */}
          {error && <ErrorMessage message={error} />}

          {loading && (
            <div className="text-center text-gray-500">Carregando...</div>
          )}

          {!loading && buscou && paginatedViagens.length > 0 && (
            <>
              {/* Exibição para Desktop */}
              <div className="hidden md:block">
                <table className="w-full border-collapse border border-gray-200">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border p-2">Data/Hora</th>
                      <th className="border p-2">Motorista</th>
                      <th className="border p-2">Origem</th>
                      <th className="border p-2">Destino</th>
                      <th className="border p-2">Distância</th>
                      <th className="border p-2">Duração</th>
                      <th className="border p-2">Valor</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedViagens.map((viagem) => (
                      <tr key={viagem.id} className="hover:bg-gray-50">
                        <td className="border p-2">
                          {viagem.created_at
                            ? new Date(viagem.created_at).toLocaleString(
                                'pt-BR',
                              )
                            : 'Data não disponível'}
                        </td>
                        <td className="border p-2">
                          {viagem.driver?.name || 'Motorista não disponível'}
                        </td>
                        <td className="border p-2">{viagem.origin}</td>
                        <td className="border p-2">{viagem.destination}</td>
                        <td className="border p-2">{viagem.distance}</td>
                        <td className="border p-2">{viagem.duration}</td>
                        <td className="border p-2">
                          R$ {viagem.cost.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Exibição para Mobile */}
              <div className="block md:hidden">
                {paginatedViagens.map((viagem) => (
                  <div
                    key={viagem.id}
                    className="p-4 mb-4 bg-white shadow-md rounded"
                  >
                    <h2 className="font-bold">
                      {viagem.origin} → {viagem.destination}
                    </h2>
                    <p>
                      Data:{' '}
                      {new Date(viagem.created_at).toLocaleDateString('pt-BR')}
                    </p>
                    <p>Motorista: {viagem.driver?.name || 'Não disponível'}</p>
                    <p>Valor: R$ {viagem.cost.toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </>
          )}

          {!loading && buscou && viagensFiltradas.length === 0 && !error && (
            <div className="text-gray-500 text-center">
              Nenhum registro encontrado.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
