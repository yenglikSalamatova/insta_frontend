
FROM node:18


COPY package*.json ./


RUN npm install


COPY . .


RUN chmod +x /node_modules/.bin/next


RUN npm run build


EXPOSE 3001


CMD ["npm", "start"]
