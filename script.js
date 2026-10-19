gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
    const slides = document.querySelectorAll(".slide");
    const dots = document.querySelectorAll(".dot");

    // 1. Click navigation for side dots
    dots.forEach((dot) => {
        dot.addEventListener("click", () => {
            const index = parseInt(dot.getAttribute("data-index"), 10);
            slides[index].scrollIntoView({ behavior: "smooth" });
        });
    });

    // Helper to update active dot opacity
    function setActiveDot(index) {
        dots.forEach((dot, i) => {
            if (i === index) {
                dot.classList.add("active");
            } else {
                dot.classList.remove("active");
            }
        });
    }

    // 2. Per-Slide ScrollTrigger Animations
    slides.forEach((slide, index) => {
        // Update the side dots when each slide enters the center of the viewport
        ScrollTrigger.create({
            trigger: slide,
            start: "top 55%",
            end: "bottom 45%",
            onEnter: () => setActiveDot(index),
            onEnterBack: () => setActiveDot(index),
        });

        // Build a custom timeline for each slide's comic timing
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: slide,
                start: "top 68%",
                toggleActions: "play none none reverse",
            },
        });

        const imageCol = slide.querySelector(".gs-reveal-left");
        const lines = slide.querySelectorAll(".gs-line");
        const punches = slide.querySelectorAll(".gs-punch");
        const comicPops = slide.querySelectorAll(".gs-comic-pop");
        const floatText = slide.querySelector(".gs-float");
        const disappearText = slide.querySelector(".gs-disappear");
        const shatterWords = slide.querySelectorAll(".shatter-word");

        // Animate Image Column (Slides 1 & 9)
        if (imageCol) {
            tl.from(imageCol, {
                x: -50,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out",
            });
        }

        // Standard Setup Lines
        if (lines.length > 0) {
            tl.from(
                lines,
                {
                    y: 35,
                    opacity: 0,
                    duration: 0.65,
                    stagger: 0.18,
                    ease: "power2.out",
                },
                imageCol ? "-=0.4" : 0
            );
        }

        // Bold Dramatic Statements
        if (punches.length > 0) {
            tl.from(
                punches,
                {
                    y: 25,
                    scale: 0.94,
                    opacity: 0,
                    duration: 0.6,
                    stagger: 0.2,
                    ease: "back.out(1.6)",
                },
                "+=0.1"
            );
        }

        // Slide 3 Special: Floating weightless effect
        if (floatText) {
            tl.fromTo(
                floatText,
                { y: 40, opacity: 0 },
                {
                    y: -10,
                    opacity: 1,
                    duration: 1.4,
                    ease: "sine.out",
                },
                "+=0.15"
            );
        }

        // Slide 5 Special: Fading to the point of disappearance
        if (disappearText) {
            tl.fromTo(
                disappearText,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 3, ease: "power1.out" }
            ).to(
                disappearText,
                {
                    opacity: 0.12,
                    filter: "blur(1.5px)",
                    duration: 1.2,
                    ease: "power2.inOut",
                },
                "+=0.25"
            );
        }

        // Slide 7 Special: "fall in to pieces" shatters and tilts
        if (shatterWords.length > 0) {
            const rotations = [-12, 8, -16, 14];
            const yOffsets = [14, 24, 18, 28];

            tl.from(
                shatterWords,
                {
                    opacity: 0,
                    y: -20,
                    duration: 0.3,
                    stagger: 0.06,
                },
                "-=0.3"
            ).to(
                shatterWords,
                {
                    y: (i) => yOffsets[i % yOffsets.length],
                    rotation: (i) => rotations[i % rotations.length],
                    duration: 0.5,
                    stagger: 0.05,
                    ease: "bounce.out",
                },
                "+=0.1"
            );
        }

        // Comic Asides & Punchlines (Delayed pop for comedic timing)
        if (comicPops.length > 0) {
            tl.from(
                comicPops,
                {
                    scale: 0.8,
                    y: 20,
                    opacity: 0,
                    duration: 0.55,
                    stagger: 0.2,
                    ease: "back.out(2.2)",
                },
                "+=0.25"
            );
        }
    });
});