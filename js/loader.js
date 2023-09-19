function pageLoaded() {
    let loaderSection = document.querySelector(".loader_section");
    loaderSection.classList.add("loaded");
    let body = document.querySelector(".body");
    body.classList.add("show")
}
  
document.onload = pageLoaded();