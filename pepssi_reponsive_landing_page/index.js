/* Slider */
function imgSlider(anything){
    document.querySelector('.pepsi').src = anything;
}

/*  color */
function changeBgColor(color){
    const sec = document.querySelector('.sec');
    sec.style.background = color;
}

/* Menu Responsive */

function menuToggle(){
    const toggleMenu = document.querySelector('.toggleMenu');
    const navigation = document.querySelector('.navigation');
    toggleMenu.classList.toggle('active');
    navigation.classList.toggle('active');
}