import Router from 'express';
import { 
  signUp, 
  signIn,
  updateUser,
  deleteUser, 
  searchWithName,
  searchInAgeRange,
  oldestThreeUser,
  searchByIdUsingIn,
  getALlUsers,
    } from './controller/user.controller.js';

const router = Router();


router.post('/signUp', signUp);
router.post('/signIn', signIn);
router.patch('/updateUser/:id', updateUser);
router.delete('/deleteUser/:id', deleteUser);
router.get('/searchWithName', searchWithName);
router.get('/searchInAgeRange', searchInAgeRange);
router.get('/oldestThreeUser', oldestThreeUser);
router.get('/searchByIdUsingIn', searchByIdUsingIn);
router.get('/getALlUsers', getALlUsers);

export default router;