function getTooltipElm(id) {
  // get
  var tooltipEl = document.getElementById(`chartjs-tooltip-${id}`)

  // create if not exists
  if (!tooltipEl) {
    tooltipEl = document.createElement('div')
    tooltipEl.id = `chartjs-tooltip-${id}`
    tooltipEl.innerHTML = `<div class="tooltip-content-${id}"></div>`
    document.body.appendChild(tooltipEl)
  }

  return tooltipEl
}

function setCaretPosition(tooltipEl, tooltipModel) {
  // Set caret Position
  tooltipEl.classList.remove('above', 'below', 'no-transform')
  if (tooltipModel.yAlign) {
    tooltipEl.classList.add(tooltipModel.yAlign)
  } else {
    tooltipEl.classList.add('no-transform')
  }
}

function setTooltipStyles(tooltipEl, tooltipModel, position) {
  // Display, position, and set styles for font
  tooltipEl.style.transition = 'all 0.25s'
  tooltipEl.style.opacity = 1
  tooltipEl.style.position = 'absolute'
  tooltipEl.style.left =
    position.left + window.pageXOffset + tooltipModel.caretX + 'px'
  tooltipEl.style.top =
    position.top + window.pageYOffset + tooltipModel.caretY + 'px'
  tooltipEl.style.fontFamily = tooltipModel._bodyFontFamily
  tooltipEl.style.fontSize = tooltipModel.bodyFontSize + 'px'
  tooltipEl.style.fontStyle = tooltipModel._bodyFontStyle
  tooltipEl.style.padding =
    tooltipModel.yPadding + 'px ' + tooltipModel.xPadding + 'px'
  tooltipEl.style.pointerEvents = 'none'
}

function createTooltip(tooltipModel, uniqueId) {
  // get tooltip element
  var tooltipEl = getTooltipElm(uniqueId)

  // Hide if no tooltip
  if (tooltipModel.opacity === 0) {
    tooltipEl.style.opacity = 0
    return
  }

  // set caret position
  setCaretPosition(tooltipEl, tooltipModel)

  // `this` will be the overall tooltip
  var position = this._chart.canvas.getBoundingClientRect()

  // setting styles of tooltip
  setTooltipStyles(tooltipEl, tooltipModel, position)

  return tooltipEl
}

export const countEvolutionTooltip = function (tooltipModel) {
  let uniqueId = 'ce'
  let tooltipEl = createTooltip.bind(this, tooltipModel, uniqueId)()

  if (!tooltipEl) return

  function getBody(bodyItem) {
    return bodyItem.lines
  }

  // Set Text
  if (tooltipModel.body) {
    var bodyLines = tooltipModel.body.map(getBody)

    let innerHTML = ''
    if (bodyLines.length == 1)
      innerHTML = `
        <div class="body">
          <span>${(bodyLines[0] + '').split(' ').pop()}</span>
          <span>
            Accomplished<br/>Tasks
          </span>
        </div>
      `
    else
      for (let item of bodyLines)
        innerHTML += `
          <div class="head">${(item + '').split(':').shift()}</div>
          <div class="body">
            <span>${(item + '').split(' ').pop()}</span>
            <span>
              Accomplished<br/>Tasks
            </span>
          </div>
        `

    var tooltipContent = tooltipEl.querySelector(`.tooltip-content-${uniqueId}`)
    if (tooltipContent) tooltipContent.innerHTML = innerHTML
  }
}

export const countTasksTooltip = function (tooltipModel) {
  let uniqueId = 'ct'
  let tooltipEl = createTooltip.bind(this, tooltipModel, uniqueId)()

  if (!tooltipEl) return

  function getBody(bodyItem) {
    return bodyItem.lines
  }

  // Set Text
  if (tooltipModel.body) {
    var bodyLines = tooltipModel.body.map(getBody)

    let innerHTML = `
      <div class="body">
        <span>${bodyLines[0]}</span>
        <span>
          of ${parseInt(bodyLines[0]) + parseInt(bodyLines[1])}
        </span>
      </div>
      <div class="footer">Completed tasks</div>
    `

    var tooltipContent = tooltipEl.querySelector(`.tooltip-content-${uniqueId}`)
    if (tooltipContent) tooltipContent.innerHTML = innerHTML
  }
}

export const dupObjectTooltip = function (tooltipModel) {
  let uniqueId = 'duo'
  let tooltipEl = createTooltip.bind(this, tooltipModel, uniqueId)()

  if (!tooltipEl) return

  function getBody(bodyItem) {
    return bodyItem.lines
  }

  // Set Text
  if (tooltipModel.body) {
    var bodyLines = tooltipModel.body.map(getBody)

    let innerHTML = `
      <div class="body">
        <span>${bodyLines.reduce(
          (prev, curr) => prev + parseInt(curr),
          0
        )}</span>
        <span>
          Matches
        </span>
      </div>
    `

    var tooltipContent = tooltipEl.querySelector(`.tooltip-content-${uniqueId}`)
    if (tooltipContent) tooltipContent.innerHTML = innerHTML
  }
}

export const dupUserTooltip = function (tooltipModel) {
  let uniqueId = 'dut'
  let tooltipEl = createTooltip.bind(this, tooltipModel, uniqueId)()

  if (!tooltipEl) return

  function getBody(bodyItem) {
    return bodyItem.lines
  }

  // Set Text
  if (tooltipModel.body) {
    var bodyLines = tooltipModel.body.map(getBody)

    let innerHTML = `
      <div class="body">
        <span>${bodyLines.reduce(
          (prev, curr) => prev + parseInt(curr),
          0
        )}</span>
        <span>
          Marketplace<br/>Accounts
        </span>
      </div>
    `

    var tooltipContent = tooltipEl.querySelector(`.tooltip-content-${uniqueId}`)
    if (tooltipContent) tooltipContent.innerHTML = innerHTML
  }
}
