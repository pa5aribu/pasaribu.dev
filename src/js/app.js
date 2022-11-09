const rive = require('@rive-app/canvas');
import gsap from 'gsap'
import { GUI } from 'dat.gui';
import file from './../img/main5.riv'
import mouse from './components/mouse'
import fixedScroll from './components/scroll'

const canvases = {
	main: document.getElementById('main-canvas')
}

class App {
	constructor() {
		this.body = document.body
		this.rive
		this.riveInputs = {}
		this.gui = new GUI()
		this.gui.hide()
		this.setRive()
	}

	setGUI() {
		const settings = {}
		settings.about = () => {
			this.riveInputs.isMoving.value = false
			const tl = gsap.timeline()
			tl
				.to(canvases.main, {
					x: '60%',
					duration: 1,
					ease: 'power4.out'
				})
				.to(this.riveInputs.y, {
					value: -100,
					onComplete: () => {
						this.riveInputs.sectionAbout.fire()
					}
				}, .3)
				.to(this.riveInputs.x, {
					value: 50
				}, '<')
		}
		settings.intro = () => {
			this.riveInputs.sectionIntro.fire()
			const tl = gsap.timeline({
				onComplete: () => {
					this.riveInputs.isMoving.value = true
				}
			})

			tl
				.to(this.riveInputs.x, {
					value: () => this.body.getAttribute('data-mouse-x')
				})
				.to(this.riveInputs.y, {
					value: () => this.body.getAttribute('data-mouse-y')
				}, 0)
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

		this.mouse = new mouse(this.riveInputs)
		this.scroll = new fixedScroll(this.riveInputs)
	}

	stateRive(e) {
		const data = e.data
		if(data[0] == 'breath') {
			this.riveInputs.isMoving.value = true
			this.riveInputs.isBlinking.value = true
		}

		// console.log(data)
	}
}

new App()
