enum IsBooking {
  Available = "available",
  Booked = "booked",
  Canceled = "canceled",
}

export interface TSlot {
  service: string;
  date: Date;
  startTime: string;
  endTime: string;
  isBooked: IsBooking;
}
