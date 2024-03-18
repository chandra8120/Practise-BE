import multer from 'multer';
import path from 'path';
import Image from './imageModel.js';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  }
});

// Initialize multer upload
const upload = multer({ storage: storage }).array('images');

const imageController = {
  // Controller function for uploading multiple images
  uploadImages: (req, res) => {
    upload(req, res, (err) => {
      if (err) {
        return res.status(400).json({ message: 'Error uploading images', error: err });
      }
      // If files are uploaded successfully, save information to database
      const files = req.files.map(file => ({
        filename: file.filename,
        path: file.path,
        mimetype: file.mimetype,
        size: file.size
      }));

      Image.insertMany(files, (err, images) => {
        if (err) {
          return res.status(400).json({ message: 'Error saving images to database', error: err });
        }
        res.status(200).json({ message: 'Images uploaded successfully', images });
      });
    });
  }
};

export default imageController;
