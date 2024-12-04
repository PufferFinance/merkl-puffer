FROM oven/bun:1.1.24-debian

RUN apt-get -y update
RUN apt-get -y install python3 make g++ ca-certificates curl

WORKDIR /app

COPY package.json .
COPY packages packages
COPY bun.lockb .
RUN bun install

COPY vite.config.ts ./
COPY merkl.config.ts ./
COPY tailwind.config.ts ./
COPY postcss.config.js ./

COPY tsconfig.json ./

COPY src src
COPY public public

RUN bun run build

EXPOSE 5173

CMD ["bun", "serve"]
