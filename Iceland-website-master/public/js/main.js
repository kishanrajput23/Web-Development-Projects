const ham = document.querySelector('.ham-menu')
const nav = document.querySelector('.navbar')

ham.addEventListener("click",()=>{
    ham.classList.toggle('active')
    nav.classList.toggle('active')
})

const loadder = document.getElementById('preloadder')

window.addEventListener("load",()=>{
    loadder.style.display = "none";
});