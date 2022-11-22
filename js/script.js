function onLoad() {
  let theme = document.getElementsByTagName("link")[0];
  let th = JSON.parse(localStorage.getItem("themm"));
  if (th !== theme.getAttribute("href") && th !== null) {
    console.log(th,theme.getAttribute("href"));
    theme.setAttribute("href", th);
    changeIcon();
  }
  httpRequest();
}
function changeIcon() {
  let themeMode = document.querySelector(".theme-mode");
  const themeBtn = document.querySelector(".fa-regular");
  if (themeBtn.classList.contains("fa-moon")) {
    themeBtn.classList.replace("fa-moon", "fa-sun");
    themeMode.innerHTML = "Light Mood";
  } else {
    themeBtn.classList.replace("fa-sun", "fa-moon");
    themeMode.innerHTML = "Dark Mood";
  }
}

function toogletheme() {
  let theme = document.getElementsByTagName("link")[0];
  if (theme.getAttribute("href") == "css/light.css") {
    theme.setAttribute("href", "css/dark.css");
  } else {
    theme.setAttribute("href", "css/light.css");
  }
  saveOnLocal("themm", theme.getAttribute("href"));
}
async function httpRequest() {
  // const xhr = new XMLHttpRequest();
  const apiUrl = "https://restcountries.com/v2/all/";
  let response = await fetch(apiUrl).then((response) => response.json());
  console.log(response);
  getcountries(response);
  // xhr.open("GET", apiUrl, true);
  // xhr.onload = getcountries;
  // xhr.send();
}
function saveOnLocal(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
function searchByName() {
  let search = document.getElementById("search");
  let searchValue = search.value.toLowerCase();
  let contriesNames = document.querySelectorAll(".card .cnme");

  console.log(contriesNames, searchValue);
  for (let i = 0; i < contriesNames.length; i++) {
    if (contriesNames[i].textContent.toLowerCase().includes(searchValue))
      contriesNames[i].parentElement.setAttribute("style", "display:flex");
    else contriesNames[i].parentElement.setAttribute("style", "display:none");
  }
}

function generateCard(country) {
  let cardscontainer = document.querySelector(".cards-container");
  let card = creatElement("div", "card");
  let flag = creatElement("img", "flag");
  let cname = creatElement("h4", "cnme");
  let desc = creatElement("div", "desc");
  let popu = creatElement("p", "popu");
  let region = creatElement("p", "region");
  let capital = creatElement("p", "capital");

  flag.setAttribute("src", country.flags.svg);
  flag.setAttribute("alt",`flag of ${country.name}`);
  cname.innerHTML = country.name;
  popu.innerHTML = `<b>population</b>: ${country.population}`;
  region.innerHTML = `<b>Region</b> : ${country.region}`;
  capital.innerHTML = `<b>Capital</b>: ${country.capital}`;
  desc.append(popu, region, capital);
  card.append(flag, cname, desc);
  cardscontainer.append(card);
  card.addEventListener("click",()=> {
    let couName = country;
    saveOnLocal("Cname",country.alpha3Code);
    console.log(country.alpha3Code);
           window.location = "./country.html";
  });
}

function creatElement(tag, eclass) {
  let Element = document.createElement(tag);
  Element.classList.add(eclass);
  return Element;
}

function getcountries(countries) {
  // if (this.status === 200) {
  //   const countries = JSON.parse(this.responseText);
    for (let i = 0; i < countries.length; i++) {
      generateCard(countries[i]);
    }
  }


function filter(region) {
  const contries = document.querySelectorAll(".card .region");
  for (let i = 0; i < contries.length; i++) {
    if (!contries[i].textContent.includes(region))
      contries[i].parentElement.parentElement.style.display = "none";
    else contries[i].parentElement.parentElement.style.display = "flex";
  }
}

window.addEventListener("load", onLoad);

let listitems = document.querySelectorAll(".menu li");
let filterText = document.querySelector(".filter-txt");
listitems.forEach((element) => {
  element.addEventListener("click",()=> {
    filterText.innerHTML = element.innerHTML;
    element.parentElement.parentElement.classList.remove("desplay-menu");
    filter(element.innerHTML);
  });
});

let search = document.getElementById("search");
search.addEventListener("keyup", searchByName);

let themechange = document.querySelector(".theme");
themechange.addEventListener("click",()=> {
  changeIcon();
  toogletheme();
});

let customselect = document.querySelector(".custom-select");
let menu = document.querySelector(".menu");
customselect.addEventListener("click", ()=> {
  menu.classList.toggle("desplay-menu");
});
