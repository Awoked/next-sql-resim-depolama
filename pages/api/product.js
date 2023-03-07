import multer from 'multer';
import mysql from 'mysql';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const connection = mysql.createConnection({
  host: 'b0racqanolrqgpriliu4-mysql.services.clever-cloud.com',
  user: 'us76jcsubc1iegua',
  password: 'n6pB9ImtDnbITJu0nz2o',
  database: 'b0racqanolrqgpriliu4'
});

export const config = {
  api: {
    bodyParser: false
  }
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    upload.single('image')(req, res, function (err) {
      if (err) {
        console.log(err);
        return res.status(400).send('Error uploading file.');
      }
      const image = req.file.buffer;
      const sql = 'INSERT INTO images (image) VALUES (?)';
      connection.query(sql, [image], function (err, result) {
        if (err) {
          console.log(err);
          return res.status(400).send('Error saving to database.');
        }
        return res.status(200).send('File uploaded.');
      });
    });
  } else {
    return res.status(405).send('Method not allowed.');
  }
}