const rive = require('@rive-app/canvas');
import gsap from 'gsap'
import { GUI } from 'dat.gui';
import riveFile from './../img/5.riv'
import mouse from './components/mouse'
import fixedScroll from './components/scroll'
import * as interactions from './components/interactions'

const canvases = {
	bhakti: document.getElementById('bhakti'),
	resume: document.getElementById('resume'),
	books: document.getElementById('books')
}

let artboardsLoaded = 0

class Resume {
	constructor() {
		this.rive = new rive.Rive({
			src: riveFile,
			artboard: 'Resume',
			stateMachines: 'controller',
			canvas: canvases.resume,
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
		this.rives.bhakti.play()
		this.rives.resume.play()
		this.rives.mountBooks.play()

		this.rives.bhakti.resizeDrawingSurfaceToCanvas()
		this.rives.resume.resizeDrawingSurfaceToCanvas()
		this.rives.mountBooks.resizeDrawingSurfaceToCanvas()
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
		console.log('resume')
	}

	changeMountBooks(data) {
		console.log(data)
	}

}


const riveBhakti = new Bhakti()
const riveResume = new Resume()
const riveMountBooks = new MountBooks()
const app = new App({
	bhakti: riveBhakti.rive,
	resume: riveResume.rive,
	mountBooks: riveMountBooks.rive
})

function checkAllLoaded() {
	artboardsLoaded += 1

	if(artboardsLoaded == 3) {
		app.play()
		app.playBhakti()
	}
}

function stateChange(from, data) {
	if(from == 'bhakti') app.changeBhakti(data)
	if(from == 'resume') app.changeResume(data)
	if(from == 'books') app.changeMountBooks(data)
}
