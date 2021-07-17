import { Router } from 'express'
import CompanyController from './controllers/CompanyController'

const routes = Router()

routes.get('/companies', CompanyController.getCompany)
routes.get('/businessPartner', CompanyController.findBusinessPartner)
routes.post('/companies', CompanyController.createCompany)
routes.post('/businessPartner', CompanyController.createBusinessPartner)

export default routes