const mobile = require('is-mobile')
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default class fixedScroll {
	constructor(inputs, mouse) {
		this.body = document.body
		this.mouse = mouse
		this.inputs = inputs
		this.currentIndex = 0
		this.isAnimating = false

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
		if(!this.isAnimating) {
			this.isAnimating = true
			this.inputs.sectionIntro.fire()

			const tl = gsap.timeline({
				onStart: () => {
					this.inputs.isMoving.value = true
				},
				onComplete: () => {
					this.isAnimating = false
					// window.dispatchEvent(new Event('mousemove'))
				}
			})

			tl
				.to([this.mouse.pos, this.mouse.mouse], {
					x: window.innerWidth/2,
					y: window.innerHeight/2
				})
				.to(this.canvas, {
					x: '0%'
				}, 0)

		}
	}

	next() {

		if(!this.isAnimating) {
			this.isAnimating = true

			const isMobile = mobile()
			this.inputs.sectionAbout.fire()

			// this.mouse.setPos(window.innerWidth/2, window.innerHeight)
			const tl = gsap.timeline({
				onComplete: () => {
					this.inputs.isMoving.value = false
					this.isAnimating = false
				}
			})
			tl
				.to([this.mouse.pos, this.mouse.mouse], {
					x: window.innerWidth/2,
					y: window.innerHeight
				})
				.to(this.canvas, {
					x: () => isMobile ? '0%' : '60%'
				}, 0)

		}


		// const tl = gsap.timeline({
		// 	onComplete: () => {
		// 	}
		// })
		// tl
		// 	.to(this.canvas, {
		// 		x: () => isMobile ? '0%' : '60%',
		// 		duration: 1.5,
		// 		ease: 'power2.out'
		// 	})
		// 	.to(this.inputs.y, {
		// 		value: -100
		// 	}, 0)
		// 	.to(this.inputs.x, {
		// 		value: 50,
		// 	}, 0)
	}

}
