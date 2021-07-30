import axios, { AxiosRequestConfig } from 'axios'
import * as https from 'https'
import { IPartner } from '../interfaces/PartnerInterface'
import { ICompany } from '../interfaces/CompanyInterface'

type Urls = {
    company: string;
    partners: string;
};
type Author = {
    [key: string]: string
}

export class BrasilIoService {

    private basesUrl: string;
    private urls: Urls;
    private author: Author;

    constructor(){
        this.basesUrl = 'http://api.brasil.io/v1/dataset/socios-brasil/'
        this.urls = {
            company: 'empresas/data/',
            partners: 'socios/data/'
        }
        this.author = {'Authorization': 'Token 425e9a6166866bd68b26cdcca00372b3b5fce2f8'}
    }

    public async getCompany (cnpj: String): Promise<ICompany> {
        const { data } = await axios(this.getConfig(cnpj, this.urls.company))
        return data.results[0]
    }

    public async getPartners (cnpj: String): Promise<IPartner[]> {
        const { data } = await axios(this.getConfig(cnpj, this.urls.partners))
        return data.results
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
