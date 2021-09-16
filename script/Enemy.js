const GAME_WIDTH = 1024
const GAME_HEIGHT = 864

function Enemy ( { newId, initDimension, initVelocity, initPos, initBackground, } ) {
  const enemy = {
    level: 0,
    $elem: null,
    id: newId,
    dimension: initDimension,
    velocity: initVelocity,
    position: initPos,
    background: initBackground,
    $levelBar: null,
    $bloodBar: null,
    $lifeBar: null,
    $pointBar: null,
    $eventBar: null,
    $dataBar: null
  }

  // Create character and appends the character to game-screen
  const init = () => {
    const { id, position: { Xe, Ye }, dimension: { WIDTHe, HEIGHTe }, background } = enemy
    enemy.$elem = $(`<div id="${id}"></div>`)
      .css('left', Xe)
      .css('top', Ye)
      .css('background', background)
      .css('background-size', 'cover')
      .css('width', WIDTHe)
      .css('height', HEIGHTe)
      .css('position', 'absolute')
      .appendTo('#game-screen')
  }

  init()

  let newX
  let newY

  // trigger event
  this.slowDownSpeed = () => {
    if(enemy.velocity > 0.1) {
      enemy.velocity -= 0.09
    }
  }

  // Everytime this gets invoked, update character position
  this.moveCharacter = (character) => {

    const {
      velocity: Ve,
      position: { Xe, Ye }
    } = enemy

    const {
      position: { Xc, Yc}
    } = character

    newX = Xe
    newY = Ye

    if ( Xe < Xc ) {
      newX += Ve
    }
    if ( Xe > Xc ) {
      newX -= Ve
    }
    if ( Ye < Yc) {
      newY += Ve
    }
    if ( Ye > Yc) {
      newY -= Ve
    }

    this.updateEnemyPos(newX, newY)
  }

  let curLv = 0

  const changesInAttributesByLevel = ( sizechange, levelBar, levelNum, Ve, imgUrl ) => {
    sizeChange(sizechange)
    updateData(levelBar, levelNum)
    enemy.velocity = Ve
    imgChange(imgUrl)
    curLv = levelNum
  }

  let dx
  let dy
  let distance

  const stage5MovingStrategicPattern = (Xe, Xc, Ye, Yc, GAME_WIDTH, WIDTHe) => {
    dx = Xe - Xc
    dy = Ye - Yc
    distance = Math.sqrt(dx ** 2 + dy ** 2);

    if ( distance > ( GAME_WIDTH / 4 )) {
      enemy.position.Xe = Math.round(Math.random() * (GAME_WIDTH - WIDTHe))
      enemy.position.Ye = Math.round(Math.random() * 300)
    }
  }

  this.triggerEnemyAttributeInNextLevel = (character, levelNum) => {
    const {
      velocity,
      dimension: {
        WIDTHc,
        HEIGHTc
      },
      position: {
        Xc,
        Yc
      }
    } = character

    const { id, position: { Xe, Ye }, dimension: { WIDTHe, HEIGHTe }, background } = enemy

    switch (levelNum) {
      case 1:
        changesInAttributesByLevel(90, enemy.$levelBar, levelNum,  0.5, 'img/Townsfolk_M_Walk_4.png' )
        break;
      case 2:
        changesInAttributesByLevel(90, enemy.$levelBar, levelNum,  0.6, 'img/Executioner_Walk_1.png' )
        break;
      case 3:
        changesInAttributesByLevel(90, enemy.$levelBar, levelNum,  0.6, 'img/Thief_Walk_3.png' )
        break;
      case 4:
        changesInAttributesByLevel(90, enemy.$levelBar, levelNum,  0.5, 'img/GhostChloeSprite012.png' )
        break;
      case 5:
        changesInAttributesByLevel(70, enemy.$levelBar, levelNum,  0.7, 'img/wraith.png' )
        break;
      case 6:
        changesInAttributesByLevel(75, enemy.$levelBar, levelNum,  0.6, 'img/HeavyKnight_Idle_1.png' )
        break;
      case 7:
        changesInAttributesByLevel(77, enemy.$levelBar, levelNum,  0.7, 'img/King_Idle_3.png' )
        break;
      case 8:
        changesInAttributesByLevel(80, enemy.$levelBar, levelNum,  0.7, 'img/LargeEliteKnight_Idle_1.png' )
        break;
      case 9:
        changesInAttributesByLevel(80, enemy.$levelBar, levelNum,  0.7, 'img/mountainKing.png')
        break;
      case 10:
        changesInAttributesByLevel(90, enemy.$levelBar, levelNum,  0.9, 'img/wraith.png' )
        break;
      default:
        break;
    }

    if ( levelNum > curLv ) {
      // prevLv = levelNum
      $('#game-screen').hide()
      $('#div-wrapper').show()
      $('article').hide()
      $('h3').text('Congratulation!! you won !!').show()
      $('#restart-btn').show()
    }

    switch (curLv) {
      case 5:
        stage5MovingStrategicPattern(Xe, Xc, Ye, Yc, GAME_WIDTH, WIDTHe)
        break;
      case 6:
        stage5MovingStrategicPattern(Xe, Xc, Ye, Yc, GAME_WIDTH, WIDTHe)
        break;
      case 7:
        stage5MovingStrategicPattern(Xe, Xc, Ye, Yc, GAME_WIDTH, WIDTHe)
        break;
      case 8:
        stage5MovingStrategicPattern(Xe, Xc, Ye, Yc, GAME_WIDTH, WIDTHe)
        break;
      case 9:
        stage5MovingStrategicPattern(Xe, Xc, Ye, Yc, GAME_WIDTH, WIDTHe)
        break;
      case 10:
        stage5MovingStrategicPattern(Xe, Xc, Ye, Yc, GAME_WIDTH, WIDTHe)
        break;
      default:
        break;
    }
  }

  const imgChange = (url) => {
    enemy.$elem
          .css('background', `url(${url})`)
          .css('background-size', 'cover')
  }

  this.resetEnemyPos = (GAME_WIDTH, GAME_HEIGHT, ENEMY_WIDTH, ENEMY_HEIGHT) => {
    enemy.position.WIDTHe = Math.round(Math.random() * (GAME_WIDTH - ENEMY_WIDTH))
    enemy.position.HEIGHTe = Math.round(Math.random() * (GAME_HEIGHT - ENEMY_HEIGHT))
    this.updateEnemyPos(enemy.position.WIDTHe, enemy.position.HEIGHTe)

  }
  const sizeChange = (size) => {
    enemy.dimension.WIDTHe = size
    enemy.dimension.HEIGHTe = size
    enemy.$elem
      .css('width', enemy.dimension.WIDTHe)
      .css('height', enemy.dimension.HEIGHTe)
  }
  const removeData = (levelNumElem) => {
    levelNumElem.remove(":contains('Level')")
  }
  const addData = (levelNumber) =>{
    enemy.$levelBar = $('<p id="levelNum"></p>')
    enemy.$levelBar
        .text(`Level: ${levelNumber}`)
        .css('font-size', '28px')
        .css('font-weight', '10')
        .css('position', 'absolute')
        .css('bottom', '-25px')
        .css('left', '20px')
        .appendTo('#data-bar')
  }
  addData(0)  // initialize the level number
  const updateData = (levelNumElem, levelNumber) => {
    removeData(levelNumElem)
    addData(levelNumber)
  }
  this.updateEnemyPos = (newX, newY) => {
    enemy.position.Xe = newX
    enemy.position.Ye = newY
    enemy.$elem.css('left', newX).css('top', newY)
  }

  this.getCurLv = () => {
    return curLv
  }

// beginning of the getters
  Object.defineProperties(this, {
    dimension: {
      get: function() {
        return {
          ...enemy.dimension
        }
      }
    },
    position: {
      get: function() {
        return {
          ...enemy.position
        }
      }
    }
  })
  // ends of the getters
}

export default Enemy
