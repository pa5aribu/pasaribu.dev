import gsap from 'gsap'

export default class Mouse {
	constructor(inputs) {
		this.body = document.body
		this.customCursor = document.querySelector('.cursor')
		this.buttons = [...document.querySelectorAll('.is-pointer')]

		this.pos = {
			x: window.innerWidth/2,
			y: window.innerHeight/2
		}
		this.mouse = {
			x: window.innerWidth/2,
			y: window.innerHeight/2
		}

		this.ease = .25
		this.posRange = { x: 0, y: 0 }
		this.inputs = inputs

		window.addEventListener('mousemove', (e) => {
			this.move(e)
			this.moveCursor(e)
		})

		document.addEventListener('mouseleave', (e) => {
			this.customCursor.style.visibility = 'hidden'
			setTimeout(() => {
				gsap.to([this.pos, this.mouse], {
					x: window.innerWidth/2,
					y: window.innerHeight/2
				})
			}, 5000)
		})

		this.update()
	}

	move(e) {
		this.mouse = {
			x: e.clientX,
			y: e.clientY
		}

		const cursorPos = {
			x: e.clientX - (this.customCursor.clientWidth * 0.25),
			y: e.clientY - (this.customCursor.clientWidth * 0.25)
		}

		this.customCursor.style.cssText = `
			transform: translate(${cursorPos.x}px, ${cursorPos.y}px)
		`
	}

	update(e) {
		const progressX = gsap.utils.mapRange(0, window.innerWidth, 0, 100)
		const progressY = gsap.utils.mapRange(0, window.innerHeight, 100, 0)


		if(this.inputs.isMoving.value) {
			this.pos.x += (this.mouse.x - this.pos.x) * this.ease
			this.pos.y += (this.mouse.y - this.pos.y) * this.ease

			this.posRange = {
				x: progressX(this.pos.x),
				y: progressY(this.pos.y)
			}
		}

		this.inputs.x.value = this.posRange.x
		this.inputs.y.value = this.posRange.y

		requestAnimationFrame(this.update.bind(this))
	}

	moveCursor(e) {
		const target = e.target
		if(!target.nodeName == 'A' || target.classList.contains('is-pointer')) {
			this.customCursor.classList.add('is-pointer')
		} else {
			this.customCursor.classList.remove('is-pointer')
		}
	}

	setPos(x, y) {
		this.pos = {
			x: x,
			y: y
		}
		this.mouse = {
			x: x,
			y: y
		}
	}

	animatePosition() {

	}

}
