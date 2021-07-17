import { IBusinessPartner } from './../interfaces/BusinessPartnerInterface';
import BusinessPartner from '../schemas/BusinessPartner'

class BusinessPartnerService {

    public create (businessPartner: IBusinessPartner): void {
        BusinessPartner.create(
        [{
            cnpj: businessPartner.cnpj,
            cpf_cnpj_socio: businessPartner.cpf_cnpj_socio,
            nome_socio: businessPartner.nome_socio,
            qualificacao_socio: businessPartner.qualificacao_socio,
            razao_social: businessPartner.razao_social,
            tipo_socio: businessPartner.tipo_socio
        }])
    }

    public async find (cnpj: String): Promise<IBusinessPartner[]> {
        let businessPartners: IBusinessPartner[] = []
        
        const res = await BusinessPartner.find({'cnpj': cnpj})

        res.forEach( businessPartner => {
            businessPartners.push(businessPartner)
        })
        return businessPartners
    }
}

export default new BusinessPartnerService()