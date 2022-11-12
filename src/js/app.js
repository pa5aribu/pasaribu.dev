const rive = require('@rive-app/canvas');
import gsap from 'gsap'
import { GUI } from 'dat.gui';
import file from './../img/0.riv'
import mouse from './components/mouse'
import fixedScroll from './components/scroll'
import * as interactions from './components/interactions'

const canvases = {
	main: document.getElementById('main-canvas')
}

class App {
	constructor() {
		this.body = document.body
		this.rive
		this.riveInputs = {}
		this.setRive()

		interactions.menu()
	}

	setGUI() {
		const settings = {}
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

		// console.log(this.riveInputs.isMoving.value = true)

		this.mouse = new mouse(this.riveInputs)
		this.scroll = new fixedScroll(this.riveInputs, this.mouse)
	}

	stateRive(e) {
		const data = e.data
		console.log(data[0])
		if(data[0] == 'is-breathing') {
			this.riveInputs.isMoving.value = true
			this.riveInputs.isBlinking.value = true
		}
	}
}

new App()
