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
## Utilizando el patrón CQRS en Nestjs
Patron para aplicaciones con gran carga de rendimiento, desacopla la lógica por acciones.

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

Todas las propiedades de nuestro dominio son privadas y solo el objeto usuario puede acceder a ellas, a diferecia del objeto de transferencia a bbdd "schema" que si se puede mutar y con ello se dificultaría el seguimiento de errores.

### 4. camper-schema.factory.ts
Clase que implementa la interfaz "EntitySchemaFactory", la cual especifica dos métodos:
  1. create --> crea un schema de una entidad
  2. createFromSchema --> crea una entidad a partir de un schema