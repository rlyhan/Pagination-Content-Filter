// makePages();
//
// function makePages() {
//   var str = '<ul>';
//   for (let i = 1; i <= 5; i++) {
//     str += '<li><a href="#">' + (i) + '</a></li>';
//   }
//   str += '</ul>';
//   const $pagination = $('<div class="pagination">' + str + '</div>');
//   // append our new page link section to the site
//   $('.page').append($pagination);
//   // set first page to 'active'
//   $('a:first').addClass('active');
// }


// create a search bar
var str = "<input placeholder="Search for students..."><button>Search</button>";
$searchBar = $('<div class="student-search">' + str + '</div>');
$('.page-header cf').append($searchBar);
