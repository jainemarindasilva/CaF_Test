import { ICompany } from '../interfaces/CompanyInterface'
import Company from '../schemas/Company'

class CompanyService {

    public create (company: ICompany): void {
        Company.create(
        [{
            cnpj: company.cnpj,
            razao_social: company.razao_social,
            uf: company.uf
        }])
    }

    public async find (cnpj: String): Promise<ICompany> {
        let company: ICompany = new Company(await Company.findOne({'cnpj': cnpj}))
        return company
    }
} 

export default new CompanyService()