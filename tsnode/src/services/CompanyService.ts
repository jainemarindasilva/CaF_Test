import { ICompany } from '../interfaces/CompanyInterface'
import Company from '../models/CompanyModel'

class CompanyService {

    public async create (company: ICompany): Promise<number> {
        const res = await company.save()
                                 .then(() => {
                                     return 200
                                 })
                                 .catch((error) => {
                                     return 500
                                 });
        return res
    }

    public async update (cnpj: String, company: ICompany): Promise<number> {
        const res = await Company.findOneAndUpdate({cnpj: cnpj}, {$set: company})
                                 .then(() => {
                                     return 200
                                 })
                                 .catch((error) => {
                                     return 500
                                 });
        return res
    }

    public async find (cnpj: String): Promise<ICompany> {
        let company: ICompany

        await Company.findOne({'cnpj': cnpj})
        .exec()
        .then(async (result) => {
            if ( result ) {
                company = new Company(result)
            }
        })
        .catch((error) => {
            return undefined
        });
        return company
    }

    public async exists (cnpj: String): Promise<Boolean> {
        return await Company.exists({cnpj: cnpj})
    }
} 

export default new CompanyService()