export interface Driver {
  id: number;
  name: string;
  description: string;
  car: string;
  rating: string;
  cost: number;
}
export interface Ride {
  id: number;
  customer_id: string;
  driver_id: number;
  origin: string;
  destination: string;
  distance: string;
  duration: string;
  cost: number;
  status: string;
  created_at: string;
  driver: Driver;
}
export interface TravelData {
  ride: Ride;
  drivers: Driver[];
  original_route?: any;
  static_map?: string;
}
