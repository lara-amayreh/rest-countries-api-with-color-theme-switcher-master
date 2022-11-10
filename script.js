let careetDown = document.querySelector(".fa-caret-down");
let menu = document.querySelector(".menu");
let listitems = document.querySelectorAll(".menu li");
let filterText = document.querySelector(".filter-txt");
let themeMode = document.querySelector(".theme-mode");
const themeBtn = document.querySelector(".fa-regular");
let cardscontainer = document.querySelector(".cards-container");

window.addEventListener("load", onLoad);

function toogletheme() {
  var theme = document.getElementsByTagName("link")[0];
  if (theme.getAttribute("href") == "css/light.css") {
    theme.setAttribute("href", "css/dark.css");
  } else {
    theme.setAttribute("href", "css/light.css");
  }
}

themeBtn.addEventListener("click", function () {
  if (themeBtn.classList.contains("fa-moon")) {
    themeBtn.classList.replace("fa-moon", "fa-sun");
    themeMode.innerHTML = "Light Mood";
  } else {
    themeBtn.classList.replace("fa-sun", "fa-moon");
    themeMode.innerHTML = "Dark Mood";
  }
  toogletheme();
});
careetDown.addEventListener("click", function () {
  menu.classList.toggle("desplay-menu");
});
listitems.forEach((element) => {
  element.addEventListener("click", function () {
    filterText.innerHTML = element.innerHTML;
    menu.classList.toggle("desplay-menu");
    filter(element.innerHTML);
  });
});
// api

function generateCard(country) {
  let card = document.createElement("div");
  card.classList.add("card");
  let flag = document.createElement("img");
  flag.classList.add("flag");

  flag.setAttribute("src", country.flag);
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
}

function onLoad() {
  const xhr = new XMLHttpRequest();
  const apiUrl = "https://restcountries.com/v2/all/";

  xhr.open("GET", apiUrl, true);
  xhr.onload = getcountries;
  xhr.send();
}

function getcountries() {
  if (this.status === 200) {
    const countries = JSON.parse(this.responseText);
    for (let i = 0; i < 8; i++) {
      generateCard(countries[i]);
    }
  }
}

function getfiltercountries() {
  if (this.status === 200) {
    const countries = JSON.parse(this.responseText);
    console.log(countries);
    let name = document.querySelectorAll(".cnme");
    let flag = document.querySelectorAll(".flag");
    let popul = document.querySelectorAll(".popu");
    let region = document.querySelectorAll(".region");
    let capital = document.querySelectorAll(".capital");
    for (let i = 0; i < 8; i++) {
      name[i].innerHTML = countries[i].name.common;
      flag[i].setAttribute("src", countries[i].flags.svg);
      popul[i].innerHTML = `<b>population</b>: ${countries[i].population}`;
      region[i].innerHTML = `<b>region</b>: ${countries[i].region}`;
      capital[i].innerHTML = `<b>capital</b>: ${countries[i].capital}`;

      console.log(countries[i]);
    }
  }
}

function filter(country) {
  const xhr = new XMLHttpRequest();
  const apiUrl = `https://restcountries.com/v3.1/region/${country}`;
  xhr.open("GET", apiUrl, true);
  xhr.onload = getfiltercountries;
  xhr.send();
  // console.log(country);
}
