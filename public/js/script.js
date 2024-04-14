document.addEventListener('DOMContentLoaded', function () {
    var hamburger = document.getElementById('hamburgerIcon');
    var navList = document.getElementById('navList');

    hamburger.addEventListener('click', function () {
        // Toggle the side navigation
        navList.classList.toggle('menu-is-open');
    });
});

// this is for password similarity, match
// document.addEventListener('DOMContentLoaded', function () {
//     var registrationForm = document.querySelector('.registration-container form');

//     registrationForm.addEventListener('submit', function (event) {
//         var password = document.getElementById('registerPassword').value;
//         var confirmPassword = document.getElementById('confirmPassword').value;

//         // Check if passwords match
//         if (password !== confirmPassword) {
//             // If passwords don't match, prevent form submission and alert the user
//             event.preventDefault();
//             alert('Пароли не совпадают. Пожалуйста, проверьте ваш пароль.');
//         }
//     });
// });


// video
const videoSources = ["video/1.mp4", "video/2.mp4", "video/3.mp4"];

let currentVideoIndex = 0;
const videoElement = document.getElementById('myVideo');

function changeVideo() {
    currentVideoIndex = (currentVideoIndex + 1) % videoSources.length;
    videoElement.src = videoSources[currentVideoIndex];
}

// changing video every 10 seconds
setInterval(changeVideo, 10000);



// change of text in front of video
document.addEventListener('DOMContentLoaded', () => {
    const messageOne = document.getElementById('message-one');
    const messageTwo = document.getElementById('message-two');

    // Initially set message one to be visible to ensure it appears on load
    messageOne.style.opacity = 1;
    messageOne.style.display = 'block';

    let currentVisibleMessage = 1; // Start with message one

    setInterval(() => {
        if (currentVisibleMessage === 1) {
            messageOne.style.opacity = 0;
            setTimeout(() => { messageOne.style.display = 'none'; }, 2000); // Hide after transition
            messageTwo.style.display = 'block';
            setTimeout(() => { messageTwo.style.opacity = 1; }, 100); // Ensure display is set before starting opacity transition
            currentVisibleMessage = 2;
        } else {
            messageTwo.style.opacity = 0;
            setTimeout(() => { messageTwo.style.display = 'none'; }, 2000); // Hide after transition
            messageOne.style.display = 'block';
            setTimeout(() => { messageOne.style.opacity = 1; }, 100); // Ensure display is set before starting opacity transition
            currentVisibleMessage = 1;
        }
    }, 10000); // Change messages every 10 seconds
});



// file manager in dannye
document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');

    form.onsubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        const response = await fetch('/upload', {
            method: 'POST',
            body: formData,
        });
        alert(await response.text());
        loadFiles(); // Call this function to refresh the list of files
    };

    async function loadFiles() {
        // Implementation to load and display list of files
    }
});







