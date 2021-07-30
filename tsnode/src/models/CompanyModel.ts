import { Schema, model } from 'mongoose'
import { ICompany } from '../interfaces/CompanyInterface'

const CompanySchema = new Schema({
    cnpj: String,
    razao_social: String,
    uf: String,
    qsa: [{
        cpf_cnpj_socio: String,
        nome_socio: String,
        qualificacao_socio: String,
        tipo_socio: String
    }]
}, {
    timestamps: true  
})

export default model <ICompany> ('Company', CompanySchema)