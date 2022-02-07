var firebaseConfig = {
    apiKey: "AIzaSyDSrlAurSuuYWO8nO-kB_RO7q6N9Ni4HMU",
    authDomain: "project-2-a09f6.firebaseapp.com",
    databaseURL: "https://project-2-a09f6-default-rtdb.firebaseio.com",
    projectId: "project-2-a09f6",
    storageBucket: "project-2-a09f6.appspot.com",
    messagingSenderId: "675371059432",
    appId: "1:675371059432:web:49f9aaeb1cde668c21215d",
    measurementId: "G-N4G4MY92KE"
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


