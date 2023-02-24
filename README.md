<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Ejecutrar en desarrollo

1. Clone the repository
2. Execute
```
npm install
```
3. You must  have NestJs CLI Installed
```
npm i -g @nestjs/cli
```
4. Run database
```
docker-compose up -d
```
5. Clonar __.env.template__ file and rename to __.env__

6. fill the environment defined properties in __.env__

7. run app
```
npm run start:dev
```

8. Rebuild Database  with seed
```
http://localhost:3000/api/v2/seed
```
## Stack
* MongoDB
* NestJs
