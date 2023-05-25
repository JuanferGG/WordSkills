document.addEventListener('DOMContentLoaded', () => {
    //TODO Variables de entorno
    let puntos = 1
    let arrowInterval


    //TODO Variables HTML
    const player = document.getElementById('player')
    const dragon = document.getElementById('dragon')
    const arrow = document.getElementById('arrow')
    const score = document.getElementById('score')



    //TODO Events
    document.addEventListener('keydown', (event) => {
        if(event.key == 'ArrowRight'){
            playerRight()
        } else if(event.key == 'ArrowLeft'){
            playerLeft()
        } else if(event.key == 'ArrowDown'){
            player.style.backgroundImage = 'url(./imgs/sprites_player/sprite_player03-removebg-preview.png)'
        } else if(event.key == ' '){
            player.style.backgroundImage = 'url(./imgs/sprites_player/sprite_player04-removebg-preview.png)'
            shootArrow()
        }
    })

    //TODO Functions
    //* Moves Player
    function playerRight(){
        const playerLeft = parseInt(window.getComputedStyle(player).getPropertyValue('left'))
        if(playerLeft < 1250){
            player.style.backgroundImage = 'url(./imgs/sprites_player/sprite_player01-removebg-preview.png)'
            player.style.left = `${playerLeft + 10}px`
        }
    }
    function playerLeft(){
        const playerLeft = parseInt(window.getComputedStyle(player).getPropertyValue('left'))
        if(playerLeft > 50){
            player.style.backgroundImage = 'url(./imgs/sprites_player/sprite_player02-removebg-preview.png)'
            player.style.left = `${playerLeft - 10}px`
        }
    }

    //* shootArrow
    function shootArrow(){
        const playerLeft = parseInt(window.getComputedStyle(player).getPropertyValue('left'))
        const playerTop = parseInt(window.getComputedStyle(player).getPropertyValue('top'))

        arrow.style.display = 'block'
        arrow.style.top = `${playerTop - 120}px`
        arrow.style.left = `${playerLeft - 12}px`

        clearInterval(arrowInterval)
        arrowInterval = setInterval(() => {
            const arrowTop = parseInt(window.getComputedStyle(arrow).getPropertyValue('top'))
            if(arrowTop < -300){
                arrow.style.display = 'none'
                clearInterval(arrowInterval)
            } else {
                arrow.style.top = `${arrowTop -10}px`
                collision()
            }
        }, 30);
    }

    //* Colision?
    function collision(){
        //* Cordenadas Arrow-Flecha
        const arrowRect = arrow.getBoundingClientRect()
        //* Cordenadas dragon
        const dragonRect = dragon.getBoundingClientRect()

        if(
            arrowRect.right >= dragonRect.left &&
            arrowRect.left <= dragonRect.right &&
            arrowRect.top <= dragonRect.bottom &&
            arrowRect.bottom >= dragonRect.top
        ){
            score.textContent = `Score: ${puntos++}`
            arrow.style.display = 'none'
        }
    }

})