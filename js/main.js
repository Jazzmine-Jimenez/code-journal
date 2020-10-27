var $avatarURL = document.getElementById('avatar-URL');
var $avatarImage = document.getElementById('avatarImage');

$avatarURL.addEventListener('input', function (event) {
  $avatarImage.setAttribute('src', event.target.value);
});
