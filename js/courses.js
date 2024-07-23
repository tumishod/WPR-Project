document.addEventListener('DOMContentLoaded', function() {
    console.log('courses.js is loaded');

    let currentCourseId = null;

    function hideAllSections() {
        document.getElementById('courseList').style.display = 'none';
        document.getElementById('details').style.display = 'none';
        document.getElementById('courseManagement').style.display = 'none';
    }

    const viewCoursesLink = document.getElementById('coursesLink');
    const searchButton = document.getElementById('searchButton');

    if (viewCoursesLink) {
        viewCoursesLink.addEventListener('click', function(event) {
            event.preventDefault();
            hideAllSections();
            document.getElementById('courseList').style.display = 'block';
            updateCourseList(''); // Initialize with all courses
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

    const courses = [
        { id: 1, title: 'Diploma', code: 'D456', duration: '2 years', description: 'Diploma in Information Technology' },
        { id: 2, title: 'BIT', code: 'BIT789', duration: '3 years', description: 'Bachelor of Information Technology' },
        { id: 3, title: 'BCOM', code: 'BCOM101', duration: '4 years', description: 'Bachelor of Commerce' }
    ];

    const courseDetailsData = {
        1: {
            title: 'Diploma',
            years: {
                'First Year': ['BUC161', 'BME161', 'COA161', 'DBC161', 'DBF161', 'EUC161', 'INL161', 'IOT161', 'MAT161', 'NWD161', 'PRS161', 'PRG161', 'PRP161', 'WPR161', 'STA161'],
                'Second Year': ['DBD261', 'ERP261', 'INL261', 'ILE261', 'PMM261', 'CNA261', 'IOT261', 'OPS261', 'OPS262', 'OPS263', 'SEC261', 'PRG261', 'PRG262', 'SWA261', 'SWT261', 'SWT262', 'UXD261', 'WPR261']
            }
        },
        2: {
            title: 'BIT',
            years: {
                'First Year': ['ACW171', 'COA171', 'DBD171', 'ENG171', 'INF171', 'INL101', 'INL102', 'MAT171', 'NWD171', 'PRG171', 'PRG172', 'STA171', 'WPR171', 'BUM171', 'ENT171'],
                'Second Year': ['CNA271', 'DBD221', 'ERP271', 'ETH271', 'INF271', 'INL201', 'INL202', 'LPR171', 'PRG271', 'PRG272', 'PMM271', 'STA271', 'WPR271', 'IOT271', 'SWT271'],
                'Third Year': ['BIN371', 'CNA371', 'DAL371', 'DBD371', 'INL371', 'PRG371', 'PRJ371', 'PMM371', 'SAD371', 'SEN371', 'WPR371', 'INM371', 'UAX371']
            }
        },
        3: {
            title: 'BCOM',
            years: {
                'First Year': ['ACW181', 'COA181', 'DBD181', 'INF181', 'INL101', 'INL102', 'LPR181', 'MAT181', 'NWD181', 'PRG181', 'PRG182', 'STA181', 'WPR181', 'BUM181', 'ENT181'],
                'Second Year': ['DBD281', 'INF281', 'INL201', 'INL202', 'LPR281', 'MAT281', 'PRG281', 'PRG282', 'PMM281', 'STA281', 'WPR281', 'SAD281', 'DWH281', 'IOT281', 'SWT281'],
                'Third Year': ['RSH381', 'DBD381', 'INL321', 'LPR381', 'MLG381', 'PRJ381', 'PMM381', 'PRG381', 'SEN381', 'WPR381', 'BIN381', 'DBA381', 'STA381', 'INM381', 'MLG382', 'UAX381'],
                'Fourth Year': ['AIT481', 'AIT482', 'DST481']
            }
        }
    };

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

    function displayCourseDetails(courseId) {
        const details = courseDetailsData[courseId];
        const courseDetails = document.getElementById('courseDetails');

        let tableContent = `
            <table>
                <tr>
                    <th>Year</th>
                    <th>Modules</th>
                </tr>
        `;

        Object.keys(details.years).forEach(year => {
            tableContent += `
                <tr>
                    <td>${year}</td>
                    <td>
                        <ul>
                            ${details.years[year].map(module => `<li>${module}</li>`).join('')}
                        </ul>
                    </td>
                </tr>
            `;
        });

        tableContent += '</table>';

        courseDetails.innerHTML = `
            <h3>${details.title}</h3>
            ${tableContent}
        `;
    }

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
                moduleUl.appendChild(listItem);
            });
            moduleList.appendChild(moduleUl);
        });
    }

    document.getElementById('courseDetails').addEventListener('click', function(event) {
        if (event.target && event.target.matches('.module')) {
            markModuleCompleted(event.target);
        }
    });

    function markModuleCompleted(moduleElement) {
        moduleElement.classList.toggle('completed');
        updateCompletedModulesList();
    }

    function updateCompletedModulesList() {
        const completedModules = document.querySelectorAll('.module.completed');
        const moduleList = document.getElementById('moduleList');
        moduleList.innerHTML = '';

        completedModules.forEach(module => {
            const listItem = document.createElement('li');
            listItem.textContent = module.textContent;
            moduleList.appendChild(listItem);
        });
    }

    document.getElementById('printButton').addEventListener('click', function() {
        window.print();
    });
});
