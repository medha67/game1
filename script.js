
score=0;
cross=true;
let gameEnded = false;

audiogo=new Audio('gameover.mp3');
audio=new Audio('yourcolor.mp3');
audiogo=new Audio('gameover.mp3');
// Start music on first user keydown to bypass autoplay restrictions
function playMusicOnce() {
    audio.play();
    document.removeEventListener('keydown', playMusicOnce);
}
document.addEventListener('keydown', playMusicOnce);

document.addEventListener('keydown', function playMusicOnce() {
    audio.play();
    document.removeEventListener('keydown', playMusicOnce);
})

document.onkeydown = function(e){

    console.log("key code is: ", e.keyCode)
    var kirlia = document.querySelector('.kirlia');
    if (!kirlia) return;
    // Up arrow (jump)
    if(e.keyCode == 38){
        kirlia.classList.add('animatekirlia');
        setTimeout(()=>{
            kirlia.classList.remove('animatekirlia')
        },500);
    }
    // Right arrow (move right)
    else if(e.keyCode == 39){
        var kirliaX = parseInt(window.getComputedStyle(kirlia,null).getPropertyValue('left'));
        kirlia.style.left = (kirliaX + 40) + "px";
    }
    // Left arrow (move left)
    else if(e.keyCode == 37){
        var kirliaX = parseInt(window.getComputedStyle(kirlia,null).getPropertyValue('left'));
        kirlia.style.left = (kirliaX - 40) + "px";
    }
}
setInterval(() => {
    var kirlia = document.querySelector('.kirlia');
    var gameOver = document.querySelector('.gameOver');
    var obstacle = document.querySelector('.obstacle');
    var kirliaRect = kirlia.getBoundingClientRect();
    var obstacleRect = obstacle.getBoundingClientRect();
    var isColliding = !(
        kirliaRect.right < obstacleRect.left ||
        kirliaRect.left > obstacleRect.right ||
        kirliaRect.bottom < obstacleRect.top ||
        kirliaRect.top > obstacleRect.bottom
    );
    if(isColliding){
        gameOver.style.visibility = 'visible';
        obstacle.classList.remove('obstacleAni');
        gameEnded = true;
    }

    else if(cross && !gameEnded) {
        score++;
        document.querySelector('.scoreCont').innerHTML = "Your Score: " + score;
        cross=false;
        setTimeout(() => {
            cross=true;
        }, 1000);
    }
},100);


