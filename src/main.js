
//furtive-octagonal-lavender.glitch.me

let textDisplay
let defaultText = '' 
let infoContainer

AFRAME.registerComponent('my-scene', {
  init: function () {
    textDisplay = document.querySelector('#text-display')
    textDisplay ? defaultText = textDisplay.getAttribute('value') : null
    infoContainer = document.getElementById('info-container')
    console.log('infoContainer', infoContainer)
  }
})

AFRAME.registerComponent('cursor-listener', {
  init: function () {
    var COLORS = ['red', 'green', 'blue'];

    this.el.addEventListener('click', function (evt) {
      // var randomIndex = Math.floor(Math.random() * COLORS.length);
      // this.setAttribute('material', 'color', COLORS[randomIndex]);
      // console.log('I was clicked at: ', evt.detail.intersection.point);
    });
    
    this.el.addEventListener('mouseenter', function (e) {
      e.target.dataset.info ? textDisplay.setAttribute('value', e.target.dataset.info) : null
      const infoContent = e.target.querySelector('.info-content')
      if (!infoContent) return
      const contentClone = infoContent.cloneNode(true);
      infoContainer.appendChild(contentClone)
    })
    this.el.addEventListener('mouseleave', function (e) {
      textDisplay.setAttribute('value', defaultText)
      infoContainer.innerHTML = ''
    })
  }
});

AFRAME.registerComponent('interactive-panel', {
  init: function() {
    [...this.el.querySelectorAll('.interactive-panel__option')].forEach(option => {
      const originalColor = option.getAttribute('color')
      option.addEventListener('mouseenter', (e) => {
        option.setAttribute('color', '#f00')
      })

      option.addEventListener('mouseleave', (e) => {
        option.setAttribute('color', originalColor)
      })
    })

    this.el.querySelector('.interactive-panel__option--yes').addEventListener('click', () => {
      alert('yes')
    })
  }

})