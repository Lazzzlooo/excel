import {$} from '@core/dom'

export default function resizeHandler(event, $root) {
  const $resizer = $(event.target)
  // const $parent = $resizer.$el.parentNode
  // bad! изменится верстка не будет работать
  const $parent = $resizer.closest('[data-type="resizable"]')
  const coords = $parent.getCoords()
  const type = $resizer.data.resize
  const sideProp = type === 'col' ? 'bottom' : 'right'
  let value

  $resizer.css({
    opacity: 1,
    [sideProp]: '-5000px'
  })

  document.onmousemove = (e) => {
    if (type === 'row') {
      const delta = e.pageY - coords.bottom
      value = (coords.height + delta)
      $resizer.css({
        bottom: -delta + 'px'
      })
    } else {
      const delta = e.pageX - coords.right
      value = coords.width + delta
      $resizer.css({
        right: -delta + 'px'
      })
    }
  }

  document.onmouseup = (e) => {
    $resizer.css({
      opacity: 0,
      bottom: 0,
      right: 0
    })
    if (type === 'row') {
      $parent.css({height: value + 'px'})
    } else {
      $parent.css({width: value + 'px'})
      $root.findAll(`[data-col="${$parent.data.col}"]`)
          .forEach(el => el.style.width = value + 'px')
    }
    document.onmousemove = null
    document.onmouseup = null
  }
}
