// ------------------------EDITING PROFILE
var $avatarURL = document.getElementById('avatar-URL');
var $avatarImage = document.getElementById('avatarImage');
var $form = document.querySelector('form');

$avatarURL.addEventListener('input', function (event) {
  $avatarImage.setAttribute('src', event.target.value);
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
});

var previousData = localStorage.getItem('data');
if (previousData !== null) {
  data = JSON.parse(previousData);
}

window.addEventListener('beforeunload', function (event) {
  var savedDataJson = JSON.stringify(data);
  localStorage.setItem('data', savedDataJson);
});

// ----------------VIEWING PROFILE
function domTreeCreation(model) {

  var $profile = document.createElement('div');
  $profile.setAttribute('data-view', 'profile');

  var $container = document.createElement('div');
  $container.setAttribute('class', 'container');
  $profile.appendChild($container);

  // First Row ------------------------------------
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

  // Second Row ----------------------------------------
  var $row2 = document.createElement('div');
  $row2.setAttribute('class', 'row');
  $container.appendChild($row2);

  var $columnHalf1 = document.createElement('div');
  $columnHalf1.setAttribute('class', 'column-half');
  $row2.appendChild($columnHalf1);

  var $profilePic = document.createElement('img');
  $profilePic.setAttribute('class', 'avatarImage');
  $profilePic.setAttribute('src', model.avatarUrl);
  $columnHalf1.appendChild($profilePic);

  var $columnHalf2 = document.createElement('div');
  $columnHalf2.setAttribute('class', 'column-half');
  $row2.appendChild($columnHalf2);

  var $username = document.createElement('span');
  $username.setAttribute('class', 'far fa-user');
  var $addingUsername = document.createTextNode(model.username);
  $username.appendChild($addingUsername);
  $columnHalf2.appendChild($username);

  var $location = document.createElement('span');
  $location.setAttribute('class', 'far fa-map-marker-alt');
  var $addingLocation = document.createTextNode(model.location);
  $location.appendChild($addingLocation);
  $columnHalf2.appendChild($location);

  var $bio = document.createElement('p');
  var $addingBio = document.createTextNode(model.bio);
  $bio.appendChild($addingBio);
  $columnHalf2.appendChild($bio);
}
