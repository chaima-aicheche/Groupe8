FROM devopsfaith/krakend

COPY ./config /etc/krakend

EXPOSE 8080
EXPOSE 8090

ENTRYPOINT ["krakend", "run", "--config", "/etc/krakend/krakend.json"]
