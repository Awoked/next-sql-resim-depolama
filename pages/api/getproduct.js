import mysql from 'mysql';

const connection = mysql.createConnection({
    host: 'b0racqanolrqgpriliu4-mysql.services.clever-cloud.com',
    user: 'us76jcsubc1iegua',
    password: 'n6pB9ImtDnbITJu0nz2o',
    database: 'b0racqanolrqgpriliu4'
});


export default async function handler(req, res) {
    if (req.method === 'GET') {

        const sql = 'SELECT * FROM images WHERE id = 4';
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