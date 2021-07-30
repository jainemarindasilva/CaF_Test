import {Request, Response} from 'express'
import { BrasilIoController } from './BrasilIoController'
import { ICompany } from '../interfaces/CompanyInterface'
import CompanyService from '../services/CompanyService'

interface BusinessPartnerData {
    cpf_cnpj_socio: String,
    nome_socio: String,
    qualificacao_socio: String,
    tipo_socio: String
}
interface CompanyData {
    cnpj: String,
    razao_social: String,
    uf: String,
    qsa:BusinessPartnerData[]
}

class CompanyController {  

    public async getCompany (req:Request, res:Response): Promise<CompanyData> {
        const cnpj: String = req.query.cnpj.toString()
        const consulta: String = req.query.consulta.toString()
        const brasilIoController = new BrasilIoController()
        let company:ICompany

        if (consulta == 'cacheado') {
            company = await CompanyService.find(cnpj) 

            if (company.cnpj == undefined) {
                company = await brasilIoController.getCompany(cnpj)
                CompanyService.findAndUpdate(cnpj,company)
            }            
        }
        else {
            company = await brasilIoController.getCompany(cnpj)
            CompanyService.findAndUpdate(cnpj,company)
        }

        res.send(company)
        return company
    }
}

export default new CompanyController()