
function Cave ( { level, newId, initPos, initDimension, initBackground } ) {
  const cave = {
    level: level,
    $elem: null,
    id: newId,
    position: initPos,
    dimension: initDimension,
    background: initBackground,
  }

  const init = () => {
  const { id, position: { x, y }, dimension: { width, height }, background } = cave
  cave.$elem = $(`<div id="${id}"></div>`)
    .css('left', x)
    .css('top', y)
    .css('background', background)
    .css('width', width)
    .css('height', height)
    .css('position', 'absolute')
    .appendTo('#game-screen')
  }

  init()

  let levelChange = cave.level

  this.entryDetection = (character) => {
    const {
      blood,
      velocity,
      dimension: { WIDTHc, HEIGHTc },
      position: { Xc, Yc },
    } = character

    let newXc = Xc
    let newYc = Yc
    let newWIDTHc = WIDTHc
    let newHEIGHTc = HEIGHTc

    const {
      position : { x, y },
      dimension: { width, height}
    } = cave

    let newXcave = x
    let newYcave = y
    let newWIDTHcave = width
    let newHEIGHTcave = height

    if ((newXc + newWIDTHc < newXcave + newWIDTHcave) && (newXc > newXcave) && (newYcave + 3 > newYc)) {
      levelChange++
      return levelChange
    }
  }

// beginning of the getters
  Object.defineProperties(this, {
    level: {
      get: function() {
        return {
          ...cave.level
        }
      }
    }
  })
  // ends of the getters



}



export default Cave
