# Frontend - Sistema de Biblioteca

Aplicación web en React que consume la API REST de gestión de biblioteca. Permite administrar usuarios, libros, ejemplares y préstamos desde una interfaz web.

## Tecnologías

- React 18
- Vite
- Axios
- JavaScript

## Requisitos previos

- Node.js 18 o superior, o Docker.
- El backend debe estar corriendo (por defecto en `http://localhost:8080`).

## Cómo ejecutar en desarrollo

1. Clonar el repositorio:
git clone <URL-DEL-REPOSITORIO>
cd biblioteca-frontend

2. Instalar dependencias:
npm install

3. Configurar la URL de la API (opcional):
cp .env.example .env
   Ajusta `VITE_API_URL` si tu backend corre en otra dirección.

4. Iniciar la aplicación:
npm run dev

5. Abrir `http://localhost:5173` en el navegador.

## Variables de entorno

| Variable      | Descripción                    | Valor por defecto            |
|---------------|--------------------------------|------------------------------|
| VITE_API_URL  | URL base de la API backend     | http://localhost:8080/api    |

## Funcionalidades

- Gestión de usuarios (crear, listar, editar, eliminar)
- Gestión de libros
- Gestión de ejemplares
- Gestión de préstamos