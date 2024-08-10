import './tailwind.css';
import Alpine from 'alpinejs';
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

// Make Alpine.js available globally
window.Alpine = Alpine;

// Define an Alpine component
Alpine.data('exampleComponent', () => ({
  init() {
    // Initialize Swiper only if the component is present in the DOM
    if (document.querySelector('.example-slider')) {
      new Swiper('.example-slider', {
        // Add Swiper options as needed
      });
    }
  },
}));

// Start Alpine.js
Alpine.start();

/* 
Usage in HTML:

<div x-data="exampleComponent">
  <div class="swiper-container example-slider">
    <div class="swiper-wrapper">
      <div class="swiper-slide">Slide 1</div>
      <div class="swiper-slide">Slide 2</div>
      <!-- more slides -->
    </div>
    <div class="swiper-pagination"></div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</div>
*/
