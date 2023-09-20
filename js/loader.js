function pageLoaded() {
    setTimeout(() => {
        let loaderSection = document.querySelector(".loader_section");
        loaderSection.classList.add("loaded");
    }, 100);
    let body = document.querySelector(".body");
    body.classList.add("show");
}
  
document.onload = pageLoaded();