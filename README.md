# Aplicativo Negocia aí!

Aplicativo de e-commerce onde cria-se uma rede para troca e venda de equipamentos eletrônicos.

## Entrega

Aplicativo Android e iOS (desenvolvimento híbrido).

## Pré-requisitos para lançamento

- Será necessário adquirir uma conta nas lojas da Google e Apple.
    - Google possui um custo de $25 dólares uma única vez;
    - Apple possui um custo anual de $99 dólares;

## Estimativa para entrega

Além da entrega do aplicativo, podemos entregar também um protótipo fiel que será validado antes da implementação para uma melhor assertividade na entrega do projeto. Essa entrega pode ser opcional. Nesse caso, temos 2 estimativas em dias:

- Protótipo: 1 semana (opcional - 7 dias)
- Aplicativo: 7 semanas (49 dias)

Detalhamento em horas das atividades podem ser encontradas na [planilha neste link](https://docs.google.com/spreadsheets/d/1UHzNdzQnAFBsDn6zCC8qtpnHAmrYWYRwOTbztV0N8co/edit?usp=sharing).

## Informações para teste

Usuário e senha para teste:
- Login: **pcsantana**
- Senha: **vibbra2022**

Projeto/demonstração:
- [Link para baixar .apk](https://drive.google.com/file/d/1EIdpUjh5gAZNxzcDnufhpzYg2ZE3iOOU/view?usp=sharing) e instalar aplicativo Android direto no celular;
- [Link do vídeo](https://www.youtube.com/watch?v=9ftz9zQ9mEE) demonstrando aplicativo versão iOS, em um simulador;

## Para desenvolvedores

### Principais tecnologias utilizadas

- Ionic 6
- Cordova 11
- Angular 12
- Typescript
- HTML/CSS
- Android Studio Arctic Fox
- Xcode 13.2

### Rodando projeto

Configurando ambiente de desenvolvimento.

```
npm install -g cordova ionic
```

Execute o comando para instalar todos os módulos e dependências salvas no package.json:
```
npm install
```

Para rodar o projeto e subir localmente (no navegador), basta executar sempre o comando:
```
ionic serve
```
Irá subir no localhost na porta padrão 8100.

### Gerando projeto nativo Android

Segue os comandos básicos necessários para trabalhar com o CLI do Ionic para projetos nativos mobile:

Para criar o projeto Android:
```
ionic cordova platform add android
```
Será criado o projeto Android dentro da pasta `platforms`, pasta `android`.

Para apenas aplicar alterações do código no projeto nativo Android:
```
ionic cordova prepare android
```

Para fazer build do projeto Android, pode ser feito direto via Android Studio ou então através do comando:
```
ionic cordova build android
```

Para rodar o projeto, recomendo fazer direto pela IDE através do Android Studio.

Para gerar versão de produção, utilizar no build (ou prepare) `--prod`, por exemplo:

```
ionic cordova prepare android --prod
```

## Gerando projeto nativo iOS

Para iOS, podem ser utilizado os mesmos comandos do android, substituindo apenas a palavra `android` por `ios`.

### Status dos requisitos

**Login:**
- [x] Login
- [ ] SSO

**Tela inicial:**
- [x] Menu
- [x] Lista de ofertas por geolocalização

**Criar negociação:**
- [x] Criar negociação
- [x] Editar negociação

**Visualizar negociação:**
- [x] Visualizar detalhes da negociação
- [x] Editar negociação
- [x] Consultar valor do frete
- [ ] Ver e responder as mensagens enviadas
- [ ] Ver e aprovar as ofertas realizadas na negociação
- [ ] Enviar uma mensagem para o dono da negociação
- [ ] Enviar uma mensagem para o dono da negociação
- [ ] Ver as mensagens enviadas pelo dono da negociação
- [x] Enviar uma oferta para o dono da negociação
- [ ] Acompanhar o status da sua oferta
- [ ] Acompanhar o status da entrega do produto

**Minhas negociações:**
- [x] Listar negociações que foram criadas pelo usuário
- [x] Listar negociações onde o usuário realizou uma oferta ou enviou uma mensagem

**Convites:**
- [ ] Visualizar a sua lista de convites enviados, acompanhando o status de cada convite
- [ ] Criar um novo convite informando os dados do convidado

## Direitos autorais

- As imagens utilizadas durante os testes para simulação podem conter direitos autorais, e foram usadas exclusivamente para simulação.
- Ícone do app (login) foi criado por <a href="https://www.flaticon.com/free-icons/deal" title="deal icons">Freepik - Flaticon</a>


