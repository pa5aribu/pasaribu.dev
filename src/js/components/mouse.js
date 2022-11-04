import gsap from 'gsap'

export default class Mouse {
	constructor(rivePos) {
		this.pos = {
			x: 0,
			y: 0
		}
	}

	move(e) {
		const progressX = gsap.utils.mapRange(0, window.innerWidth, 0, 100)
		const progressY = gsap.utils.mapRange(0, window.innerHeight, 100, 0)

		this.pos.x = progressX(e.clientX)
		this.pos.y = progressY(e.clientY)

		return this.pos
	}

}
