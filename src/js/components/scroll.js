const mobile = require('is-mobile')
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default class fixedScroll {
	constructor(inputs) {
		this.body = document.body
		this.inputs = inputs
		this.currentIndex = 0
		this.animating = false

		this.canvas = document.getElementById('main-canvas')
		this.sections = [...document.querySelectorAll('section')]

		ScrollTrigger.observe({
			type: 'wheel,touch,pointer',
			wheelSpeed: -1,
			onDown: () => this.previous(),
			onUp: () => this.next(),
			tolerance: 10,
			preventDefault: true
		})
	}

	previous() {
		this.inputs.sectionIntro.fire()
		const tl = gsap.timeline({
			onComplete: () => {
				this.inputs.isMoving.value = true
			}
		})

		tl
			.to(this.canvas, {
				x: '0',
				duration: 1.5,
				ease: 'power2.out'
			})
			.to(this.inputs.x, {
				value: () => this.body.getAttribute('data-mouse-x')
			}, 0)
			.to(this.inputs.y, {
				value: () => this.body.getAttribute('data-mouse-y')
			}, 0)
	}

	next() {
		this.inputs.isMoving.value = false
		this.inputs.sectionAbout.fire()
		const isMobile = mobile()

		const tl = gsap.timeline({
			onComplete: () => {
			}
		})
		tl
			.to(this.canvas, {
				x: () => isMobile ? '0%' : '60%',
				duration: 1.5,
				ease: 'power2.out'
			})
			.to(this.inputs.y, {
				value: -100,
			}, 0)
			.to(this.inputs.x, {
				value: 50,
			}, 0)
	}

}
