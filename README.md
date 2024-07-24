# WPR Project

list and quick explanation of the current list of variables in the important docs
Here is the detailed explanation of the variables for both the HTML and JS files, including what they do and how they link with each other.

### `enroll.html`
#### Variables and their descriptions:
1. **courseName**:
   - **Type**: HTML Select Element.
   - **Description**: Holds the name of the course the user wants to enroll in.
   - **Link**: Referenced by `enroll.js` to fetch the selected course name.

2. **firstName**:
   - **Type**: HTML Input Element (text).
   - **Description**: Holds the first name of the user.
   - **Link**: Referenced by `enroll.js` to fetch the entered first name.

3. **lastName**:
   - **Type**: HTML Input Element (text).
   - **Description**: Holds the last name of the user.
   - **Link**: Referenced by `enroll.js` to fetch the entered last name.

4. **email**:
   - **Type**: HTML Input Element (email).
   - **Description**: Holds the email address of the user.
   - **Link**: Referenced by `enroll.js` to fetch the entered email address.

5. **errorMessage**:
   - **Type**: HTML Div Element.
   - **Description**: Displays error messages.
   - **Link**: Updated by `enroll.js` to show validation errors.

6. **countdown**:
   - **Type**: HTML Div Element.
   - **Description**: Displays a countdown timer until the course starts.
   - **Link**: Controlled by `enroll.js` to show or hide the countdown.

7. **confirmationMessage**:
   - **Type**: HTML Div Element.
   - **Description**: Displays a message confirming the course has started.
   - **Link**: Controlled by `enroll.js` to show or hide the confirmation message.

8. **timer**:
   - **Type**: HTML Paragraph Element.
   - **Description**: Displays the countdown timer.
   - **Link**: Updated by `enroll.js` to show the remaining time until the course starts.

### `enroll.js`
#### Variables and their descriptions:
1. **courseName**:
   - **Type**: DOM Element.
   - **Description**: Stores the selected course name from the dropdown.
   - **Link**: Linked with the `courseName` select element in `enroll.html`.

2. **firstName**:
   - **Type**: DOM Element.
   - **Description**: Stores the entered first name.
   - **Link**: Linked with the `firstName` input element in `enroll.html`.

3. **lastName**:
   - **Type**: DOM Element.
   - **Description**: Stores the entered last name.
   - **Link**: Linked with the `lastName` input element in `enroll.html`.

4. **email**:
   - **Type**: DOM Element.
   - **Description**: Stores the entered email address.
   - **Link**: Linked with the `email` input element in `enroll.html`.

5. **errorMessage**:
   - **Type**: DOM Element.
   - **Description**: Stores the error message element.
   - **Link**: Linked with the `errorMessage` div element in `enroll.html`.

6. **startDates**:
   - **Type**: Object.
   - **Description**: Contains the start dates for each course.
   - **Link**: Used to fetch the start date for the selected course.

7. **startDate**:
   - **Type**: Date.
   - **Description**: Stores the start date of the selected course.
   - **Link**: Fetched from `startDates` based on the selected course.

8. **countdownInterval**:
   - **Type**: Interval.
   - **Description**: Controls the countdown timer interval.
   - **Link**: Used to update the `timer` element in `enroll.html`.

9. **templateParams**:
   - **Type**: Object.
   - **Description**: Holds the data to be sent via EmailJS.
   - **Link**: Contains information from the form elements.

### `courses.html`
#### Variables and their descriptions:
1. **courseList**:
   - **Type**: HTML Div Element.
   - **Description**: Container for displaying the list of courses.
   - **Link**: Populated dynamically by `courses.js`.

2. **courseDetails**:
   - **Type**: HTML Div Element.
   - **Description**: Container for displaying course details.
   - **Link**: Populated dynamically by `courses.js`.

3. **courseManagement**:
   - **Type**: HTML Section Element.
   - **Description**: Section for managing course modules.
   - **Link**: Managed by `courses.js`.

4. **moduleList**:
   - **Type**: HTML Div Element.
   - **Description**: Container for displaying the list of modules.
   - **Link**: Populated dynamically by `courses.js`.

5. **completedModulesList**:
   - **Type**: HTML Div Element.
   - **Description**: Container for displaying completed modules.
   - **Link**: Populated dynamically by `courses.js`.

6. **overallProgressTracker**:
   - **Type**: HTML Div Element.
   - **Description**: Container for displaying the overall progress bar.
   - **Link**: Populated dynamically by `courses.js`.

7. **progressTrackers**:
   - **Type**: HTML Div Element.
   - **Description**: Container for displaying progress bars for each year.
   - **Link**: Populated dynamically by `courses.js`.

### `courses.js`
#### Variables and their descriptions:
1. **currentCourseId**:
   - **Type**: Number.
   - **Description**: Stores the ID of the currently selected course.
   - **Link**: Used to fetch and display course details and modules.

2. **viewCoursesLink**:
   - **Type**: DOM Element.
   - **Description**: Stores the "Courses" link element.
   - **Link**: Used to add event listener for displaying all courses.

3. **searchButton**:
   - **Type**: DOM Element.
   - **Description**: Stores the search button element.
   - **Link**: Used to add event listener for filtering courses based on the search query.

4. **courseManagementLink**:
   - **Type**: DOM Element.
   - **Description**: Stores the "Course Management" link element.
   - **Link**: Used to add event listener for displaying course management section.

5. **courses**:
   - **Type**: Array.
   - **Description**: Contains information about all courses.
   - **Link**: Used to populate the course list dynamically.

6. **courseDetailsData**:
   - **Type**: Object.
   - **Description**: Contains detailed information about each course, including years and modules.
   - **Link**: Used to display course details and modules dynamically.

7. **completedModules**:
   - **Type**: NodeList.
   - **Description**: Stores the list of completed module elements.
   - **Link**: Used to update the list of completed modules and progress bars.

### Linking between HTML and JS:
1. **HTML Form Elements (`courseName`, `firstName`, `lastName`, `email`)**:
   - **Linked with JS**: These elements are referenced and manipulated in `enroll.js` to handle form submission, validation, and email sending.

2. **HTML Containers (`courseList`, `courseDetails`, `moduleList`, `completedModulesList`, `overallProgressTracker`, `progressTrackers`)**:
   - **Linked with JS**: These containers are populated dynamically by `courses.js` based on the selected course and user interactions.

3. **Event Listeners (`viewCoursesLink`, `searchButton`, `courseManagementLink`)**:
   - **Linked with JS**: These elements have event listeners added in `courses.js` to handle user interactions like displaying course lists, filtering courses, and managing course modules.

