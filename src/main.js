
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

// uses event bubbling
AFRAME.registerComponent('interactive-model', {
  init: function() {
    const light = this.el.querySelector('.interactive-model__light')
    const originalLightIntensity = light ? light.getAttribute('intensity') : 1

    this.el.addEventListener('mouseenter', (e) => {
      const {className} = e.target
      if (className.indexOf('interactive-model__option') !== -1) {
        e.target.setAttribute('color', '#f00')
        console.log(e.target.getAttribute('value'))
      }

      if (className.indexOf('interactive-model__model') !== -1) {
        console.log('model', light)
        if (light) light.setAttribute('intensity', 3)
      }
    });

    this.el.addEventListener('mouseleave', (e) => {
      if (light) light.setAttribute('intensity', originalLightIntensity)

      const {className} = e.target
      if (className.indexOf('interactive-model__option') !== -1) {
        e.target.setAttribute('color', '#FFF')
      }
    });

    this.el.addEventListener('click', (e) => {
      const {className} = e.target
      const switchableElements = [...this.el.querySelectorAll('.interactive-model__clickswitchable')]

      if (className.indexOf('interactive-model__clickon') !== -1) {
        console.log('click on')
        switchableElements.forEach(element => {
          element.setAttribute('visible', true)
        })
      }

      if (className.indexOf('interactive-model__clickoff') !== -1) {
        console.log('click off')
        switchableElements.forEach(element => {
          element.setAttribute('visible', false)
        })
      }
    })
  }
})