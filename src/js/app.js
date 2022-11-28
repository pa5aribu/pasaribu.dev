const rive = require('@rive-app/canvas');
import gsap from 'gsap'
import { GUI } from 'dat.gui';
import riveFile from './../img/pasaribu.dev (12).riv'
import mouse from './components/mouse'
import fixedScroll from './components/scroll'
import * as interactions from './components/interactions'

const canvases = {
	bhakti: document.getElementById('bhakti'),
	resume: document.getElementById('resume'),
	books: document.getElementById('books'),
	plants: document.getElementById('plants')
}

let artboardsLoaded = 0

class Plants {
	constructor() {
		this.rive = new rive.Rive({
			src: riveFile,
			artboard: 'Plants',
			stateMachines: 'controller',
			canvas: canvases.plants,
			autoplay: true,
			onLoad: e => {
				checkAllLoaded()
			},
			onStateChange: e => {
				stateChange('plants', e.data)
			}
		})
	}
}

class Resume {
	constructor() {
		this.rive = new rive.Rive({
			src: riveFile,
			artboard: 'Resume',
			stateMachines: 'controller',
			canvas: canvases.resume,
			autoplay: true,
			onLoad: e => {
				checkAllLoaded()
			},
			onStateChange: e => {
				stateChange('resume', e.data)
			}
		})
	}
}

class MountBooks {
	constructor() {
		this.rive = new rive.Rive({
			src: riveFile,
			artboard: 'Mount Books',
			stateMachines: 'controller',
			canvas: canvases.books,
			autoplay: true,
			onLoad: e => {
				checkAllLoaded()
			},
			onStateChange: e => {
				stateChange('books', e.data)
			}
		})
	}
}

class Bhakti {
	constructor() {
		this.rive = new rive.Rive({
			src: riveFile,
			artboard: 'Bhakti',
			stateMachines: 'controller',
			canvas: canvases.bhakti,
			onLoad: e => {
				checkAllLoaded()
			},
			onStateChange: e => {
				stateChange('bhakti', e.data)
			}
		})
	}
}

class App {
	constructor(rives) {
		this.body = document.body
		this.rives = rives

		interactions.buttonClicks()
		interactions.menu()
	}

	play() {
		this.rives.bhakti.resizeDrawingSurfaceToCanvas()
		this.rives.resume.resizeDrawingSurfaceToCanvas()
		this.rives.mountBooks.resizeDrawingSurfaceToCanvas()
		this.rives.plants.resizeDrawingSurfaceToCanvas()

		this.rives.bhakti.play()
		// this.rives.resume.play()
		// this.rives.mountBooks.play()

		const overlay = document.querySelector('.overlay')
		const tl = gsap.timeline()

		tl
			.set('.overlay', {
				opacity: 0
			})
			.set('body', {
				clipPath: 'circle(0% at 50% 100%)'
			})
			.to('body', {
				clipPath: 'circle(150% at 50% 100%)',
				duration: 2,
				ease: 'power4.out'
			})
			.set('.overlay', {
				display: 'none'
			})
	}

	playResume() {
		const inputs = this.rives.resume.stateMachineInputs('controller')
		this.rives.resume.inputs = {
			isLoaded: inputs.find((i) => i.name === 'isLoaded')
		}

		this.rives.resume.inputs.isLoaded.value = true
	}

	playBhakti() {
		const inputs = this.rives.bhakti.stateMachineInputs('controller')
		this.rives.bhakti.inputs = {
			isMoving: inputs.find((i) => i.name === 'isMoving'),
			isBlinking: inputs.find((i) => i.name === 'isBlinking'),
			x: inputs.find((i) => i.name === 'translateX'),
			y: inputs.find((i) => i.name === 'translateY'),
			sectionAbout: inputs.find((i) => i.name === 'sectionAbout'),
			sectionIntro: inputs.find((i) => i.name === 'sectionIntro'),
			clothes: inputs.find((i) => i.name === 'clothes'),
		}
		this.rives.bhakti.inputs.clothes.value = 1
		this.mouse = new mouse(this.rives.bhakti.inputs)
		this.scroll = new fixedScroll(this.rives.bhakti.inputs, this.mouse)
	}

	changeBhakti(data) {
		if(data[0] == 'is-breathing') {
			this.rives.bhakti.inputs.isMoving.value = true
			this.rives.bhakti.inputs.isBlinking.value = true
		}
	}

	changeResume(data) {
	}

	changeMountBooks(data) {
		console.log(data)
	}

}


const riveBhakti = new Bhakti()
const riveResume = new Resume()
const riveMountBooks = new MountBooks()
const rivePlants = new Plants()

const app = new App({
	bhakti: riveBhakti.rive,
	resume: riveResume.rive,
	mountBooks: riveMountBooks.rive,
	plants: rivePlants.rive
})

function checkAllLoaded() {
	artboardsLoaded += 1

	if(artboardsLoaded == 4) {
		console.log('all loaded')
		app.play()
		app.playResume()
		app.playBhakti()
	}
}

function stateChange(from, data) {
	if(from == 'bhakti') app.changeBhakti(data)
	if(from == 'resume') app.changeResume(data)
	if(from == 'books') app.changeMountBooks(data)
	// if(from == 'plants') app.changeMountBooks(data)
}
