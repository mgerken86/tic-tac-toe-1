let playCount = 0
let xWinsCount = 0
let oWinsCount = 0
let xWinsGameOver = false;

const displayWins = () => {
    let xScoreDisplay = document.getElementById('xScore')
        xScoreDisplay.innerText = `Number of games X has won: ${xWinsCount}`
    let oScoreDisplay = document.getElementById('oScore')
        oScoreDisplay.innerText = `Number of games O has won: ${oWinsCount}`
}
displayWins()


const showTurn = () => { 
    const playerTurn = document.getElementById('playerTurn')
    playerTurn.innerText =  `It is ${playCount % 2 === 0 ? `X's` : `O's`} turn`
}
showTurn()

//assign variables to HTML button inputs
const btnOne = document.getElementById('one')
const two = document.getElementById('two')
const three = document.getElementById('three')
const four = document.getElementById('four')
const five = document.getElementById('five')
const six = document.getElementById('six')
const seven = document.getElementById('seven')
const eight = document.getElementById('eight')
const nine = document.getElementById('nine')

const rulesPopup = document.getElementById('rulesPopup')
const playLocalBtn = document.getElementById('playLocal')
const playComputerBtn = document.getElementById('playComputer')
const endGameText = document.getElementById('endGameText')
const endGameText2 = document.getElementById('endGameText2')
const smallGameBoardPic = document.getElementsByClassName('smallGameBoardPic')

const buttonsArr = [one, two, three, four, five, six, seven, eight, nine]

const enableButtons = () => {
    for (let i = 0; i < buttonsArr.length; i++) {
        buttonsArr[i].disabled = false;
    }
}
const disableBtns = () => {
    for (let i = 0; i < buttonsArr.length; i++) {
        buttonsArr[i].disabled = true;
    }
}

//This assigns button event listeners to play locally
//and removes the other event listeners so there aren't both
const playLocally = () => {
    for (let i = 0; i < buttonsArr.length; i++) {
        buttonsArr[i].addEventListener("click", changeBtn)
        buttonsArr[i].removeEventListener('click', changeBtnWithComputer)
    }
}
// This assigns event listeners to grid buttons to play with computer
//and removes the other event listeners so there aren't both
const playWithComputer = () => {
    for (let i = 0; i < buttonsArr.length; i++) {
        buttonsArr[i].removeEventListener('click', changeBtn)
        buttonsArr[i].addEventListener("click", changeBtnWithComputer)
    }
}

// *** The following function is to play locally

function changeBtn() {
    currentBtn = event.target

    if (currentBtn.value){
        currentBtn.value == null
    } else 
    if (playCount % 2 === 0) {
        currentBtn.value = "X"
        playCount++
    } else {
        currentBtn.value = "O"
        currentBtn.classList.add('computer')
        playCount++
    }
    currentBtn.classList.add('active')
    showTurn()
    playGame()
    if (xWinsGameOver)
            player1Wins()
}


//*** The following two functions are used to play against computer

const computerChooses = () => {
    computerChoice = Math.floor(Math.random() * buttonsArr.length)
    computerBtn = buttonsArr[computerChoice]
        if (computerBtn.value){
            while (computerBtn.value){
                computerBtn.value == null
                computerChoice = Math.floor(Math.random() * buttonsArr.length)
                computerBtn = buttonsArr[computerChoice]
                continue
            }
        }
    computerBtn.value = "O"
    computerBtn.classList.add('computer')

    playCount ++;
    playGame()
    showTurn()
    setTimeout(enableButtons, 500)
}

function changeBtnWithComputer() {
    //calling this prevents choosing other buttons before setTimeout calls computer choice. buttons reenabled when computer chooses
    disableBtns()
    currentBtn = event.target

    currentBtn.value ? currentBtn.value == null : currentBtn.value = "X"
        
    currentBtn.classList.add('active')
    playCount++
    showTurn()
    playGame()
    
    // made this condition to make sure computer doesn't still choose after x wins
    //also make sure playCount isn't over 7, otherwise computer still chooses even after board is full
    !xWinsGameOver && playCount <= 7 ? setTimeout(computerChooses, 500) : (xWinsGameOver ? player1Wins() : null)
    ()
}



//this will be to change active on and off
const changeClasses = () => {
    endGameText.classList.add('active')
    rulesPopup.classList.add('active')
    for (let i=0; i<smallGameBoardPic.length; i++){
        
        // need to check this, i'm not using i
        smallGameBoardPic.classList.add('active')
    }
}


const player1Wins = () => {
    xWinsCount++
    endGameText.innerText = `X WINS!!`
    playerTurn.innerText = 'X WINS!!'
    displayWins()
    disableBtns()
    XRain = setInterval(makeRainingXs, 100)
    setTimeout(() => clearInterval(XRain), 4000)
    setTimeout(changeClasses, 4000) 
}



//**** BUG ALERT -- if O wins, x can still push a button before screen resets if fast enough
// also if by doing so it puts the playcount to 9, then it also thinks it's a draw and keeps raining elements down infinitely
const player2Wins = () => {
    oWinsCount++
    endGameText.innerText = `O WINS!!`
    playerTurn.innerText = 'O WINS!!'
    displayWins()
    disableBtns()
    ORain = setInterval(makeRainingOs, 100)
    setTimeout(() => clearInterval(ORain), 4000)
    setTimeout(changeClasses, 4000) 
}


function playGame() {
    if (((one.value == "X") && (two.value == "X") && (three.value == "X")) ||
        ((four.value == "X") && (five.value == "X") && (six.value == "X")) ||
        ((seven.value == "X") && (eight.value == "X") && (nine.value == "X")) ||
        ((one.value == "X") && (four.value == "X") && (seven.value == "X")) ||
        ((two.value == "X") && (five.value == "X") && (eight.value == "X")) ||
        ((three.value == "X") && (six.value == "X") && (nine.value == "X")) ||
        ((one.value == "X") && (five.value == "X") && (nine.value == "X")) ||
        ((three.value == "X") && (five.value == "X") && (seven.value == "X"))) 
        // player1Wins()
        return xWinsGameOver = true;
        else
    if (((one.value == "O") && (two.value == "O") && (three.value == "O")) ||
        ((four.value == "O") && (five.value == "O") && (six.value == "O")) ||
        ((seven.value == "O") && (eight.value == "O") && (nine.value == "O")) ||
        ((one.value == "O") && (four.value == "O") && (seven.value == "O")) ||
        ((two.value == "O") && (five.value == "O") && (eight.value == "O")) ||
        ((three.value == "O") && (six.value == "O") && (nine.value == "O")) ||
        ((one.value == "O") && (five.value == "O") && (nine.value == "O")) ||
        ((three.value == "O") && (five.value == "O") && (seven.value == "O"))) 
        player2Wins();
        else
    if (playCount >= 9) {
        endGameText.innerText = `DRAW`
        setTimeout(changeClasses, 1000) 
        disableBtns()
    }
}


//this resets the playing board and resets playcount. This is called when pushing button on main
function resetGame() {
    for (let i = 0; i < buttonsArr.length; i++) {
        buttonsArr[i].value = ""
        buttonsArr[i].className = ''
        buttonsArr[i].disabled = false
        xWinsGameOver = false;
        rulesPopup.classList.remove('active')
        endGameText.classList.remove('active')
        //display:none for any fallingXs that havent reached bottom yet
        fallingX = document.getElementsByClassName('fallingX')
        for (let i=0; i<fallingX.length; i++){
            fallingX[i].classList.add('active')
        }
        playCount = 0;
        showTurn()
    }
}


playLocalBtn.addEventListener('click', () => {
    resetGame()
    playLocally()
})
playComputerBtn.addEventListener('click', () => {
    resetGame()
    playWithComputer()
})






const colorsArr = ['#242c10', '#d5ff61', 'white']

function makeRainingXs (){
    const fallingX = document.createElement('div')
    fallingX.classList.add('fallingX')
    fallingX.style.left = Math.random() * 100 + 'vw'
    fallingX.style.zIndex = 1    
    fallingX.style.animationDuration = Math.random() * 5 + 2 + 's'
    fallingX.style.fontSize = Math.random() * 95 + 35 + 'px'
    fallingX.style.color = colorsArr[Math.floor(Math.random() * colorsArr.length)]
    fallingX.innerText = 'X'
    document.body.appendChild(fallingX)
  }
  let XRain;
  

  function makeRainingOs (){
    const fallingO = document.createElement('div')
    fallingO.classList.add('fallingX')
    fallingO.style.left = Math.random() * 100 + 'vw'
    fallingO.style.zIndex = 1    
    fallingO.style.animationDuration = Math.random() * 5 + 2 + 's'
    fallingO.style.fontSize = Math.random() * 95 + 35 + 'px'
    fallingO.style.color = colorsArr[Math.floor(Math.random() * colorsArr.length)]
    fallingO.innerText = 'O'
    document.body.appendChild(fallingO)
  }
  let ORain;
  
  
  
  


// ****** PLAY WITH THE COMPUTER MODE ******



// ******** TO-DO LIST **********



//add new color, pinkish or purple?
//have main buttons shimmer
//hover effects


//media query stuff


// change the top text when someone wins to a picture of an x or o or draw

// animations -- flip grid buttons    do some cool hover effects