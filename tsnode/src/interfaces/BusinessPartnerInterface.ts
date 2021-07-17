import { Document } from "mongoose"

export interface IBusinessPartner extends Document{
    cnpj: String,
    cpf_cnpj_socio: String,
    nome_socio: String,
    qualificacao_socio: String,
    razao_social: String,
    tipo_socio: String
}