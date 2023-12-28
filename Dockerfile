# Usa una imagen base con Node.js
FROM node:latest

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia los archivos necesarios (package.json y package-lock.json)
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia el resto de los archivos del proyecto
COPY . .

# Compila tu proyecto React (si es necesario)
RUN npm run build

# Expone el puerto en el que se ejecuta tu aplicación React
EXPOSE 3000

# Comando para iniciar la aplicación React
CMD ["npm", "start"]