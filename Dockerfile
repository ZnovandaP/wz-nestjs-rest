FROM node:20.11.0-alpine

ENV PORT=3000

WORKDIR /app

COPY . .

RUN npm i

EXPOSE ${PORT}

CMD ["npm", "run", "start:dev"]