import axios, { AxiosRequestConfig } from 'axios'
import * as https from 'https'
import { IPartner } from '../interfaces/PartnerInterface'
import { ICompany } from '../interfaces/CompanyInterface'
import config from '../env/config'

export class BrasilIoService {

    public async getCompany (cnpj: String): Promise<ICompany> {
        const { data } = await axios(this.getConfig(cnpj, config.brasilIoCompaniesUrl))
        if (Object.keys(data.results).length == 0)
            throw new Error('CNPJ Inválido');
        return data.results[0]
    }

    public async getPartners (cnpj: String): Promise<IPartner[]> {
        const { data } = await axios(this.getConfig(cnpj, config.brasilIoPartnersUrl))
        if (Object.keys(data.results).length == 0)
            throw new Error('CNPJ Inválido');
        return data.results
    }

    private getConfig (cnpj: String, urlType: String): AxiosRequestConfig {
        return {
            method: 'get',
            url: config.brasilIoBasesUrl + urlType, 
            headers: {'Authorization': config.brasilIoToken},
            params: {cnpj: cnpj},
            httpsAgent: new https.Agent({rejectUnauthorized: false})
        }    
    }
}
