import * as Yup from 'yup'

const campoObrigatorioMensagem = "Campo Obrigatorio"

export const validationScheme = Yup.object().shape({
    cpf: Yup.string().trim()
    .required(campoObrigatorioMensagem)
    .length(14,"CPF, Invalido!") ,
    dataNascimento: Yup.string().trim()
    .required(campoObrigatorioMensagem)
    .length(10, "Data Invalida"),  
    email: Yup.string().trim()
    .required(campoObrigatorioMensagem)
    .email("Email Invalido"),
    endereco: Yup.string().trim()
    .required(campoObrigatorioMensagem),
    nome: Yup.string().trim()
    .required(campoObrigatorioMensagem),
    telefone: Yup.string().trim()
    .required(campoObrigatorioMensagem)
})