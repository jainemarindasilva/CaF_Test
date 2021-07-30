import { Response } from 'express';
import { ICompany } from '../interfaces/CompanyInterface'
import Company from '../models/CompanyModel'

class CompanyService {

    public findAndUpdate (cnpjPar: String, company: ICompany): void {
        const query = { cnpj: cnpjPar }
        const update = { $set: company }
        const options = { upsert: true, useFindAndModify: false }
        Company.findOneAndUpdate(query, update, options)
    }

    public async find (cnpj: String): Promise<ICompany> {
        let company: ICompany = new Company(await Company.findOne({'cnpj': cnpj}))
        return company
    }
} 

export default new CompanyService()