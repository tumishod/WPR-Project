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
    }

    const viewCoursesLink = document.getElementById('coursesLink');
    const searchButton = document.getElementById('searchButton');
    const courseManagementLink = document.getElementById('modulesLink');

    // Event listener for the "Courses" link to display all courses
    if (viewCoursesLink) {
        viewCoursesLink.addEventListener('click', function(event) {
            event.preventDefault();
            hideAllSections();
            document.getElementById('courseList').style.display = 'block';
            updateCourseList(''); // Initialize with all courses
        });
    }

    // Event listener for the "Search" button to filter courses
    if (searchButton) {
        searchButton.addEventListener('click', function() {
            const query = document.getElementById('searchBar').value.toLowerCase();
            console.log('Search query:', query);
            updateCourseList(query);
            document.getElementById('courseList').style.display = 'block';
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
     // Event listener for the "Course Details" link
     if (courseDetailsLink) {
        courseDetailsLink.addEventListener('click', function(event) {
            event.preventDefault();
            hideAllSections();
            document.getElementById('details').style.display = 'block';
            if (currentCourseId) {
                displayCourseDetails(currentCourseId);
            } else {
                alert('Please select a course first.');
            }
        });
    }

    // Array containing course information, including NQF level
    const courses = [
        { id: 1, title: 'Diploma', code: 'D456', duration: '2 years', NQFlevel: 'NQF level 6', description: 'Diploma in Information Technology' },
        { id: 2, title: 'BIT', code: 'BIT789', duration: '3 years', NQFlevel: 'NQF level 7', description: 'Bachelor of Information Technology' },
        { id: 3, title: 'BCOM', code: 'BCOM101', duration: '4 years', NQFlevel: 'NQF level 8', description: 'Bachelor of Computing' }
    ];

    // Object containing detailed course data, including years, modules, lecturers, and venue
    const courseDetailsData = {
        1: {
            title: 'Diploma',
            years: {
                'First Year': ['BUC161', 'BME161', 'COA161', 'DBC161', 'DBF161', 'EUC161', 'INL161', 'IOT161', 'MAT161', 'NWD161', 'PRS161', 'PRG161', 'PRP161', 'WPR161', 'STA161'],
                'Second Year': ['DBD261', 'ERP261', 'INL261', 'ILE261', 'PMM261', 'CNA261', 'IOT261', 'OPS261', 'OPS262', 'OPS263', 'SEC261', 'PRG261', 'PRG262', 'SWA261', 'SWT261', 'SWT262', 'UXD261', 'WPR261']
            },
            lecturers: ['Lecturer1', 'Lecturer2', 'Lecturer3', 'Lecturer4', 'Lecturer5', 'Lecturer6', 'Lecturer7', 'Lecturer8', 'Lecturer9', 'Lecturer10', 'Lecturer11', 'Lecturer12', 'Lecturer13', 'Lecturer14', 'Lecturer15'],
            venue: ['Kempton Park', 'Pretoria', 'Online']
        },
        2: {
            title: 'BIT',
            years: {
                'First Year': ['ACW171', 'COA171', 'DBD171', 'ENG171', 'INF171', 'INL101', 'INL102', 'MAT171', 'NWD171', 'PRG171', 'PRG172', 'STA171', 'WPR171', 'BUM171', 'ENT171'],
                'Second Year': ['CNA271', 'DBD221', 'ERP271', 'ETH271', 'INF271', 'INL201', 'INL202', 'LPR171', 'PRG271', 'PRG272', 'PMM271', 'STA271', 'WPR271', 'IOT271', 'SWT271'],
                'Third Year': ['BIN371', 'CNA371', 'DAL371', 'DBD371', 'INL371', 'PRG371', 'PRJ371', 'PMM371', 'SAD371', 'SEN371', 'WPR371', 'INM371', 'UAX371']
            },
            lecturers: ['Lecturer1', 'Lecturer2', 'Lecturer3', 'Lecturer4', 'Lecturer5', 'Lecturer6', 'Lecturer7', 'Lecturer8', 'Lecturer9', 'Lecturer10', 'Lecturer11', 'Lecturer12', 'Lecturer13', 'Lecturer14', 'Lecturer15'],
            venue: ['Kempton Park', 'Pretoria', 'Online']
        },
        3: {
            title: 'BCOM',
            years: {
                'First Year': ['ACW181', 'COA181', 'DBD181', 'INF181', 'INL101', 'INL102', 'LPR181', 'MAT181', 'NWD181', 'PRG181', 'PRG182', 'STA181', 'WPR181', 'BUM181', 'ENT181'],
                'Second Year': ['DBD281', 'INF281', 'INL201', 'INL202', 'LPR281', 'MAT281', 'PRG281', 'PRG282', 'PMM281', 'STA281', 'WPR281', 'SAD281', 'DWH281', 'IOT281', 'SWT281'],
                'Third Year': ['RSH381', 'DBD381', 'INL321', 'LPR381', 'MLG381', 'PRJ381', 'PMM381', 'PRG381', 'SEN381', 'WPR381', 'BIN381', 'DBA381', 'STA381', 'INM381', 'MLG382', 'UAX381'],
                'Fourth Year': ['AIT481', 'AIT482', 'DST481']
            },
            lecturers: ['Lecturer1', 'Lecturer2', 'Lecturer3', 'Lecturer4', 'Lecturer5', 'Lecturer6', 'Lecturer7', 'Lecturer8', 'Lecturer9', 'Lecturer10', 'Lecturer11', 'Lecturer12', 'Lecturer13', 'Lecturer14', 'Lecturer15'],
            venue: ['Kempton Park', 'Pretoria', 'Online']
        }
    };

    // Function to update the course list based on the search query
    function updateCourseList(query) {
        const filteredCourses = courses.filter(course => 
            course.title.toLowerCase().includes(query) || 
            course.code.toLowerCase().includes(query)
        );
        const courseList = document.getElementById('courseList');
        courseList.innerHTML = '';

        if (filteredCourses.length === 0) {
            courseList.innerHTML = '<p>No courses found.</p>';
        }

        filteredCourses.forEach(course => {
            const courseItem = document.createElement('div');
            courseItem.className = 'course-item';
            courseItem.innerHTML = `
                <h3 class="course-title" data-id="${course.id}">${course.title}</h3>
                <p>${course.code}</p>
                <p>${course.duration}</p>
                <p>${course.description}</p>
                <p>${course.NQFlevel}</p>
            `;
            courseItem.addEventListener('click', function() {
                currentCourseId = course.id;
                displayCourseDetails(course.id);
                hideAllSections();
                document.getElementById('details').style.display = 'block';
            });
            courseList.appendChild(courseItem);
        });
    }

    // Function to display the course details, including modules for each year
    function displayCourseDetails(courseId) {
        const details = courseDetailsData[courseId];
        const courseDetails = document.getElementById('courseDetails');

        let tableContent = `
            <table>
                <thead>
                    <tr>
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
                        <a href="${studyGuides[details.title]}" class="download-link" target="_blank">Download Study Guide</a><br>
                        <a href="${videoLinks[details.title]}" class="video-link" target="_blank">Intro Vid to module</a>
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
                listItem.textContent = module; // Corrected this line to use module name
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
            completedModulesList.innerHTML = ''; // Clear the list before updating

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

            const progressBar = document.createElement('div');
            progressBar.className = 'progress-bar';
            
            const progressContainer = document.createElement('div');
            progressContainer.className = 'progress-container';

            const progress = document.createElement('div');
            progress.className = 'progress';
            progress.style.width = `${(completedModules / yearModules) * 100}%`;

            progressContainer.appendChild(progress);
            progressBar.innerHTML = `<label>${year}</label>`;
            progressBar.appendChild(progressContainer);

            progressTrackers.appendChild(progressBar);
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

        overallProgressTracker.innerHTML = `
            <label>Overall Progress</label>
            <div class="progress-container">
                <div class="progress" style="width: ${(totalCompletedModules / totalModules) * 100}%"></div>
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
