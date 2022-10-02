/*************Nav Bar**************/
const toggleButton = document.getElementsByClassName('toggle-button')[0]
const navbarLinks = document.getElementsByClassName('navbar-links')[0]

toggleButton.addEventListener('click', () => {
  navbarLinks.classList.toggle('active')
})



      /*-------SLIDES-----------*/
      var slideIndex = 0;
            showSlides();
            
            function showSlides() {
              var i;
              var slides = document.getElementsByClassName("mySlides");
              var dots = document.getElementsByClassName("dot");
              for (i = 0; i < slides.length; i++) {
                slides[i].style.display = "none";  
              }
              slideIndex++;
              if (slideIndex > slides.length) {slideIndex = 1}    
              for (i = 0; i < dots.length; i++) {
                dots[i].className = dots[i].className.replace(" active", "");
              }
              slides[slideIndex-1].style.display = "block";  
              dots[slideIndex-1].className += " active";
              setTimeout(showSlides, 2000); // Change image every 2 seconds
            }



/*-------Testimonial------*/
var swiper = new Swiper(".mySwiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 100,
      modifier: 2,
      slideShadows: true,
    },
    
    /*loop: true,*/
    pagination: {
      el: ".swiper-pagination",
    },
  });



/*******Product details page*******/
var ProductImg = document.getElementById("ProductImg");
var SmallImg = document.getElementsByClassName("small-img");

SmallImg[0].onclick = function()
{
    ProductImg.src = SmallImg[0].src;
}
SmallImg[1].onclick = function()
{
    ProductImg.src = SmallImg[1].src;
}
SmallImg[2].onclick = function()
{
    ProductImg.src = SmallImg[2].src;
}
SmallImg[3].onclick = function()
{
    ProductImg.src = SmallImg[3].src;
}


/********Login Page***** */
var x=document.getElementById('login');
var y=document.getElementById('register');
var z=document.getElementById('btn');
function register()
{
x.style.left='-400px';
y.style.left='50px';
z.style.left='110px';
}
function login()
{
x.style.left='50px';
y.style.left='450px';
z.style.left='0px';
}
var modal = document.getElementById('login-form');
window.onclick = function(event) 
{
if (event.target == modal) 
{
    modal.style.display = "none";
}
}