// Animation for initial logo display
function animateLogo() {
    const logoContainer = document.getElementById('logoContainer');
    const mainContent = document.getElementById('mainContent');
    
    // Show the logo for 3 seconds, then fade out
    setTimeout(() => {
        logoContainer.classList.add('fade');
        logoContainer.addEventListener('transitionend', () => {
            logoContainer.classList.add('d-none'); // Hide logo container
            mainContent.classList.remove('d-none'); // Show main content
            mainContent.classList.add('fade', 'show'); // Optional fade-in effect
        }, { once: true });
    }, 3000);
}
animateLogo(); // Call the function on page load