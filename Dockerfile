FROM node:19
WORKDIR /app
COPY package*.json ./
RUN npm install
WORKDIR /app
COPY . .
CMD ["npm", "start"]
EXPOSE 3000