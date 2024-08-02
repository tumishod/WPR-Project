document.addEventListener('DOMContentLoaded', function() {
    const logoContainer = document.getElementById('logoContainer');
    const mainContent = document.getElementById('mainContent');

    // Fade out the logo after a few seconds
    setTimeout(() => {
        logoContainer.classList.add('fade-out');
        logoContainer.addEventListener('transitionend', () => {
            logoContainer.classList.add('d-none'); // Hide logo container
            mainContent.classList.remove('d-none'); // Show main content
            mainContent.classList.add('fade-in'); // Optional fade-in effect
        }, { once: true });
    }, 2500); // Adjust the timing as needed
});
