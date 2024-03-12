import { Router } from 'express'
import { ValidationMiddleware } from '../middleware/validation.middleware.js'
import Controller from '../controller/controller.js'
import { STUDENT_SCHEMA } from '../schema/creator.schema.js'

const router = Router()

export default router
    .get('/main', Controller.STUDENT_PAGE)
    .post('/student', ValidationMiddleware(STUDENT_SCHEMA), Controller.CREATE_STUDENT)
    .put('/student/:id', Controller.UPDATE_STUDENT)
    .delete('/student/:id', Controller.DELETE_STUDENT)