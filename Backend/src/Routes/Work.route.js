import express from 'express'
import {
    insert,
    getWorkById
} from '../Controllers/Work.controller.js'

const route = express.Router();

route.post('/insert', insert);
route.post('/getWorkById', getWorkById);

export default route;