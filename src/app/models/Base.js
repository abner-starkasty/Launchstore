const db = require('../../config/db');

function findBase(filters, table) {
  let query = `SELECT * FROM ${table}`;

  if (filters) {
    Object.keys(filters).map((key) => {
      //WHERE | OR | AND
      query += ` ${key}`;

      Object.keys(filters[key]).map((field) => {
        query += ` ${field} = '${filters[key][field]}'`;
      });
    });
  }

  return db.query(query);
}

const Base = {
  init({ table }) {
    if (!table) throw new Error('Invalid Params!');

    this.table = table;
    return this;
  },
  async findById(id) {
    try {
      const results = await findBase({ where: { id } }, this.table);
      return results.rows[0];
    } catch (error) {
      console.error(error);
    }
  },
  async findOne(filters) {
    try {
      const results = await findBase(filters, this.table);
      return results.rows[0];
    } catch (error) {
      console.error(error);
    }
  },
  async findAll(filters) {
    try {
      const results = await findBase(filters, this.table);
      return results.rows;
    } catch (error) {
      console.error(error);
    }
  },
  async findOneWithDeleted(filters) {
    try {
      const results = await findBase(filters, `${this.table}_with_deleted`)
      return results.rows[0]
    } catch (error) {
      console.error(error)
    }
  },
  async create(fields) {
    try {
      let keys = [],
        values = [];

      Object.keys(fields).map((key) => {
        keys.push(key);
        values.push(`'${fields[key]}'`);
      });

      const query = `
        INSERT INTO ${this.table} 
        (${keys.join(',')})
        VALUES (${values.join(',')})
        RETURNING id
      `;

      const results = await db.query(query);
      return results.rows[0].id;
    } catch (error) {
      console.error(error);
    }
  },
  update(id, fields) {
    try {
      let update = [];

      Object.keys(fields).map((key) => {
        //example model => category_id='id da categoria',
        const line = `${key} = '${fields[key]}'`;
        update.push(line);
      });

      let query = `
        UPDATE ${this.table} SET
        ${update.join(',')}
        WHERE id = ${id}
      `;

      return db.query(query);
    } catch (error) {
      console.error(error);
    }
  },
  delete(id) {
    try {
      return db.query(`DELETE FROM ${this.table} WHERE id = $1`, [id]);
    } catch (error) {
      console.error(error);
    }
  },
};

module.exports = Base;
