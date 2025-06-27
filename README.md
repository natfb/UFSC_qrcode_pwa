# Indice
[Rodar front](##rodar-o-server)
[Rodar back](##run-backend)

# Front end
## Instalacao 
npm install -g @vue/cli

vue create feira-ciencias

Vue CLI v5.0.8
? Please pick a preset: Manually select features
? Check the features needed for your project: Babel, PWA, Linter
? Choose a version of Vue.js that you want to start the project with 3.x
? Pick a linter / formatter config: Basic
? Pick additional lint features: Lint on save
? Where do you prefer placing config for Babel, ESLint, etc.? In dedicated config files
? Save this as a preset for future projects? No

## Rodar o server
cd feira-ciencias
Apenas da primeira vez:
npm install

npm run serve 

# Exemplo de requisicao no front 
get projeto com id=project1:
http://localhost:8081/projeto/project1

resposta:
{"_id":"project1","__v":0,"avaliacao":null,"category":"Química/Geografia","description":"Demonstração de uma erupção vulcânica usando bicarbonato de sódio e vinagre, explorando a química da reação ácido-base e a formação de gases. O projeto visa ilustrar princípios geológicos e químicos de forma visual e interativa.","image":"https://placehold.co/400x300/f8f0e3/6b4e39?text=Vulcão+Químico","materials":["Bicarbonato de Sódio","Vinagre","Detergente","Corante Alimentício","Modelo de Vulcão"],"participants":["Sofia Rocha","Tiago Alves"],"title":"Vulcão em Miniatura: Reação Ácido-Base"}

# Backend

## Instalacao
npm init -f

npm install nodemon

add script:
"start": "nodemon src/app.js"

npm install -save cors express body-parser mondogb moongose dotenv

## run backend
em outro terminal
cd backend

Apenas da primeira vez:
npm install

Depois:
npm start

# Seed

6 projetos:

id: project1 ... project6

# ngrok

ngrok http http://localhost:8080 --domain bull-heroic-bull.ngrok-free.app

gerando certificados:
openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout localhost-key.pem -out localhost.pem

add os certificados em vue.config.js

# Para testar no celular

em feira-ciencias:
npm run build

isso gera a pasta dist, copiar a pasta e colar em public do backend

rodar o backend, depois

rodar ngrok:

ngrok http https://localhost:8081 --domain bull-heroic-bull.ngrok-free.app

req do front tem que ser: /projeto/project1