# Etapa de construcción
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm ci

# Copiar el código fuente
COPY . .

# Crear archivo .env para build (Vite lo necesita en build time)
ARG VITE_API_URL
RUN echo "VITE_API_URL=${VITE_API_URL}" > .env

# Compilar la aplicación
RUN npm run build

# Etapa de producción con nginx
FROM nginx:alpine

# Copiar archivos estáticos compilados
COPY --from=builder /app/dist /usr/share/nginx/html

# Copiar configuración personalizada de nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer el puerto 80
EXPOSE 80

# Nginx se inicia automáticamente con la imagen base
CMD ["nginx", "-g", "daemon off;"]
