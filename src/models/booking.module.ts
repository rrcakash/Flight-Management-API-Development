class Booking {
    id: string;
    userId: string;
    flightId: string;
    seatNumber: string;
    status: string;
    location?: {
      city?: string;
      country?: string;
    };
    createdAt: Date;
  
    constructor(
      id: string,
      userId: string,
      flightId: string,
      seatNumber: string,
      status: string,
      createdAt: Date,
      location?: { city?: string; country?: string }
    ) {
      this.id = id;
      this.userId = userId;
      this.flightId = flightId;
      this.seatNumber = seatNumber;
      this.status = status;
      this.createdAt = createdAt;
      this.location = location;
    }
  }
  
  export default Booking;
  