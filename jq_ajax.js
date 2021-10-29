// ajax.js
//
//
// I'm using two libraries : jquery and underscore ,
// and have downloaded both of them to this folder ..
//   * jquery 3.6.0 from https://jquery.com/download/
//   * underscore.js 1.31.1 from https://underscorejs.org/ (umd production)
//
// I use openlibrary api from here (https://openlibrary.org/developers/api)
// The search is done in this format https://openlibrary.org/isbn/9780140328721.json
// In order to extract information about a book we need to change the isb number which is
// 9780140328721 in this case
//
// Tesfatsion | cs.bennington.college | Sep 2021 | CC



function clearSpace(id){
    $(id).html(" ")
}

function handleSearchResults(result){
    //console.log(result); debug
    
    // book: a dictionary containing what informations to obtain from the search result and
    // how to display it
    let book = {'Book title': 'title', 'Publishers': 'publishers[0]', 'Number of pages': 'number_of_pages', 
    'ISBN 10': 'isbn_10', 'ISBN 13': 'isbn_13', 'Physical format': 'physical_format', 'Copyright date': 
    'copyright_date', 'Publish places': 'publish_places'}

    clearSpace('#book'); // clean up the book space before displaying the next search result
    clearSpace('#message'); // clean up the error message space if there was any warning from previous error warning
    for (let info in book){
        var search_for = result[book[info]]
        $('#book').append('<ul>' + info + ": "+ JSON.stringify(search_for) + '</ul>')
    }

    //writeOut(result) //debugging
}


// search using other attributes too/ making a request based on the previous request result (will be working on this later).
function additional_info(search){
    $.ajax({url: 'https://openlibrary.org/isbn/' + input_isbn +'.json',    //'https://api.publicapis.org/categories',
        type: 'GET',
        dataType: 'json', // parse result & convert to js object
        success: result => handleSearchResults(result),
        error: function(){$('#message').html('Please enter the right ISBN code')},
       });
}

function writeOut(result){ // displaying crude output for debugging
    $('#debug').html(JSON.stringify(result))
}

function searchBooks(){
    var input_isbn = prompt('Enter the isbn10/13 of the book you are looking for: ');
    // sample inputs that I tested on
    //0385504209, 9780198788607, 9781408856772
    // the search may not return all the information but it fetches at least some data for every valid entry.
    $.ajax({url: 'https://openlibrary.org/isbn/' + input_isbn +'.json',
        type: 'GET',
        dataType: 'json', // parse result & convert to js object
        success: result => handleSearchResults(result),
        error: function(){$('#message').html('Please enter the right ISBN code')},
       });

}


window.onload = init;