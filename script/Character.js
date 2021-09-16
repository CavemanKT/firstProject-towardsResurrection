const CHARACTER_WIDTH = 50
const CHARACTER_HEIGHT = 50
const VELOCITY = 10
const GAME_WIDTH = 1024
const GAME_HEIGHT = 864
const initBlood = 5 // official initBlood is 5
const initLife = 10
const CHARACTER_POSITION = {
  x: GAME_WIDTH / 2,
  y: GAME_HEIGHT - 100
}



function Character({points, blood, life, initDimension, initVelocity, initPos, initBackground, movementKeys }, $game) {
  const character = {
    points: points,
    blood: blood,
    life: life,
    $elem: null,
    $pointsElem: null,
    $lifeElem: null,
    $bloodElem: null,
    id: `_${Math.random().toString(36).substring(2, 15)}`,
    dimension: initDimension,
    velocity: initVelocity,
    position: initPos,
    background: initBackground,
    movementKeys,
    movement: {
      left: false,
      up: false,
      right: false,
      down: false
    },
    needToParryAttack: false
  }

  let charPoints = character.points

  // Create character and appends the character to game-screen
  const init = () => {
    const {points, blood, life, id, position: { Xc, Yc }, dimension: { WIDTHc, HEIGHTc }, background } = character

    // body
    character.$elem = $(`<div id="${id}"></div>`)
      .css('left', Xc)
      .css('top', Yc)
      .css('background', "url('img/GhostWillySprite000.png')")
      .css('background-size', 'cover')
      .css('width', WIDTHc)
      .css('height', HEIGHTc)
      .css('position', 'absolute')
      .appendTo('#game-screen')

    // points
    character.$pointsElem = $(`<p id="pointsElem"></p>`)
    character.$pointsElem
      .text(`Points: ${charPoints}`)
      .css('font-size', '28px')
      .css('font-weight', '10')
      .css('position', 'absolute')
      .css('bottom', '-25px')
      .css('left', '400px')
      .appendTo('#data-bar')

    // HP
    character.$bloodElem = $(`<p id="bloodElem"></p>`)
    character.$bloodElem
      .text(`HP: ${character.blood}`)
      .css('font-size', '28px')
      .css('font-weight', '10')
      .css('position', 'absolute')
      .css('bottom', '-25px')
      .css('left', '800px')
      .appendTo('#data-bar')

    // LIFE
    character.$lifeElem = $(`<p id="lifeElem"></p>`)
    character.$lifeElem
      .text(`Life: ${character.life}`)
      .css('font-size', '28px')
      .css('font-weight', '10')
      .css('position', 'absolute')
      .css('bottom', '-25px')
      .css('left', '1000px')
      .appendTo('#data-bar')

  }

  init()

  let needToParryAttack = character.needToParryAttack

  // Toggle which direction the character is moving to
  this.setCharacterMovement = (value, keyCode) => {
    const { movementKeys: { left, up, right, down } } = character
    switch (keyCode) {
      case left:
        character.movement.left = value
        break
      case up:
        character.movement.up = value
        break
      case right:
        character.movement.right = value
        break
      case down:
        character.movement.down = value
        break
    }
  }

  this.evadeTheNextAttack = (enemy) => {
    const { position: {Xe, Ye}, dimension: { WIDTHe, HEIGHTe} } = enemy
    const {
      blood,
      life,
      velocity,
      dimension: { WIDTHc, HEIGHTc },
      position: { Xc, Yc },
    } = character

    if (Xe + 15 < Xc + WIDTHc && Xe + WIDTHe - 15 > Xc &&
      Ye + 15 < Yc + HEIGHTc && Ye + HEIGHTe - 15 > Yc) {
        // collision detected!
        character.needToParryAttack = true
      }

    if (character.needToParryAttack) {
      const gameW = $game.width()
      const gameH = $game.height()
      const {
        velocity,
        dimension: { WIDTHc, HEIGHTc },
        position: { Xc, Yc },
        movement: { left, up, right, down }
      } = character

      let newX = Xc
      let newY = Yc

      if (left) {
        newX = Xc - velocity < 0 ? 0 : newX + velocity + 100
        character.needToParryAttack = false
      }
      if (up) {
        newY = Yc - velocity < 0 ? 0 : newY + velocity + 100
        character.needToParryAttack = false
      }
      if (right) {
        newX = Xc + WIDTHc + velocity > gameW ? gameW - WIDTHc : newX - velocity - 100
        character.needToParryAttack = false
      }
      if (down) {
        newY = Yc + HEIGHTc + velocity > gameH ? gameH - HEIGHTc : newY - velocity - 100
        character.needToParryAttack = false
      }


      this.updateCharacterPos(newX, newY)
    }
  }

  // Everytime this gets invoked, update character position
  this.moveCharacter = () => {
    const gameW = $game.width()
    const gameH = $game.height()
    const {
      velocity,
      dimension: { WIDTHc, HEIGHTc },
      position: { Xc, Yc },
      movement: { left, up, right, down }
    } = character

    let newX = Xc
    let newY = Yc

    if (left) {
      newX = Xc - velocity < 0 ? 0 : newX - velocity
    }
    if (up) {
      newY = Yc - velocity < 0 ? 0 : newY - velocity
    }
    if (right) {
      newX = Xc + WIDTHc + velocity > gameW ? gameW - WIDTHc : newX + velocity
    }
    if (down) {
      newY = Yc + HEIGHTc + velocity > gameH ? gameH - HEIGHTc : newY + velocity
    }

    this.updateCharacterPos(newX, newY)
  }

  this.collisionToEnemy = (enemy) => {
    const { position: {Xe, Ye}, dimension: { WIDTHe, HEIGHTe} } = enemy
    const {
      blood,
      life,
      velocity,
      dimension: { WIDTHc, HEIGHTc },
      position: { Xc, Yc },
    } = character

    if (Xe < Xc + WIDTHc && Xe + WIDTHe > Xc &&
      Ye < Yc + HEIGHTc && Ye + HEIGHTe > Yc) {
        // collision detected!
        if(!character.$elem.hasClass('get-hit')){
          var invincible = setInterval(() => {
            character.$elem.toggleClass('get-hit')
          }, 100);
        }

        if(blood > 1){
          character.blood--
          updateHp()
        } else {
          character.blood--
          this.resetCharacter()
          character.life--
          updateLife()
        }
    }
    if (true) {
      setTimeout(() => {
        clearInterval(invincible);
        if(character.$elem.hasClass('get-hit')) {
          character.$elem.removeClass('get-hit')
        }
      }, 3000);
    }
  }

  this.resetCharacter = () => {
    const {
      blood,
      life,
      velocity,
      dimension: { WIDTHc, HEIGHTc },
      position: { Xc, Yc },
    } = character

    // character.blood = initBlood
    character.dimension = {
      WIDTHc: WIDTHc,
      HEIGHTc: HEIGHTc
    }
    character.blood = initBlood
    updateHp()
    character.velocity = velocity
    character.position = {Xc: GAME_WIDTH / 2, Yc: GAME_HEIGHT - 100}
  }


// Since we use location.reload() to restart the game.
// we don't use restartGame fn
  this.restartGame = () => {
    const {
      life,
      dimension: { WIDTHc, HEIGHTc },
      position: { Xc, Yc },
    } = character
    character.velocity = 2.5

    character.points = 0

    character.life = initLife
    character.dimension = {CHARACTER_WIDTH, CHARACTER_HEIGHT}
    updateLife()
    updatePoints()
    this.resetCharacter()
  }



  this.addPoint = () => {
    charPoints += 5
    character.$pointsElem
      .text(`points: ${charPoints}`)
      .css('font-size', '28px')
      .css('font-weight', '10')
      .css('position', 'absolute')
      .css('bottom', '-25px')
      .css('left', '400px')
      .appendTo('#data-bar')
  }

  this.spendingPoints = () => {
    if (charPoints >= 1) {
      charPoints--
      updatePoints()
    }
  }

  const updateHp = () => {
    const {
      blood
    } = character
    character.$bloodElem
      .text(`HP: ${blood}`)
      // .css('font-size', '28px')
      // .css('font-weight', '10')
      // .css('position', 'absolute')
      // .css('bottom', '-25px')
      // .css('left', '800px')
      // .appendTo('#data-bar')
  }

  const updateLife = () => {
    const {
      life
    } = character
    character.$lifeElem
      .text(`Life: ${life}`)

  }

  const updatePoints = () => {
    character.$pointsElem
      .text(`Points: ${charPoints}`)
  }

  this.updateCharacterPos = (newX, newY) => {
    character.position.Xc = newX
    character.position.Yc = newY
    character.$elem.css('left', newX).css('top', newY)
  }

  this.getCharPoints = () => {
    return charPoints
  }

// beginning of the getters
  Object.defineProperties(this, {
    dimension: {
      get: function() {
        return {
          ...character.dimension
        }
      }
    },
    position: {
      get: function() {
        return {
          ...character.position
        }
      }
    },
    life: {
      get: function () {
        return character.life
      }
    },
    points: {
      get: function () {
        return {
          ...character.points
        }
      }
    }
  })
  // ends of the getters
}

export default Character
