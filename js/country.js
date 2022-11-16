let themeMode = document.querySelector(".theme-mode");
const themeBtn = document.querySelector(".fa-regular");
const back = document.querySelector(".back");
let container = document.querySelector(".container");

window.addEventListener("load", onLoad);

function onLoad() {
  let countryObj = getitemFromLocal("Cname");
  let localTheme = getitemFromLocal("themm");
  var theme = document.getElementsByTagName("link")[0];
  if (localTheme != theme.getAttribute("href")) {
    theme.setAttribute("href", localTheme);
    changeIcon();
  }
  generateCard(countryObj);
}

function getitemFromLocal(key) {
  return JSON.parse(localStorage.getItem(key));
}
function saveOnLocal(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

let themechange = document.querySelector(".theme");
themechange.addEventListener("click", function () {
  changeIcon();
  toogletheme();
});

function changeIcon() {
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

function creatElement(tag, eclass) {
  let Element = document.createElement(tag);
  Element.classList.add(eclass);
  return Element;
}

function generateCard(country) {
  console.log(country);

  let container = document.querySelector(".container");

  let wrapper = creatElement("div", "wrapper");
  let flag = creatElement("img", "flag");
  let descWrapper = creatElement("div", "descWrapper");
  let cname = creatElement("h3", "cnme");
  let wrapDiv = creatElement("div", "wrapDiv");
  let desc1 = creatElement("p", "desc");
  let nativeName = creatElement("p", "popu");
  let popu = creatElement("p", "popu");
  let region = creatElement("p", "popu");
  let subregion = creatElement("p", "popu");
  let capital = creatElement("p", "popu");
  let desc2 = creatElement("p", "desc");
  let domain = creatElement("p", "popu");
  let curriences = creatElement("p", "popu");
  let languages = creatElement("p", "popu");
  let borderHeder = creatElement("p", "borderheder");
  let desc4 = creatElement("p", "desc4");
  let desc3 = creatElement("p", "desc3");

  //   let card = document.createElement("div");
  //   card.classList.add("Card");
  //   let flag = document.createElement("img");
  //   flag.classList.add("flag");
  flag.setAttribute("src", country.flags.svg);
  wrapper.append(flag);

  //   let descWrapper = document.createElement("div");
  //   descWrapper.classList.add("descWrapper");
  //   let cname = document.createElement("h3");
  //   cname.classList.add("cnme");
  cname.innerHTML = country.name;

  //   let wrapDiv = document.createElement("div");
  //   wrapDiv.classList.add("wrapDiv");

  //   let desc1 = document.createElement("div");
  //   desc1.classList.add("desc");

  //   let nativeName = document.createElement("p");
  // nativeName.classList.add("popu");
  if (country.hasOwnProperty("nativeName")) {
    nativeName.innerHTML = `<b>nativeName</b>: ${country.nativeName}`;
  } else nativeName.innerHTML = `<b>nativeName</b>:${country.name}`;

  //   let popu = document.createElement("p");
  // popu.classList.add("popu");
  popu.innerHTML = `<b>population</b>: ${country.population}`;

  //   let region = document.createElement("p");
  // region.classList.add("region");
  region.innerHTML = `<b>Region</b>: ${country.region}`;

  //   let subregion = document.createElement("p");
  // subregion.classList.add("region");
  subregion.innerHTML = `<b>SubRegion</b>: ${country.subregion}`;

  //   let capital = document.createElement("p");
  // capital.classList.add("capital");
  capital.innerHTML = `<b>Capital</b>: ${country.capital}`;
  wrapDiv.append(cname, desc1);
  //desc2
  //   let desc2 = document.createElement("div");
  //   desc2.classList.add("desc");

  //   let domain = document.createElement("p");
  // domain.classList.add("popu");
  domain.innerHTML = `<b>Top Level Domain</b>: ${country.topLevelDomain[0]}`;

  //   let curriences = document.createElement("p");
  // curriences.classList.add("popu");

  if (country.hasOwnProperty("currencies")) {
    let curun = country.currencies[0].code;

    curriences.innerHTML = `<b>Curriences</b>: ${curun}`;
  }

  //   let languages = document.createElement("p");
  // languages.classList.add("region");
  const langu = country.languages;

  let lang = "";
  for (let i = 0; i < langu.length; i++) {
    lang += langu[i].name + " , ";
  }

  languages.innerHTML = `<b>languages</b> : ${lang}`;
  //   let borderHeder = document.createElement("div");
  //   desc3.classList.add("desc3");
  borderHeder.innerHTML = `<b>Border Contries</b>:`;
  //   let desc4 = document.createElement("div");
  //   desc4.classList.add("desc4");
  if (country.hasOwnProperty("borders")) {
    for (let j = 0; j < country.borders.length && j < 3; j++) {
      let border = creatElement("div", "item");
      //   document.createElement("div");
      //   border.classList.add("item");
      border.innerHTML = country.borders[j];
      desc4.append(border);
    }
    desc3.append(borderHeder, desc4);
  }

  desc1.append(nativeName);
  desc1.append(popu);
  desc1.append(region);
  desc1.append(subregion);
  desc1.append(capital);
  desc2.append(domain, curriences, languages);
  wrapDiv.append(desc1, desc2);
  descWrapper.append(cname, wrapDiv, desc3);
  wrapper.append(descWrapper);
  container.append(wrapper);
}

back.addEventListener("click", function () {
  window.location = "./index.html";
});

// // var retrievedObject = localStorage.getItem('testObject');
// // console.log('retrievedObject: ', JSON.parse(retrievedObject));
// let x = JSON.parse(window.localStorage.getItem('Cname'));
// const xhr = new XMLHttpRequest();
// const apiUrl = `https://restcountries.com/v3.1/name/${x}`;
// xhr.open("GET", apiUrl, true);
// xhr.onload = function () {
//     if (this.status === 200) {
//         const countries = JSON.parse(this.responseText);

//         console.log(countries[0]);
//         generateCard(countries);
//     }
// }
// xhr.send();
