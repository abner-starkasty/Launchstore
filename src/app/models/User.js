const Base = require('./Base')

Base.init({ table: 'users' })

module.exports = {
  ...Base,
};

/* async create(data) {
  try {
    const query = `
      INSERT INTO users (
        name,
        email,
        password,
        cpf_cnpj,
        cep,
        address
      ) VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id
    `;

    const passwordHash = await hash(data.password, 8);

    const values = [
      data.name,
      data.email,
      passwordHash,
      data.cpf_cnpj.replace(/\D/g, ''),
      data.cep.replace(/\D/g, ''),
      data.address,
    ];

    const results = await db.query(query, values);

    return results.rows[0].id;
  } catch (error) {
    console.error(error);
  }
},
async update(id, fields) {
  try {
    let query = `UPDATE users SET`;

    Object.keys(fields).map((key, index, array) => {
      if (index + 1 < array.length) {
        query = `${query}
          ${key} = '${fields[key]}',
        `;
      } else {
        query = `${query}
          ${key} = '${fields[key]}'
          WHERE id = ${id}
        `;
      }
    });

    await db.query(query);
    return;

  } catch (error) {
    console.error(error)
  }
},
async delete(id) {
  try {
    let results = await db.query('SELECT * FROM products WHERE user_id = $1',[id]);

    const products = results.rows;

    const allFilesPromise = products.map((product) =>
      Product.files(product.id)
    );

    let promiseResults = await Promise.all(allFilesPromise);

    await db.query(`DELETE FROM users WHERE id = $1`, [id]);

    promiseResults.map((results) => {
      results.rows.map((file) => {
        try {
          fs.unlinkSync(file.path)
          
        } catch (error) {
          console.error(error)
        }
      });
    });

  } catch (error) {
    console.error(error);
  }
}, */
