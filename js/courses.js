document.addEventListener('DOMContentLoaded', function() {
    console.log('courses.js is loaded');
    let currentCourseId = null;

    // Shared resources for all modules
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

    // Function to hide all sections initially
    function hideAllSections() {
        document.getElementById('courseList').style.display = 'none';
        document.getElementById('details').style.display = 'none';
        document.getElementById('courseManagement').style.display = 'none';
        document.getElementById('searchResults').style.display = 'none'; // Ensure search results are also hidden
    }

    const viewCoursesLink = document.getElementById('coursesLink');
    const searchButton = document.getElementById('searchButton');
    const courseManagementLink = document.getElementById('modulesLink');
    const backButtonDetails = document.getElementById('backButtonDetails');
    const backButtonManagement = document.getElementById('backButtonManagement');
    const searchForm = document.querySelector('.search-bar');
    const searchBar = document.getElementById('searchBar');

    // Event listener for the "Courses" link to display all courses
    if (viewCoursesLink) {
        viewCoursesLink.addEventListener('click', function(event) {
            event.preventDefault();
            hideAllSections();
            document.getElementById('courseList').style.display = 'block';
            updateCourseList(''); // Initialize with all courses
        });
    }

    // Event listener for the "Search" form to filter courses
    if (searchForm) {
        searchForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const query = searchBar.value.toLowerCase();
            console.log('Search query:', query);
            fetchCourses(query); // Call fetchCourses to handle search
        });
    }

    // Add keyup event listener for dynamic search
    if (searchBar) {
        searchBar.addEventListener('keyup', function(event) {
            const query = searchBar.value.toLowerCase();
            console.log('Search query:', query);
            fetchCourses(query); // Call fetchCourses to handle search
        });
    }

    // Event listener for the "Course Management" link
    if (courseManagementLink) {
        courseManagementLink.addEventListener('click', function(event) {
            event.preventDefault();
            if (currentCourseId) {
                hideAllSections();
                document.getElementById('courseManagement').style.display = 'block';
                updateModuleList(currentCourseId);
                updateProgressTrackers(currentCourseId); // Update progress trackers
            } else {
                alert('Please select a course first.');
            }
        });
    }

    // Event listener for the "Back" button in the details section
    if (backButtonDetails) {
        backButtonDetails.addEventListener('click', function(event) {
            event.preventDefault();
            hideAllSections();
            window.location.href = 'courses.html'; // Redirect to courses page without search query
        });
    }

    // Event listener for the "Back" button in the management section
    if (backButtonManagement) {
        backButtonManagement.addEventListener('click', function(event) {
            event.preventDefault();
            hideAllSections();
            window.location.href = 'courses.html'; // Redirect to courses page without search query
        });
    }

    // Array containing course information, including NQF level
    const courses = [
        { id: 1, title: 'Diploma in Information Technology (DIT)', code: 'DIT456', duration: '2 & 1 years', NQFlevel: '6', description: 'Diploma in Information Technology' },
        { id: 2, title: 'Bachelor in Information Technology (BIT)', code: 'BIT789', duration: '3 years', NQFlevel: '7', description: 'Bachelor of Information Technology' },
        { id: 3, title: 'Bachelor in Computing (BCOM)', code: 'BCOM101', duration: '4 years', NQFlevel: '8', description: 'Bachelor of Computing' }
    ];

    // Object containing detailed course data, including years, modules, lecturers, and venue
    const courseDetailsData = {
        1: {
            title: 'Diploma in Information Technology (DIT)',
            years: {
                'First Year': ['BUC161', 'BME161', 'COA161', 'DBC161', 'DBF161'],
                'Second Year': ['DBD261', 'ERP261', 'INL261', 'ILE261', 'PMM261']
            },
            lecturers: ['Roger Gentry', 'Maximillian Barlow', 'Steve O Sullivan', 'Milly Merrill', 'Clyde Watson'],
            venue: ['Kempton Park', 'Pretoria', 'Online']
        },
        2: {
            title: 'Bachelor in Information Technology (BIT)',
            years: {
                'First Year': ['ACW171', 'COA171', 'DBD171', 'ENG171', 'INF171'],
                'Second Year': ['CNA271', 'DBD221', 'ERP271', 'ETH271', 'INF271'],
                'Third Year': ['BIN371', 'CNA371', 'DAL371', 'DBD371', 'INL371']
            },
            lecturers: ['Elle Montes', 'Ted Ponce', 'Faisal Howe', 'Lexi Lowery', 'Agnes Chandler'],
            venue: ['Kempton Park', 'Pretoria', 'Online']
        },
        3: {
            title: 'Bachelor of Computing (BCOM)',
            years: {
                'First Year': ['ACW181', 'COA181', 'DBD181', 'INF181', 'INL101'],
                'Second Year': ['DBD281', 'INF281', 'INL201', 'INL202', 'LPR281'],
                'Third Year': ['RSH381', 'DBD381', 'INL321', 'LPR381', 'MLG381'],
                'Fourth Year': ['AIT481', 'AIT482', 'DST481']
            },
            lecturers: ['Elle Montes', 'Ted Ponce', 'Faisal Howe', 'Lexi Lowery', 'Agnes Chandler'],
            venue: ['Kempton Park', 'Pretoria', 'Online']
        }
    };

    // Function to fetch courses based on search query
    function fetchCourses(query) {
        const filteredCourses = courses.filter(course => 
            course.title.toLowerCase().includes(query) || 
            course.code.toLowerCase().includes(query) || 
            Object.values(courseDetailsData[course.id].years).flat().some(module => module.toLowerCase().includes(query))
        );

        displaySearchResults(filteredCourses);
    }

    // Function to update the course list based on the search query
    function updateCourseList(query) {
        const filteredCourses = courses.filter(course =>
            course.title.toLowerCase().includes(query) ||
            course.code.toLowerCase().includes(query) ||
            Object.values(courseDetailsData[course.id].years).flat().some(module => module.toLowerCase().includes(query))
        );

        const courseList = document.querySelector('#courseList');
        courseList.innerHTML = '';

        if (filteredCourses.length === 0) {
            courseList.innerHTML = '<p>No courses found.</p>';
        }

        // Create a Bootstrap row to contain the course cards
        const row = document.createElement('div');
        row.className = 'row';

        filteredCourses.forEach(course => {
            const col = document.createElement('div');
            col.className = 'col-md-4 mb-4';
            col.innerHTML = `
                <div class="card border-warning mb-3 h-100">
                    <h5 class="card-header bg-warning">
                        ${course.title}
                    </h5>
                    <div class="card-body text-bg-dark p-3">
                        <p class="card-text">Course code: ${course.code}</p>
                        <p class="card-text">Course Duration: ${course.duration}</p>
                        <p class="card-text">Description: ${course.description}</p>
                        <p class="card-text">NQF Level: ${course.NQFlevel}</p>
                        <button class="btn btn-warning view-details" data-id="${course.id}">View Details</button>
                    </div>
                </div>
            `;
            col.querySelector('.view-details').addEventListener('click', function() {
                currentCourseId = course.id;
                displayCourseDetails(course.id);
                hideAllSections();
                document.getElementById('details').style.display = 'block';
            });
            row.appendChild(col);
        });

        courseList.appendChild(row);
    }

    // Function to display search results
    function displaySearchResults(courses) {
        const searchResultsContainer = document.getElementById('searchResultsContainer');
        const courseList = document.getElementById('courseList');
        const searchResults = document.getElementById('searchResults');

        if (courseList && searchResults && searchResultsContainer) {
            courseList.style.display = 'none'; // Hide the course list
            searchResults.style.display = 'block'; // Show search results section
            searchResultsContainer.innerHTML = '';

            if (courses.length > 0) {
                const row = document.createElement('div');
                row.className = 'row';

                courses.forEach(course => {
                    const col = document.createElement('div');
                    col.className = 'col-md-4 mb-4';
                    
                    let moduleContent = '';
                    const courseDetails = courseDetailsData[course.id];

                    Object.keys(courseDetails.years).forEach(year => {
                        const modules = courseDetails.years[year].map(module => `<li>${module}</li>`).join('');
                        moduleContent += `
                            <h6>${year}</h6>
                            <ul>${modules}</ul>
                        `;
                    });

                    col.innerHTML = `
                        <div class="card border-warning mb-3 h-100">
                            <h5 class="card-header bg-warning">
                                ${course.title}
                            </h5>
                            <div class="card-body text-bg-dark p-3">
                                <p class="card-text">Course code: ${course.code}</p>
                                <p class="card-text">Course Duration: ${course.duration}</p>
                                <p class="card-text">Description: ${course.description}</p>
                                <p class="card-text">NQF Level: ${course.NQFlevel}</p>
                                <div class="modules-container">
                                    ${moduleContent}
                                </div>
                                <button class="btn btn-warning view-details" data-id="${course.id}">View Details</button>
                            </div>
                        </div>
                    `;
                    col.querySelector('.view-details').addEventListener('click', function() {
                        currentCourseId = course.id;
                        displayCourseDetails(course.id);
                        hideAllSections();
                        document.getElementById('details').style.display = 'block';
                    });
                    row.appendChild(col);
                });

                searchResultsContainer.appendChild(row);
            } else {
                searchResultsContainer.innerHTML = '<p>No courses found.</p>';
            }
        }
    }

    // Function to display the course details, including modules for each year
    function displayCourseDetails(courseId) {
        const details = courseDetailsData[courseId];
        const courseDetails = document.getElementById('courseDetails');

        let tableContent = `
            <table class="table table-warning table-striped">
                <thead>
                    <tr class="table-warning">
                        <th>Year</th>
                        <th>Modules</th>
                        <th>Lecturers</th>
                        <th>Venue</th>
                    </tr>
                </thead>
                <tbody>
        `;

        Object.keys(details.years).forEach(year => {
            const modules = details.years[year].map(mod => {
                return `
                    <div>
                        <strong>${mod}</strong><br>
                        <a href="${studyGuides[details.title]}" class="download-link" target="_blank" link-danger>Download Study Guide</a><br>
                        <a href="${videoLinks[details.title]}" class="video-link" target="_blank" "link-danger">Introduction video to module</a>
                    </div>
                `;
            }).join('<br>');

            const lecturers = details.lecturers.join('<br>');
            const venue = details.venue.join('<br>');

            tableContent += `
                <tr>
                    <td class="vertical-align-top">${year}</td>
                    <td>${modules}</td>
                    <td class="vertical-align-top">${lecturers}</td>
                    <td class="vertical-align-top">${venue}</td>
                </tr>
            `;
        });

        tableContent += `
                </tbody>
            </table>
        `;

        courseDetails.innerHTML = `
            <h3>${details.title}</h3>
            ${tableContent}
        `;
    }

    // Function to update the module list and display it
    function updateModuleList(courseId) {
        const moduleList = document.getElementById('moduleList');
        moduleList.innerHTML = '';

        const details = courseDetailsData[courseId];
        Object.keys(details.years).forEach(year => {
            const yearItem = document.createElement('h4');
            yearItem.textContent = year;
            moduleList.appendChild(yearItem);

            const moduleUl = document.createElement('ul');
            details.years[year].forEach(module => {
                const listItem = document.createElement('li');
                listItem.textContent = module;
                listItem.className = 'module'; // Add class for completed tracking
                listItem.dataset.year = year; // Store year information in data attribute
                listItem.addEventListener('click', function() {
                    markModuleCompleted(listItem); // Toggle completion on click
                });
                moduleUl.appendChild(listItem);
            });
            moduleList.appendChild(moduleUl);
        });
    }

    // Function to mark a module as completed
    function markModuleCompleted(moduleElement) {
        moduleElement.classList.toggle('completed');
        updateCompletedModulesList();
    }

    // Function to update the completed modules list and progress
    function updateCompletedModulesList() {
        const completedModules = document.querySelectorAll('.module.completed');
        const completedModulesList = document.getElementById('completedModulesList');

        if (completedModulesList) {
            completedModulesList.innerHTML = '<h4>Completed Modules</h4>'; // Add header for completed modules

            completedModules.forEach(module => {
                const listItem = document.createElement('li');
                listItem.textContent = module.textContent;
                completedModulesList.appendChild(listItem);
            });

            // Update progress bars after updating the list of completed modules
            updateProgressTrackers(currentCourseId);
        } else {
            console.error('Element with ID "completedModulesList" not found.');
        }
    }

    // Function to update the progress bars
    function updateProgressTrackers(courseId) {
        const details = courseDetailsData[courseId];
        const progressTrackers = document.getElementById('progressTrackers');
        progressTrackers.innerHTML = '';

        // First, add the overall progress bar
        updateOverallProgressTracker(details);

        Object.keys(details.years).forEach(year => {
            const yearModules = details.years[year].length;
            const completedModules = document.querySelectorAll(`.module.completed[data-year="${year}"]`).length;

            const progress = (completedModules / yearModules) * 100;

            progressTrackers.innerHTML += `
                <div class="row mb-3">
                    <div class="col-sm-3"><h4>${year}</h4></div>
                    <div class="col-sm-9">
                        <div class="progress">
                            <div class="progress-bar ${getProgressBarColor(progress)}" role="progressbar" style="width: ${progress}%;" aria-valuenow="${progress}" aria-valuemin="0" aria-valuemax="100">${progress.toFixed(1)}%</div>
                        </div>
                    </div>
                </div>
            `;
        });
    }

    // Function to update the overall progress bar
    function updateOverallProgressTracker(details) {
        const overallProgressTracker = document.getElementById('overallProgressTracker');
        let totalModules = 0;
        let totalCompletedModules = 0;

        Object.keys(details.years).forEach(year => {
            const yearModules = details.years[year].length;
            totalModules += yearModules;
            const completedModules = document.querySelectorAll(`.module.completed[data-year="${year}"]`).length;
            totalCompletedModules += completedModules;
        });

        const overallProgress = (totalCompletedModules / totalModules) * 100;

        overallProgressTracker.innerHTML = `
            <div class="row mb-3">
                <div class="col-sm-3"><h3>Overall Progress</h3></div>
                <div class="col-sm-9">
                    <div class="progress">
                        <div class="progress-bar ${getProgressBarColor(overallProgress)}" role="progressbar" style="width: ${overallProgress}%;" aria-valuenow="${overallProgress}" aria-valuemin="0" aria-valuemax="100">${overallProgress.toFixed(1)}%</div>
                    </div>
                </div>
            </div>
        `;
    }

    // Utility function to determine progress bar color based on progress percentage
    function getProgressBarColor(progress) {
        if (progress >= 75) {
            return 'bg-success'; // Green
        } else if (progress >= 50) {
            return 'bg-warning'; // Yellow
        } else {
            return 'bg-danger'; // Red
        }
    }

    // Event listener for the print button to print the course details
    document.getElementById('printButton').addEventListener('click', function() {
        window.print();
    });

    // Check for search query in URL and perform search if present
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('search');
    if (searchQuery) {
        fetchCourses(searchQuery);
    } else {
        // Initial call to display the course list when the page loads if no search query
        updateCourseList('');
    }
});
