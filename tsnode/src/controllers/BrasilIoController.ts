import { BrasilIoService } from '../services/BrasilIoService';
import { ICompany } from '../interfaces/CompanyInterface'
import { IPartner } from '../interfaces/PartnerInterface'
import Company from '../models/CompanyModel'

export class BrasilIoController {

    public async getCompany (cnpj:String): Promise<ICompany>{

        const brasilIoService = new BrasilIoService()
        let company:ICompany  
        let companyResponse: ICompany     
        let partners: IPartner[] = []
        let partnersResponse: IPartner[] = []

        companyResponse = new Company(await brasilIoService.getCompany(cnpj))
        partnersResponse = await brasilIoService.getPartners(cnpj)
        
        partnersResponse.forEach(partner => {
            partners.push({
                cpf_cnpj_socio: partner.cpf_cnpj_socio,
                nome_socio: partner.nome_socio,
                qualificacao_socio: partner.qualificacao_socio,
                tipo_socio: partner.tipo_socio
            })
        })

        company = new Company({
            cnpj: companyResponse.cnpj,
            razao_social: companyResponse.razao_social,
            uf: companyResponse.uf,
            qsa: []
        })
        company.qsa = partners
        
        return company
    }
}
