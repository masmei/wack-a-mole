const cursor = document.querySelector('.cursor')
const score = document.querySelector(".score")
const moles = document.querySelectorAll(".mole")
const start = document.querySelector("#start")
const sound = new Audio('diglett.mp3')


let lastMole;
let timeUp = false
let points = 0;


function randTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}
//creates random hole from index 0 to 8 never to repeat 
function randMole(moles) {
    let i = Math.floor(Math.random() * moles.length);
    let mole = moles[i]
    if (mole === lastMole) {
        return randMole(moles)
    }

    lastMole = mole;
    return mole;
}
//function to make mole go down and timer. since we left hidden we need to do opposite logic. 
function pop() {
    const time = randTime(700, 1000);
    const mole = randMole(moles);
    mole.classList.remove("hidden");
    setTimeout(() => {
        mole.classList.add("hidden")
        if (!timeUp) {
            pop()
        }
    }, time)
}
//timer to play and how many seconds 
function play() {
    score.textContent = 0;
    timeUp = false;
    points = 0;
    pop()
    setTimeout(() => timeUp = true, 15000)
}

function smash(e) {
    if (!e.isTrusted) {
        return
    }

    points++
    sound.play()
    score.textContent = points;
    this.classList.add("hidden")
}
//each mole is hit we require a smash. 
moles.forEach(mole => mole.addEventListener("click", smash))

start.addEventListener("click", (e) => {

    e.preventDefault()
    play()
})


// mouse work 
window.addEventListener('mousemove', e => {
    cursor.style.top = e.pageY + 'px'
    cursor.style.left = e.pageX + 'px'
})

window.addEventListener('mousedown', function() {
    cursor.classList.add('active')
})

window.addEventListener('mouseup', function() {
    cursor.classList.remove('active')
})
