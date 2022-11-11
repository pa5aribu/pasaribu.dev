export function menu() {
	const burgerMenuWrapper = document.querySelector('.burger-menu-wrapper');
	const burgerMenu = document.querySelector('.burger-menu');
	const header = document.querySelector('#header')

	burgerMenu.addEventListener('click', () => {
		burgerMenuWrapper.classList.toggle('is-active')
	});
}
