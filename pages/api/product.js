import multer from 'multer';
import mysql from 'mysql';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const connection = mysql.createConnection({
  host: 'bhlx1weti3atwzs7kao8-mysql.services.clever-cloud.com',
  user: 'u7asgz1ebatrg0fe',
  password: 'g2aI7ysAKenSqxUbrv1w',
  database: 'bhlx1weti3atwzs7kao8'
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