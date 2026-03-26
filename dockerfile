FROM node:22-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD npm run build
CMD npm run start

# docker build -t chat-app .
# docker run -d --restart always --name chat-app -p 5000:5000 chat-app