const mobile = require('is-mobile')
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// gsap.defaults({
// 	duration: .3
// })

export default class fixedScroll {
	constructor(inputs, mouse) {
		this.body = document.body
		this.mouse = mouse
		this.inputs = inputs
		this.isAnimating = false

		this.canvas = document.getElementById('main-canvas')
		this.sections = [...document.querySelectorAll('section')]

		this.currentIndex = 0
		this.wrap = gsap.utils.wrap(0, this.sections.length - 1)

		ScrollTrigger.observe({
			type: 'wheel,touch,pointer',
			wheelSpeed: -1,
			onDown: () => !this.isAnimating && this.previous(),
			onUp: () => !this.isAnimating && this.inputs.isMoving.value && this.next(),
			tolerance: 10,
			preventDefault: true
		})
	}

	previous() {
		if(this.currentIndex > 0) {
			console.log('playing prev section')
			this.isAnimating = true

			const lastSection = this.sections[this.currentIndex]
			const last$ = gsap.utils.selector(lastSection)

			const nextSection = lastSection.previousElementSibling
			const next$ = gsap.utils.selector(nextSection)

			console.log(lastSection)
			console.log(nextSection)

			const tl = gsap.timeline({
				onComplete: () => {
					this.isAnimating = false
					this.currentIndex -= 1
				}
			})

			tl
				.to([this.mouse.pos, this.mouse.mouse], {
					onStart: () => {
						this.inputs.isMoving.value = true
						this.inputs.sectionIntro.fire()
					},
					x: window.innerWidth/2,
					y: window.innerHeight/2,
					ease: 'power2.out'
				})
				.to(last$('.content > *'), {
					y: -50,
					x: 50,
					rotation: 5,
					opacity: 0,
					ease: 'power2.out',
					stagger: .1
				}, 0)
				.set(lastSection, {
					display: 'none',
				})
				.set(last$('.content > *'), {
					clearProps: 'all'
				})
				.set(nextSection, {
					display: 'block',
				})
				.from(next$('.content > *'), {
					y: 50,
					x: -50,
					rotation: -5,
					opacity: 0,
					ease: 'power2.out',
					stagger: .1,
				})
				.set(next$('.content > *'), {
					clearProps: 'all'
				})
		} else {
			console.log('this is last section')
		}
	}

	next() {
		if(this.currentIndex + 1 < this.sections.length) {
			console.log('playing next section')
			this.isAnimating = true

			const lastSection = this.sections[this.currentIndex]
			const last$ = gsap.utils.selector(lastSection)

			const nextSection = lastSection.nextElementSibling
			const next$ = gsap.utils.selector(nextSection)

			const tl = gsap.timeline({
				onComplete: () => {
					this.isAnimating = false
					this.inputs.isMoving.value = false
					this.currentIndex += 1
				}
			})

			tl
				.to([this.mouse.pos, this.mouse.mouse], {
					onStart: () => {
						this.inputs.sectionAbout.fire()
					},
					x: window.innerWidth/2,
					y: window.innerHeight,
					ease: 'power2.out'
				})
				.to(last$('.content > *'), {
					y: -50,
					x: 50,
					rotation: 5,
					opacity: 0,
					ease: 'power2.out',
					stagger: .1
				}, 0)
				.set(lastSection, {
					display: 'none',
				})
				.set(last$('.content > *'), {
					clearProps: 'all'
				})
				.set(nextSection, {
					display: 'block',
				})
				.from(next$('.content > *'), {
					y: 50,
					x: -50,
					rotation: -5,
					opacity: 0,
					ease: 'power2.out',
					stagger: .1,
				})
				.set(next$('.content > *'), {
					clearProps: 'all'
				})
		} else {
			console.log('this is last section')
		}
	}

	goToSection(index, direction) {
		index = this.wrap(index)
		this.isAnimating = true

		let fromTop = direction === -1,
				dFactor = fromTop ? -1 : 1,
				tl = gsap.timeline({
					onComplete: () => {
						this.isAnimating = false
					}
				});

		tl
			.to(this.body, {
				background: 'black',
				duration: .3
			})

		this.currentIndex = index
	}

}
