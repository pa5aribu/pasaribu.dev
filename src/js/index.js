const rive = require("@rive-app/canvas");
import gsap from 'gsap'
import file from './../img/main2.riv'
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
		
  },
	onStateChange: e => {
		const data = e.data
		console.log(data)
		if(data[0] == 'breath') {
			isMoving.value = true
		}
		// setTimeout(() => {
		//   isMoving.value = true
		// }, 3150)
	}
});
