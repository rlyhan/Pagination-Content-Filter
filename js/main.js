// select all students
var students = document.getElementsByClassName('student-item cf');
// show the first page
showPage(1, students);
// create links to pages
appendPageLinks(students);

function showPage(pageNum, studentList) {
    // first hide all students on the page
    for (let i = 0; i < students.length; i++) {
      students[i].style.display = 'none';
    }
    var pageGroup = groupStudents(studentList, pageNum);
    // Then loop through all students in our student list argument
       // if student should be on this page number
       	// show the student
    for (let i = 0; i < pageGroup.length; i++) {
      pageGroup[i].style.display = 'block';
    }
 }

function appendPageLinks(studentList) {
    // determine how many pages for this student list
    var numberOfPages = Math.floor(studentList.length/10);
    // create a page link section
    // “for” every page
        // add a page link to the page link section
    var str = '<ul>';
    for (let i = 1; i <= numberOfPages; i++) {
      str += '<li><a href="#">' + (i) + '</a></li>';
    }
    str += '</ul>';
    const $pagination = $('<div class="pagination">' + str + '</div>');
    // remove the old page link section from the site
    $('.pagination').remove();
    // append our new page link section to the site
    $('.page').append($pagination);
    // set first page to 'active'
    $('a:first').addClass('active');
    // define what happens when you click a link
        // Use the showPage function to display the page for the link clicked
        // mark that link as “active”
    var prevPage = 1;
    var currentPage = 1;
    $('.pagination li').click(function() {
      if (this.textContent != currentPage) {
        prevPage = currentPage;
        $('.pagination a').eq(prevPage-1).removeClass();
        currentPage = this.textContent;
        $('.pagination a').eq(currentPage-1).addClass('active');
        showPage(currentPage, studentList);
      }
    });
}

function groupStudents(studentList, pageNum) {
  var groupsOfStudents = [];
  let counter = 0;
  var pageGroup = [];
  // loop through list of students
    // add a student to a subgroup for a page
    // if end of list reached
      // add the subgroup to groupsOfStudents
    // else if ten students have been added to subgroup
      // add the subgroup to groupsOfStudents
      // reinitialise an empty subgroup
  for (let i = 0; i <= studentList.length; i++) {
    counter++;
    if (studentList[i] != null) {
      pageGroup.push(studentList[i]);
    }
    if (i == studentList.length) {
      groupsOfStudents.push(pageGroup);
      break;
    } else if (counter == 10) {
      let startIndex = i - 10;
      groupsOfStudents.push(pageGroup);
      counter = 0;
      pageGroup = [];
    }
  }
  // return subgroup at index of page number in groupsOfStudents
  return groupsOfStudents[pageNum-1];
}

// create a search bar
var str = '<input placeholder="Search for students..."><button>Search</button>';
const $searchBar = $('<div class="student-search">' + str + '</div>');
$('.page-header cf').append($searchBar);

$('.student-search button').click(function() {
  // remove the 'No students found' message if present
  $("h3:contains('No students found')").remove();
  // call searchList function with the typed input as argument
  var input = document.querySelector('input').value;
  searchList(input);
});

function searchList(input) {
    // Obtain the value of the search input
    // remove the previous page link section
    $('.pagination').remove();
    // Loop over the student list, and for each student…
      // ...obtain the student’s name…
      // ...and the student’s email…
      // ...if the search value is found inside either email or name…
    		  // ...add this student to list of “matched” student
    var matchedStudents = []
    for (let i = 0; i < students.length; i++) {
      var name = document.getElementsByTagName('h3').item(i).textContent;
      var email = document.getElementsByClassName('email')[i].innerHTML;
      if (name.includes(input) || email.includes(input)) {
        matchedStudents.push(students[i]);
      }
    }
    // If there’s no “matched” students…
      // ...display a “No students found” message
    // If over ten students were found…
      // ...call appendPageLinks with the matched students
    if (matchedStudents.length == 0) {
      const $noStudents = $('<h3>No students found</h3>')
      $('.page').append($noStudents);
    }
    else if (matchedStudents.length >= 10) {
      appendPageLinks(matchedStudents);
    }
    // Call showPage to show first ten students of matched list
    showPage(1, matchedStudents);
}
