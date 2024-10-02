// DOM Content Loaded
document.addEventListener("DOMContentLoaded", (event) => {
    // Smooth Scroll
    const lenis = new Lenis()

    function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
        intro_animations()
    });

function intro_animations() {
    let tl = gsap.timeline({
        defaults : {ease : "power4.inOut", duration : 1},
        scrollTrigger : {trigger : '.subtitle'}
    });

    tl.from('.subtitle', {opacity : 0})
      .from('.name', {opacity : 0, 'clip-path': 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)', y : '-50%', duration : 2}, '-=1.5')
      .from('.attributes', {opacity : 0, x : '-100%'}, "-=2")
      .from('#buttons', {opacity : 0}, '-=1')
      .to('#logo', {opacity : 1, duration : 0})
      .call(() => {
        var $svg = $('svg').drawsvg();
        $svg.drawsvg('animate'); // Trigger the DrawSVG animation
    })
      .to('svg', {fill : '#568259', filter: 'drop-shadow(2rem 2rem 1rem rgba(0, 0, 0))'}, '+=1')

    }
