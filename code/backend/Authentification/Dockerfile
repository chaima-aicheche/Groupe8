FROM ubuntu:20.04 as builder

RUN apt-get update && apt-get install -y \
    build-essential \
    curl \
    libpq-dev

RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
ENV PATH="/root/.cargo/bin:${PATH}"

RUN rustup update

WORKDIR /usr/src/app

COPY Cargo.toml ./
COPY src ./src

RUN cargo build --release

FROM ubuntu:20.04

RUN apt-get update && apt-get install -y \
    libpq-dev curl

COPY --from=builder /usr/src/app/target/release/Authentification /usr/local/bin/Authentification

EXPOSE 7070

CMD ["/usr/local/bin/Authentification"]
