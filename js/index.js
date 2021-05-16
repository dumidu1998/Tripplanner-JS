if (typeof (localStorage) !== "undefined") {
    //check browser supports localstorage
    if (localStorage.getItem('loggedin') && localStorage.getItem('loggedin') === '1') {
        //Hide login and sign up buttons and Show logout button
        document.getElementById('sign-up').innerHTML = 'SIGN OUT';
        document.getElementById('sign-up').setAttribute('href', '');
        document.getElementById('log-in').style.display = 'none';
    }
} else {
    alert("Sorry, your browser does not support web storage...");
}

function logout() {
    //set attributes in localstorage as loggedout
    localStorage.setItem('loggedin', 0);
    localStorage.removeItem('loggedinname');
    localStorage.removeItem('loggeduser');
    localStorage.removeItem('loggedinemail');
}


