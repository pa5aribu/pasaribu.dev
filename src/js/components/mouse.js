import gsap from 'gsap'

export default class Mouse {
	constructor(inputs) {
		this.customCursor = document.querySelector('.cursor')
		this.body = document.body

		this.pos = {
			x: window.innerWidth/2,
			y: window.innerHeight/2
		}
		this.mouse = {
			x: window.innerWidth/2,
			y: window.innerHeight/2
		}
		this.ease = .1
		this.inputs = inputs
		this.firstMove = false

		window.addEventListener('mousemove', (e) => {
			this.firstMove = true
			this.move(e)
			this.moveCursor(e)
		})

		this.update()
	}

	move(e) {
		this.mouse = {
			x: e.clientX,
			y: e.clientY
		}
	}

	update(e) {
		const progressX = gsap.utils.mapRange(0, window.innerWidth, 0, 100)
		const progressY = gsap.utils.mapRange(0, window.innerHeight, 100, 0)

		this.pos.x += (this.mouse.x - this.pos.x) * this.ease
		this.pos.y += (this.mouse.y - this.pos.y) * this.ease

		this.customCursor.style.cssText = `
			transform: translate(${this.pos.x}px, ${this.pos.y}px)
		`

		const posRange = {
			x: progressX(this.pos.x),
			y: progressY(this.pos.y)
		}

		this.body.setAttribute('data-mouse-x', posRange.x)
		this.body.setAttribute('data-mouse-y', posRange.y)

		if(this.inputs.isMoving.value) {
			this.inputs.x.value = posRange.x
			this.inputs.y.value = posRange.y
		}

		requestAnimationFrame(this.update.bind(this))
	}

	moveCursor(e) {

		if(e.target.nodeName == 'A' || e.target.classList.contains('is-pointer')) {
			this.customCursor.classList.add('is-pointer')
		} else {
			this.customCursor.classList.remove('is-pointer')
		}
	}

}
