let careetDown = document.querySelector(".fa-caret-down");
let menu = document.querySelector(".menu");
let listitems = document.querySelectorAll(".menu li");
let filterText = document.querySelector(".filter-txt");
let themeMode = document.querySelector(".theme-mode");
const themeBtn = document.querySelector(".fa-regular");
let cardscontainer = document.querySelector(".cards-container");
let search = document.getElementById("search");
let customselect = document.querySelector(".custom-select");

window.addEventListener("load", onLoad);
function searchByName() {
  const cname = search.value.toLowerCase();
  const contries = document.querySelectorAll(".card .cnme");
  console.log(contries, cname);
  for (let i = 0; i < contries.length; i++) {
    if (contries[i].textContent.toLowerCase().includes(cname))
      contries[i].parentElement.style.display = "block";
    else contries[i].parentElement.style.display = "none";
  }
}

function toogletheme() {
  var theme = document.getElementsByTagName("link")[0];
  if (theme.getAttribute("href") == "css/light.css") {
    theme.setAttribute("href", "css/dark.css");
  } else {
    theme.setAttribute("href", "css/light.css");
  }
  localStorage.setItem("themm", JSON.stringify(theme.getAttribute("href")));
}

// api

function generateCard(country) {
  let card = document.createElement("div");
  card.classList.add("card");
  let flag = document.createElement("img");
  flag.classList.add("flag");
  flag.setAttribute("src", country.flags.svg);
  card.append(flag);
  let cname = document.createElement("h4");
  cname.classList.add("cnme");
  cname.innerHTML = country.name;
  card.append(cname);
  let desc = document.createElement("div");
  desc.classList.add("desc");
  let popu = document.createElement("p");
  popu.classList.add("popu");
  popu.innerHTML = `<b>population</b>: ${country.population}`;
  let region = document.createElement("p");
  region.classList.add("region");
  region.innerHTML = `<b>Region</b>: ${country.region}`;
  let capital = document.createElement("p");
  capital.classList.add("capital");
  capital.innerHTML = `<b>Capital</b>: ${country.capital}`;
  desc.append(popu);
  desc.append(region);
  desc.append(capital);
  card.append(desc);
  cardscontainer.append(card);

  card.addEventListener("click", function () {
    let couName = country;
    window.localStorage.setItem("Cname", JSON.stringify(couName));
    console.log(couName);
    window.location = "./country.html";
  });
}
function cardDetails() {
  const natname = this.querySelector(".cnme");
  console.log(natname);
  // couName = natname.innerHTML;
  //  window.localStorage.setItem("Cname", JSON.stringify(couName));
  window.location = "./country.html";
}

function onLoad() {
  var theme = document.getElementsByTagName("link")[0];
  let th = JSON.parse(window.localStorage.getItem("themm"));
  console.log(th);
  theme.setAttribute("href", th);

  let t = theme.getAttribute("href");
  window.localStorage.setItem("themm", JSON.stringify(t));
  // console.log(y);
  const xhr = new XMLHttpRequest();
  const apiUrl = "https://restcountries.com/v2/all/";
  xhr.open("GET", apiUrl, true);
  xhr.onload = getcountries;

  xhr.send();
}

function getcountries() {
  if (this.status === 200) {
    const countries = JSON.parse(this.responseText);
    console.log(countries);
    for (let i = 0; i < countries.length; i++) {
      generateCard(countries[i]);
    }
  }
}

function filter(region) {
  const contries = document.querySelectorAll(".card .region");
  console.log(contries.length);
  for (let i = 0; i < contries.length; i++) {
    if (!contries[i].textContent.includes(region))
      contries[i].parentElement.parentElement.style.display = "none";
    else contries[i].parentElement.parentElement.style.display = "block";
  }
}

listitems.forEach((element) => {
  element.addEventListener("click", function () {
    filterText.innerHTML = element.innerHTML;
    element.parentElement.parentElement.classList.remove("desplay-menu");
    filter(element.innerHTML);
  });
});

search.addEventListener("keyup", searchByName);

let themechange = document.querySelector(".theme");
themechange.addEventListener("click", function () {
  if (themeBtn.classList.contains("fa-moon")) {
    themeBtn.classList.replace("fa-moon", "fa-sun");
    themeMode.innerHTML = "Light Mood";
  } else {
    themeBtn.classList.replace("fa-sun", "fa-moon");
    themeMode.innerHTML = "Dark Mood";
  }
  toogletheme();
});
customselect.addEventListener("click", function () {
  menu.classList.toggle("desplay-menu");
});
