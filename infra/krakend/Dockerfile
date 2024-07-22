FROM devopsfaith/krakend

COPY ./config /etc/krakend

COPY ./certificatSSL/autosigned/localhost.crt /etc/krakend/certificatSSL/localhost.crt
COPY ./certificatSSL/autosigned/localhost.pem /etc/krakend/certificatSSL/localhost.pem

EXPOSE 8080

ENTRYPOINT ["krakend", "run", "--config", "/etc/krakend/krakend.json"]

