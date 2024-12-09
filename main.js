

// Parallax Effects
let bg = document.getElementById("bg")
    let moon = document.getElementById("moon")
    let pyramid = document.getElementById("pyramid")
    let road = document.getElementById("road")
    let text = document.getElementById("text")
    window.addEventListener('scroll', function() {
        var value = window.scrollY;
        bg.style.top = value * 0.5 + 'px'
        moon.style.left = value * 0.5 + 'px'
        pyramid.style.top = -value * 0.15 + 'px'
        road.style.top = value * 0.15 + 'px'
        text.style.top = value * 1 + 'px'
});

// Overlay menu
function on() {
    const overlay = document.getElementById("overlay");
    overlay.style.display = "block";
    setTimeout(() => {
        overlay.classList.add("show");
    }, 10);
}

function off() {
    const overlay = document.getElementById("overlay");
    overlay.classList.remove("show");
    overlay.classList.add("hide");
    setTimeout(() => {
        overlay.style.display = "none";
        overlay.classList.remove("hide");
    }, 500);
}

// Lottie Scroll Animation
document.addEventListener("DOMContentLoaded", function() {
    let lottieContainer = document.querySelectorAll(".animation");

    if (lottieContainer.length > 0) {
        LottieScrollTrigger({
            trigger: ".animation",
            start: "top center",
            endTrigger: ".end-lottie",
            end: `bottom center+=${document.querySelector(".animation").offsetHeight}`,
            renderer: "svg",
            target: ".animation",
            path: "./assets/img/video-hd_1920_1080_24fps.mp4.lottie.json",
            scrub: 2,
        });
    }
});

function LottieScrollTrigger(vars) {
    let playhead = { frame: 0 },
        target = gsap.utils.toArray(vars.target)[0],
        speeds = { slow: "+=2000", medium: "+=1000", fast: "+=500" },
        st = {
            trigger: ".trigger",
            end: speeds[vars.speed] || "+1000",
            scrub: 1,
            markers: false,
        },
        ctx = gsap.context && gsap.context(),
        animation = lottie.loadAnimation({
            container: target,
            renderer: vars.renderer || "svg",
            loop: false,
            autoplay: false,
            path: vars.path,
            rendererSettings: vars.rendererSettings || {
                preserveAspectRatio: "xMidYMid slice",
            },
        });
    for (let p in vars) {
        st[p] = vars[p];
    }

    animation.addEventListener("DOMLoaded", function() {
        let createTween = function() {
            animation.frameTween = gsap.to(playhead, {
                frame: animation.totalFrames - 1,
                ease: "none",
                onUpdate: () => animation.goToAndStop(playhead.frame, true),
                scrollTrigger: st,
            });
            return () => animation.destroy && animation.destroy();
        };

        ctx && ctx.add ? ctx.add(createTween) : createTween();
    });

    return animation;
}

// section2 page lich su
document.addEventListener("DOMContentLoaded", () => {
    const sectionTitles = document.querySelectorAll(".section-title2");
    setTimeout(() => {
        sectionContent.classList.add("show");
    }, 200);
    sectionTitles.forEach((title, index) => {
        setTimeout(() => {
            title.classList.add("show");
        }, 400 + index * 200);
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const sectionTitles = document.querySelectorAll(".timeline-title");
    setTimeout(() => {
        sectionContent.classList.add("show");
    }, 200);
    sectionTitles.forEach((title, index) => {
        setTimeout(() => {
            title.classList.add("show");
        }, 400 + index * 200);
    });
});

// page kham pha
document.addEventListener("DOMContentLoaded", function() {
    const lenis = new Lenis()

    lenis.on("scroll", ScrollTrigger.update)

    gsap.ticker.add((time) => {
        lenis.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)

    const explores = gsap.utils.toArray(".explore")

    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
    }

    const observerCallback = (entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const explore = entry.target;
                const imgContainer = explore.querySelector(".img")

                ScrollTrigger.create({
                    trigger: explore,
                    start: "bottom bottom",
                    end: "top top",
                    scrub: true,
                    onUpdate: (self) => {
                        let progress = self.progress
                        let newWidth = 30 + 70 * progress
                        gsap.to(imgContainer, {
                            width: newWidth + "%",
                            duration: 0.1,
                            ease: "none",
                        })
                    },
                })

                ScrollTrigger.create({
                    trigger: explore,
                    start: "top bottom",
                    end: "top top",
                    scrub: true,
                    onUpdate: (self) => {
                        let progress = self.progress
                        let newHeight = 150 + 300 * progress
                        gsap.to(explore, {
                            height: newHeight + "px",
                            duration: 0.1,
                            ease: "none",
                        })
                    },
                })

                observer.unobserve(explore)
            }
        })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    explores.forEach((explore) => {
        observer.observe(explore)
    })
})
