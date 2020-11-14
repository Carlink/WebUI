function moveColumn(evt, visibleColumns, realColumns) {
  const oldIndex = evt.oldIndex
  const newIndex = evt.newIndex
  if (newIndex >= visibleColumns.length) {
    let k = newIndex - visibleColumns.length + 1
    while (k--) {
      visibleColumns.push(undefined)
    }
  }
  // Apply column change to full column list;
  const columnMoving = visibleColumns[oldIndex]
  const destinationColumn = visibleColumns[newIndex]
  const oldFullIndex = realColumns.findIndex(
    (column) => column.name === columnMoving.name
  )
  let newFullIndex = realColumns.findIndex(
    (column) => column.name === destinationColumn.name
  )
  const newColumns = [...realColumns]
  newColumns.splice(newFullIndex, 0, newColumns.splice(oldFullIndex, 1)[0])
  return newColumns
}

export default {
  moveColumn: moveColumn
}
