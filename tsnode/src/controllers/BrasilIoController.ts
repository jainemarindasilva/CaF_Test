import axios, { AxiosRequestConfig } from 'axios'
import * as https from 'https'
import { ICompany } from '../interfaces/CompanyInterface'
import Company from '../schemas/Company'
import { IBusinessPartner } from './../interfaces/BusinessPartnerInterface';
import BusinessPartner from '../schemas/BusinessPartner'

type Urls = {
    company: string;
    businessPartner: string;
};

export class BrasilIoController {

    private basesUrl: string;
    private urls: Urls;
    private author: {};

    constructor(){
        this.basesUrl = 'http://api.brasil.io/v1/dataset/socios-brasil/'
        this.urls = {
            company: 'empresas/data/',
            businessPartner: 'socios/data/'
        }
        this.author = {'Authorization': 'Token 425e9a6166866bd68b26cdcca00372b3b5fce2f8'}
    }

    public async getCompany (cnpj: String): Promise<ICompany> {
        const { data } = await axios(this.getConfig(cnpj, this.urls.company))
        let company: ICompany = new Company(data.results[0])
        return company
    }

    public async getBusinessPartners (cnpj: String): Promise<IBusinessPartner[]> {
        const { data } = await axios(this.getConfig(cnpj, this.urls.businessPartner))
        let businessPartners: IBusinessPartner[] = (data.results)
        return businessPartners
    }

    private getConfig (cnpj: String, urlType: String): AxiosRequestConfig {
        return {
            method: 'get',
            url: this.basesUrl + urlType, 
            headers: this.author,
            params: { cnpj: cnpj },
            httpsAgent: new https.Agent({ rejectUnauthorized: false })
        }    
    }
}
