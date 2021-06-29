var firebaseConfig = {
    apiKey: "AIzaSyAmwgxNT9sJz1D4S-BXpG7KHoVRjFZa9CM",
    authDomain: "booking-hotels-70e97.firebaseapp.com",
    databaseURL: "https://booking-hotels-70e97-default-rtdb.firebaseio.com",
    projectId: "booking-hotels-70e97",
    storageBucket: "booking-hotels-70e97.appspot.com",
    messagingSenderId: "1060562286818",
    appId: "1:1060562286818:web:855b1071278fb9d2ccc6bb",
    measurementId: "G-4V00LMDCXQ"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const storageRef = firebase.storage().ref();

var check = true;
function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }


$(".sign-up").click(function () {
    var name = $(".form-control")[0].value
    var surname = $(".form-control")[1].value
    var login = $(".form-control")[2].value
    var password = $(".form-control")[3].value
    var mail = $(".form-control")[4].value
    var gender = $(".form-control")[5].value
    usedLogins.forEach(o => {
        if (login == o) {
            check = false;
        }
    })
    usedMails.forEach(o => {
        if (mail == o) {
            check = false;
        }
    })
    if (name.length != 0 && surname.length != 0 && login.length != 0 && mail.length != 0 && password.length != 0 && gender.length != 0) {
        if (check) {
            writeUserData(name, surname, login, password, mail, gender)
            succedMessage()
        }
        else {
            swal("ლოგინი ან პაროლი გამოყენებულია")
        }
    }
    else {
        errorMessage()
    }
    name = "";
    surname = "";
    login = "";
    password = "";
    mail = "";
})





function writeUserData(name, surname, login, password, mail, gender) {
    firebase.database().ref('users/' + uuidv4()).set({
        name: name,
        surname: surname,
        login: login,
        password: password,
        mail: mail,
        gender: gender,
        status: "admin"
    });
}

function succedMessage() {
    swal("Good job!", "Your account has been created!", "success")
}

function errorMessage() {
    swal("Error :(", "Enter valid data", "error");
}

function generateFirebaseItem(key, value) {
    return {
        id: key,
        data: value
    }
}

var usedLogins = []
var usedMails = []

var usersArray = new Array();
var ref = firebase.database().ref("users").on('value', function (response) {
    response.forEach(function (item) {
        usersArray.push(generateFirebaseItem(item.key, item.val()));
        usedLogins.push(generateFirebaseItem(item.key, item.val()).data.login)
        usedMails.push(generateFirebaseItem(item.key, item.val()).data.mail)
    });
});


