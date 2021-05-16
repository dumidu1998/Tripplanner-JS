if (typeof (Storage) !== "undefined") {
    //check for logged in user
    if (localStorage.getItem('loggedin') === '1') {
        document.getElementById('name').innerHTML = localStorage.getItem('loggedinname');
    } else {
        //alert to login
        alert("please Login to Continue!!");
        window.location.href = "index.html";
    }
    if (localStorage.getItem('trips') == null) {
        //check whether the user is comming from schedule page
        alert("No trips to view!!");
    }
} else {
    //alert that localstorage not supported
    alert("Sorry, your browser does not support web storage...");
    window.location.href = "index.html";

}

var divid = 1; //div ids for unique data view

var dataL = document.getElementById('data-L');
var dataR = document.getElementById('data-R');

//get all trip data available in the localstorage
JSON.parse(localStorage.getItem('trips')).forEach(element => {
    //loop over each element
    var today = new Date();
    var depdate = new Date(element.depdate);
    //check for logged users upcomming trips
    if (element.useremail === localStorage.getItem('loggedinemail') && today < depdate) {
        var object = new scheduledTrip(element); // creating an instance from sheduletrip class
        setdata(object); // call to setdata function
    };
});



function setdata(obj) {
    if (divid <= 10) { //get only last 10 trips
        if (divid < 6) { // for left container
            var clone = dataL.cloneNode(true); //make a clone of the div child 
            clone.id = divid++;
            clone.getElementsByTagName('b')[0].innerHTML = obj.getTripDepartFrom();
            clone.getElementsByTagName('b')[1].innerHTML = obj.getTripDestination();
            clone.getElementsByTagName('span')[0].innerHTML = obj.getDepdate();
            clone.getElementsByTagName('span')[2].innerHTML = obj.getStartTime();
            document.getElementById("datacontainerl").appendChild(clone);  // set data to be viewd and append to container
        } else { //for right container
            var clone = dataL.cloneNode(true);
            clone.id = divid++;
            clone.getElementsByTagName('b')[0].innerHTML = obj.getTripDepartFrom();
            clone.getElementsByTagName('b')[1].innerHTML = obj.getTripDestination();
            clone.getElementsByTagName('span')[0].innerHTML = obj.getDepdate();
            clone.getElementsByTagName('span')[2].innerHTML = obj.getStartTime();
            document.getElementById("datacontainerr").appendChild(clone);
        }
    }

}

document.getElementById('data-L').style.display = "none";


function oldtrips() { //view old trips
    for (var i = divid - 1; i > 0; i--) {
        document.getElementById(i).style.display = 'none';
    }
    document.getElementById('data-L').style.display = "";
    JSON.parse(localStorage.getItem('trips')).forEach(element => {
        var today = new Date();
        var depdate = new Date(element.depdate);
        if (element.useremail === localStorage.getItem('loggedinemail') && today > depdate) {
            var object = new scheduledTrip(element);
            setdata(object);
        };
    });
    document.getElementById('data-L').style.display = "none";
    document.getElementById('view-old-trips').style.display = "none";
    document.getElementById('title').innerHTML = "Old Trips";
    document.getElementById('view-upcoming-trips').style.display = "";
}


function currenttrips() { // refresh to view upcomming trips
    location.reload();
}

