// Userlist data array for filling in info box
var userListData = [];

// DOM Ready
$(document).ready(function () {

    // Populate the user table on initial page load
    populateTable();
    // Username link click
    $('#userList table tbody').on('click', 'td a.linkshowuser', showUserInfo);

});



// Functions

// Fill table with data
function populateTable() {

    // Empty content string
    var tableContent = '';

    // jQuery AJAX call for JSON
    $.getJSON('/users/userlist', function (data) {

        userListData = data;

        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function () {
            tableContent += '<tr>';
            tableContent += '<td><a href="#" class="linkshowuser" rel="' + this.username + '">' + this.username + '</a></td>';
            tableContent += '<td>' + this.email + '</td>';
            tableContent += '<td><a href="#" class="linkdeleteuser" rel="' + this._id + '">delete</a></td>';
            tableContent += '</tr>';
        });

        // Inject the whole content string into our existing HTML table
        $('#userList table tbody').html(tableContent);


    });
};

// Fill anime table with data
function populateAnimeTable(thisUserObject) {

    // Empty content string
    var tableContent = '';


    // For each item in our JSON, add a table row and cells to the content string

 
    for (var i = 0; i < thisUserObject.anime.length; i++) {
        tableContent += '<tr>';
        tableContent += '<td>' + thisUserObject.anime[i] + '</td>';
        tableContent += '<td>' + i + '</td>';
        tableContent += '</tr>';
    }


        
 
    $('#watchedAnime table tbody').html(tableContent);
}

// Show User Info
function showUserInfo(event) {

    // Prevent Link from Firing
    event.preventDefault();

    // Empty content string for populating anime table
    var tableContent = '';

    // Retrieve username from link rel attribute
    var thisUserName = $(this).attr('rel');

    // Get Index of object based on id value
    var arrayPosition = userListData.map(function (arrayItem) { return arrayItem.username; }).indexOf(thisUserName);

    // Get our User Object
    var thisUserObject = userListData[arrayPosition];

    //Populate Info Box
    $('#userInfoName').text(thisUserObject.fullname);
    $('#userInfoAge').text(thisUserObject.age);
    $('#userInfoGender').text(thisUserObject.gender);
    $('#userInfoLocation').text(thisUserObject.location);
    if (thisUserObject.anime != null) {
        $('#userInfoWatchedAnime').text(thisUserObject.anime);
    }
    else {
        $('#userInfoWatchedAnime').text('Nothing');
    }
    
    //Populate Anime Box
    populateAnimeTable(thisUserObject);
    

};

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
            'username': $('#addAnime fieldset input#userToMod').val(),
            'anime': $('#addAnime fieldset input#inputAnime').val()
        }

        $.ajax({
            type: 'POST',
            data: addAnime,
            url: 'users/addanime',
            dataType: 'JSON'
        }).done(function (response) {

            if (response.msg === '') {

                $('addAnime fieldset input').val('');

                showUserInfo();
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
        var newUser = {
            'username': $('#addUser fieldset input#inputUserName').val(),
            'email': $('#addUser fieldset input#inputUserEmail').val(),
            'fullname': $('#addUser fieldset input#inputUserFullname').val(),
            'age': $('#addUser fieldset input#inputUserAge').val(),
            'location': $('#addUser fieldset input#inputUserLocation').val(),
            'gender': $('#addUser fieldset input#inputUserGender').val()
        }

        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            data: newUser,
            url: '/users/adduser',
            dataType: 'JSON'
        }).done(function (response) {

            // Check for successful (blank) response
            if (response.msg === '') {

                // Clear the form inputs
                $('#addUser fieldset input').val('');

                // Update the table
                populateTable();

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

// Delete user by clicking on link, makes reference to the userlist because it needs a static object to refer to
$('#userList table tbody').on('click', 'td a.linkdeleteuser', deleteUser);

function deleteUser(event) {
    event.preventDefault();

    var confirmation = confirm('Are you sure you want to delete this user?');

    if (confirmation === true) {
        $.ajax({
            type: 'DELETE',
            url: '/users/deleteuser/' + $(this).attr('rel')
        }).done(function (response) {
            if (response.msg === '') {
            }
            else {
                alert('Error ' + response.msg);
            }

            populateTable();

        });

    }
    else {

        return false;
    }
};