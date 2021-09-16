import Character from './Character.js'
import Enemy from './Enemy.js'
import Cave from './Cave.js'

// CONSTANTS
const GAME_WIDTH = 1024
const GAME_HEIGHT = 864
const CHARACTER_WIDTH = 50
const CHARACTER_HEIGHT = 50
const VELOCITY = 10

//ENEMY CONSTANT
const ENEMY_WIDTH = CHARACTER_WIDTH - 20
const ENEMY_HEIGHT = CHARACTER_HEIGHT - 20
let Ve

let level = 0

function Game({ divWrapper, restartBtn, restartMsg, startBtn, id, loopInterval }) {
  const game = {
    $divWrapper: $(divWrapper),  // <div id="div-wrapper"></div>
    $restartBtn: $(restartBtn),   // <h3 id="#restartMsg">You are being brought back to hell.</h3>
    $restartMsg: $(restartMsg),    // <button id="restartBtn">RESTART</button>
    $startBtn: $(startBtn),     // <button id='#startBtn'>START</button>
    $elem: $(id),     // $("#game-screen")
    id,
    loop: null,
    loopCollisionToEnemy: null,
    loopCheckIfLost: null,
    loopEvasionSkill: null,
    character: null,
    cave: null,
    enemies: [],
    prevLevel: 0,
    diffLevel: 0,
    levelNum: 0,
  }

  // Handling Key Down
  const handleKeyDown = (e) => {
    game.character.setCharacterMovement(true, e.keyCode)
  }
  // Handling Key Up
  const handleKeyUp = (e) => {
    game.character.setCharacterMovement(false, e.keyCode)
  }

  const updateMovements = () => {
    game.character.moveCharacter()
    game.enemies.forEach((enemy) => {
      enemy.moveCharacter(game.character)
    })
  }

  const evasion = () => {
    game.enemies.forEach((enemy) => {
      game.character.evadeTheNextAttack(enemy)
    })
  }

  const collisionSystem = () => {
    game.enemies.forEach((enemy) => {
      game.character.collisionToEnemy(enemy)
    })
  }


  const entryDetection = () => {
    level = game.cave.entryDetection(game.character)
    nextLevel(level)
    checkIfReachTheGate(level)
    game.enemies.forEach(enemy => {
      let curLv = enemy.getCurLv()
      if ( level > curLv) {
        clearInterval(game.loopCollisionToEnemy)
        clearInterval(game.loopEntryDetection)
        clearInterval(game.loop)
        clearInterval(game.loopCheckIfLost)
      }
    });
  }

  const checkIfReachTheGate = (levelNum) => {
    let charReachTheGate = false
    game.diffLevel = levelNum - game.prevLevel
    if(levelNum){
      game.prevLevel = levelNum
    }
    if (game.diffLevel) {
      charReachTheGate = true
    }
    if (charReachTheGate) {
      game.character.resetCharacter()  // fix later: add setTimeout for entering next level to levigate the pace of the game
      game.character.addPoint()
      game.enemies.forEach((enemy) => {
        enemy.resetEnemyPos(GAME_WIDTH, GAME_HEIGHT, ENEMY_WIDTH, ENEMY_HEIGHT)
      })
    }
  }

  const nextLevel = (levelNum) => {
    game.enemies.forEach((enemy) => {
      enemy.triggerEnemyAttributeInNextLevel(game.character, levelNum)
    })
  }

  const slowDownEnemyEventHandler = () => {
    let charPoints = game.character.getCharPoints()
    if ( charPoints >= 1) {
      game.enemies.forEach(enemy => {
        enemy.slowDownSpeed()
      });

      game.character.spendingPoints()
    }
  }

// Beginning of the restartBtn      ===================================================

  const gameOverShowUp = () => {
    game.$restartMsg.show()
    $('article').hide()
    game.$elem.hide()
    game.$restartBtn.show()
    game.$divWrapper.show()
  }

  const gameOver = () => {
    const {
      life
    } = game.character
    if (life <= -1) {
      game.character.restartGame()
      gameOverShowUp()
      clearInterval(game.loopCollisionToEnemy)
      clearInterval(game.loopEntryDetection)
      clearInterval(game.loop)
      clearInterval(game.loopCheckIfLost)
    }

  }

// the END of the restartBtn  =======================================================

// Beginning of the addSetting
  this.addCharacter = (setting) => {
    let newChar = new Character(setting, game.$elem)
    game.character = newChar
  }

  this.addEnemy = (setting) => {
    let newEnemy = new Enemy(setting)
    game.enemies.push(newEnemy)
  }

  this.addCave = (setting) => {
    game.cave = new Cave(setting)
  }
// End of the addSetting

  this.startGame = () => {
    $(document).on('keydown', handleKeyDown)
    $(document).on('keyup', handleKeyUp)

    game.loop = setInterval(updateMovements, loopInterval)
    game.loopCollisionToEnemy = setInterval(collisionSystem, 300)
    game.loopEntryDetection = setInterval(entryDetection,500)
    game.loopCheckIfLost = setInterval(gameOver, 1000);
    game.loopEvasionSkill = setInterval(evasion , loopInterval);
    $('ul li:first-child').on('click', slowDownEnemyEventHandler)
  }


}

export default Game
