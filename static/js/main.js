// ===================================
// PROJECT DIYA V3
// Main JS
// ===================================


// ===============================
// Loader
// ===============================

window.addEventListener("load", () => {

    gsap.to("#loader", {

        opacity: 0,

        duration: 1.5,

        delay: 1,

        onComplete: () => {

            document.getElementById("loader").style.display = "none";

        }

    });

});


// ===============================
// Hero Animation
// ===============================

gsap.from("#subtitle", {

    y: -80,

    opacity: 0,

    duration: 1,

    delay: 1.2

});

gsap.from("#title", {

    scale: 0.5,

    opacity: 0,

    duration: 1.5,

    delay: 1.5,

    ease: "back.out(1.8)"

});

gsap.from("#tagline", {

    y: 40,

    opacity: 0,

    duration: 1,

    delay: 2

});

gsap.from("#enterBtn", {

    y: 60,

    opacity: 0,

    duration: 1,

    delay: 2.3

});


// ===============================
// Floating Hearts
// ===============================

const hearts = document.getElementById("hearts");

function createHeart() {

    if (!hearts) return;

    const heart = document.createElement("div");

    heart.className = "heart";

    heart.innerHTML = "❤️";

    heart.style.left = Math.random() * 100 + "%";

    heart.style.fontSize = (16 + Math.random() * 24) + "px";

    heart.style.animationDuration = (5 + Math.random() * 5) + "s";

    hearts.appendChild(heart);

    setTimeout(() => {

        heart.remove();

    }, 10000);

}

setInterval(createHeart, 350);


// ===============================
// Enter Button + Background Music
// ===============================

const enterBtn = document.getElementById("enterBtn");
const bgMusic = document.getElementById("bgMusic");

if (enterBtn) {

    enterBtn.addEventListener("click", () => {

        // Music Start
        if (bgMusic) {

            bgMusic.volume = 1;

            bgMusic.play()
                .then(() => {

                    localStorage.setItem("musicPlaying", "true");

                    console.log("🎵 Music Started");

                })
                .catch(err => {

                    console.log(err);

                });

        }

        // Scroll
        document.getElementById("memories").scrollIntoView({

            behavior: "smooth"

        });

    });

}


// ===============================
// Auto Resume Music
// ===============================

window.addEventListener("load", () => {

    if (

        localStorage.getItem("musicPlaying") === "true"

        && bgMusic

    ) {

        bgMusic.play().catch(() => {});

    }

});

// ===============================
// Popup System
// ===============================

function closePopup() {

    const popup = document.getElementById("scrollPopup");

    if (!popup) return;

    gsap.to(popup, {

        opacity: 0,

        duration: 0.6,

        onComplete: () => {

            popup.style.display = "none";

        }

    });

}



// ===============================
// Lenis Smooth Scroll
// ===============================



// ===============================
// Mouse Parallax
// ===============================

document.addEventListener("mousemove", (e) => {

    const x = (e.clientX / window.innerWidth - 0.5) * 25;

    const y = (e.clientY / window.innerHeight - 0.5) * 25;

    gsap.to(".hero", {

        x: x,

        y: y,

        duration: 1,

        ease: "power2.out"

    });

});



// ===============================
// Memory Cards Animation
// ===============================

const memoryCards = document.querySelectorAll(".memory-card");

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            gsap.to(entry.target, {

                opacity: 1,

                y: 0,

                duration: 1,

                ease: "power3.out"

            });

        }

    });

}, {

    threshold: 0.25

});

memoryCards.forEach(card => {

    observer.observe(card);

});



// ===============================
// Heart Glow Animation
// ===============================

gsap.to("#title span", {

    scale: 1.25,

    repeat: -1,

    yoyo: true,

    duration: 0.8

});

// ===================================
// Gift Button
// ===================================

const claimGiftBtn = document.getElementById("claimGiftBtn");

if (claimGiftBtn) {

    claimGiftBtn.addEventListener("click", () => {

        gsap.to("body", {

            opacity: 0,

            duration: 0.8,

            onComplete: () => {

                window.location.href = "/questions";

            }

        });

    });

}



// ===================================
// Hero Floating Effect
// ===================================

gsap.to(".hero",{

    y:-10,

    repeat:-1,

    yoyo:true,

    duration:3,

    ease:"sine.inOut"

});



// ===================================
// Scroll Progress
// ===================================

window.addEventListener("scroll",()=>{

    const cards=document.querySelectorAll(".memory-card");

    cards.forEach((card,index)=>{

        const top=card.getBoundingClientRect().top;

        if(top<window.innerHeight-100){

            gsap.to(card,{

                opacity:1,

                y:0,

                rotationX:0,

                duration:1,

                delay:index*0.15

            });

        }

    });

});



// ===================================
// Background Video
// ===================================

const bgVideo = document.getElementById("bgVideo");

// Page load hote hi muted video autoplay
window.addEventListener("load", () => {

    if (bgVideo) {

        bgVideo.muted = true;

        bgVideo.loop = true;

        bgVideo.play().catch(err => {

            console.log("Autoplay Error:", err);

        });

    }

});

// User click kare to video ki audio on kar do
if (bgVideo && enterBtn) {

    enterBtn.addEventListener("click", () => {

        bgVideo.muted = false;

        bgVideo.volume = 1;

        bgVideo.play().catch(err => {

            console.log("Video Play Error:", err);

        });

    });

}



// ===================================
// Window Resize
// ===================================

window.addEventListener("resize",()=>{

    ScrollTrigger?.refresh?.();

});



// ===================================
// Console
// ===================================

console.log("❤️ Project Diya V3 Loaded Successfully ❤️");