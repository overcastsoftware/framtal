FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

# USER nextjs

COPY . .

EXPOSE 3000

ENV PORT=3000

ENV HOSTNAME="0.0.0.0"

# RUN npm run build

CMD ["npx", "next", "dev"]