import gsap from 'gsap'

export default class Mouse {
	constructor(rivePos) {
		this.customCursor = document.querySelector('.cursor')
		this.pos = {
			x: 0,
			y: 0
		}

		window.addEventListener('mousemove', (e) => {
			this.moveCursor(e)
		})
	}

	move(e) {
		const progressX = gsap.utils.mapRange(0, window.innerWidth, 0, 100)
		const progressY = gsap.utils.mapRange(0, window.innerHeight, 100, 0)

		this.pos.x = progressX(e.clientX)
		this.pos.y = progressY(e.clientY)

		return this.pos
	}

	moveCursor(e) {
		const x = e.clientX - (this.customCursor.clientWidth * 0.25)
		const y = e.clientY - (this.customCursor.clientHeight * 0.25)
		this.customCursor.style.cssText = `
			transform: translate(${x}px, ${y}px)
		`

		if(e.target.nodeName == 'A' || e.target.classList.contains('is-pointer')) {
			this.customCursor.classList.add('is-pointer')
		} else {
			this.customCursor.classList.remove('is-pointer')
		}

		console.log(e.target.nodeName)
	}

}
