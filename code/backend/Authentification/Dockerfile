FROM rust:1.79 as builder

WORKDIR /usr/src/app
COPY . .
RUN cargo install --path .

FROM debian:bookworm-slim
    RUN apt-get update && apt-get install -y \
    libpq-dev \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

    COPY --from=builder /usr/src/app/target/release/Authentification /usr/local/bin/Authentification

EXPOSE 7070

CMD ["Authentification"]