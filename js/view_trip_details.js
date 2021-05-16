if (typeof (Storage) !== "undefined") {
    //check for logged in user
    if (localStorage.getItem('loggedin') === '1') {
        document.getElementById('name').innerHTML = localStorage.getItem('loggedinname');
    } else {
        //alert to login
        alert("please Login to Continue!!");
        window.location.href = "index.html";
    }
    if (localStorage.getItem('temp_data') == null) {
        //check whether comming from shedule page
        window.location.href = "Schedule a Trip.html";
    }
} else {
    //alert that localstorage not supported
    alert("Sorry, your browser does not support web storage...");
    window.location.href = "index.html";

}

if (localStorage.getItem('temp_data')) {
    //get temp data stored at shedule page
    var details = JSON.parse(localStorage.getItem('temp_data'));
    //display temp data in the interface
    document.getElementById('departure-country').value = details.startCountry;
    document.getElementById('departure-airport').value = details.start;
    document.getElementById('date-selected').value = details.date;
    document.getElementById('time-selected').value = details.time;
    document.getElementById('start').innerHTML = details.start;
    document.getElementById('end').innerHTML = details.end;
    //create an object with temp data
    var tripdata = {
        "useremail": localStorage.getItem('loggedinemail'),
        "TripDestination": details.end,
        "TripDepartFrom": details.start,
        "destinationId": details.endid,
        "startId": details.startid,
        "startTime": details.time,
        "depdate": details.date
    }
}
function confirmtrip() {
    //confirm popup
    if (confirm("Are you sure you want to confirm?")) {
        var newtrip = new scheduledTrip(tripdata); // creating an instance from scheduled trip

        if (localStorage.getItem('trips')) {
            var alltrips = JSON.parse(localStorage.getItem('trips')); //get all sheduled trips from localstorage
        } else {
            var alltrips = []; //initializa an new array to keep sheduled trip data
        }
        alltrips.push(newtrip); // push temp data new trips array
        localStorage.setItem('trips', JSON.stringify(alltrips)); // push the trip array to local storage
        localStorage.removeItem('temp_data'); // remove temp_data in localstorage
        alert("Trip Scheduled Successfully!"); // give alert
        window.location.href = "View all Trips.html"; //redirect to view all trips page
    }
}