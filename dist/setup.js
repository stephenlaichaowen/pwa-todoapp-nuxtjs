const root = document.querySelector('html')
const deviceWidth = root.clientWidth

root.style.fontSize = (deviceWidth / 360) * 16 + 'px'

window.addEventListener('resize', () => {
  const root = document.querySelector('html')
  const deviceWidth = root.clientWidth
  root.style.fontSize = (deviceWidth / 360) * 16 + 'px'
})