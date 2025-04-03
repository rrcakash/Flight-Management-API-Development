class Flight {
    id: string;
    airline: string;
    departure: string;
    destination: string;
    date: Date;
    price: number;

    constructor(id: string, airline: string, departure: string, destination: string, date: Date, price: number) {
        this.id = id;
        this.airline = airline;
        this.departure = departure;
        this.destination = destination;
        this.date = date;
        this.price = price;
    }
}

export default Flight;
