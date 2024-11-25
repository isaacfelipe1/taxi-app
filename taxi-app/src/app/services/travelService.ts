import apiClient from './apiClient';
import { Ride, TravelData } from '@/app/types/travel';
export async function getCustomerRides(
  customerId: string,
  driverId?: string,
): Promise<Ride[]> {
  try {
    if (!customerId) {
      throw new Error('O ID do cliente é obrigatório para buscar o histórico.');
    }

    const response = await apiClient.get(`/ride/${customerId}`, {
      params: driverId ? { driver_id: driverId } : undefined,
    });

    if (!Array.isArray(response.data.data)) {
      throw new Error(
        'A resposta da API não contém uma lista válida de corridas.',
      );
    }

    const rides: Ride[] = response.data.data.map((ride: any) => {
      const {
        id,
        customer_id,
        origin,
        destination,
        distance,
        duration,
        cost,
        status,
        created_at,
        driver,
      } = ride;

      return {
        id,
        customer_id,
        origin,
        destination,
        distance,
        duration,
        cost,
        status,
        created_at,
        driver: driver
          ? {
              id: driver.id,
              name: driver.name,
              description: driver.description,
              car: driver.car,
              rating: driver.rating,
              cost: driver.cost,
            }
          : null,
      };
    });

    return rides;
  } catch (error: any) {


    if (error.response?.status === 404) {
      throw new Error('O ID do cliente não foi encontrado no banco de dados.');
    } else if (error.response?.status === 400) {
      throw new Error('A requisição foi inválida. Verifique os parâmetros.');
    } else {
      throw new Error('Erro ao carregar o histórico de viagens.');
    }
  }
}

export async function estimateRide(
  customerId: string,
  origin: string,
  destination: string,
): Promise<TravelData> {
  try {
    if (!customerId || !origin || !destination) {
      throw new Error(
        'O ID do cliente, origem e destino são obrigatórios para calcular a estimativa.',
      );
    }

    const response = await apiClient.post('/ride/estimate', {
      customer_id: customerId,
      origin,
      destination,
    });

    const data = response.data.data;

    if (!data.ride || !data.drivers || !data.static_map) {
      throw new Error(
        'A resposta da API está incompleta. Verifique os dados retornados.',
      );
    }

    return data;
  } catch (error: any) {

    if (error.response?.status === 400) {
      throw new Error(
        'Os dados enviados para a API são inválidos. Verifique as informações de entrada.',
      );
    } else {
      throw new Error('Erro ao calcular a estimativa.');
    }
  }
}
export async function confirmRide(
  customerId: string,
  driverId: number,
): Promise<Ride> {
  try {
    if (!customerId || !driverId) {
      throw new Error(
        'O ID do cliente e o ID do motorista são obrigatórios para confirmar a corrida.',
      );
    }

    const response = await apiClient.patch('/ride/confirm', {
      customer_id: customerId,
      driver_id: driverId,
    });

    if (!response.data.data || response.data.data.status !== 'confirmed') {
      throw new Error(
        'A confirmação da corrida falhou. Verifique os dados retornados.',
      );
    }

    return response.data.data;
  } catch (error: any) {

    if (error.response?.status === 404) {
      throw new Error(
        'O cliente ou motorista não foi encontrado. Verifique os IDs fornecidos.',
      );
    } else if (error.response?.status === 400) {
      throw new Error('A requisição foi inválida. Verifique os parâmetros.');
    } else {
      throw new Error('Erro ao confirmar a corrida.');
    }
  }
}
