import _ from 'lodash'
import { numberOfLabourDays } from './labourDays'

/**
 * formats address from 'sheet1!A1' to 'A1
 * @param {string} addressString
 */
function getAddress(addressString) {
  return addressString.split('!')[1]
}

/**
 *
 * @param {any[]} data
 * @param {any} options
 */
function writeToExcel(
  data,
  { start = { x: 0, y: 0 }, pretty = false, colorizer } = {}
) {
  return new Promise((resolve, reject) => {
    return window.Excel.run(async context => {
      // select worksheet
      const sheet = context.workbook.worksheets.getActiveWorksheet()
      const startCell = sheet.getCell(start.x, start.y)
      const endCell = sheet.getCell(
        start.x + data.length - 1,
        start.y + data[0].length - 1
      )

      // get addresses of cells (e.g. A1)
      startCell.load('address')
      endCell.load('address')
      await context.sync()
      const startAddress = getAddress(startCell.address)
      const endAddress = getAddress(endCell.address)

      // the range for the data
      const range = sheet.getRange(`${startAddress}:${endAddress}`)

      if (pretty) {
        range.format.autofitColumns()
      }

      // write data to excel
      range.values = data

      if (colorizer) {
        for (let x = 0; x < data.length; x++) {
          for (let y = 0; y < data[x].length; y++) {
            const color = colorizer(data[x][y])
            if (color) {
              const cell = sheet.getCell(start.x + x, start.y + y)
              cell.format.font.color = color
            }
          }
        }
      }

      await context.sync()
      resolve()
    }).catch(reject)
  })
}

/**
 * Generates the report and writes it into the excel sheet
 */
export async function generateReport() {
  const marginLeft = 2 // No Of Columns left of 1st Total column
  const marginRight = 1 // No Of Columns on the Right of last Total within jx
  return new Promise((resolve, reject) => {
    window.Excel.run(async context => {
      // working with the ACTIVE sheet
      const sheet = context.workbook.worksheets.getActiveWorksheet()

      // USED Range perfectly detect the dimensions of given Report
      const usedRange = sheet.getUsedRange()

      // make the LITERALS out of the report dimensions available to
      usedRange.load('values')
      await context.sync()

      const actualTotalsRowIndex = usedRange.values.findIndex(
        row => row[0] === 'Totals'
      )
      const actualTotalsRow = usedRange.values[actualTotalsRowIndex]
      const actualTotals = actualTotalsRow.slice(marginLeft, -marginRight)
      const workHoursPerDay = 8
      const workHoursPerMonth = numberOfLabourDays('April') * workHoursPerDay
      const expectedTotals = new Array(actualTotals.length).fill(
        workHoursPerMonth
      )
      const totalsDifferences = _.zip(actualTotals, expectedTotals).map(
        ([actual, expected]) => actual - expected
      )

      await writeToExcel([['Total Expected'], ['Result']], {
        start: {
          x: actualTotalsRowIndex + 2,
          y: 0,
        },
      })
      await writeToExcel([expectedTotals, totalsDifferences], {
        start: {
          x: actualTotalsRowIndex + 2,
          y: marginLeft,
        },
        pretty: true,
        colorizer(value) {
          if (value < 0) {
            return 'red'
          }
        },
      })
      resolve()
    }).catch(reject)
  })
}
