import constants from './constants/constants'

// This file contains helper logic for dealing with rows that is used in multiple components

function getColumnId(columns, name) {
  let id
  columns.some((column) => {
    if (column.name === name) {
      id = column.id
      return true
    }
    return false
  })
  return id
}

function getColumnCells(cells, columnId) {
  let matchingCells = cells.filter((cell) => cell.column_id === columnId)
  if (matchingCells.length === 0) {
    console.log(`Could not find cell for column ${columnId}`)
    return []
  } else if (matchingCells.length > 1) {
    console.log(`Warning: Multiple cells found for column ${columnId}`)
  }
  return matchingCells
}

function cellLocked(columns, cells, rowId, columnName) {
  const columnId = getColumnId(columns, columnName)
  const columnCells = getColumnCells(cells, columnId)
  let locked = false
  columnCells.some((cell) => {
    if (cell.row_id === rowId) {
      locked = cell.locked
      return true
    }
    return false
  })
  return locked ? locked : false
}

function buildGridRow(row, columns, cells) {
  const gridRow = {}
  const rowId = row.id
  Object.keys(row).forEach((key) => {
    if (key === 'data') {
      const data = row[key]
      Object.keys(data).forEach((field) => {
        let value = data[field]
        if (cellLocked(columns, cells, rowId, field)) {
          value = {
            value: value,
            locked: true
          }
        }
        gridRow[field] = value
      })
    } else {
      gridRow[key] = row[key]
    }
  })
  return gridRow
}

function buildFinalData(final_record, columns, cells) {
  const finalData = {}
  Object.keys(final_record).forEach((field) => {
    let value = final_record[field]
    const columnId = getColumnId(columns, field)
    const columnCells = getColumnCells(cells, columnId)
    let source = undefined
    if (columnCells.length > 1) {
      console.log(
        `Warning: multiple cells found for column ${field}. Using first with selection defiend`
      )
    }
    columnCells.some((cell) => {
      if (cell.selected === true) {
        source = cell.row_id
        return true
      }
      return false
    })
    if (source == undefined) {
      console.log(`Warning: couldn't find source of column ${field}`)
    }
    finalData[field] = {
      source,
      value
    }
  })
  return finalData
}

function isMergable(row) {
  if (row.locked) {
    return false
  }
  if (
    row.action === constants.actions.skip ||
    row.action === constants.actions.never
  ) {
    return false
  }
  return true
}

function buildColumnChanges(originalFinalData, finalData, columns) {
  const result = []
  columns.forEach((column) => {
    const columnName = column.name
    const originalValue = originalFinalData[columnName]
    const finalValue = finalData[columnName]
    if (finalValue && finalValue.value !== originalValue) {
      result.push({
        column_id: column.id,
        selected_row_id: finalValue.source,
        value: finalValue.value
      })
    }
  })
  return result
}

function isMaster(cells, primaryColumn, item) {
  if (!primaryColumn) {
    console.log('Warning: No primary column specified')
    return false
  }
  let colId = primaryColumn.id
  let rowId = item.id

  let index = cells.findIndex(
    (cell) =>
      cell.selected === true &&
      cell.column_id === colId &&
      cell.row_id === rowId
  )

  return index !== -1
}

export default {
  isMergable: isMergable,
  buildGridRow: buildGridRow,
  buildFinalData: buildFinalData,
  cellLocked: cellLocked,
  getColumnId: getColumnId,
  buildColumnChanges: buildColumnChanges,
  isMaster
}
