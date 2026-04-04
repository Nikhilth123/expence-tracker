import express from 'express'
import {addtransaction,deletetransaction} from '../controller/transaction'
import { getStats } from '../controller/getstats';
const router=express.Router();
router.post('/addtransaction',addtransaction);
router.delete('/delete/:transactionid',deletetransaction);
router.get('/stats',getStats);
export default router;