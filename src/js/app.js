import gsap from 'gsap'
const rive = require("@rive-app/canvas");

import file from './../img/animation.riv'
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
    const x = inputs.find((i) => i.name === "translate x")
    const y = inputs.find((i) => i.name === "translate y")

    setTimeout(() => {
      isMoving.value = true
    }, 3150)

		window.addEventListener('mousemove', e => {
			const pos = mouse.move(e)
			x.value = pos.x
			y.value = pos.y
		})
		
  }
});
