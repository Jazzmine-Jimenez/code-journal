var $avatarURL = document.getElementById('avatar-URL');
var $avatarImage = document.getElementById('avatarImage');

$avatarURL.addEventListener('input', function (event) {
  $avatarImage.setAttribute('src', event.target.value);
});

var $saveButton = document.querySelector('button');
var $userName = document.getElementById('username');
var $fullName = document.getElementById('fullName');
var $location = document.getElementById('location');
var $bio = document.querySelector('textarea');

$saveButton.addEventListener('click', function (event) {
  data.profile.avatarUrl = $avatarURL.value;
  data.profile.username = $userName.value;
  data.profile.fullName = $fullName.value;
  data.profile.location = $location.value;
  data.profile.bio = $bio.value;
});

var previousData = localStorage.getItem('data');
if (previousData !== null) {
  data = JSON.parse(previousData);
}

window.addEventListener('beforeunload', function (event) {
  var savedDataJson = JSON.stringify(data);
  localStorage.setItem('data', savedDataJson);
});
