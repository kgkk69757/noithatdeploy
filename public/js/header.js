// Add mobile menu toggle function
function toggleMobileMenu() {
    const navList = document.getElementById('navList');
    const isVisible = navList.classList.contains('mobile-visible');

    if (isVisible) {
        navList.classList.remove('mobile-visible');
        navList.classList.add('mobile-hidden');
    } else {
        navList.classList.remove('mobile-hidden');
        navList.classList.add('mobile-visible');
    }
}

// Close mobile menu when clicking outside
document.addEventListener('click', function (event) {
    const navigation = document.querySelector('.navigation');
    const navList = document.getElementById('navList');

    if (!navigation.contains(event.target) && navList.classList.contains('mobile-visible')) {
        navList.classList.remove('mobile-visible');
        navList.classList.add('mobile-hidden');
    }
});

// Close mobile menu when window is resized to desktop
window.addEventListener('resize', function () {
    const navList = document.getElementById('navList');
    if (window.innerWidth > 1024) {
        navList.classList.remove('mobile-visible', 'mobile-hidden');
    }
});