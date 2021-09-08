/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/

/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
/**
 * The showPage function, takes data from the array of objects returning the student data, and
 * insert it in the HTML.
 * @param {array} list
 * @param {number} page
 */
function showPage(list, page) {
    //Store the number of desired pages inot a variable
    const items_per_page = 9
    //Calculate the startIndex (always 1) and the endIndex depending of the data quantity
    const startIndex = (page * items_per_page) - items_per_page
    const endIndex = page * items_per_page
    //Select the ul element where the student will be insert and set its value as empty
    const student_list = document.querySelector('.student-list')
    student_list.innerHTML = ''

    //Loop all the list and insert the data with its html tags and classes into student_list.
    //This loop and the conditional within will be also prepare the data to show when the user click
    //on another page (more about this in the function addPagination)
    for (let i = 0; i < list.length; i++) {

        if (i >= startIndex && i < endIndex) {
            //Insert adjacent before end the student_list the student data with its html tags and classes
            student_list.insertAdjacentHTML('beforeend', `
         <li class="student-item cf">
            <div class="student-details">
               <img class="avatar" src="${list[i].picture.medium}" alt="Profile Picture">
               <h3>${list[i].name.title} ${list[i].name.first} ${list[i].name.last}</h3>
               <span class="email">${list[i].email}</span>
            </div>
            <div class="joined-details">
               <span class="date">Joined ${list[i].registered.date}</span>
            </div>
         </li>`)
        }


    }

}

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/

/**
 * The function addPagination will generate the pagination and link pages buttons to show all
 * pages with the respective students. Also, this add and remove the active className to the button
 * links.
 * @param {array} list
 */
function addPagination(list) {

    //Store in a number the number of pages
    const totalPages = parseFloat(list.length / 9)
    //Select the ul were the buttons will be inserted and set its value as empty
    let link_list = document.querySelector('.link-list')
    link_list.innerHTML = ''

    //Loop all the pages and create and insert a link button for each page
    for (let i = 0; i <= totalPages; i++) {
        link_list.insertAdjacentHTML('beforeend', `
      <li>
         <button type="button">${i + 1}</button>
      </li>`)
    }

    //Set the class of the first link button to active
    let active_link = link_list.firstElementChild.firstElementChild
    active_link.className = 'active'

    //Listen the clicks in the link buttons to remove and set the active class
    link_list.addEventListener('click', (e) => {
        //Select all link buttons created as an array
        link_list = document.querySelectorAll('.link-list li')

        //Loop the array of link buttons and if anyone has the active class, remove it.
        for (let i = 0; i < link_list.length; i++) {
            if (link_list[i].firstElementChild.className === 'active') {
                link_list[i].firstElementChild.classList.remove('active')
            }
        }

        //Set the active class to the link button that was clicked
        e.target.className = 'active'
        //Select the number of the page that was clicked to pass to the showPage function
        let clickedPage = parseInt(e.target.innerText)
        //Call again the showPage function, to show the page the user clicked with the respective students within
        showPage(list, clickedPage)

    })

}

/**
 * searchResults func
 */

// Create dynamically the search bar and button
const header = document.querySelector('header')
header.insertAdjacentHTML('beforeend',
    `
 <label for="search" class="student-search">
    <span>Search by name</span>
    <input id="search" placeholder="Search by name...">
    <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
 </label>
 `
)

const searchInput = document.querySelector('input#search')
const searchButton = document.querySelector('input#search + button')

function searchResults(names, searchInput) {

    // Select the className and remove it if is in the body the error message
    let errorMessage = document.querySelector(".no-results");
    if (errorMessage) {
        errorMessage.remove();
    }

    const filteredStudents = []

    for (let i = 0; i < names.length; i++) {
        // Create a string with the full name to use includes method
        const studentFullName = `${names[i].name.first.toLowerCase()} ${names[i].name.last.toLowerCase()}`

        // Look if the search input match with some student
        if (searchInput.value.length !== 0 && studentFullName.includes(searchInput.value.toLowerCase())) {
            // Insert the student that match the search into a new array of student
            filteredStudents.push(names[i])
            // Refresh the content with the search results
            showPage(filteredStudents, 1)
            // Refresh the number of pages with the number of student that match the search
            addPagination(filteredStudents)
        }

    }

    // Display an error if there are not results to display for the search
    if (filteredStudents.length === 0) {
        errorMessage = `<h1 class="no-results">&#x1f616;  Sorry, no results found</h1>`
        header.insertAdjacentHTML("afterend", errorMessage);

        // Create the link_list again (for scope purpose) and set its value as empty
        const link_list = document.querySelector('.link-list')
        link_list.innerHTML = ''

        // Create the student_list again (for scope purpose) and set its value as empty
        const student_list = document.querySelector('.student-list')
        student_list.innerHTML = ''

    }

    // Validate if the searchInput is empty and remove the errorMessage if is there
    if (searchInput.value.length === 0) {
        document.querySelector('header+h1').remove()
        showPage(data, 1)
        addPagination(data)
    }

}

// Call functions
showPage(data, 1)
addPagination(data)

// Event listeners to search function
searchInput.addEventListener('keyup', () => {
    searchResults(data, searchInput)
})

searchButton.addEventListener('click', () => {
    searchResults(data, searchInput)
})