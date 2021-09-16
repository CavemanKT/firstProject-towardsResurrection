import Game from './Game.js'

// CONSTANTS
const GAME_WIDTH = 1024
const GAME_HEIGHT = 864
const CHARACTER_WIDTH = 50
const CHARACTER_HEIGHT = 50
const VELOCITY = 1.5
const FPS = 120
const LOOP_INTERVAL = Math.round(1000 / FPS)

//ENEMY CONSTANT
const ENEMY_WIDTH = CHARACTER_WIDTH - 20
const ENEMY_HEIGHT = CHARACTER_HEIGHT - 20
const VELOCITYe = 0.8

const initLevel = 0

// random val
let randX = function randomPositionForXe() {
  return Math.round(Math.random() * (GAME_WIDTH - ENEMY_WIDTH))
}
let randY = function randomPositionForYe () {
  return Math.round(Math.random() * (GAME_HEIGHT - ENEMY_HEIGHT))
}
let randId = function randomId () {
  return `_${Math.random().toString(36).substring(2, 15)}`
}


const gameSettings = ({
  divWrapper: '#div-wrapper',
  restartBtn: '#restart-btn',
  restartMsg: 'h3',
  startBtn: '#start-btn',
  id: '#game-screen',
  loopInterval: LOOP_INTERVAL
})

const p1Settings = {
  points: 0,
  blood: 5,
  life: 10,
  initDimension: {
    WIDTHc: CHARACTER_WIDTH,
    HEIGHTc: CHARACTER_HEIGHT
  },
  initVelocity: VELOCITY,
  initPos: { Xc: GAME_WIDTH / 2, Yc: GAME_HEIGHT - 100},
  initBackground: 'blue',
  movementKeys: {
    left: 37,
    up: 38,
    right: 39,
    down: 40
  }
}

//NEXT LEVEL ENTRY
const caveSetting = {
  level: initLevel,
  newId: randId(),
  initPos: {
    x: GAME_WIDTH / 2,
    y: 0
  },
  initDimension: {
    width: 150,
    height: 20
  },
  initBackground: 'brown'
}
// ENEMY SETTING
const enemySetting = {
  newId: randId(),
  initDimension: {
    WIDTHe: ENEMY_WIDTH,
    HEIGHTe: ENEMY_HEIGHT,
  },
  initVelocity: VELOCITYe,
  initPos: {
    Xe: randX(),
    Ye: randY()
  },
  initBackground: 'red'
}
const enemySetting2 = {
  newId: randId(),
  level: initLevel,
  initDimension: {
    WIDTHe: ENEMY_WIDTH,
    HEIGHTe: ENEMY_HEIGHT,
  },
  initVelocity: VELOCITYe,
  initPos: {
    Xe: randX(),
    Ye: randY()
  },
  initBackground: 'green'
}
const enemySetting3 = {
  newId: randId(),
  initDimension: {
    WIDTHe: ENEMY_WIDTH,
    HEIGHTe: ENEMY_HEIGHT,
  },
  initVelocity: VELOCITYe,
  initPos: {
    Xe: randX(),
    Ye: randY()
  },
  initBackground: 'red'
}
const enemySetting4 = {
  newId: randId(),
  initDimension: {
    WIDTHe: ENEMY_WIDTH,
    HEIGHTe: ENEMY_HEIGHT,
  },
  initVelocity: VELOCITYe,
  initPos: {
    Xe: randX(),
    Ye: randY()
  },
  initBackground: 'green'
}
const enemySetting5 = {
  newId: randId(),
  initDimension: {
    WIDTHe: ENEMY_WIDTH,
    HEIGHTe: ENEMY_HEIGHT,
  },
  initVelocity: VELOCITYe,
  initPos: {
    Xe: randX(),
    Ye: randY()
  },
  initBackground: 'green'
}

const game = new Game(gameSettings)
game.addCharacter(p1Settings)
game.addEnemy(enemySetting)
game.addEnemy(enemySetting2)
game.addEnemy(enemySetting3)
game.addEnemy(enemySetting4)
game.addEnemy(enemySetting5)
game.addCave(caveSetting)




// if( nextLevel && amountEnemy <= 10 ){
//   game.addCharacter(enemySetting)
// }

// const $startDiv = $('<div id="wrapper"></div>')
// $startDiv
//   .css()

const $divWrapper = $('#div-wrapper')
const $startBtn = $('#start-btn')
const $gameScreen = $('#game-screen')
const $restartBtn = $('#restart-btn')

$divWrapper.removeAttr('hidden')
$startBtn.removeAttr('hidden')

const handleStartBtn = () => {
  $divWrapper.hide()
  $startBtn.hide()
  $gameScreen.removeAttr('hidden')
  game.startGame()
}

const handleRestartBtn = () => {
  location.reload()
}

$startBtn.on('click', handleStartBtn)
$restartBtn.on('click', handleRestartBtn)
