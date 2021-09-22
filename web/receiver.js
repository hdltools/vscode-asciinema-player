function updateTitle(name) {
	const title = document.getElementById("title")
	title.innerText = name
}

function updatePlayer(cast) {
	const blob = new Blob([cast], {type: "application/json"})
	const uri  = URL.createObjectURL(blob)
	const player = document.getElementById("player")
	player.innerHTML = `<asciinema-player id="player" src="${uri}" preload></asciinema-player>`
}

window.addEventListener('message', event => {
	const message = event.data
	if(message.type === 'update') {
		updateTitle(message.name)
		updatePlayer(message.body)
	}
})