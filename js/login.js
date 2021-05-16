function login() {
    //get input values to variables
    var uname = document.getElementById('uname').value;
    var pwd = document.getElementById('pwd').value;

    if (localStorage.getItem(uname)) {
        //Check for inputted email and create class instance from username
        var loggeduser = new user(JSON.parse(localStorage.getItem(uname)));
        if (loggeduser.password === pwd) {
            localStorage.setItem("loggedin", 1);
            localStorage.setItem("loggeduser", JSON.stringify(loggeduser));
            localStorage.setItem("loggedinname", loggeduser.getUserName());
            localStorage.setItem("loggedinemail", loggeduser.getEmail());
            // push logged user details to local storage for future references
            window.location.href = "index.html";
        }
        return false;
    } else {
        //error message if email is not available!
        swal("Invalid Email!", "Please Try Again!", "error");
        return false;
    }
}
