FROM openresty/openresty:alpine

COPY ./certificatSSL/autosigned/techtalent.crt /usr/local/openresty/nginx/conf/certificatSSL/techtalent.crt
COPY ./certificatSSL/autosigned/techtalent.csr /usr/local/openresty/nginx/conf/certificatSSL/techtalent.csr
COPY ./certificatSSL/autosigned/techtalent.key /usr/local/openresty/nginx/conf/certificatSSL/techtalent.key

COPY nginx.conf /usr/local/openresty/nginx/conf/nginx.conf

CMD mkdir -p /var/log/nginx && \
    touch /var/log/nginx/access.log /var/log/nginx/error.log && \
    openresty -g "daemon off;"