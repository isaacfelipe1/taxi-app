import { Request, Response } from 'express';
import prisma from '../config/database';
import { getRouteDetails, getStaticMapUrl } from '../services/rideService';

export const getCustomerRides = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { customer_id } = req.params;
  const { driver_id } = req.query;

  if (!customer_id) {
    return res.status(400).json({
      error_code: 'INVALID_DATA',
      error_description: 'O parâmetro customer_id é obrigatório.',
    });
  }

  try {
    let driverId: number | undefined;
    if (driver_id) {
      driverId = parseInt(driver_id as string, 10);
      if (isNaN(driverId)) {
        return res.status(400).json({
          error_code: 'INVALID_DRIVER',
          error_description:
            'O driver_id informado não é válido (não é um número).',
        });
      }
      const driver = await prisma.driver.findUnique({
        where: { id: driverId },
      });

      if (!driver) {
        return res.status(400).json({
          error_code: 'INVALID_DRIVER',
          error_description: 'O driver_id informado não existe.',
        });
      }
    }

    const rides = await prisma.ride.findMany({
      where: {
        customer_id,
        ...(driverId ? { driver_id: driverId } : {}),
      },
      include: { driver: true },
      orderBy: { created_at: 'desc' },
    });

    if (rides.length === 0) {
      return res.status(404).json({
        error_code: 'NO_RIDES_FOUND',
        error_description: `Nenhuma corrida encontrada para o cliente com ID ${customer_id}.`,
      });
    }

    return res.status(200).json({
      message: 'Corridas encontradas com sucesso!',
      data: rides,
    });
  } catch (error: any) {
    return res.status(500).json({
      error_code: 'INTERNAL_SERVER_ERROR',
      error_description: error.message,
    });
  }
};

export const estimate = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { customer_id, origin, destination } = req.body;

  if (!customer_id || !origin || !destination) {
    return res.status(400).json({
      error_code: 'INVALID_DATA',
      error_description:
        'Campos obrigatórios estão faltando: customer_id, origin e destination.',
    });
  }
  if (!origin.trim() || !destination.trim()) {
    return res.status(400).json({
      error_code: 'INVALID_DATA',
      error_description:
        'Os endereços de origem e destino não podem estar em branco.',
    });
  }
  if (origin === destination) {
    return res.status(400).json({
      error_code: 'INVALID_DATA',
      error_description:
        'Os endereços de origem e destino não podem ser iguais.',
    });
  }

  try {
    const routeDetails = await getRouteDetails(origin, destination);
    const { distance, duration, start_location, end_location } = routeDetails;
    const staticMapUrl = getStaticMapUrl(routeDetails);
    const distanceValue = parseFloat(
      distance.replace(' km', '').replace(',', '.')
    );
    const drivers = await prisma.driver.findMany({
      where: { is_active: true },
    });

    if (!drivers || drivers.length === 0) {
      return res.status(404).json({
        error_code: 'NO_DRIVERS_AVAILABLE',
        error_description: 'Nenhum motorista disponível no momento.',
      });
    }
    const availableDrivers = drivers
      .filter((driver: any) => distanceValue >= driver.min_distance)
      .map((driver: any) => ({
        id: driver.id,
        name: driver.name,
        description: driver.description,
        car: driver.car,
        rating: driver.rating,
        cost: parseFloat((distanceValue * driver.rate).toFixed(2)),
      }));

    if (availableDrivers.length === 0) {
      return res.status(404).json({
        error_code: 'NO_DRIVERS_AVAILABLE',
        error_description:
          'Nenhum motorista atende à quilometragem mínima para esta viagem.',
      });
    }
    const ride = await prisma.ride.create({
      data: {
        customer_id,
        origin,
        destination,
        distance,
        duration,
        cost: Math.min(
          ...availableDrivers.map((d: { cost: number }) => d.cost)
        ),
        status: 'pending',
      },
    });

    return res.status(200).json({
      message: 'Estimativa calculada com sucesso!',
      data: {
        ride,
        start_location,
        end_location,
        distance,
        duration,
        drivers: availableDrivers.sort(
          (a: { cost: number }, b: { cost: number }) => a.cost - b.cost
        ),
        original_route: routeDetails,
        static_map: staticMapUrl,
      },
    });
  } catch (error: any) {
    return res.status(500).json({
      error_code: 'INTERNAL_SERVER_ERROR',
      error_description: error.message,
    });
  }
};

export const confirmRide = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { customer_id, driver_id } = req.body;

  if (!customer_id || !driver_id) {
    return res.status(400).json({
      error_code: 'INVALID_DATA',
      error_description:
        'Campos obrigatórios estão faltando: customer_id e driver_id.',
    });
  }

  try {
    const ride = await prisma.ride.findFirst({
      where: { customer_id, status: 'pending' },
    });

    if (!ride) {
      return res.status(404).json({
        error_code: 'NO_RIDE_FOUND',
        error_description:
          'Nenhuma corrida pendente encontrada para o cliente.',
      });
    }

    const driver = await prisma.driver.findFirst({
      where: { id: driver_id, is_active: true },
    });

    if (!driver) {
      return res.status(400).json({
        error_code: 'INVALID_DRIVER',
        error_description:
          'O motorista informado não é válido ou não está ativo.',
      });
    }
    const updatedRide = await prisma.ride.update({
      where: { id: ride.id },
      data: {
        driver_id,
        status: 'confirmed',
      },
    });

    return res.status(200).json({
      message: 'Corrida confirmada com sucesso!',
      data: updatedRide,
    });
  } catch (error: any) {
    return res.status(500).json({
      error_code: 'INTERNAL_SERVER_ERROR',
      error_description: error.message,
    });
  }
};
