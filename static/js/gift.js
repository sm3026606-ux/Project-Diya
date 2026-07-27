// ===================================
// PROJECT DIYA V3
// GIFT PAGE
// ===================================

const giftBox = document.getElementById("giftBox");
const openGiftBtn = document.getElementById("openGiftBtn");
const giftMessage = document.getElementById("giftMessage");
const emailBox = document.getElementById("emailBox");
console.log("EMAIL BOX:", emailBox);

// ===================================
// Open Gift
// ===================================

function openGift() {

    if (!giftBox || !giftMessage) return;

    // Disable button after first click
    if (openGiftBtn) {
        openGiftBtn.disabled = true;
        openGiftBtn.innerHTML = "❤️ Opening...";
    }

    // Animate gift
    giftBox.classList.add("open");

    gsap.to("#giftBox", {
        scale: 1.15,
        rotation: 5,
        duration: 0.6,
        yoyo: true,
        repeat: 1
    });

    // Show message
   setTimeout(() => {

    giftMessage.style.display = "block";

    const message = giftMessage.querySelector("p");

const originalText = message.innerHTML;

message.innerHTML = "";

let i = 0;

const typing = setInterval(() => {

    message.innerHTML += originalText.charAt(i);

    i++;

    if (i >= originalText.length) {

        clearInterval(typing);

    }

}, 35);

    gsap.fromTo("#giftMessage",

    {
        opacity:0,
        y:60,
        scale:0.9
    },

    {
        opacity:1,
        y:0,
        scale:1,
        duration:1
    });


    // Show Email Box

    setTimeout(()=>{

        if(emailBox){

            emailBox.style.display="block";


            gsap.fromTo("#emailBox",

            {
                opacity:0,
                y:50
            },

            {
                opacity:1,
                y:0,
                duration:1
            });

        }


    },1000);


    celebrateHearts();

    startFireworks();

    confetti({

    particleCount: 250,

    spread: 120,

    startVelocity: 40,

    origin: {

        y: 0.6

    }

});

setTimeout(() => {

    confetti({

        particleCount: 180,

        angle: 60,

        spread: 70,

        origin: {

            x: 0

        }

    });

    confetti({

        particleCount: 180,

        angle: 120,

        spread: 70,

        origin: {

            x: 1

        }

    });

},300);


},900);

}

// ===================================
// Button Click
// ===================================

if (openGiftBtn) {

    openGiftBtn.addEventListener("click", openGift);

}

// ===================================
// Heart Celebration
// ===================================

function celebrateHearts() {

    for (let i = 0; i < 80; i++) {

        const heart = document.createElement("div");

        heart.innerHTML = "❤️";

        heart.style.position = "fixed";
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.top = "-40px";
        heart.style.fontSize = (18 + Math.random() * 30) + "px";
        heart.style.pointerEvents = "none";
        heart.style.zIndex = "9999";

        document.body.appendChild(heart);

        gsap.to(heart, {

            y: window.innerHeight + 150,

            x: (Math.random() - 0.5) * 300,

            rotation: Math.random() * 720,

            duration: 3 + Math.random() * 2,

            ease: "power1.out",

            onComplete: () => {

                heart.remove();

            }

        });

    }

}

// ===================================
// Floating Animation
// ===================================

if (giftBox) {

    gsap.to("#giftBox", {

        y: -5,

        repeat: -1,

        yoyo: true,

        duration: 3,

        ease: "sine.inOut"

    });

}

// ===================================
// Email Gift Send
// ===================================

const sendGiftBtn = document.getElementById("sendGiftBtn");
const emailInput = document.getElementById("emailInput");


if(sendGiftBtn){

    sendGiftBtn.addEventListener("click",()=>{

        const email = emailInput.value;


        if(!email){

            alert("Please enter your email ❤️");
            return;

        }


        emailjs.send(
  "service_9pgx1er",
  "template_t2xpp7f",
  {
    name: "Diya",
    email: email,
    gift_code: "YOUR-GOOGLE-PLAY-CODE",
    message:
      "Happy Girlfriend's Day ❤️\n\nYou are the most beautiful part of my life.\n\nI Love You Forever ❤️"
  }
)

.then(()=>{

    alert("Your surprise has been sent ❤️");

})

.catch((error)=>{

    console.log(error);

    alert("Email send failed ❌");

});


    });

}

// ===================================
// Fireworks
// ===================================

function startFireworks() {

    const duration = 5000;

    const end = Date.now() + duration;

    (function frame() {

        confetti({

            particleCount: 4,

            angle: 60,

            spread: 70,

            origin: {

                x: 0

            }

        });

        confetti({

            particleCount: 4,

            angle: 120,

            spread: 70,

            origin: {

                x: 1

            }

        });

        if (Date.now() < end) {

            requestAnimationFrame(frame);

        }

    })();

}

// ===================================
// Console
// ===================================

console.log("❤️ Gift Page Loaded Successfully ❤️");