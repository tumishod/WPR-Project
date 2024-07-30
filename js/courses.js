document.addEventListener('DOMContentLoaded', function() {
    console.log('courses.js is loaded');

    let currentCourseId = null;

    const studyGuides = {
        'Diploma': 'WPR 271 Study Guide [2024] v1.4.pdf',
        'BIT': 'WPR 271 Study Guide [2024] v1.4.pdf',
        'BCOM': 'WPR 271 Study Guide [2024] v1.4.pdf'
    };

    const videoLinks = {
        'Diploma': 'https://youtu.be/dQw4w9WgXcQ?si=r6_zAR0mF9JR9LjV',
        'BIT': 'https://youtu.be/dQw4w9WgXcQ?si=r6_zAR0mF9JR9LjV',
        'BCOM': 'https://youtu.be/dQw4w9WgXcQ?si=r6_zAR0mF9JR9LjV'
    };

    function hideAllSections() {
        document.getElementById('courseList').style.display = 'none';
        document.getElementById('details').style.display = 'none';
        document.getElementById('courseManagement').style.display = 'none';
    }

    const viewCoursesLink = document.getElementById('coursesLink');
    const searchButton = document.getElementById('searchButton');
    const courseManagementLink = document.getElementById('modulesLink');
    const backButtonDetails = document.getElementById('backButtonDetails');
    const backButtonManagement = document.getElementById('backButtonManagement')

    if (viewCoursesLink) {
        viewCoursesLink.addEventListener('click', function(event) {
            event.preventDefault();
            hideAllSections();
            document.getElementById('courseList').style.display = 'block';
            updateCourseList(''); 
        });
    }

    if (searchButton) {
        searchButton.addEventListener('click', function() {
            const query = document.getElementById('searchBar').value.toLowerCase();
            console.log('Search query:', query);
            updateCourseList(query);
            document.getElementById('courseList').style.display = 'block';
        });
    }

    if (courseManagementLink) {
        courseManagementLink.addEventListener('click', function(event) {
            event.preventDefault();
            if (currentCourseId) {
                hideAllSections();
                document.getElementById('courseManagement').style.display = 'block';
                updateModuleList(currentCourseId);
                updateProgressTrackers(currentCourseId);
            } else {
                alert('Please select a course first.');
            }
        });
    }

    if (backButtonDetails) {
        backButtonDetails.addEventListener('click', function(event) {
            event.preventDefault();
            hideAllSections();
            document.getElementById('courseList').style.display = 'block';
        });
    }

    if (backButtonManagement) {
        backButtonManagement.addEventListener('click', function(event) {
            event.preventDefault();
            hideAllSections();
            document.getElementById('courseList').style.display = 'block';
        });
    }

    const courses = [
        { id: 1, title: 'Diploma', code: 'D456', duration: '2 years', NQFlevel: 'NQF level 6', description: 'Diploma in Information Technology' },
        { id: 2, title: 'BIT', code: 'B789', duration: '3 years', NQFlevel: 'NQF level 7', description: 'Bachelor of Information Technology' },
        { id: 3, title: 'BCOM', code: 'B123', duration: '3 years', NQFlevel: 'NQF level 7', description: 'Bachelor of Commerce in Information Technology' },
        // Add more course objects as needed
    ];

    function updateCourseList(query) {
        const filteredCourses = courses.filter(course => 
            course.title.toLowerCase().includes(query) || 
            course.code.toLowerCase().includes(query)
        );
        const courseList = document.querySelector('#courseList .row');
        courseList.innerHTML = '';

        if (filteredCourses.length === 0) {
            courseList.innerHTML = '<p>No courses found.</p>';
        }

        filteredCourses.forEach(course => {
            const card = document.createElement('div');
            card.className = 'col-md-4 mb-4';
            card.innerHTML = `
                <div class="card h-100">
                    <div class="card-body">
                        <h5 class="card-title">${course.title}</h5>
                        <p class="card-text">${course.code}</p>
                        <p class="card-text">${course.duration}</p>
                        <p class="card-text">${course.description}</p>
                        <p class="card-text">${course.NQFlevel}</p>
                    </div>
                    <div class="card-footer">
                        <button class="btn btn-primary view-details" data-id="${course.id}">View Details</button>
                    </div>
                </div>
            `;
            card.querySelector('.view-details').addEventListener('click', function() {
                currentCourseId = course.id;
                displayCourseDetails(course.id);
                hideAllSections();
                document.getElementById('details').style.display = 'block';
            });
            courseList.appendChild(card);
        });
    }

    function displayCourseDetails(courseId) {
        const course = courses.find(c => c.id === courseId);
        const courseDetails = document.getElementById('courseDetails');
        courseDetails.innerHTML = `
            <h3>${course.title}</h3>
            <p>Code: ${course.code}</p>
            <p>Duration: ${course.duration}</p>
            <p>NQF Level: ${course.NQFlevel}</p>
            <p>Description: ${course.description}</p>
            <a href="${studyGuides[course.title]}" class="btn btn-primary">Download Study Guide</a>
            <a href="${videoLinks[course.title]}" class="btn btn-primary">Watch Video</a>
        `;
    }

    function updateModuleList(courseId) {
        const modules = {
            1: ['Module 1.1', 'Module 1.2', 'Module 1.3'],
            2: ['Module 2.1', 'Module 2.2', 'Module 2.3'],
            3: ['Module 3.1', 'Module 3.2', 'Module 3.3']
        };

        const moduleList = document.getElementById('moduleList');
        moduleList.innerHTML = '<h3>Modules</h3><ul>';

        modules[courseId].forEach(module => {
            moduleList.innerHTML += `<li>${module}</li>`;
        });

        moduleList.innerHTML += '</ul>';
    }

    function updateProgressTrackers(courseId) {
        const progressTrackers = {
            1: [30, 60, 90],
            2: [40, 70, 100],
            3: [20, 50, 80]
        };

        const progressTrackersContainer = document.getElementById('progressTrackers');
        progressTrackersContainer.innerHTML = '<h3>Progress Trackers</h3>';

        progressTrackers[courseId].forEach((progress, index) => {
            progressTrackersContainer.innerHTML += `
                <div>
                    <h4>Year ${index + 1}</h4>
                    <div class="progress">
                        <div class="progress-bar" role="progressbar" style="width: ${progress}%;" aria-valuenow="${progress}" aria-valuemin="0" aria-valuemax="100">${progress}%</div>
                    </div>
                </div>
            `;
        });

        const overallProgress = progressTrackers[courseId].reduce((a, b) => a + b, 0) / progressTrackers[courseId].length;
        const overallProgressTracker = document.getElementById('overallProgressTracker');
        overallProgressTracker.innerHTML = `
            <h3>Overall Progress</h3>
            <div class="progress">
                <div class="progress-bar" role="progressbar" style="width: ${overallProgress}%;" aria-valuenow="${overallProgress}" aria-valuemin="0" aria-valuemax="100">${overallProgress}%</div>
            </div>
        `;
    }

    // Event listener for the print button to print the course details
    document.getElementById('printButton').addEventListener('click', function() {
        window.print();
    });

    // Initial call to display the course list when the page loads
    updateCourseList('');
});
