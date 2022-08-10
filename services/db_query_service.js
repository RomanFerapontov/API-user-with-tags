import db from '../db/index.js'

class DB {
  constructor(database) {
    this.db = database
  }

  async create(tableName, [...columns], [...values]) {
    const valuesForQuery = values
      .map((el, index) => {
        return `$${index + 1}`
      })
      .join(',')

    await this.db.query(`INSERT INTO "${tableName}" (${columns.join(',')}) values (${valuesForQuery})`, values)
  }

  async findByValue([...columns], tableName, field, value) {
    const data = await this.db.query(`SELECT ${columns.join(',')} FROM "${tableName}" where ${field} = $1`, [value])
    return data.rows
  }

  async findAll([...columns], tableName) {
    const data = await this.db.query(`SELECT ${columns.join(',')} FROM "${tableName}" `)
    return data.rows
  }

  async updateByValue([...columns], tableName, [...values], field, value) {
    const columnsToUpdate = columns.map((el, index) => {
      return `${el} = $${index + 1}`
    })

    const lastIndex = `$${parseInt(columnsToUpdate.slice(-1).pop().split(' ').pop().split('')[1]) + 1}`
    const params = values.concat(value)

    // console.log(columnsToUpdate)
    // console.log(params)
    // console.log(lastIndex)

    // // ${columnsToUpdate.join(',')}
    // // await db.query(`Update person set name = $1, surname = $2 where id = $3`, [name, surname]),

    await db.query(`UPDATE "${tableName}" set ${columnsToUpdate.join(',')} where ${field} = ${lastIndex}`, params)
  }
  delete() {}
}

export default new DB(db)

// tableName, [...columns], [...values], field, value
