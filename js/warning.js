const warningContainer  = document.querySelector('.warning-container')
const warningTitle      = document.querySelector('.warning h2')
const warningMessage    = document.querySelector('.warning p')
const dismissWarningBtn = document.getElementById('dismiss-warning-btn')

dismissWarningBtn.addEventListener('click', function() {
  warningContainer.classList.remove('visible')
})

export function alert(title, message) {
  warningTitle.innerText   = title
  warningMessage.innerText = message

  warningContainer.classList.add('visible')
}