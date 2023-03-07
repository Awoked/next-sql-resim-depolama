import mysql from 'mysql';

const connection = mysql.createConnection({
    host: 'bhlx1weti3atwzs7kao8-mysql.services.clever-cloud.com',
    user: 'u7asgz1ebatrg0fe',
    password: 'g2aI7ysAKenSqxUbrv1w',
    database: 'bhlx1weti3atwzs7kao8'
});


export default async function handler(req, res) {
    if (req.method === 'GET') {

        const sql = `SELECT * FROM images WHERE id = ${req.query.id}`;
        connection.query(sql, function (err, result) {
            if (err) {
                console.log(err);
                return res.status(400).send('Error saving to database.');
            }
            return res.status(200).json(result[0]);
        });
    } else {
        return res.status(405).send('Method not allowed.');
    }
}