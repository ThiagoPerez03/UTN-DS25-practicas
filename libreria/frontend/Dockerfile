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

# Copiar script de inicio
COPY start-nginx.sh /start-nginx.sh
RUN chmod +x /start-nginx.sh

# Exponer el puerto (Railway lo asignará dinámicamente)
EXPOSE 80

# Usar el script de inicio que configura el puerto correcto
CMD ["/start-nginx.sh"]
