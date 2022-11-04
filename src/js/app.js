import gsap from 'gsap'
const rive = require("@rive-app/canvas");

import file from './../img/laptop.riv'
import Mouse from './components/mouse.js'

const canvases = {
	main: document.getElementById('main-canvas')
}

const r = new rive.Rive({
  src: file,
  artboard: 'Bhakti',
  stateMachines: 'controller',
  canvas: canvases.main,
  autoplay: true,
  onLoad: e => {

		// make vector
    r.resizeDrawingSurfaceToCanvas()

		const mouse = new Mouse()
    const inputs = r.stateMachineInputs("controller")

    const isMoving = inputs.find((i) => i.name === "isMoving")
    const x = inputs.find((i) => i.name === "translateX")
    const y = inputs.find((i) => i.name === "translateY")

    setTimeout(() => {
      isMoving.value = true
    }, 3150)

		window.addEventListener('mousemove', e => {
			const pos = mouse.move(e)
			if(isMoving.value)
				x.value = pos.x
				y.value = pos.y
		})

		window.addEventListener('touchmove', e => {
			const touch = e.touches[0]
			console.log(touch)
			const pos = mouse.move(touch)
			if(isMoving.value)
				x.value = pos.x
				y.value = pos.y
		})
		
  }
});
