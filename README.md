# Frontend - Sistema de Biblioteca

Aplicación web desarrollada en **React** que consume la API REST de gestión de biblioteca. Permite administrar usuarios, libros, ejemplares y préstamos desde una interfaz web.

## Tecnologías

- React 18
- Vite
- Axios
- JavaScript
- Nginx (para el despliegue con Docker)

## Requisitos previos

Para ejecutar con Docker (recomendado):

- Docker

Para ejecutar en modo desarrollo:

- Node.js 18 o superior

> **Importante:** el backend debe estar corriendo para que la aplicación muestre datos. Por defecto se espera en `http://localhost:8080`.

## Ejecución con Docker (recomendado)

1. Clonar el repositorio:

```bash
   git clone https://github.com/Alejo-sz-dev/Biblioteca-frontend.git
   cd Biblioteca-frontend
```

2. Construir la imagen:

```bash
   docker build -t biblioteca-frontend .
```

3. Ejecutar el contenedor:

```bash
   docker run -d -p 3000:80 --name biblioteca-frontend biblioteca-frontend
```

4. Abrir la aplicación en el navegador:

```
   http://localhost:3000
```

Para detener y eliminar el contenedor:

```bash
docker rm -f biblioteca-frontend
```

## Ejecución en modo desarrollo

1. Clonar el repositorio:

```bash
   git clone https://github.com/Alejo-sz-dev/Biblioteca-frontend.git
   cd Biblioteca-frontend
```

2. Instalar las dependencias:

```bash
   npm install
```

3. (Opcional) Configurar la URL de la API:

```bash
   cp .env.example .env
```

   Ajusta `VITE_API_URL` en el archivo `.env` si el backend corre en otra dirección.

4. Iniciar la aplicación:

```bash
   npm run dev
```

5. Abrir `http://localhost:5173` en el navegador.

## Variables de entorno

| Variable     | Descripción                | Valor por defecto           |
|--------------|----------------------------|-----------------------------|
| VITE_API_URL | URL base de la API backend | `http://localhost:8080/api` |

## Funcionalidades

- **Gestión de usuarios:** crear, listar, editar y eliminar.
- **Gestión de libros:** crear, listar, editar y eliminar.
- **Gestión de ejemplares:** crear, listar, eliminar y consultar ejemplares disponibles por ISBN.
- **Gestión de préstamos:** registrar préstamos, listar por usuario y por libro.

## Notas

- La aplicación se comunica con el backend mediante Axios.
- El backend debe tener habilitado el origen del frontend en su configuración de CORS (`http://localhost:3000` para Docker o `http://localhost:5173` en desarrollo).