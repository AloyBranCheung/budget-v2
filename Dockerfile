FROM node:20-alpine
WORKDIR /app
COPY . .
RUN apk add --no-cache openssl
RUN yarn global add typescript
RUN yarn install 
RUN npx prisma generate
CMD ["yarn", "next", "dev"]