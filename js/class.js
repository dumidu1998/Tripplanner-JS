let fullname;
let password;
let email;
let country;
let gender;
let dob;

class user {
    //user class constructor and methods
    constructor(option = {}) {
        this.fullname = option.fullname;
        this.password = option.password;
        this.email = option.email;
        this.country = option.country;
        this.gender = option.gender;
        this.dob = option.dob;
    }

    getUserName() {
        return this.fullname;
    }
    getPassword() {
        return this.password;
    }
    getEmail() {
        return this.email;
    }
    getGender() {
        return this.gender;
    }
    getDob() {
        return this.dob;
    }
    getCountry() {
        return this.country;
    }

}


let TripId = "";
let useremail = "";
let TripDestination = "";
let TripRoute = "";
let startTime = "";
let TripDepartFrom = "";
let endTime = 0;
let destinationId = "";
let startId = "";
let depdate = "";

class scheduledTrip {
    //scheduledclass constructor and methods
    constructor(option = {}) {
        this.useremail = option.useremail;
        this.TripDestination = option.TripDestination;
        this.TripDepartFrom = option.TripDepartFrom;
        this.startTime = option.startTime;
        this.destinationId = option.destinationId;
        this.startId = option.startId;
        this.depdate = option.depdate;
    }

    getTripID() {
        return this.TripId;
    }
    getTripDestination() {
        return this.TripDestination;
    }
    getTripRoute() {
        return this.TripRoute;
    }
    getStartTime() {
        return this.startTime
    }
    getTripDepartFrom() {
        return this.TripDepartFrom;
    }
    getEndTime() {
        return this.endTime;
    }
    getUseremail() {
        return this.useremail;
    }
    getDepdate() {
        return this.depdate;
    }

}

let AirportName;
let AirportLocation;
let ArrivalAirport;
let DepartureAirport;

class airport {
    //airport class constructor and methods
    constructor() {

    }

    getAirportName() {
        return this.AirportName;
    }
    getAirportLocation() {
        return this.AirportLocation;
    }
    getArrivalAirport() {
        return this.ArrivalAirport;
    }
    getDepartureAirport() {
        return this.DepartureAirport;
    }


}


let FlightNum;
let FlightName;
let DepartTime;
let ArrivalTime;
let TravelDuration;
let FlightRegistrationNo;

class flight {
    //flight class constructor and methods

    constructor() {

    }

    getFlightNum() {
        return this.FlightNum;
    }
    getFlightName() {
        return this.getFlightName;
    }
    getDepartureTime() {
        return this.DepartTime;
    }
    getTravelDuration() {
        return this.TravelDuration;
    }
    getFlightRegNo() {
        return this.FlightRegistrationNo;
    }
}
