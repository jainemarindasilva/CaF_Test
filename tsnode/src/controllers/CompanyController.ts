import {Request, Response} from 'express'
import CompanyService from '../services/CompanyService'
import BusinessPartnerService from '../services/BusinessPartnerService'
import { BrasilIoController } from './BrasilIoController'
import { ICompany } from '../interfaces/CompanyInterface'
import { IBusinessPartner } from './../interfaces/BusinessPartnerInterface';

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
        let company:ICompany
        let businessPartners:IBusinessPartner[]
        let businessPartnersData:BusinessPartnerData[] = []
        let newBusinessPartner:BusinessPartnerData

        company = await CompanyService.find(cnpj)

        if (company.cnpj != undefined) {
            businessPartners = await BusinessPartnerService.find(cnpj)

            businessPartners.forEach ( businessPartner => {
                newBusinessPartner = {
                    cpf_cnpj_socio: businessPartner.cpf_cnpj_socio,
                    nome_socio: businessPartner.nome_socio,
                    qualificacao_socio: businessPartner.qualificacao_socio,
                    tipo_socio: businessPartner.tipo_socio
                }
                businessPartnersData.push(newBusinessPartner)
            })
        }
        else {
            const brasilIoController = new BrasilIoController()

            brasilIoController.getCompany(cnpj).then( companyAux => {
                company = companyAux
                CompanyService.create(company)                
            })

            brasilIoController.getBusinessPartners(cnpj).then( businessPartnersAux => {
                businessPartnersAux.forEach( businessPartnerAux => {
                    BusinessPartnerService.create(businessPartnerAux)
                })

                businessPartnersAux.forEach ( businessPartner => {
                    newBusinessPartner = {
                        cpf_cnpj_socio: businessPartner.cpf_cnpj_socio,
                        nome_socio: businessPartner.nome_socio,
                        qualificacao_socio: businessPartner.qualificacao_socio,
                        tipo_socio: businessPartner.tipo_socio
                    }
                    businessPartnersData.push(newBusinessPartner)
                })
            })
        }

        let companyData:CompanyData = {
            cnpj: company.cnpj,
            razao_social: company.razao_social,
            uf: company.uf,
            qsa: businessPartnersData
        }

        res.send(companyData)

        return companyData
    }

    private async findCompany (cnpj: String): Promise<ICompany> {
        const brasilIoController = new BrasilIoController()
        return await brasilIoController.getCompany(cnpj)
    }

    private async findBusinessPartner (cnpj: String): Promise<IBusinessPartner[]> {
        const brasilIoController = new BrasilIoController()
        return await brasilIoController.getBusinessPartners(cnpj)
    }

    public createCompany(company:ICompany) {
        CompanyService.create(company)    
    }
    
    public createBusinessPartner(businessPartners:IBusinessPartner[]) {
        businessPartners.forEach(businessPartner => {
            BusinessPartnerService.create(businessPartner)
        })
    }
}

export default new CompanyController()