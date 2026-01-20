# 🩺 Health DogTag

**Health DogTag** é um projeto de **identificação médica digital** voltado para **situações de emergência**, onde informações essenciais de saúde precisam estar acessíveis de forma **rápida**, **simples** e **com privacidade**.

Os dados são **criptografados no front-end** e só podem ser visualizados por quem possui a chave correta — normalmente associada a uma **Dog Tag física com QR Code**.

---

## 🎯 Objetivo

Disponibilizar informações médicas e pessoais importantes de forma que sejam:

- 🌍 Hospedadas na internet
- 🔐 Protegidas por criptografia
- 🚑 Acessíveis em emergências
- 📱 Compatíveis com qualquer smartphone moderno

Tudo isso **sem backend**, **sem banco de dados** e **sem coleta de informações**.

---

## 🧠 Como funciona

1. O usuário define seus dados médicos e pessoais
2. Os dados são **criptografados diretamente no navegador**
3. O site é hospedado como **site estático**
4. Um QR Code é gerado apontando para um link como:

https://site.com/tag#CHAVE_SECRETA

5. Ao acessar o link:
- O navegador lê a chave via `window.location.hash`
- Deriva a chave criptográfica
- Tenta descriptografar os dados
- ❌ Se falhar: exibe apenas um campo de senha
- ✅ Se tiver sucesso: exibe o cartão de saúde

👉 **A chave nunca é enviada ao servidor.**

---

## 🔐 Segurança & Privacidade

- 🔒 Criptografia **AES-GCM (256 bits)**
- 🔑 Derivação de chave com **PBKDF2**
- 🧂 Uso de *salt* e iterações configuráveis
- 🚫 Nenhuma senha armazenada
- 🚫 Nenhum dado sensível em texto puro
- 🚫 Nenhum backend, API ou banco de dados

⚠️ **Aviso importante**  
Este projeto **não substitui sistemas médicos oficiais**.  
Foi projetado para **uso emergencial**, priorizando praticidade e privacidade — não sigilo militar.

---

## 🏗️ Estrutura do projeto

/
├─ index.html
└─ assets/
├─ health.css
└─ crypto.js


- `index.html` → Interface principal (Health Card)
- `health.css` → Estilo visual minimalista em formato de cartão médico
- `crypto.js` → Criptografia e descriptografia usando Web Crypto API

---

## 🧪 Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript moderno
- Web Crypto API (`crypto.subtle`)
- AES-GCM
- PBKDF2

---

## 📱 Compatibilidade

- ✅ Google Chrome
- ✅ Microsoft Edge
- ✅ Mozilla Firefox
- ✅ Safari (iOS 15+)
- ❌ Navegadores antigos sem suporte à Web Crypto API

---

## 🚀 Deploy

O projeto pode ser hospedado em qualquer serviço de **site estático**, como:

- GitHub Pages
- Cloudflare Pages
- Netlify
- Vercel

🔐 **HTTPS é obrigatório**, pois a Web Crypto API exige contexto seguro.

---

## 🏷️ Casos de uso

- Dog Tag médica (metal ou silicone)
- Pulseira de identificação
- Cartão de emergência
- Chaveiro ou mochila

Indicado para:
- Primeiros socorros
- Acidentes
- Situações em que o usuário esteja inconsciente

---

## 📜 Licença

Este projeto é open-source e pode ser usado, modificado e adaptado para fins **pessoais ou educacionais**.

Uso comercial deve respeitar as leis locais de proteção de dados e privacidade.

---

## ❤️ Filosofia do projeto

> **A informação certa, no momento certo,  
> sem abrir mão da privacidade.**
