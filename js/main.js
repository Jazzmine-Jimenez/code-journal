var $avatarURL = document.getElementById('avatar-URL');
var $avatarEditImage = document.querySelector('.avatarEditImage');
var $form = document.querySelector('form');

$avatarURL.addEventListener('input', function (event) {
  data.profile.avatarUrl = event.target.value;
  $avatarEditImage.setAttribute('src', data.profile.avatarUrl);
});

var $userName = document.getElementById('username');
var $fullName = document.getElementById('fullName');
var $location = document.getElementById('location');
var $bio = document.querySelector('textarea');

$form.addEventListener('submit', function (event) {
  event.preventDefault();
  data.profile.avatarUrl = $avatarURL.value;
  data.profile.username = $userName.value;
  data.profile.fullName = $fullName.value;
  data.profile.location = $location.value;
  data.profile.bio = $bio.value;
  $form.reset();
  viewSwapping('profile');
});

var previousData = localStorage.getItem('data');
if (previousData !== null) {
  data = JSON.parse(previousData);
}

window.addEventListener('beforeunload', function (event) {
  var savedDataJson = JSON.stringify(data);
  localStorage.setItem('data', savedDataJson);
});

// ----------------Creating the DOM tree -------------
function domTreeCreation(model) {
  var $container = document.createElement('div');
  $container.setAttribute('class', 'container viewProfile');

  // -----First Row -----------------------
  var $row1 = document.createElement('div');
  $row1.setAttribute('class', 'row');
  $container.appendChild($row1);

  var $columnFull = document.createElement('div');
  $columnFull.setAttribute('class', 'column-full');
  $row1.appendChild($columnFull);

  var $headerName = document.createElement('h1');
  var $name = document.createTextNode(model.fullName);
  $headerName.appendChild($name);
  $columnFull.appendChild($headerName);

  // ------Second Row -----------------------
  var $row2 = document.createElement('div');
  $row2.setAttribute('class', 'row');
  $container.appendChild($row2);

  var $columnHalf1 = document.createElement('div');
  $columnHalf1.setAttribute('class', 'column-half');
  $row2.appendChild($columnHalf1);

  var $profilePic = document.createElement('img');
  $profilePic.setAttribute('class', 'avatarProfileImage');
  $profilePic.setAttribute('src', model.avatarUrl);
  $columnHalf1.appendChild($profilePic);

  var $columnHalf2 = document.createElement('div');
  $columnHalf2.setAttribute('class', 'column-half');
  $row2.appendChild($columnHalf2);

  var $username = document.createElement('span');
  $username.setAttribute('class', 'far fa-user');
  var $addingUsername = document.createTextNode(' ' + model.username);
  $username.appendChild($addingUsername);
  $columnHalf2.appendChild($username);
  var $break = document.createElement('br');
  $columnHalf2.appendChild($break);

  var $location = document.createElement('span');
  $location.setAttribute('class', 'fas fa-map-marker-alt');
  var $addingLocation = document.createTextNode(' ' + model.location);
  $location.appendChild($addingLocation);
  $columnHalf2.appendChild($location);

  var $bio = document.createElement('p');
  var $addingBio = document.createTextNode(model.bio);
  $bio.appendChild($addingBio);
  $columnHalf2.appendChild($bio);

  var $editButtonContainer = document.createElement('div');
  $editButtonContainer.setAttribute('class', 'editButtonContainer');
  $columnHalf2.appendChild($editButtonContainer);

  var $editButton = document.createElement('a');
  $editButton.setAttribute('href', '#');
  $editButton.setAttribute('data-view', 'edit-profile');
  $editButton.setAttribute('class', 'editButton');
  $editButton.textContent = 'EDIT';
  $editButtonContainer.appendChild($editButton);

  return $container;
}

// -----------View Swapping Function -------------------
function viewSwapping(view) {
  var $profile = document.querySelector('.profile');
  var $edit = document.querySelector('.edit');

  if (view === 'edit-profile') {
    $edit.className = 'edit';
    $profile.className = 'profile hidden';

    if (data.profile.avatarUrl === null || data.profile.avatarUrl === '') {
      $avatarEditImage.setAttribute('src', 'images/placeholder-image-square.jpg');
    } else {
      $avatarEditImage.setAttribute('src', data.profile.avatarUrl);
    }

    $avatarURL.setAttribute('value', data.profile.avatarUrl);
    $userName.setAttribute('value', data.profile.username);
    $fullName.setAttribute('value', data.profile.fullName);
    $location.setAttribute('value', data.profile.location);
    $bio.textContent = data.profile.bio;
  }

  if (view === 'profile') {
    $profile.className = 'profile';
    $edit.className = 'edit hidden';

    var $container = document.querySelector('.container.viewProfile');
    $profile.removeChild($container);

    var newDomtree = domTreeCreation(data.profile);
    $profile.appendChild(newDomtree);
  }

}

// New User Screen VS Returning User Screen
document.addEventListener('DOMContentLoaded', function (event) {
  if (data.profile.username === '' || data.profile.username === null) {
    viewSwapping('edit-profile');
  } else {
    viewSwapping('profile');
  }
});

document.addEventListener('click', function (event) {
  if (event.target.tagName !== 'A') {
    return;
  }
  if (data.profile.username === '') {
    viewSwapping('edit-profile');
  } else {
    var requestedView = event.target.getAttribute('data-view');
    viewSwapping(requestedView);
  }
});
