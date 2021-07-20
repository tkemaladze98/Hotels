const plus = document.querySelector("#plusBtn");
var imageInputs = document.querySelector("#imageUpload");
const registerInputs = document.querySelectorAll("#inputState")
const mainScreen = document.querySelector(".midle")
const hotelId = document.querySelector("#idInput")
const addHotel = document.querySelector(".click")
const cardSection = document.querySelector(".categories-cards")




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
var database = firebase.database();
const storageRef = firebase.storage().ref();

var test3 = []
var hotelIds;
var hotelNAme;
var usedLogins = [];
var usedMails = [];
var currentUser = [];




var ref = firebase.database().ref("hotels/").on('value', function (response) {
    response.forEach(function (item) {
        item.forEach(function (o) {
            test3.push(generateFirebaseItem(o.key, o.val()));
        })
        hotelArray.push(generateFirebaseItem(item.key, item.val()));
    });
});


currentUser.push(localStorage.getItem("adminkey"), JSON.parse(localStorage.getItem("admin")))

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



function returnAllHotels() {
    location.href = "./admin.html"
}

var timeouitIndex;

function generateAllHotels(item) {
    mainScreen.innerHTML = searchBar()
    setTimeout(() => {
        for (var i = 0; i < item.length; i++) {
            $("#hotelGenerate")[0].innerHTML += fullCard(i + 1)
            test4(i)
            test5(i)
        }
        if (item.length <= 5) {
            timeouitIndex = 1
          } else {
            timeouitIndex = Math.round(item.length / 10)
          }
        test155()
        setTimeout(() => {
            forForTestBtns()
        }, 2000 * Math.ceil(test3.length / 10));
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

var tmp;



mainScreen.innerHTML = searchBar()
generateAllHotels(test3)

function carouselIndicators(item) {
    return `<li data-target="#carouselExampleIndicators" data-slide-to="${item}" class="active"></li>`
}
function cardInfos(item) {
    return `<h5 class="card-title">${item.data.name}</h5>
    <p class="card-text">${item.data.adress}</p>
    <p class="card-text">${item.data.price} Gel</p>
    <p class="card-text">${item.data.district}</p>
    <p class="card-text">${item.data.description}</p>
    <button type="button" class="btn btn-warning " id="${item.id}">რედაქტირება</button>
    <button type="button" class="btn btn-danger " id="${item.id}" >წაშლა</button>`
}

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



function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function writeHotelData(name, adress, district, price, description, image, imageLength) {
    firebase.database().ref(`hotels/${district}/${$("#idInput")[0].value}`).set({
        name: name,
        adress: adress,
        district: district,
        price: price,
        description: description,
        image: image,
        imageLength: imageLength
    });
}


function exportHotelsInfoToBase() {
    var texts = document.querySelectorAll("#inputState")
    var uploadedImage = document.querySelectorAll("#imageUpload")
    var name = texts[0].value
    var adress = texts[1].value
    var district = texts[2].value
    var price = texts[3].value
    var description = texts[4].value
    var imageFiles = ""
    for (var i = 0; i < imageCounts; i++) {
        imageFiles += uploadedImage[i].files[0].name + " - "
    }
    writeHotelData(name, adress, district, price, description, imageFiles, imageCounts);
}


var checkInputs;
function addHotelTobase() {
    var texts = document.querySelectorAll("#inputState")
    checkInputs = false
    if (texts[0].value != "" && texts[1].value != "" && texts[2].value != "" && texts[3].value != "" && texts[4].value != "") {
        checkInputs = true;
    }
    if (Number(checkInputs) == 1) {
        exportHotelsInfoToBase()
        uploadFile()
        swal("Good job!", "სასტუმრო წარმატებით დაემატა", "success")
        mainScreen.innerHTML = hotelRegisterForm()
    } else {
        swal("გთხოვთ შეავსოთ ყველა ველი")
    }

}

$(".sign-out").click(function () {
    localStorage.clear();

})

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

$(".change-info").click(function () {
    $(".left").addClass("displaynone")
    $(".right").addClass("displaynone")
    mainScreen.classList.add("marginauto")
    mainScreen.innerHTML = changeInfoScreen();
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

$("#deactivate").click(function () {
    firebase.database().ref('users/' + currentUser[0]).remove();
    location.href = "./user.html"
})

function clickToGenerateId() {
    $("#idInput")[0].value = uuidv4();
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


function midleScreen() {
    return `<div class="left">
        
        
    </div>
    <div class="midle">
    <article class="hotel-card" id="hotelGenerate">
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
  </article>
    </div>
    <div class="right">

    </div>`
}

function doSomething() {
    $(".left").addClass("displaynone")
    $(".right").addClass("displaynone")
    mainScreen.classList.add("marginauto")
    mainScreen.innerHTML = hotelRegisterForm()
}



function hotelRegisterForm() {
    return `<article class="art">
    <div class="form-group">
      <div class="hotel-id">
        <div>
          <label for="id">Hotel Id</label>
          <input type="text" name="id" disabled id="idInput">
        </div>
        <button type="button" class="btn btn-secondary generate-id" onClick="clickToGenerateId();">Generate</button>
      </div>
      <div class="hotel-name">
        <label for="name">სათაური</label>
        <input type="text" name="name" placeholder="Add here" id="inputState">
      </div>
      <div class="hotel-name">
        <label for="adress">მისამართი</label>
        <input type="text" name="adress" placeholder="Add here" id="inputState">
      </div>
      <div class="district" style="width:100%;">
        <label for="inputState">რაიონი</label>
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
      <div class="hotel-name">
        <label for="price">ფასი</label>
        <input type="number" name="price" placeholder="Add price (GEL)" id="inputState">
      </div>
      <div>
        <label for="exampleFormControlTextarea1">აღწერა</label>
        <textarea class="form-control" id="inputState"></textarea>
      </div>
    </div>
    <div class="form-group image" id="image">
      <label for="image">სურათი</label>
      <input id="imageUpload" type="file" name="image" placeholder="Enter Image Url">
    </div>
    <div class="plus" onClick="addMorePhoto();">
      <a type="button" id="plusBtn" ><i class="fas fa-plus-circle"></i></a>
    </div>
    <button type="submit" class="click" onClick="addHotelTobase();">დამატება</button>
  </article>`
}

var adminName = JSON.parse(localStorage.getItem("admin")).name
var adminSurname = JSON.parse(localStorage.getItem("admin")).surname
var adminLogin = JSON.parse(localStorage.getItem("admin")).login
var adminPassword = JSON.parse(localStorage.getItem("admin")).password
var adminMail = JSON.parse(localStorage.getItem("admin")).mail
var adminGender = JSON.parse(localStorage.getItem("admin")).gender
var adminKey = localStorage.getItem("adminkey")



function updateInfo(name, surname, login, password, mail, gender,) {
    firebase.database().ref('users/' + adminKey).update({
        name: name,
        surname: surname,
        login: login,
        password: password,
        mail: mail,
        gender: gender,
        status: "admin"
    });
}



$("#navbarDropdown")[0].textContent = `პროფილი(${adminName})`



function generateFirebaseItem(key, value) {
    return {
        id: key,
        data: value
    }
}

var hotelArray = []
var searchedHotels;
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
        generateAllHotels(searchedHotels)
    }
}




function uploadFile() {
    imageInputs = document.querySelectorAll("#imageUpload");
    for (var i = 0; i < imageCounts; i++) {
        var file = imageInputs[i].files[0]
        var fileName = file.name;
        var storageRef = firebase.storage().ref(`${$("#idInput")[0].value}/` + fileName)
        var uploadTask = storageRef.put(file)
    }
}






var imageCounts = 1;


function addMorePhoto() {
    var image = document.querySelector("#image");
    image.innerHTML += imageinner()
    imageInputs = document.querySelectorAll("#imageUpload");
    imageCounts = imageInputs.length
}

function imageinner() {
    return `<label for="image">სურათი</label>
    <input id="imageUpload" type="file" name="image" placeholder="Enter Image Url">`
}





function editHotelForm() {
    return `<article class="art">
    <div class="form-group">
      <div class="hotel-name">
        <label for="name">სათაური</label>
        <input type="text" name="name" placeholder="Add here" id="inputState">
      </div>
      <div class="hotel-name">
        <label for="adress">მისამართი</label>
        <input type="text" name="adress" placeholder="Add here" id="inputState">
      </div>
      <div class="district">
        <label for="inputState">რაიონი</label>
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
          <option value="ქარელი">ქარელი</option>
        </select>
      </div>
      <div class="hotel-name">
        <label for="price">ფასი</label>
        <input type="number" name="price" placeholder="Add price (GEL)" id="inputState">
      </div>
      <div>
        <label for="exampleFormControlTextarea1">აღწერა</label>
        <textarea class="form-control" id="inputState"></textarea>
      </div>
    </div>
    <button type="submit" class="click" onClick="editInfoToBase();">დამატება</button>
  </article>`
}


test155()
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
                generateAllHotels(filteredHotels)
            } else {
                swal("ეს კატეგორია ცარიელია")
            }
        });

    });
}

function deleteHotel(item, id) {
    firebase.database().ref(`hotels/${item}/${id}`).remove();
}

function deleteImages() {
    var desertRef = storageRef.child(`/${currentid}/${splitedImageNAme[0]}`).delete()
}


function updateHotelData(name, adress, district, price, description, image, id) {
    firebase.database().ref(`hotels/${tmpEditInfo[2]}/${id}`).update({
        name: name,
        adress: adress,
        district: district,
        price: price,
        description: description,
        image: image,
    });
}

var currentName;
var currentAdress;
var currentDistrict;
var currentPrice;
var currentDescription;
var currentImageName;
var currentid;
var splitedImageNAme;
var currentHotelData = []
var tmpEditInfo = []
function testbton(item) {
    $(".btn-warning")[item].addEventListener("click", function () {
        currentid = $(".btn-warning")[item].id
        mainScreen.innerHTML = enterToEditHotelInfo()
        $(".click").click(function () {
            currentHotelData = []
            test3.forEach(function (item) {
                if (currentid == item.id) {
                    currentName = item.data.name
                    currentAdress = item.data.adress
                    currentDistrict = item.data.district
                    currentPrice = item.data.price
                    currentDescription = item.data.description
                    currentImageName = item.data.image
                    currentHotelData.push(currentName, currentAdress, currentDistrict, currentPrice, currentDescription)
                }
            })
            var uploadedImage = document.querySelectorAll("#imageUpload")
            var texts = document.querySelectorAll("#inputState")
            if ($("input")[3].files.length > 0) {
                for (var i = 0; i < imageCounts; i++) {
                    currentImageName += uploadedImage[i].files[0].name + " - "
                }
                uploadedImage.forEach(function (item) {
                    firebase.storage().ref(`${currentid}/${item.files[0].name}`).put(item.files[0])
                })
            }
            tmpEditInfo = [];
            for (var i = 0; i < texts.length; i++) {
                if (texts[i].value != "") {
                    tmpEditInfo.push(texts[i].value)
                } else {
                    tmpEditInfo.push(currentHotelData[i])
                }
            }
            if (currentDistrict != texts[2]) {
                deleteHotel(currentDistrict, currentid)
                updateHotelData(tmpEditInfo[0], tmpEditInfo[1], tmpEditInfo[2], tmpEditInfo[3], tmpEditInfo[4], currentImageName, currentid)
            } else {
                updateHotelData(tmpEditInfo[0], tmpEditInfo[1], tmpEditInfo[2], tmpEditInfo[3], tmpEditInfo[4], currentImageName, currentid)
            }
            // location.href = "./admin.html"
            swal("ინფორამცია რედაქტირებულია")
        })
    })
}

function deleteBtns(item) {
    $(".btn-danger")[item].addEventListener("click", function () {
        currentid = $(".btn-danger")[item].id
        test3.forEach(function (item) {
            if (currentid == item.id) {
                currentDistrict = item.data.district
                currentImageName = item.data.image
                splitedImageNAme = currentImageName.split(" - ")
                splitedImageNAme.pop()
                console.log(splitedImageNAme[0], currentid)
            }
        })
        splitedImageNAme.forEach(function (item) {
            storageRef.child(`${currentid}/${item}`).delete();
        })
        deleteHotel(currentDistrict, currentid);
        setTimeout(() => {
            returnAllHotels();
        }, 300);

    })
}


function forForTestBtns() {
    for (var i = 0; i < $(".btn-warning").length; i++) {
        testbton(i)
        deleteBtns(i)
    }
}


function enterToEditHotelInfo() {
    return `<article class="art">
    <div class="form-group">
      <div class="hotel-name">
        <label for="name">სათაური</label>
        <input type="text" name="name" placeholder="Add here" id="inputState">
      </div>
      <div class="hotel-name">
        <label for="adress">მისამართი</label>
        <input type="text" name="adress" placeholder="Add here" id="inputState">
      </div>
      <div class="district">
        <label for="inputState">რაიონი</label>
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
      <div class="hotel-name">
        <label for="price">ფასი</label>
        <input type="number" name="price" placeholder="Add price (GEL)" id="inputState">
      </div>
      <div>
        <label for="exampleFormControlTextarea1">აღწერა</label>
        <textarea class="form-control" id="inputState"></textarea>
      </div>
    </div>
    <div class="form-group image" id="image">
    <label for="image">სურათი</label>
    <input id="imageUpload" type="file" name="image" placeholder="Enter Image Url">
    </div>
    <div class="plus" onClick="addMorePhoto();">
        <a type="button" id="plusBtn" ><i class="fas fa-plus-circle"></i></a>
    </div> 
    <button type="submit" class="click">დამატება</button>
  </article>`
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
        for(var i = 0; i < json.length; i ++){
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
