# Use a lightweight Nginx image
FROM nginx:alpine

# Copy your site files to Nginx web root
COPY front /usr/share/nginx/html

# Expose web port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
