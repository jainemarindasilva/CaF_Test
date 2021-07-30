import { Router } from 'express'
import CompanyController from '../controllers/CompanyController'

const routes = Router()

routes.get('/companies', CompanyController.getCompany)

export default routes