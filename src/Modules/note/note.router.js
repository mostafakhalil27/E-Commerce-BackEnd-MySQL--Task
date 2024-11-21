import Router from 'express';
const router = Router();

import { 
    addNote, 
    deleteNote,
    updateNote,
    getAllNotes,
    getNotes 
} from './controller/note.controller.js';

router.post('/addNote', addNote);
router.delete('/deleteNote/:id', deleteNote);
router.patch('/updateNote/:id', updateNote);
router.get('/getAllNotes', getAllNotes);
router.get('/getNotes', getNotes);

export default router;