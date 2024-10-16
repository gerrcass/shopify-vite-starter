import Alpine from 'alpinejs';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import { ScrollSmoother } from 'gsap/ScrollSmoother';
// import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';

// let isInView = ScrollTrigger.isInViewport(box) ? "👀" : "🙈"
// onRefresh: (selft) => console.log(`Box ${loopIndex}+1`, isInView, self.start, self.end)

Alpine.data('gsapHorzSnap', () => ({
  init() {
    gsap.registerPlugin(ScrollTrigger);
    let sections = gsap.utils.toArray('.panel', this.$el);

    // console.log('min: 0', `max:${ScrollTrigger.maxScroll(window)}`);

    let scrollTween = gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: 'none', // <-- IMPORTANT!
      scrollTrigger: {
        trigger: '.container',
        pin: true,
        scrub: 0.1,
        // snap: 1 / (sections.length - 1),
        start: 'top top',
        end: '+=3000',
        // markers: true,
      },
    });

    gsap.set('.box-1, .box-2', { y: 100 });
    ScrollTrigger.defaults({
      markers: { startColor: 'white', endColor: 'white' },
    });

    // red section
    gsap.to('.box-1', {
      y: -130,
      duration: 2,
      ease: 'elastic',
      scrollTrigger: {
        trigger: '.box-1',
        containerAnimation: scrollTween,
        start: 'left center',
        toggleActions: 'play none none reset',
        id: '1',
      },
    });

    // gray section
    gsap.to('.box-2', {
      y: -120,
      backgroundColor: 'yellow',
      ease: 'none',
      scrollTrigger: {
        trigger: '.box-2',
        containerAnimation: scrollTween,
        start: 'center 80%',
        end: 'center 20%',
        scrub: true,
        id: '2',
      },
    });

    // purple section
    ScrollTrigger.create({
      trigger: '.box-3',
      containerAnimation: scrollTween,
      toggleClass: 'active',
      start: 'center 60%',
      id: '3',
    });

    // green section
    ScrollTrigger.create({
      trigger: '.green',
      containerAnimation: scrollTween,
      start: 'center 65%',
      end: 'center 51%',
      onEnter: () => console.log('enter'),
      onLeave: () => console.log('leave'),
      onEnterBack: () => console.log('enterBack'),
      onLeaveBack: () => console.log('leaveBack'),
      onToggle: (self) => console.log('active', self.isActive),
      onUpdate: (self) => console.log('👀 ', self.start, self.end),
      id: '4',
    });

    // only show the relevant section's markers at any given time
    gsap.set('.gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end', {
      autoAlpha: 0,
    });
    ['red', 'gray', 'purple', 'green'].forEach((triggerClass, i) => {
      ScrollTrigger.create({
        trigger: '.' + triggerClass,
        containerAnimation: scrollTween,
        start: 'left 30%',
        end: i === 3 ? 'right right' : 'right 30%',
        markers: false,
        onToggle: (self) =>
          gsap.to('.marker-' + (i + 1), {
            duration: 0.25,
            autoAlpha: self.isActive ? 1 : 0,
          }),
      });
    });
  },
}));

Alpine.data('gsapScrollsmoothScrolltriggerClamp', () => ({
  init() {
    // CodePen: https://codepen.io/GreenSock/pen/JjmLLWZ
    // gsap.registerPlugin(ScrollTrigger, ScrollSmoother, DrawSVGPlugin);
    gsap.registerPlugin(ScrollTrigger);

    let smoother = ScrollSmoother.create({
      smooth: 2,
      effects: true,
    });

    gsap.from('.draw', {
      drawSVG: '0%',
      ease: 'expo.out',
      scrollTrigger: {
        trigger: '.heading',
        start: 'clamp(top center)',
        scrub: true,
        pin: '.pin',
        pinSpacing: false,
        markers: true,
      },
    });
  },
}));
