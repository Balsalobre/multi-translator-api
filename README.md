# Multi-Translator API

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

### 1. Identifiable-entity schema.
Creamos esta clase abstracta con una propiedad predeterminada [_id], para que todas nuestas entidades tengan por defecto esta identificación del tipo ObjectId, por ejemlo en user.schema.ts.

### 2. Creación del user.schema.ts
Creamos el schema sin versionKey y nombrando a la colección como users.
```ts
  @Schema({ versionKey: false, collection: 'users' })
  export class UserSchema extends IdentifiableEntitySchema {
```

### 3. Creación del modelo de dominio.
Creamos el fichero User.ts como modelo de dominio, en el que pondremos toda la funcionalidad del usuario.
