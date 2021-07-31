import {Request, Response} from 'express'
import { BrasilIoController } from './BrasilIoController'
import { ICompany } from '../interfaces/CompanyInterface'
import CompanyService from '../services/CompanyService'

class CompanyController {  

    public async getCompany (req:Request, res:Response): Promise<Response> {
        const cnpj: String = req.query.cnpj.toString()
        const consulta: String = req.query.consulta.toString()
        const brasilIoController = new BrasilIoController()
        let statusCode: number = 200
        let company:ICompany

        try {
            if (!consulta) 
                return res.status(404).send('Tipo de consulta não informada.')
            if (!cnpj) 
                return res.status(404).send('CNPJ não informado.')

            if (consulta == 'cacheado') {

                company = await CompanyService.find(cnpj)   

                if (!company) {                    
                    company = await brasilIoController.getCompany(cnpj)                
                    statusCode = await CompanyService.create(company)
                }    
            }
            else if (consulta == 'tempo_real') {

                company = await brasilIoController.getCompany(cnpj)

                if (await CompanyService.exists(cnpj)) 
                    statusCode = await CompanyService.update(cnpj,company)
                else 
                    statusCode = await CompanyService.create(company)
            }
            else return res.status(400).send('Tipo de consulta inválido.')

            return res.status(statusCode).send(company.toJSON()) 
        } 
        catch (error) {
            return res.status(400).send({ error: error.message })
        }  
    }
}

export default new CompanyController()