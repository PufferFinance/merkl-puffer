FROM oven/bun:1.1.24-debian
ARG GITHUB_REGISTRY_TOKEN

RUN apt-get -y update
RUN apt-get -y install python3 make g++ ca-certificates curl

WORKDIR /app

COPY bunfig.toml .
COPY package.json .
COPY bun.lockb .
RUN bun install

COPY vite.config.ts ./
COPY merkl.config.ts ./
COPY tailwind.config.ts ./
COPY postcss.config.js ./

COPY tsconfig.json ./

COPY ./ ./

CMD ["bun", "dev"]