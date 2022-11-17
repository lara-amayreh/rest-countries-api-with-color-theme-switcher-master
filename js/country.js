// let themeMode = document.querySelector(".theme-mode");
// const themeBtn = document.querySelector(".fa-regular");
// const back = document.querySelector(".back");
// let container = document.querySelector(".container");

window.addEventListener("load", onLoad);

function onLoad() {
  let countryObj = getitemFromLocal("Cname");
  let localTheme = getitemFromLocal("themm");
  const theme = document.getElementsByTagName("link")[0];
  let hrefSrc = theme.getAttribute("href");
  if (localTheme !== null && localTheme !== hrefSrc) {
    console.log(hrefSrc);
    theme.setAttribute("href", localTheme);
    changeIcon();
  }
  generateCard(countryObj);
}

function getitemFromLocal(key) {
  return JSON.parse(window.localStorage.getItem(key));
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

  flag.setAttribute("src", country.flags.svg);
  wrapper.append(flag);
  cname.innerHTML = country.name;

  if (country.hasOwnProperty("nativeName")) {
    nativeName.innerHTML = `<b>nativeName</b>: ${country.nativeName}`;
  } else nativeName.innerHTML = `<b>nativeName</b>:${country.name}`;
  popu.innerHTML = `<b>population</b>: ${country.population}`;
  region.innerHTML = `<b>Region</b>: ${country.region}`;
  subregion.innerHTML = `<b>SubRegion</b>: ${country.subregion}`;
  capital.innerHTML = `<b>Capital</b>: ${country.capital}`;
  wrapDiv.append(cname, desc1);
  domain.innerHTML = `<b>Top Level Domain</b>: ${country.topLevelDomain[0]}`;
  if (country.hasOwnProperty("currencies")) {
    let curun = country.currencies[0].code;

    curriences.innerHTML = `<b>Curriences</b>: ${curun}`;
  }

  const langu = country.languages;

  let lang = "";
  for (let i = 0; i < langu.length; i++) {
    lang += langu[i].name + " , ";
  }

  languages.innerHTML = `<b>languages</b> : ${lang}`;
  borderHeder.innerHTML = `<b>Border Contries</b>:`;
  if (country.hasOwnProperty("borders")) {
    for (let j = 0; j < country.borders.length && j < 3; j++) {
      let border = creatElement("div", "item");

      border.innerHTML = country.borders[j];
      desc4.append(border);
    }
    desc3.append(borderHeder, desc4);
  }
  desc1.append(nativeName, popu, region, subregion, capital);
  desc2.append(domain, curriences, languages);
  wrapDiv.append(desc1, desc2);
  descWrapper.append(cname, wrapDiv, desc3);
  wrapper.append(descWrapper);
  container.append(wrapper);
}
let back = document.querySelector(".back");
back.addEventListener("click", function () {
  window.location = "./index.html";
});
