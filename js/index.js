document.addEventListener('DOMContentLoaded', function() {
    const logoContainer = document.getElementById('logoContainer');
    const mainContent = document.getElementById('mainContent');
    const introAudio = document.getElementById('introAudio'); // Get the audio element

     // Function to start the intro audio
    function playIntroAudio() {
        introAudio.play().catch(error => {
        });
    }

    if (logoContainer && mainContent) {
        // Fade out the logo after a few seconds
        setTimeout(() => {
            playIntroAudio();
            logoContainer.classList.add('fade-out');
            logoContainer.addEventListener('transitionend', () => {
                logoContainer.classList.add('d-none'); // Hiding our logo container
                mainContent.classList.remove('d-none'); // Showing main content
                mainContent.classList.add('fade-in'); // fade-in effect
            }, { once: true });
        }, 2500); 
    }

    // Handle search form submission
    const searchForm = document.querySelector('.search-bar');
    if (searchForm) {
        searchForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const query = document.getElementById('searchBar').value.trim();
            if (query) {
                // Redirect to courses.html with search query
                window.location.href = `courses.html?search=${encodeURIComponent(query)}`;
            }
        });
    }
});
