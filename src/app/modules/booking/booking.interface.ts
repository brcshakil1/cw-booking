import { Types } from "mongoose";

enum VehicleType {
  Car = "car",
  Truck = "truck",
  SUV = "SUV",
  Van = "van",
  Motorcycle = "motorcycle",
  Bus = "bus",
  ElectricVehicle = "electricVehicle",
  HybridVehicle = "hybridVehicle",
  Bicycle = "bicycle",
  Tractor = "tractor",
}

export interface TBooking {
  customer: Types.ObjectId;
  service: Types.ObjectId;
  slot: Types.ObjectId;
  vehicleType: VehicleType;
  vehicleBrand: string;
  vehicleModel: string;
  manufacturingYear: number;
  registrationPlate: string;
}
