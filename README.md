# Atrato Analytics Dashboard

Bienvenido al atrato analytics dashboard, el lugar en donde los analistas podrán tener control de toda la data de los usuarios.

Esta aplicación fullstack fue creada con las siguientes tecnologías.

## Tech Stack

**Client**: Nx, Next.js, React, TypeScript, TailwindCSS, Apollo Client.

**Server**: Node, Express, Postgres, TypeScript, Graphql, Apollo, TypeOrm, TypeGraphql.

## Instruciones

### Server

Ok ya estamos en la parte interesante, sigues estos pasos para iniciar el server en tu local. 💯😃

## Instalación

Abre tu terminal favorita y dirígete a la carpeta de server, vamos a instalar las dependencias.

```bash
  cd server
  yarn install 
```

## Env variables

Antes de hacer un build o un start, necesitaremos crear un archivo `.env`, para referencia puedes acceder al `.env.example`, localizado en el root de server.

Este es un ejemplo del archivo final, te recomiendo que en la parte de `CORS_ORIGIN` lo especifiques como esta en el ejemplo:

```bash
DATABASE_URL=postgresql://<username>@localhost:5432/<databasename>
REDIS_URL=127.0.0.1:6379 # Esta database se usa para cache
CORS_ORIGIN=http://localhost:4200 
SESSION_SECRET=supersecretpasswordude
PORT=8000
```

Ya con este archivo, ahora tenemos que generar los `type declarations`, para esto, dirigite a la root de tu server en tu terminal favorita y ejecuta lo siguiente.

```bash
yarn gen-env
```

Ya con eso tendremos nuestros types para las variables de entorno.

## Build

Bien! 👍🏻 ahora tenemos que hacer el build del server, para esto, abre tu terminal terminal de preferencia y dirígete al folder de server, ahí tenemos dos scripts de ayuda.

Build sencillo:

```bash
  cd server
  yarn tsc  
```

Build que se actualiza

```bash
  cd server
  yarn tsc -w
```

Cualquiera de estos dos archivos va a generar una carpeta llamada `dist` en la cual se encontrará nuestro código de typescript convertido al maravilloso JavaScript.

## Start

🎉 Wohoo ya se llego lo bueno. Ahora para iniciar el proyecto, solo abre el root del server en tu terminal favorita y ejecuta lo siguiente.

```bash
yarn dev 
```

Y boom 💥 empezará a crear las tablas en tu base de datos, e iniciará el server en el puerto `8000` o el de tu variable de entorno.

Ahora solo dirígete a: <http://localhost:8000/graphql> para hacer magia 🪄

### Client

Ok ahora que tenemos lo que está detrás, llego el momento de iniciar el cliente.

## Instalación client

Abre tu terminal favorita y dirígete a la carpeta de client, vamos a instalar las dependencias.

```bash
  cd client
  yarn install 
```

Este script instalara TODAS las dependencias que necesita el proyecto.

## Client build

Ahora si llego una parte muy importante, el proyecto usa [NX](https://nx.dev/), una increible herramienta que funciona como un build system, te recomiendo que instales su CLI con `yarn add -g nx` o con npm `npm install -g nx`.

Si no requieres la CLI, no hay problema solo ejecuta lo siguiente en la carpeta de `client`.

```bash
 cd client
 npx nx run build
```

Este script realizara el build del cliente, que si te cuento un secreto... (No es necesario) jeje.

## Client start

Cool cool cool... ahora vamos a iniciar el cliente, ya con nuestro backend corriendo, para inciar el cliente, solo necesitaremos ejecutar este sencillo `script`, en tu terminal favoria y en la carpeta del cliente.

```bash
 cd client
 npx nx run web:serve
```

Este `script` iniciara el cliente en el puerto `4200`, o si tienes un puerto distinto en un `.env`, lo iniciara en el de tu `.env`. ahora si vayamos a la demo.

### Demo

Ok aqui podras ver un video de todo el proyecto corriendo y funcionando a la perfeccion.

Tenemos algunso features destacables tales como: dark mode, responsive design, minimalist design y más.

Con este enlace podras descargar el video de manera segura, no prob :).

[Descarga video demo](https://res.cloudinary.com/bluecatencode/video/upload/v1657592432/Screen_Recording_2022-07-11_at_21.12.34_khdr9z.mov)
