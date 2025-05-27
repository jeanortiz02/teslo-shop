

## Descripcion 


## Correr en Dev

1. Clonar repositorio.
2. Crear una copia de ```.env-template```, renombrar a ```.env``` y cambiar las variables de entorno
3. Instalar dependencias ``` npm installl```
4. Levantar la base de datos ``` docker compose up -d ```
5. Hacer las migraciones de Prisma ``` npx prisma migrate dev```
6. Ejecutar el seed ``` npm run seed ```
7. Correr el proyecto ``` npm run dev ```

## Correr en Produccion