/**
* Template Name: FlexStart - v1.9.0
* Template URL: https://bootstrapmade.com/flexstart-bootstrap-startup-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    if (all) {
      select(el, all).forEach(e => e.addEventListener(type, listener))
    } else {
      select(el, all).addEventListener(type, listener)
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    if (!header.classList.contains('header-scrolled')) {
      offset -= 10
    }

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Clients Slider
   */
  new Swiper('.clients-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 2,
        spaceBetween: 40
      },
      480: {
        slidesPerView: 3,
        spaceBetween: 60
      },
      640: {
        slidesPerView: 4,
        spaceBetween: 80
      },
      992: {
        slidesPerView: 6,
        spaceBetween: 120
      }
    }
  });

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        aos_init();
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfokio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 40
      },

      1200: {
        slidesPerView: 3,
      }
    }
  });

  /**
   * Animation on scroll
   */
  function aos_init() {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', () => {
    aos_init();
  });

})();

class MyHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = '<!-- ======= Header ======= --><header id="header" class="header fixed-top"><div class="container d-flex container-xl d-flex align-items-center justify-content-between"><a href="index.html" class="logo d-flex align-items-center"><img src="assets/img/logo-1.png" class="logoMain" alt=""></a><nav id="navbar" class="navbar"><ul><li><a class="nav-link scrollto active" href="index.html">Home</a></li><li><a class="nav-link scrollto" href="about.html">About</a></li><li><a class="nav-link scrollto" href="services.html">Services</a></li><li class="dropdown"><a href="#"><span>Products</span> <i class="bi bi-chevron-down"></i></a><ul><li><a href="ro.html">RO, UF, NF & MBR Membranes</a></li><li><a href="aerators.html">Aerators</a></li><li><a href="clarifiers.html">Clarifiers</a></li><li><a href="thickener.html">Thickener</a></li><li><a href="flashMixer.html">Flash Mixer</a></li><li><a href="flocculator.html">Flocculator & Agitators</a></li><li><a href="stp.html">Packaged STP System</a></li></ul></li><li class="dropdown"><a href="#"><span>Projects</span> <i class="bi bi-chevron-down"></i></a><ul><li><a href="Projects_RawWaterTreatment.html">Raw Water Treatment</a></li><li><a href="Projects_WaterTreatment.html">Water Treatment</a></li><li><a href="Projects_SewageTreatment.html">Sewage Treatment</a></li><li><a href="Projects_TertiaryTreatmentAndRecycling.html">Tertiary Treatment & Recycling</a></li></ul></li><li class="dropdown"><a href="#"><span>Industries We Serve</span> <i class="bi bi-chevron-down"></i></a><ul><li><a href="IWS_IndustryList.html">Industry List</a></li><li class="dropdown"><a href="#"><span>Project Photos</span></a><li<li class="dropdown"><a href="clients.html"><span>Clientele</span></a></li><li class="dropdown"><a href="#"><span>Credentials</span></a></li></ul></li></li><li><a class="nav-link scrollto" href="contact.html">Contact</a></li></ul><i class="bi bi-list mobile-nav-toggle"></i></nav><!-- .navbar --></div></header><!-- End Header -->'
  }
}

customElements.define("my-header",MyHeader);


class MyFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = '<!-- ======= Footer ======= --><footer id="footer" class="footer"><div class="footer-newsletter"><div class="container"><div class="row justify-content-center"><div class="col-lg-12 text-center"><h4>Our Newsletter</h4><p>Tamen quem nulla quae legam multos aute sint culpa legam noster magna</p></div><div class="col-lg-6"><form action="" method="post"><input type="email" name="email"><input type="submit" value="Subscribe"></form></div></div></div></div><div class="footer-top"><div class="container"><div class="row gy-4"><div class="col-lg-5 col-md-12 footer-info"><a href="index.html" class="logo d-flex align-items-center"><img src="assets/img/logo.png" alt=""><span>Living Water</span></a><p>Cras fermentum odio eu feugiat lide par naso tierra. Justo eget nada terra videa magna derita valies darta donna mare fermentum iaculis eu non diam phasellus.</p><div class="social-links mt-3"><a href="#" class="twitter"><i class="bi bi-twitter"></i></a><a href="#" class="facebook"><i class="bi bi-facebook"></i></a><a href="#" class="instagram"><i class="bi bi-instagram"></i></a><a href="#" class="linkedin"><i class="bi bi-linkedin"></i></a></div></div><div class="col-lg-2 col-6 footer-links"><h4>Useful Links</h4><ul><li><i class="bi bi-chevron-right"></i> <a href="#">Home</a></li><li><i class="bi bi-chevron-right"></i> <a href="#">About us</a></li><li><i class="bi bi-chevron-right"></i> <a href="#">Services</a></li><li><i class="bi bi-chevron-right"></i> <a href="#">Terms of service</a></li><li><i class="bi bi-chevron-right"></i> <a href="#">Privacy policy</a></li></ul></div><div class="col-lg-2 col-6 footer-links"><h4>Our Services</h4><ul><li><i class="bi bi-chevron-right"></i> <a href="#">Web Design</a></li><li><i class="bi bi-chevron-right"></i> <a href="#">Web Development</a></li><li><i class="bi bi-chevron-right"></i> <a href="#">Product Management</a></li><li><i class="bi bi-chevron-right"></i> <a href="#">Marketing</a></li><li><i class="bi bi-chevron-right"></i> <a href="#">Graphic Design</a></li></ul></div><div class="col-lg-3 col-md-12 footer-contact text-center text-md-start"><h4>Contact Us</h4><p>150,Second Floor, Royal Building, TVM Road, Murugankurichi, Palayamkottai,<br>Tirunelveli 627 002 <br>Tamilnadu, India<br><br><strong>Phone:</strong>+91 82203 39519<br><strong>Email:</strong> paul.christ@liwaindia.com<br></p></div></div></div></div><div class="container"><div class="copyright">&copy; Copyright <strong><span>Living Water</span></strong>. All Rights Reserved</div><div class="credits"><!-- All the links in the footer should remain intact. --><!-- You can delete the links only if you purchased the pro version. --><!-- Licensing information: https://bootstrapmade.com/license/ --><!-- Purchase the pro version with working PHP/AJAX contact form: https://bootstrapmade.com/flexstart-bootstrap-startup-template/ -->Designed by <a href="https://bootstrapmade.com/">Infotech</a></div></div></footer> <!-- End Footer -->';
  }
}

customElements.define("my-footer",MyFooter);