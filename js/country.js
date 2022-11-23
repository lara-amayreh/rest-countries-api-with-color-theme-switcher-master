window.addEventListener("load", onLoad);

function onLoad() {
  let PassedData = window.location.href;
  let passeValue = PassedData.slice(PassedData.lastIndexOf("=") + 1);
  console.log(passeValue);
  let localTheme = getitemFromLocal("themm");
  const theme = document.getElementsByTagName("link")[0];
  let hrefSrc = theme.getAttribute("href");
  if (localTheme !== null && localTheme !== hrefSrc) {
    console.log(hrefSrc);
    theme.setAttribute("href", localTheme);
    changeIcon();
  }
  fetchData(passeValue);
}
async function fetchData(countryObj) {
  let url = countryObj;
  let response = await fetch(
    `https://restcountries.com/v3.1/alpha/${url}`
  ).then((response) => response.json());
  console.log(response[0]);
  generateCard(response[0]);
}

function getitemFromLocal(key) {
  return JSON.parse(window.localStorage.getItem(key));
}

function saveOnLocal(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

let themechange = document.querySelector(".theme");
themechange.addEventListener("click", () => {
  changeIcon();
  toogletheme();
});

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
  let cname = creatElement("h3", "cname");
  let wrapDiv = creatElement("div", "wrapDiv");
  let desc1 = creatElement("p", "desc1");
  let nativeName = creatElement("p", "popu");
  let popu = creatElement("p", "popu");
  let region = creatElement("p", "popu");
  let subregion = creatElement("p", "popu");
  let capital = creatElement("p", "popu");
  let desc2 = creatElement("p", "desc1");
  let domain = creatElement("p", "popu");
  let curriences = creatElement("p", "popu");
  let languages = creatElement("p", "popu");
  let borderHeder = creatElement("p", "borderheder");
  let desc4 = creatElement("p", "desc4");
  let desc3 = creatElement("p", "desc3");

  flag.setAttribute("src", country.flags.svg);
  flag.setAttribute("alt", `flag of ${country.name}`);
  wrapper.append(flag);
  cname.innerHTML = country.name.common;
  if (country.name.hasOwnProperty("nativeName")) {
    let NativeName = Object.values(country.name.nativeName)[0].common;
    nativeName.innerHTML = `<b>nativeName</b>: ${NativeName}`;
  } else {
   nativeName.innerHTML = `<b>nativeName</b>:${country.name.common}`;
    console.log("no");
  }
  popu.innerHTML = `<b>population</b>: ${country.population}`;
  region.innerHTML = `<b>Region</b>: ${country.region}`;
  subregion.innerHTML = `<b>SubRegion</b>: ${country.subregion}`;
  capital.innerHTML = `<b>Capital</b>: ${country.capital}`;
  wrapDiv.append(cname, desc1);
  domain.innerHTML = `<b>Top Level Domain</b>: ${country.tld[0]}`;
  if(country.hasOwnProperty("currencies")) {
  let curun = Object.values(country.currencies)[0];
  console.log(curun);
  curriences.innerHTML = `<b>Curriences</b>: ${curun.name}`;}
  if (country.hasOwnProperty("languages")) {
  const langu = Object.values(country.languages);
  languages.innerHTML = `<b>languages</b> : ${langu}`;}
  borderHeder.innerHTML = `<b>Border Contries</b>:`;
  if (country.hasOwnProperty("borders")) {
    for (let j = 0; j < country.borders.length && j < 4; j++) {
      let border = creatElement("div", "item");
      border.innerHTML = country.borders[j];
      desc4.append(border);
      border.addEventListener("click", viewBorder);
    }
    desc3.append(borderHeder, desc4);
  } else desc3.append(borderHeder, "country has no borders");
  desc1.append(nativeName, popu, region, subregion, capital);
  desc2.append(domain, curriences, languages);
  wrapDiv.append(desc1, desc2);
  descWrapper.append(cname, wrapDiv, desc3);
  wrapper.append(descWrapper);
  container.append(wrapper);
}
let back = document.querySelector(".back");
back.addEventListener("click", () => {
  history.back();
});

async function viewBorder() {
  let data = this.innerHTML;
  let url = "./country.html?data=" + encodeURIComponent(data);
  console.log(url);
  window.location.href = url;
}
