import Alpine from 'alpinejs';
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

import './tailwind.css';
import subscriptions from './pdp/subscriptions';

// Make Alpine.js available globally
window.Alpine = Alpine;

// Define an Alpine component
Alpine.data('pdpSwiperComponent', () => ({
  init() {
    // Initialize Swiper only if the component is present in the DOM
    if (document.querySelector('.pdp-main-swiper')) {
      const swiper = new Swiper('.pdp-thumb-swiper', {
        loop: true,
        spaceBetween: 20,
        slidesPerView: 3.6,
        freeMode: true,
        watchSlidesProgress: true,
        direction: getDirection(),
        on: {
          resize: function () {
            swiper.changeDirection(getDirection());
          },
        },
      });

      new Swiper('.pdp-main-swiper', {
        // loop: true,
        spaceBetween: 10,
        thumbs: {
          swiper: swiper,
        },
      });

      function getDirection() {
        const direction = window.innerWidth <= 1180 ? 'horizontal' : 'vertical';

        return direction;
      }
    }
  },
}));

subscriptions();

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
