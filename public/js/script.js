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