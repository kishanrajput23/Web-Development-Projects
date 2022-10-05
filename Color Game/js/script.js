
// Panda Life

let boxes = document.getElementsByClassName('box')
let topHead = document.getElementById('topHead')
let rgbValue = document.getElementById('rgbValue')
let result = document.getElementById('result')
let easy = document.getElementsByClassName('easy')
let medium = document.getElementById('medium')
let hard = document.getElementById('hard')

function randomRGBvalues() {
    let r = Math.floor(Math.random() * 256)
    let g = Math.floor(Math.random() * 256)
    let b = Math.floor(Math.random() * 256)
    return ("rgb(" + r + ", " + g + ", " + b + ")")
}

function colorBoxes(num) {
    let a = []
    for (let i = 0; i < num; i++) {
        let x = randomRGBvalues()
        a.push(x)
    }
    return a
}
let colors = colorBoxes(3)
let rgb
topColor()
boxColor()
boxShad()
rgbValue.innerHTML = rgb
decider()
function topColor() {
    let a = Math.floor((Math.random() * colors.length))
    rgb = colors[a]
    // console.log(rgb)
}

function boxColor() {
    for (let i = 0; i < colors.length; i++) {
        boxes[i].style.backgroundColor = colors[i]
    }
}
function boxShad() {
    for (let i = 0; i < colors.length; i++) {
        boxes[i].style.boxShadow = '2px 2px 10px black'
    }
}

function rightPick() {
    topHead.style.backgroundColor = rgb;
    for (let i = 0; i < colors.length; i++) {
        boxes[i].style.backgroundColor = rgb
    }
    boxShad()
    result.innerHTML = "Correct&#128526;"
    replay.textContent = "play again"
}

// DECIDER
function decider() {
    for (let i = 0; i < colors.length; i++) {
        boxes[i].addEventListener('click', function () {
            let userColor = this.style.backgroundColor
            // console.log(rgb)
            // console.log(userColor)
            if (userColor === rgb) {
                return rightPick()
            }
            this.style.backgroundColor = 'bisque'
            this.style.boxShadow = '0px 0px'
            result.textContent = 'try again'
        })
    }
}

// HARD LEVEL
hard.addEventListener('click', function () {
    replay.textContent = "new colors"
    this.classList.add('active')
    easy[1].classList.remove('active')
    medium.classList.remove('active')
    topHead.style.backgroundColor = 'crimson'
    result.innerHTML = 'result'
    colors = colorBoxes(9)
    topColor()
    boxColor()
    boxShad()
    rgbValue.textContent = rgb;
    for (let i = 0; i < 9; i++) {
        boxes[i].style.visibility = 'visible'
    }
    decider()
})

// MEDIUM LEVEL
medium.addEventListener('click', function () {
    replay.textContent = "new colors"
    this.classList.add('active')
    easy[1].classList.remove('active')
    hard.classList.remove('active')
    for (let i = 0; i < 9; i++) {
        boxes[i].style.visibility = 'visible'
    }
    topHead.style.backgroundColor = 'crimson'
    result.innerHTML = 'result'
    colors = colorBoxes(6)
    topColor()
    boxColor()
    boxShad()
    rgbValue.textContent = rgb;
    for (let i = 6; i < 9; i++) {
        boxes[i].style.visibility = 'hidden'
    }
    decider()
})

// EASY LEVEL
for (let i = 0; i < 2; i++) {
    easy[i].addEventListener('click', function () {
        replay.textContent = "new colors"
        easy[1].classList.add('active')
        medium.classList.remove('active')
        hard.classList.remove('active')
        topHead.style.backgroundColor = 'crimson'
        result.innerHTML = 'result'
        colors = colorBoxes(3)
        topColor()
        boxColor()
        boxShad()
        rgbValue.textContent = rgb;
        for (let i = 3; i < 9; i++) {
            boxes[i].style.visibility = 'hidden'
        }
        decider()
    })
}

// let popover = new bootstrap.Popover(document.querySelector('.popover-dismiss'), {
//     trigger: 'focus'
//   })