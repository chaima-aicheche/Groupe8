FROM nginx:latest

COPY ./certificatSSL/autosigned/techtalent.crt /etc/nginx/certificatSSL/techtalent.crt
COPY ./certificatSSL/autosigned/techtalent.csr /etc/nginx/certificatSSL/techtalent.csr
COPY ./certificatSSL/autosigned/techtalent.key /etc/nginx/certificatSSL/techtalent.key


COPY nginx.conf /etc/nginx/nginx.conf

CMD ["nginx", "-g", "daemon off;"]
