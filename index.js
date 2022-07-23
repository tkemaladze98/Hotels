
const btnSignUp = document.querySelector(".sign-up")
const registerForm = document.querySelector(".registration-form")
const hotels = document.querySelector(".hotel-card")
const nav = document.querySelector("nav");
const passwordInput = document.querySelector("#password-input")
const searchInput = document.querySelector(".search-bar")
const middle = document.querySelector(".midle")
const searchBody = document.querySelector("#search-body")
const loginInput = document.querySelector("#login-input")
var usedLogins = [];
var usedMails = [];
var check = true;
var loggedIn = null;
var currentUser = [];
var hotelArray = []
var tmpHotel = []
var test3 = []
var hotelId;
var hotelNAme;






function carouselImages(item) {
  return `<div class="carousel-item">
  <img src='${item}'
    class="d-block w-100" alt="...">
</div>`
}
function activeImage(item) {
  return `<div class="carousel-item active">
  <img src='${item}'
    class="d-block w-100" alt="...">
</div>`
}

function cardInfos(item) {
  return `<h5 class="card-title">${item.data.name}</h5>
  <p class="card-text">${item.data.adress}</p>
  <p class="card-text">${item.data.price} Gel</p>
  <p class="card-text">${item.data.district}</p>
  <p class="card-text">${item.data.description}</p>
  <button type="button" class="btn btn-primary" onClick="book();">დაჯავშნა</button>`
}


function fullCard(item) {
  return `<div class="card mb-3">
  <div id="carouselExampleIndicators${item}" class="carousel slide" data-ride="carousel">
      <ol class="carousel-indicators">
      </ol>
      <div class="carousel-inner">
      </div>
      <a class="carousel-control-prev" href="#carouselExampleIndicators${item}" role="button" data-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
      </a>
      <a class="carousel-control-next" href="#carouselExampleIndicators${item}" role="button" data-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
      </a>
  </div>
  <div class="card-body card-infos">
  </div>
</div>`
}



function carouselIndicators(item) {
  return `<li data-target="#carouselExampleIndicators" data-slide-to="${item}" class="active"></li>`
}


function book() {
  if (Number(loggedIn) != 1) {
    swal("გთხოვთ გაიაროთ ავტორიზაცია")
  } else {
    swal("Good job!", "სასტუმრო დაჯავშნილია", "success")
  }

}

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
var database = firebase.database();
const storageRef = firebase.storage().ref();


// read data from firebase 

function generateFirebaseItem(key, value) {
  return {
    id: key,
    data: value
  }
}

var usersArray = new Array();
function generateUseds() {
  usedLogins = [];
  usedMails = [];
  usersArray = [];
  var ref = firebase.database().ref("users").on('value', function (response) {
    response.forEach(function (item) {
      usersArray.push(generateFirebaseItem(item.key, item.val()));
      usedLogins.push(generateFirebaseItem(item.key, item.val()).data.login)
      usedMails.push(generateFirebaseItem(item.key, item.val()).data.mail)
    });
  });
}
generateUseds()

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

function writeUserData(name, surname, login, password, mail, gender) {
  firebase.database().ref('users/' + uuidv4()).set({
    name: name,
    surname: surname,
    login: login,
    password: password,
    mail: mail,
    gender: gender,
    status: "user"
  });
}



function errorMessage() {
  swal("Error :(", "Enter valid data", "error");
}

function succedMessage() {
  swal("Good job!", "Your account has been created!", "success")
}










function goToRegisterForm() {
  usersArray = new Array();
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
      returnAllHotels()
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
}



var filteredHotels;

function test155() {
  var selecCategories = document.querySelector("#inputState")
  $("#inputState").change((event) => {
    filteredHotels = []
    var ref = firebase.database().ref(`hotels/${event.target.value}`).on('value', function (response) {
      response.forEach(function (item) {
        filteredHotels.push(generateFirebaseItem(item.key, item.val()));
      });
      if (filteredHotels.length > 0) {
        testGenerate(filteredHotels)
      } else {
        swal("ეს კატეგორია ცარიელია")
      }
    });

  });
}


function enterToRegisterForm() {
  return `<article class="registration-form">
  <form>
    <div class="form-row">
      <div class="form-group col-md-6">
        <label for="inputEmail4">სახელი *</label>
        <input type="text" class="form-control" id="inputEmail4" placeholder="Add here">
      </div>
      <div class="form-group col-md-6">
        <label for="inputPassword4">გვარი *</label>
        <input type="text" class="form-control" id="inputPassword4" placeholder="Add here">
      </div>
    </div>
    <div class="form-row">
      <div class="form-group col-md-6">
        <label for="inputAddress">ლოგინი *</label>
        <input type="text" class="form-control" id="inputAddress" placeholder="Add here">
      </div>
      <div class="form-group col-md-6">
        <label for="inputAddress2">პაროლი *</label>
        <input type="password" class="form-control" id="inputAddress2" placeholder="Add here">
      </div>
    </div>
    <div class="form-row">
      <div class="form-group col-md-6">
        <label for="inputCity">მეილი *</label>
        <input type="email" class="form-control" id="inputCity" placeholder="Add here">
      </div>
      <div class="form-group col-md-6">
        <label for="inputState">სქესი</label>
        <select id="inputState" class="form-control">
          <option selected value="მამრობითი">მამრობითი</option>
          <option value="მდედრობითი">მდედრობითი</option>
        </select>
      </div>
    </div>
    <button type="button" class="btn btn-primary sign-up" onClick="goToRegisterForm();">რეგისტრაცია</button>
  </form>
</article>`
}

var texts;

$(".enterToRegistraion")[0].addEventListener("click", function () {
  middle.innerHTML = enterToRegisterForm()
  texts = document.querySelectorAll(".form-group")
})

function searchBar() {
  return `<article class="hotel-card" id="hotelGenerate">
  <div class="categories-search">
    <div class="district">
      <select id="inputState" class="form-control">
        <option selected value="კატეგორიები">კატეგორიები</option>
        <option value="იმერეთი">იმერეთი</option>
        <option value="აჭარა">აჭარა</option>
        <option value="გურია">გურია</option>
        <option value="სამეგრელო">სამეგრელო</option>
        <option value="კახეთი">კახეთი</option>
        <option value="სვანეთი">სვანეთი</option>
        <option value="რაჭა">რაჭა</option>
        <option value="ქართლი">ქართლი</option>
        <option value="ყაზბეგი">ყაზბეგი</option>
        <option value="თბილისი">თბილისი</option>
      </select>
    </div>
    <article id="search-body">
      <div class="search-bar">
        <input id="search-input" type="text">
      </div>
      <div class="search-icon" onClick="searchResult();">
        <a class="search-btn" type="button"><i class="fas fa-search"></i></a>
      </div>
    </article>
  </div>
</article>`
}


$("#search-body").click(function (item) {
  if (loggedIn != true) {
    swal("გთხოვთ გაიაროთ ავტორიზაცია")
  }
})

var timeouitIndex;

function testGenerate(item) {
  middle.innerHTML = searchBar()
  if (item.length <= 5) {
    timeouitIndex = 1
  } else {
    timeouitIndex = Math.round(item.length / 10)
  }
  setTimeout(() => {
    for (var i = 0; i < item.length; i++) {
      $("#hotelGenerate")[0].innerHTML += fullCard(i + 1)
      test4(i)
      test5(i)
    }
    test155()
    $("#search-body").click(function (item) {
      if (loggedIn != true) {
        swal("გთხოვთ გაიაროთ ავტორიზაცია")
      }
    })
  }, 1500);
  function test4(i) {
    setTimeout(() => {
      hotelNAme = []
      hotelNAme = item[i].data.image.split(" - ")
      hotelNAme.pop()
      hotelIds = item[i].id
      $(".card-infos")[i].innerHTML = cardInfos(item[i]);
      for (var j = 0; j < hotelNAme.length; j++) {
        $(".carousel-indicators")[i].innerHTML += carouselIndicators(j)
        var starsRef = storageRef.child(`${hotelIds}/${hotelNAme[j]}`)
        starsRef.getDownloadURL()
          .then((url) => {
            $(".carousel-inner")[i].innerHTML += carouselImages(url)
          })
      }
    }, 300);
  }
  function test5(i) {
    setTimeout(() => {
      var imgs = document.querySelectorAll(".carousel-inner")
      var childrens = imgs[i].children
      childrens[0].classList.add("active")
    }, 2000 * timeouitIndex);
  }

}




middle.innerHTML = searchBar()
testGenerate(test3)

$(".log-in")[0].addEventListener("click", function () {
  usersArray.forEach(item => {
    if (item.data.login == loginInput.value && item.data.password == passwordInput.value) {
      if (item.data.status == "admin") {
        location.href = "./admin.html"
        localStorage.setItem("admin", JSON.stringify(item.data))
        localStorage.setItem("adminkey", item.id)
        loggedIn = true;
      } else {
        window.localStorage.setItem("user", JSON.stringify(item.data))
        nav.innerHTML = returnLoggedInMain();
        currentUser.push(item.id, item.data)
        $("#search-input").prop("disabled", false)
        loggedIn = true;
        $("#deactivate").click(function () {
          firebase.database().ref('users/' + currentUser[0]).remove();
          location.href = "./index.html"
        })
        $("#change-info").click(function () {
          middle.innerHTML = changeInfoScreen();
          $(".edit-info").click(function () {
            var isUsed = false;
            var newLogin = document.querySelector(".edit-login")
            var newMail = document.querySelector(".edit-mail")
            for (var i = 0; i < usedLogins.length; i++) {
              if (newLogin.value == usedLogins[i] || newMail.value == usedMails[i]) {
                swal("ასეთი მაილი ან ლოგინი გამოყენებულია")
                newLogin.value = "";
                newMail.value = "";
                isUsed = true;
                break
              }
            } if (Number(isUsed) == 0) {
              editInfo();
              returnAllHotels();
              swal("ინფორმაცია წარმატებით შეიცვალა")
            }
            generateUseds()
          })
        })
      }

    }
  })
  if (loggedIn != true) {
    swal("ლოგინი ან პაროლი არასწორია")
    loginInput.value = "";
    passwordInput.value = "";
  }
})



function returnAllHotels() {
  middle.innerHTML = searchBar()
  testGenerate(test3)
}



function changeInfoScreen() {
  return `<article class="registration-form">
    <form>
      <div class="form-row">
            <div class="form-group col-md-6">
                <label for="inputAddress">ლოგინი</label>
                <input type="text" class="edit-login" id="inputAddress" placeholder="Add here">
            </div>
            <div class="form-group col-md-6 newPassword">
                <label for="inputAddress2">პაროლი</label>
                <input type="password" class="edit-password" id="inputAddress2" placeholder="Add here">
            </div>
      </div>
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="inputCity">მეილი</label>
          <input type="email" class="edit-mail" id="inputCity" placeholder="Add here">
        </div>
      </div>
      <button type="button" class="btn btn-primary col-md-12 edit-info">რედაქტირება</button>
    </form>
  </article>`
}

function returnLoggedInMain() {
  return `<a type="button" class="retunMain"><h2 onClick="returnAllHotels();">Find Your Place</h2></a>
    <div class="loggined-nav">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown"
          aria-haspopup="true" aria-expanded="false">
          პროფილი(${JSON.parse(localStorage.getItem("user")).login})
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <a class="dropdown-item" id="change-info" type="button">ინფორმაციის რედაქტიირება</a>
          <a class="dropdown-item" id="deactivate" type="button">პროფილის წაშლა</a>
          <a class="dropdown-item" href="./index.html">გამოსვლა</a>
        </div>
      </li>
    </ul>
  </div>`
}




function editInfo() {
  var tmpEditInfo = [];
  var newLogin = document.querySelector(".edit-login")
  var newPassword = document.querySelector(".edit-password")
  var newMail = document.querySelector(".edit-mail")
  if (newLogin.value != "") {
    tmpEditInfo.push(newLogin.value)
  } else if (newLogin.value == "") {
    tmpEditInfo.push(currentUser[1].login)
  }
  if (newPassword.value != "") {
    tmpEditInfo.push(newPassword.value)
  } else if (newPassword.value == "") {
    tmpEditInfo.push(currentUser[1].password)
  }
  if (newMail.value != "") {
    tmpEditInfo.push(newMail.value)
  } else if (newMail.value == "") {
    tmpEditInfo.push(currentUser[1].mail)
  }
  updateInfo(currentUser[1].name, currentUser[1].surname, tmpEditInfo[0], tmpEditInfo[1], tmpEditInfo[2], currentUser[1].gender)
  $("#search-input").prop("disabled", false)
}

function updateInfo(name, surname, login, password, mail, gender,) {
  firebase.database().ref('users/' + currentUser[0]).update({
    name: name,
    surname: surname,
    login: login,
    password: password,
    mail: mail,
    gender: gender,
    status: "user"
  });
}




var ref = firebase.database().ref("hotels/").on('value', function (response) {
  response.forEach(function (item) {
    item.forEach(function (o) {
      test3.push(generateFirebaseItem(o.key, o.val()));
    })
    hotelArray.push(generateFirebaseItem(item.key, item.val()));
  });
});



var imagesOfCard;


function searchDisabled() {
  $("#search-body").click(function () {
    if (Number(loggedIn) != 1) {
      swal("გთხოვთ გაიაროთ ავტორიზაცია")
    }
  })
}

searchDisabled()




var searchedHotels;
var findHotel
function searchResult() {
  var searchInput = document.querySelector("#search-input")
  var searchName = searchInput.value
  searchedHotels = []
  if (searchName.length > 0) {
    for (var i = 0; i < test3.length; i++) {
      var dataName = test3[i].data.name
      if (dataName.search(searchName) >= 0) {
        searchedHotels.push(test3[i])
      }
    }
    if (searchedHotels.length == 0) {
      swal("ასეთი პარამეტრებით სასტუმრო არ იძებნება")
    }
  }
  else {
    swal("გთხოვთ ჩაწეროთ საძიებო სიტყვა")
  }
  if (searchedHotels.length > 0) {
    mainScreen.innerHTML = searchBar()
    testGenerate(searchedHotels)
  }
}

function getNewsCardHtml(item) {
  return `<div class="card-news">
  <div class="img-news">
    <img src="${item.image.url}" alt="">
  </div>
  <p>${item.name}</p>
  <a href="${item.newsSearchUrl}">Go ToLink</a>`
}

var left = document.querySelector(".left")
var right = document.querySelector(".right")

const data = null;

const xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === this.DONE) {
    // console.log(JSON.parse(this.responseText));
    var json = JSON.parse(this.responseText).value;
    for (var i = 0; i < json.length; i++) {
      left.innerHTML += getNewsCardHtml(json[i]);
      right.innerHTML += getNewsCardHtml(json[i]);
    }
  }
});

xhr.open("GET", "https://bing-news-search1.p.rapidapi.com/news/trendingtopics?safeSearch=Off&textFormat=Raw");
xhr.setRequestHeader("x-bingapis-sdk", "true");
xhr.setRequestHeader("x-rapidapi-key", "b0d014f33cmsh8f464475dc21954p1941d2jsn38710cbf77c3");
xhr.setRequestHeader("x-rapidapi-host", "bing-news-search1.p.rapidapi.com");

xhr.send(data);