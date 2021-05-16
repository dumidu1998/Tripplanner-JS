var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1; //January is 0!
var yyyy = today.getFullYear() - 14;
if (dd < 10) {
    dd = '0' + dd
}
if (mm < 10) {
    mm = '0' + mm
}
year = yyyy + '-' + mm + '-' + dd;
document.getElementById("bday").setAttribute("max", year); //Set max date a 14 years back from today


function subm() {
    var fullname = document.getElementById('fullname').value;
    var email = document.getElementById('email').value;
    var pwd = document.getElementById('pwd').value;
    var cpwd = document.getElementById('cpwd').value;
    var bday = document.getElementById('bday').value;
    var gender = document.getElementById('gender');
    gender = gender.options[gender.selectedIndex].value;
    var Scountry = document.getElementById('country');
    Scountry = Scountry.options[Scountry.selectedIndex].text;
    if (gender === '0' || Scountry === '-- Select your country') {
        //validate gender selection
        swal("Please Select your Gender!!");
        return false;
    }
    if (cpwd !== pwd) {
        //validate password and confirm password
        swal("Passwords are not matching!!");
        return false;
    }

    if (typeof (Storage) !== "undefined") {
        //check browser supports Localstorage
        if (localStorage.getItem(email)) {
            //validate email as not used before
            swal("Email already used!! Please Sign up with another email!");
            return false;

        } else {
            //create an instance from user class and serialize it and push to localstorage
            var userobject = { "fullname": fullname, "password": pwd, "email": email, "gender": gender, "dob": bday, "country": Scountry }
            var newuser = new user(userobject);
            localStorage.setItem(email, JSON.stringify(newuser));
            alert("Sign Up Sucessfull! Login to Continue");
            window.location.href = "login.html";
            //redirect to login page
            return false;
        }
    } else {
        alert("Sorry, your browser does not support web storage...");
        return false;
    }
}



function showcountry() {
    //view all cuntries available from given array countryData
    var select = document.getElementById('country');
    for (var i = 0; i < countryData.length; i++) {
        select.add(new Option(countryData[i]));
    }
}

