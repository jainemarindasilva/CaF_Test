import { Schema, model } from 'mongoose'
import { IBusinessPartner } from '../interfaces/BusinessPartnerInterface'

const BusinessPartnerSchema = new Schema({
    cnpj: String,
    cpf_cnpj_socio: String,
    nome_socio: String,
    qualificacao_socio: String,
    razao_social: String,
    tipo_socio: String
}, {
    timestamps: true  
})

export default model <IBusinessPartner> ('BusinessPartner', BusinessPartnerSchema)