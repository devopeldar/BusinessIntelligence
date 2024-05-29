# # # Usa una imagen base con Node.js
# FROM node:latest  as build

# # Establece el directorio de trabajo dentro del contenedor
# WORKDIR /usr/src/app

# # Copia los archivos necesarios (package.json y package-lock.json)
# COPY package*.json ./

# # Instala las dependencias del proyecto
# RUN npm install

# # Copia el resto de los archivos del proyecto
# COPY . .

# # Compila tu proyecto React (si es necesario)
# RUN npm run build

# # Expone el puerto en el que se ejecuta tu aplicación React
# EXPOSE 3000

# # Comando para iniciar la aplicación React
# CMD ["npm", "start"]





# # Usa una imagen base con Node.js
# FROM node:latest as build

# # Establece el directorio de trabajo dentro del contenedor
# WORKDIR /usr/src/app

# # Copia los archivos necesarios (package.json y package-lock.json)
# COPY package*.json ./

# # Instala las dependencias del proyecto
# RUN npm install

# # Copia el resto de los archivos del proyecto
# COPY . .

# # Compila tu proyecto React para producción
# RUN npm run build

# # Usa una imagen más ligera para servir los archivos estáticos
#  FROM nginx:stable

# # Copia los archivos estáticos compilados desde la fase de construcción
# COPY --from=build /usr/src/app/build /usr/share/nginx/html

# # Copia el archivo de configuración de Nginx personalizado
# COPY src/nginx.conf /etc/nginx/nginx.conf

# # Verificar los archivos copiados
# RUN ls -la /usr/share/nginx/html
# # Expone el puerto en el que se ejecuta Nginx
# EXPOSE 3000

# # Comando para iniciar Nginx
# CMD ["nginx", "-g", "daemon off;"]


# Etapa de construcción
FROM node:14 AS build

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Etapa de producción
FROM nginx:stable

COPY --from=build /usr/src/app/build /usr/share/nginx/html
COPY src/nginx.conf /etc/nginx/nginx.conf

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]