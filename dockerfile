FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start"]

# docker build -t chat-app .
# docker run -d --restart always --name chat-app -p 3000:3000 chat-app