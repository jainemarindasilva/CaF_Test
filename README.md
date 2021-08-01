# API para consulta de dados de empresas brasileiras
Projeto de desenvolvimento de teste para a empresa Combate a Fraude.

## 💻 Sobre o projeto
Construir uma aplicação cliente e servidor que retorna para o usuário os dados do Cartão CNPJ de uma empresa. Os dados das empresas deverão estar cacheados em uma base de dados local ou então devem ser buscados no serviço da Brasil.io.

## ⚙️ Funcionalidades
O usuário informará no input da rota da API o CNPJ e tipo de consulta que deseja realizar: cacheado, que prima pelo tempo de resposta, pois deverá consultar primeiro na base de dados local e, caso não exista o registro, buscará
no serviço Brasil.io; e tempo_real, que tem como princípio buscar os dados atualizados diretamente no serviço Brasil.io, ainda que o tempo de resposta seja superior.

Portanto, a aplicação segue o seguinte fluxo:

![image](https://user-images.githubusercontent.com/52661791/127754502-49520401-5c3e-41c3-9f9f-8b7966055210.png)

## 🚀 Como executar

#### 🎲 Pré-requisitos
Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/). 

Além disso, será necessário criar uma conta no site [Brasil.io](https://brasil.io/auth/entrar/) para obter um chave de API(token). Para mais informações, acesse [aqui](https://blog.brasil.io/2020/10/31/nossa-api-sera-obrigatoriamente-autenticada/).

#### 🎲 Rodando o projeto
```bash
# Clone este repositório
$ git clone jainemarindasilva/CaF_Test

# Editar o arquivo 'config.ts' disponível na pasta 'src/env' mudando as seguintes variáveis:
'brasilIoToken' = seu token de acesso ao serviço BrasilIo
'dbUri' = sua string de conexão com o banco de dados NOSQ

# Acesse a pasta do projeto no terminal/cmd
$ cd tsnode

# Instale as dependências
$ npm install

# Execute a aplicação em modo de desenvolvimento
$ npm run dev

# O servidor inciará na porta:3333 - acesse http://localhost:3333 
Para fazer uma consulta informe o cnpj da empresa que se deseja consultar juntamente com o tipo de consulta (cacheado ou tempo_real) no endpoint /companies.
# Ex.: http://localhost:3333/companies?cnpj=055498000162&consulta=cacheado
```
[![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=&uri=https%3A%2F%2Fraw.githubusercontent.com%2Fjainemarindasilva%2FCaF_Test%2Fmain%2FInsomniaCaf.json%3Ftoken%3DAMRY4HY44OJSV5R5JSD3QMTBA2SG6)


#### 🎲 Retorno
O microsserviço irá retornar um status code de 200 com o formato em JSON, como no exemplo:
```bash
{
  "cnpj": "34102645000238",
  "razao_social": "COMBATEAFRAUDE TECNOLOGIA DA INFORMACAO LTDA",
  "uf": "RS",
  "qsa": [
    {
      "cpf_cnpj_socio": "***973977**",
      "nome_socio": "LEONARDO ALVES REBITTE",
      "qualificacao_socio": "Sócio-Administrador",
      "tipo_socio": "Pessoa Física"
    },
    {
    "cpf_cnpj_socio": "***977700**",
    "nome_socio": "RAFAEL RODRIGUES VIANA",
    "qualificacao_socio": "Sócio-Administrador",
    "tipo_socio": "Pessoa Física"
    }
  ]
}
```

## 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

#### [](https://github.com/tgmarinho/Ecoleta#server-nodejs--typescript)**Server**  ([NodeJS](https://nodejs.org/en/)  +  [TypeScript](https://www.typescriptlang.org/))

-   **[Express](https://expressjs.com/)**
-   **[ts-node](https://github.com/TypeStrong/ts-node)**
-   **[Axios](https://github.com/axios/axios)**
-   **[mongoDb](https://www.mongodb.com/pt-br)**

#### [](https://github.com/tgmarinho/Ecoleta#utilit%C3%A1rios)**Utilitários**
-   API:  **[BRASILIO API](https://brasil.io/home/)** 
-   Editor:  **[Visual Studio Code](https://code.visualstudio.com/)**
-   Commit Conventional:  **[Commitlint](https://github.com/conventional-changelog/commitlint)**
-   Teste de API:  **[Insomnia](https://insomnia.rest/)**
