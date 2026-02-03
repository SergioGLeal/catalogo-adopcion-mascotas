🐾 Huellitas - Plataforma de Adopción de Mascotas
¡Bienvenido a Huellitas! Este es un sistema completo (Full Stack) diseñado para gestionar la adopción de mascotas. Incluye un catálogo para usuarios y un panel administrativo protegido para la gestión de mascotas con subida de imágenes local.

🛠️ Tecnologías utilizadas
Frontend: React (Vite), React Router Dom, Axios, SweetAlert2.

Backend: Node.js, Express, Multer (Gestión de archivos).

Base de Datos: MySQL (MariaDB).

Pruebas: Postman

📥 Instalación
Clonar el repositorio y entraR en la carpeta del proyecto:

git clone https://github.com/SergioGLeal/catalogo-adopcion-mascotas
cd nombre-del-repo

⚙️ Configuración del Proyecto
Sigue estos pasos para ejecutar el proyecto en tu máquina local:

1. Preparar la Base de Datos
Abre tu gestor de base de datos (ej. PHPMyAdmin).

Crea una base de datos llamada adopcion_mascotas.

Importa el archivo adopcion_mascotas.sql que se encuentra en la raíz del proyecto.

2. Configurar el Backend
Entra a la carpeta: cd backend

Instala las dependencias: npm install

Variables de Entorno: El sistema utiliza valores por defecto para XAMPP (root y sin contraseña). Si tu configuración es distinta, crea un archivo .env en /backend:

DB_HOST=localhost
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_NAME=adopcion_mascotas
PORT=3000

Inicia el servidor: npm start (o node server.js)

Nota: La carpeta public/uploads se gestiona automáticamente para las imágenes.

3. Configurar el Frontend
Abre una nueva terminal y entra a la carpeta: cd frontend

Instala las dependencias: npm install

Variables de Entorno: Crea un archivo .env en la raíz de /frontend:

VITE_API_URL=http://localhost:3000/api

Inicia la aplicación: npm run dev

🔑 Credenciales
Para acceder al panel administrativo:

Administrador: admin / admin123

Usuario Normal: usuario / user123

## 🚀 Endpoints de la API

### 🐾 Mascotas
| Método | Endpoint | Descripción |
| `GET` | `/api/mascotas` | Obtener todas las mascotas |
| `POST` | `/api/mascotas` | Crear mascota (Requiere **Form-Data** con imagen) |
| `PUT` | `/api/mascotas/:id` | Actualizar datos de una mascota |
| `DELETE` | `/api/mascotas/:id` | Eliminar una mascota de la base de datos |

### 🔐 Autenticación
| Método | Endpoint | Descripción |
| `POST` | `/api/auth/login` | Inicia sesión y retorna datos del usuario y rol |