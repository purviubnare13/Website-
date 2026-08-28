// ==============================
// SPIDER BIRTHDAY PARTY
// ==============================

function showScreen(screenNumber) {

    const screens = document.querySelectorAll(".screen");

    screens.forEach(screen => {
        screen.classList.remove("active");
    });

    document
        .getElementById("screen" + screenNumber)
        .classList.add("active");
}


// ==============================
// INVITATION
// ==============================

function goToInvitation() {

    showScreen(2);

}


// ==============================
// PARTY CHECK-IN
// ==============================

function goToCheckIn() {

    showScreen(3);

}


// ==============================
// REAL CAMERA
// ==============================

let cameraStream = null;
let capturedPhoto = false;


// ==============================
// START CAMERA
// ==============================

async function startCamera(mode) {

    const video = document.getElementById("video");
    const canvas = document.getElementById("canvas");
    const preview = document.getElementById("photoPreview");

    const cameraArea = document.getElementById("cameraArea");
    const cameraMessage = document.getElementById("cameraMessage");
    const controls = document.getElementById("cameraControls");

    // Reset
    capturedPhoto = false;

    canvas.style.display = "none";
    preview.style.display = "none";
    video.style.display = "block";

    controls.style.display = "flex";

    // Snap style
    const card = document.querySelector(".camera-card");

    if (mode === "snap") {
        card.classList.add("snap-mode");
        cameraMessage.textContent =
            "🕷️ Snap Camera ready! Strike your pose 😭📸";
    } else {
        card.classList.remove("snap-mode");
        cameraMessage.textContent =
            "📷 Camera ready! Take your party photo.";
    }

    // Stop old camera if running
    if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
    }

    try {

        cameraStream = await navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: "user"
            },
            audio: false
        });

        video.srcObject = cameraStream;

    } catch (error) {

        console.error(error);

        video.style.display = "none";

        cameraMessage.textContent =
            "⚠️ Camera permission is required to enter the party.";

        controls.style.display = "none";

        alert(
            "Camera permission allow karo 📸😭\n\n" +
            "Photo liye bina party mein entry nahi milegi 🕷️"
        );
    }
}


// ==============================
// CAPTURE PHOTO
// ==============================

function capturePhoto() {

    const video = document.getElementById("video");
    const canvas = document.getElementById("canvas");
    const preview = document.getElementById("photoPreview");

    const cameraMessage = document.getElementById("cameraMessage");

    if (!cameraStream) {

        alert("Pehle camera start karo 📸");

        return;
    }

    if (video.readyState < 2) {

        alert("Camera abhi ready nahi hai 😭");

        return;
    }

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext("2d");

    context.drawImage(
        video,
        0,
        0,
        canvas.width,
        canvas.height
    );

    const photoData = canvas.toDataURL("image/png");

    preview.src = photoData;

    video.style.display = "none";

    preview.style.display = "block";

    capturedPhoto = true;

    cameraMessage.textContent =
        "PHOTO CAPTURED! 😭❤️ Check it out!";

    document.getElementById("usePhotoButton").style.display =
        "block";

    document.getElementById("retakeButton").style.display =
        "block";

    // Stop camera after photo
    if (cameraStream) {

        cameraStream.getTracks().forEach(track => {
            track.stop();
        });

        cameraStream = null;
    }
}


// ==============================
// RETAKE PHOTO
// ==============================

function retakePhoto() {

    capturedPhoto = false;

    document.getElementById("photoPreview").style.display =
        "none";

    document.getElementById("usePhotoButton").style.display =
        "none";

    document.getElementById("retakeButton").style.display =
        "none";

    startCamera("simple");
}


// ==============================
// USE PHOTO
// ==============================

function usePhoto() {

    if (!capturedPhoto) {

        alert(
            "Pehle actual photo lo 📸😭"
        );

        return;
    }

    capturedPhoto = true;

    document.getElementById("cameraMessage").textContent =
        "Entry approved! 🕷️❤️ Welcome to the party!";

    setTimeout(() => {

        goToCafe();

    }, 800);
}


// ==============================
// BIRTHDAY CAFÉ
// ==============================

function goToCafe() {

    showScreen(4);

}


// ==============================
// FOOD SELECTION
// ==============================

let selectedFood = "";

function selectFood(element, foodName) {

    const allFoods = document.querySelectorAll(".food");

    allFoods.forEach(food => {
        food.classList.remove("selected");
    });

    element.classList.add("selected");

    selectedFood = foodName;

    document.getElementById("selectedFood").innerHTML =
        "You selected: <strong>" + foodName + "</strong> 😋❤️";

}


// ==============================
// GO TO PLATE
// ==============================

function goToPlate() {

    if (selectedFood === "") {

        document.getElementById("selectedFood").innerHTML =
            "Arre pehle kuch food choose karo 😭🍕";

        return;
    }

    showScreen(5);

}


// ==============================
// PLATE SELECTION
// ==============================

let selectedPlate = false;

function selectPlate(element) {

    const plates = document.querySelectorAll(".plate");

    plates.forEach(plate => {
        plate.classList.remove("selected");
    });

    element.classList.add("selected");

    selectedPlate = true;

}


// ==============================
// GO TO CAKE
// ==============================

function goToCake() {

    if (!selectedPlate) {

        alert("Pehle apni plate choose karo 🍽️😭");

        return;
    }

    showScreen(6);

}


// ==============================
// BLOW CANDLES
// ==============================

function blowCandles() {

    createConfetti();

    setTimeout(() => {

        showScreen(7);

    }, 700);

}


// ==============================
// CONFETTI
// ==============================

function createConfetti() {

    const emojis = [
        "🎉",
        "🎊",
        "❤️",
        "💖",
        "🕷️",
        "🕸️",
        "🎂",
        "✨"
    ];

    for (let i = 0; i < 50; i++) {

        const confetti = document.createElement("div");

        confetti.innerHTML =
            emojis[Math.floor(Math.random() * emojis.length)];

        confetti.style.position = "fixed";

        confetti.style.left =
            Math.random() * 100 + "vw";

        confetti.style.top = "-30px";

        confetti.style.fontSize =
            (15 + Math.random() * 20) + "px";

        confetti.style.zIndex = "9999";

        confetti.style.pointerEvents = "none";

        confetti.style.transition =
            "transform 2s ease, opacity 2s ease";

        document.body.appendChild(confetti);


        setTimeout(() => {

            confetti.style.transform =
                "translateY(110vh) rotate(720deg)";

            confetti.style.opacity = "0";

        }, 50);


        setTimeout(() => {

            confetti.remove();

        }, 2200);
    }
}