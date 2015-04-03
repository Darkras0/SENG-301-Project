
var userListData = [];
// DOM Ready
$(document).ready(function () {

});


// Functions

// Add Anime test
$('#btnAddAnime').on('click', addAnime);

function addAnime(event) {
    event.preventDefault();

    //Checks to see if fields are filled in, no error checking for titles yet
    var errorCount = 0;
    $('#AddAnime input').each(function (index, val) {
        if ($(this).val() === '') { errorCount++; }
    });

    //Check to see if errorcount is zero
    if (errorCount === 0) {
        var addAnime = {
            'animeName': $('#addAnime fieldset input#inputAnime').val(),
            'genre': $('#addAnime fieldset input#inputGenre').val()
        }

        $.ajax({
            type: 'POST',
            data: addAnime,
            url: '/users/addanime',
            dataType: 'JSON'
        }).done(function (response) {

            if (response.msg === '') {


            }
            else {

                // If something goes wrong, alert the error message that our service returned
                alert('Error: ' + response.msg);
            }
        });
    }
    else {
        // If errorCount is more than 0, error out
        alert('Please fill in all fields');
        return false;
    }
};

// Add User button click
$('#btnAddUser').on('click', addUser);

// Add User
function addUser(event) {
    event.preventDefault();

    // Super basic validation - increase errorCount variable if any fields are blank
    var errorCount = 0;
    $('#addUser input').each(function (index, val) {
        if ($(this).val() === '') { errorCount++; }
    });

    // Check and make sure errorCount's still at zero
    if (errorCount === 0) {

        // If it is, compile all user info into one object
        var newUser = ({
            'username': $('#addUser fieldset input#inputUserName').val(),
            'email': $('#addUser fieldset input#inputUserEmail').val(),

        });

        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            data: newUser,
            url: '/users/adduser',
            dataType: 'JSON'
        }).done(function (response) {


            // Check for successful (blank) response
            if (response.msg === '') {

            }
            else {

                // If something goes wrong, alert the error message that our service returned
                alert('Error: ' + response.msg);

            }
        });
    }
    else {
        // If errorCount is more than 0, error out
        alert('Please fill in all fields');
        return false;
    }
};



$('#btnSearchAnime').on('click', searchAnime);

// Search anime
function searchAnime(event) {
    event.preventDefault();
    
    console.log("test");

    var username = ({ 'searchAnime': $('#searchAnime fieldset input#searchAnime').val() })
    var results;

    recommendAnimeOnce(username, function (call) {
        results = call;
        console.log("Results : " + results);
        
    });
    console.log(results);
    
    var string = ({
        "anime" : results
    })
    $.ajax({
        type: 'POST',
        data : string,
        url: '/users/search/'
    }).done(function (response) {
        if (response.msg === '') {
        }
        else {
            alert('Error ' + response.msg);
        }

    
    });
}

