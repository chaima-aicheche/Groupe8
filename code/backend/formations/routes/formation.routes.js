// backend/routes/formation.routes.js

import express from 'express';
import multer from 'multer';
import { getFormations, addFormation } from '../controllers/formation.controller.js';

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

export default router;
