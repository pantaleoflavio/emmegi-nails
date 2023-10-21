const menuBars = document.getElementById('menu-bars');
const overlay = document.getElementById('overlay');
const nav1 = document.getElementById('nav-1');
const nav2 = document.getElementById('nav-2');
const nav3 = document.getElementById('nav-3');
const nav4 = document.getElementById('nav-4');
const nav5 = document.getElementById('nav-5');
const navItems = [nav1, nav2, nav3, nav4, nav5];

const projectGallery = document.getElementById('project-gallery');
const projectContents = document.querySelectorAll('.project-content');
let arrayProjects = Array.from(projectContents);
console.log(arrayProjects);
let slideIndex  = 0;
let currentIndex  = 0;
let intervalID;


const soundtrack = document.getElementById("background-music");

// Reducing music volume
soundtrack.volume = 0.01;

// Background automatic slider
function slider() {
  let i;
 
  // get the array of divs' with classname image-sliderfade
  let slides = document.querySelectorAll('.slide');

  for (i = 0; i < slides.length; i++) {
      // initially set the display to
      // none for every image.
      slides[i].style.display = "none";
  }

  // increase by 1, Global variable
  slideIndex++;

  // check for boundary
  if (slideIndex > slides.length) {
      slideIndex = 1;
  }

  slides[slideIndex - 1].style.display = "block";

  setTimeout(slider, 2000)
}

// Control Navigation Animation
const navAnimation = (direction1, direction2) => {
  navItems.forEach((nav, i) => {
    nav.classList.replace(`slide-${direction1}-${i + 1}`, `slide-${direction2}-${i + 1}`);
  });
}

const toggleNav = () => {
  // Toggle: Menu Bars Open/closed
  menuBars.classList.toggle('change');
  // Toggle: Menu active
  overlay.classList.toggle('overlay-active');
  if (overlay.classList.contains('overlay-active')) {
    // Animate in - overlay
    overlay.classList.replace('overlay-slide-left', 'overlay-slide-right');
    // Animate In - Nav Items
    navAnimation('out', 'in');
  } else {
    // Animate out overlay
    overlay.classList.replace('overlay-slide-right', 'overlay-slide-left');

    // Animate Out - Nav Items
    navAnimation('in', 'out');
  }
};

// Project Auto Gallery  Functions
const showProject = (i) => {
  arrayProjects[i].classList.add('visible');
}

function slideshowProject() {
  intervalID = setInterval(() => {
    arrayProjects[currentIndex].classList.remove('visible');
    currentIndex = (currentIndex + 1) % arrayProjects.length;
    showProject(currentIndex);
  }, 2000);
};

// Function that stop the slideshow
const stopSlideshow = () => {
  clearInterval(intervalID);
  console.log('dentro');
};

// Event Listeners
menuBars.addEventListener('click', toggleNav);
navItems.forEach((nav) => {
  nav.addEventListener('click', toggleNav);
});

projectGallery.addEventListener('mouseover', stopSlideshow);
projectGallery.addEventListener('mouseout', ()=>{
  console.log('fuori')
  slideshowProject();
});


// On Load
slider();
slideshowProject();