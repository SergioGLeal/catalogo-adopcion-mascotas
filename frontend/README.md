🐾 Huellitas - Plataforma de Adopción de Mascotas
¡Bienvenido a Huellitas! Este es un sistema completo (Full Stack) diseñado para gestionar la adopción de mascotas. Incluye un catálogo para usuarios y un panel administrativo protegido para la gestión de mascotas con subida de imágenes local.

🛠️ Tecnologías utilizadas
Frontend: React (Vite), React Router Dom, SweetAlert2, Axios.

Backend: Node.js, Express, Multer (Gestión de archivos).

Base de Datos: MySQL.

Configuración del Proyecto
Sigue estos pasos para ejecutar el proyecto en tu máquina local:

1 Configurar el Backend
Entra a la carpeta: cd backend

Instala las dependencias: npm install

Importante: Asegúrate de tener una base de datos MySQL llamada huellitas y ejecuta el script SQL (adjunto en la carpeta /database si lo tienes).

Configura tu conexión en src/config/db.js.

La carpeta public/uploads se creará automáticamente al iniciar el servidor gracias al middleware de Multer.

Ejecuta el servidor:
npm start (o node server.js)

2 Configurar el Frontend
Abre una nueva terminal y entra a la carpeta: cd frontend

Instala las dependencias: npm install

Variables de Entorno: Crea un archivo llamado .env en la raíz de la carpeta frontend y añade:
VITE_API_URL=http://localhost:3000

Inicia la aplicación:
npm run dev

🔑 Accesos/Contraseñas
Administrador: admin-admin123
Usuario Normal: Usuario-user123