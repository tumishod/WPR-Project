document.addEventListener('DOMContentLoaded', function() {
    const logoContainer = document.getElementById('logoContainer');
    const mainContent = document.getElementById('mainContent');
    const introAudio = document.getElementById('introAudio'); // Get the audio element

    // Hide main content initially
    mainContent.style.display = 'none';

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
            mainContent.style.display = 'block';
            logoContainer.addEventListener('transitionend', () => {
                logoContainer.classList.add('d-none'); // Hide logo container
                mainContent.classList.remove('d-none'); // Show main content
                mainContent.classList.add('fade-in'); // Optional fade-in effect
            }, { once: true });
        }, 2500); // Adjust the timing as needed
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

    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            console.log('Observed entry:', entry); // Debug log
            if (entry.isIntersecting) {
                console.log('In view, adding show class to:', entry.target);
                entry.target.classList.add('show');
            } else {
                console.log('Out of view, removing show class from:', entry.target);
                entry.target.classList.remove('show');
            }
        });
    });

    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach(el => {
        console.log('Observing:', el); // Debug log
        observer.observe(el);
    });
});
