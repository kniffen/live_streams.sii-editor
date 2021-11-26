const privacyBox       = document.querySelector('.privacy')
const acceptPrivacyBtn = document.getElementById('accept-privacy')
const denyPrivacyBtn   = document.getElementById('deny-privacy')

if (!localStorage.privacy)
  privacyBox.style.display = 'block'

acceptPrivacyBtn.addEventListener('click', function(e) {
  localStorage.privacy = 'accepted'
  privacyBox.style.display = 'none'
})

denyPrivacyBtn.addEventListener('click', function(e) {
  privacyBox.style.display = 'none'
})