#!/bin/sh

# Script para iniciar nginx con el puerto correcto en Railway
# Railway asigna un puerto dinámico a través de la variable de entorno PORT

# Si PORT no está definido, usar 80 por defecto
PORT=${PORT:-80}

echo "Configurando nginx para escuchar en el puerto $PORT..."

# Crear la configuración de nginx con el puerto correcto
cat > /etc/nginx/conf.d/default.conf <<EOF
server {
    listen $PORT;
    server_name _;
    
    root /usr/share/nginx/html;
    index index.html;

    # Comprimir respuestas
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    # Servir archivos estáticos
    location / {
        try_files \$uri \$uri/ /index.html;
    }

    # Cache para assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Deshabilitar cache para index.html
    location = /index.html {
        add_header Cache-Control "no-cache, no-store, must-revalidate";
    }
}
EOF

echo "Nginx configurado. Iniciando servidor en el puerto $PORT..."

# Iniciar nginx
exec nginx -g "daemon off;"
