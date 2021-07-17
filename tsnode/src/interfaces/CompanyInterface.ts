import { Document } from "mongoose"

export interface ICompany extends Document{
    cnpj: String,
    razao_social: String,
    uf: String
}