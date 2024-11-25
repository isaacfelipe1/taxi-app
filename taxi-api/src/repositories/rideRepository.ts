import prisma from '../config/database';

export const getRidesByCustomerId = async (customer_id: string) => {
  return await prisma.ride.findMany({
    where: { customer_id },
    include: { driver: true },
  });
};

export const createRide = async (rideData: {
  customer_id: string;
  driver_id: number;
  origin: string;
  destination: string;
  distance?: string;
  duration?: string;
  cost?: number;
  status?: string;
}) => {
  return await prisma.ride.create({
    data: {
      customer_id: rideData.customer_id,
      origin: rideData.origin,
      destination: rideData.destination,
      distance: rideData.distance,
      duration: rideData.duration,
      cost: rideData.cost,
      status: rideData.status || 'pending',
      driver: {
        connect: { id: rideData.driver_id },
      },
    },
  });
};
export const updateRideStatus = async (rideId: number, status: string) => {
  return await prisma.ride.update({
    where: { id: rideId },
    data: { status },
  });
};
