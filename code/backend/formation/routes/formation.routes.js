import express from 'express';
import multer from 'multer';
import { getFormations, addFormation, getFormateurs } from '../controllers/formation.controller.js';

const router = express.Router();

// Multer configuration for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

router.get('/', getFormations);
router.post('/', upload.fields([{ name: 'video' }, { name: 'image' }]), addFormation);
router.get('/formateurs', getFormateurs);

export default router;
