import gsap from 'gsap'

export default class Mouse {
	constructor(inputs) {
		this.customCursor = document.querySelector('.cursor')
		this.body = document.body
		this.isOutside = false

		this.pos = {
			x: window.innerWidth/2,
			y: window.innerHeight/2
		}
		this.mouse = {
			x: window.innerWidth/2,
			y: window.innerHeight/2
		}
		this.posRange = { x: 0, y: 0 }

		this.ease = .25
		this.inputs = inputs
		this.firstMove = false

		window.addEventListener('mousemove', (e) => {
			this.firstMove = true
			this.isOutside = false
			this.move(e)
			this.moveCursor(e)
		})

		document.addEventListener('mouseleave', (event) => {
			this.isOutside = true
			const tl = gsap.timeline()
			tl
				.to(this.inputs.x, {
					value: 50
				})
				.to(this.inputs.y, {
					value: 50
				}, 0)
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

		if(!this.isOutside) {

			this.pos.x += (this.mouse.x - this.pos.x) * this.ease
			this.pos.y += (this.mouse.y - this.pos.y) * this.ease

			this.customCursor.style.cssText = `
				transform: translate(${this.pos.x}px, ${this.pos.y}px)
			`

			this.posRange = {
				x: progressX(this.pos.x),
				y: progressY(this.pos.y)
			}

			if(this.inputs.isMoving.value) {
				this.inputs.x.value = this.posRange.x
				this.inputs.y.value = this.posRange.y
			}

		} else {
			this.pos = {
				x: window.innerWidth/2,
				y: window.innerHeight/2
			}
			this.mouse = {
				x: window.innerWidth/2,
				y: window.innerHeight/2
			}
			this.posRange = {
				x: 50,
				y: 50
			}
		}

		this.body.setAttribute('data-mouse-x', this.posRange.x)
		this.body.setAttribute('data-mouse-y', this.posRange.y)

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
