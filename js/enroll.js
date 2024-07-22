document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('enrollForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const courseName = document.getElementById('courseName').value;
        const firstName = document.getElementById('firstName').value.trim();
        const lastName = document.getElementById('lastName').value.trim();
        const email = document.getElementById('email').value.trim();
        const errorMessage = document.getElementById('errorMessage');

        errorMessage.style.display = 'none';
        errorMessage.textContent = '';

        // Validate first name and last name
        if (!firstName || !lastName) {
            errorMessage.textContent = 'Please enter both first name and last name.';
            errorMessage.style.display = 'block';
            return;
        }

        // Validate email format
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            errorMessage.textContent = 'Please enter a valid email address.';
            errorMessage.style.display = 'block';
            return;
        }

        console.log(`Course Name: ${courseName}`);
        console.log(`First Name: ${firstName}`);
        console.log(`Last Name: ${lastName}`);
        console.log(`Email: ${email}`);

        const startDates = {
            'D456': new Date('2024-10-01T00:00:00'),
            'BIT789': new Date('2024-11-01T00:00:00'),
            'BCOM101': new Date('2024-12-01T00:00:00')
        };

        const startDate = startDates[courseName];

        if (!startDate) {
            alert('Invalid course selection.');
            return;
        }

        // Hide the form and display the countdown
        document.getElementById('enrollForm').style.display = 'none';
        document.getElementById('countdown').style.display = 'block';

        // Set the countdown timer
        const countdownInterval = setInterval(function() {
            const now = new Date().getTime();
            const distance = startDate - now;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            document.getElementById('timer').textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;

            if (distance < 0) {
                clearInterval(countdownInterval);
                document.getElementById('countdown').style.display = 'none';
                document.getElementById('confirmationMessage').style.display = 'block';
            }
        }, 1000);
    });
});
