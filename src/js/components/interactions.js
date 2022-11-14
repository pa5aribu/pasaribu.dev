import CircleType from 'circletype'
const fittext = require('./../plugins/fittext')

export function menu() {
	const burgerMenuWrapper = document.querySelector('.burger-menu-wrapper');
	const burgerMenu = document.querySelector('.burger-menu');
	const header = document.querySelector('#header')

	burgerMenu.addEventListener('click', () => {
		burgerMenuWrapper.classList.toggle('is-active')
	});
}

export function fit() {
	const introTitle = document.querySelector('.intro-title', 1)
	window.fitText(introTitle)
}

export function curve() {
	const introTitle = document.querySelector('.intro-title')
	const introDesc = document.querySelector('.intro-description:first-child')
	const introDesc2 = document.querySelector('.intro-description:last-child')

	const curveTitle = new CircleType(introTitle)
	const curveDesc = new CircleType(introDesc)
	const curveDesc2 = new CircleType(introDesc2)

	curveTitle.radius(introTitle.offsetWidth * 1.2)
	curveDesc.radius(introDesc.offsetWidth * 1.3)
	curveDesc2.radius(introDesc2.offsetWidth * 1.8)
}
