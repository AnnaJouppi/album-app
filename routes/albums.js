import express from 'express'
import { isAdmin, ensureAuthenticated } from '../middleware/auth.js';
import {
  getAllAlbums,
  getSingleAlbum,
  createAlbum,
  updateAlbum,
  deleteAlbum
} from '../controllers/albums.js'

const router = express.Router()

// Anyone can list
router.get('/', getAllAlbums);
router.get('/:id', getSingleAlbum)

// needs authentication
router.post('/', isAdmin, createAlbum);
router.put('/:id', ensureAuthenticated, isAdmin, updateAlbum);
router.delete('/:id', ensureAuthenticated, isAdmin, deleteAlbum);

export default router