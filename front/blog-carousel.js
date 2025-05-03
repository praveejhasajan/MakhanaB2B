$('.blog-carousel').owlCarousel({
    loop: true,
    margin: 25,
    nav: true,
    dots: false,
    autoplay: true,
    smartSpeed: 1000,
    responsive:{
      0:{ items:1 },
      576:{ items:2 },
      992:{ items:3 },
      1200:{ items:4 }
    }
  });
 
  $(document).ready(function(){
    $('.hero-carousel').owlCarousel({
      items: 1,
      loop: true,
      autoplay: true,
      autoplayTimeout: 5000,
      smartSpeed: 1000,
      animateOut: 'fadeOut',
      animateIn: 'fadeIn',
      dots: false,
      nav: false
    });
  });

