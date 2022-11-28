import { Howl, Howler } from 'howler'
import CircleType from 'circletype'
const fittext = require('./../plugins/fittext')

import popSound from './hover.wav'

export function menu() {
	const burgerMenuWrapper = document.querySelector('.burger-menu-wrapper');
	const burgerMenu = document.querySelector('.burger-menu');
	const header = document.querySelector('#header')

	burgerMenu.addEventListener('click', () => {
		burgerMenuWrapper.classList.toggle('is-active')
	});
}

export function buttonClicks() {
	const buttons = [...document.querySelectorAll('.is-pointer')]
	buttons.forEach(button => {
		button.addEventListener('click', () => {
			const sound = new Howl({
				src: [popSound],
			})
			sound.play()
		})
	})
}

export function resume(isHover) {
	const link = document.querySelector('.resume-link')
	link.addEventListener('mouseenter', () => {
		console.log('in')
		console.log(isHover)
		isHover.value = true
	})
	link.addEventListener('mouseleave', () => {
		console.log('out')
		isHover.value = false
	})
}
