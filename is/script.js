document.getElementById("showWidgetBtn").addEventListener("click", function() {
    const widget = document.getElementById("widget");
    if(widget.style.display === "none") {
      widget.style.display = "block";  // Show widget
    } else {
      widget.style.display = "none";   // Optional: toggle hide if clicked again
    }
  });
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');

  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('show');
  });
  menuToggle.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      navMenu.classList.toggle('show');
    }
  });
  const slides = document.querySelectorAll('.banner-slider .slide');
  let currentIndex = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  }

  

  setInterval(nextSlide, 4000); // change slide every 4 seconds
  // Wait until page is fully loaded, then slide in the button
  window.addEventListener('load', function() {
    document.getElementById('call-btn').classList.add('show');
  });
  
  window.addEventListener("load", function(){
    document.getElementById("loader").style.display = "none";
  });
