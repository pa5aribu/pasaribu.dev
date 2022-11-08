const rive = require('@rive-app/canvas');
import gsap from 'gsap'
import { GUI } from 'dat.gui';
import file from './../img/main5.riv'
import mouse from './components/mouse.js'

const canvases = {
	main: document.getElementById('main-canvas')
}

class App {
	constructor() {
		this.rive
		this.riveInputs = {}
		this.mouse = new mouse()
		this.gui = new GUI()

		this.setRive()
	}

	setGUI() {
		const settings = {}
		settings.about = () => {
			this.riveInputs.isMoving.value = false
			this.riveInputs.sectionAbout.fire()
			const tl = gsap.timeline()
			tl
				.to(this.riveInputs.y, {
					value: -100
				})
				.to(this.riveInputs.x, {
					value: 50
				}, 0)
		}
		settings.intro = () => {
			this.riveInputs.isMoving.value = true
			this.riveInputs.sectionIntro.fire()
		}
		const triggers = this.gui.addFolder('Triggers')
		triggers.open()
		triggers.add(settings, 'about')
		triggers.add(settings, 'intro')
	}

	setRive() {
		this.rive = new rive.Rive({
			src: file,
			artboard: 'Bhakti',
			stateMachines: 'controller',
			canvas: canvases.main,
			autoplay: true,
			onLoad: e => { this.playRive() },
			onStateChange: e => { this.stateRive(e) }
		})
	}

	playRive() {
		this.rive.resizeDrawingSurfaceToCanvas()

		const inputs = this.rive.stateMachineInputs('controller')

		this.riveInputs = {
			isMoving: inputs.find((i) => i.name === 'isMoving'),
			isBlinking: inputs.find((i) => i.name === 'isBlinking'),
			x: inputs.find((i) => i.name === 'translateX'),
			y: inputs.find((i) => i.name === 'translateY'),
			sectionAbout: inputs.find((i) => i.name === 'sectionAbout'),
			sectionIntro: inputs.find((i) => i.name === 'sectionIntro'),
		}
		this.setGUI()

		window.addEventListener('mousemove', e => {
			const pos = this.mouse.move(e)
			if(this.riveInputs.isMoving.value) {
				this.riveInputs.x.value = pos.x
				this.riveInputs.y.value = pos.y
			}
		})

		// window.addEventListener('touchmove', e => {
		// 	const touch = e.touches[0]
		// 	const pos = this.mouse.move(touch)
		// 	if(this.riveInputsisMoving.value)
		// 		this.riveInputs.x.value = pos.x
		// 		this.riveInputs.y.value = pos.y
		// })
	}

	stateRive(e) {
		const data = e.data
		if(data[0] == 'breath') {
			this.riveInputs.isMoving.value = true
			this.riveInputs.isBlinking.value = true
		}

		console.log(data)
	}
}

new App()
