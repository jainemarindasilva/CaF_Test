import { Schema, model } from 'mongoose'
import { ICompany } from '../interfaces/CompanyInterface'

const CompanySchema = new Schema({
    cnpj: String,
    razao_social: String,
    uf: String
}, {
    timestamps: true  
})

export default model <ICompany> ('Company', CompanySchema)