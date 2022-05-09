FROM node:16.15-alpine

# 작업 폴더를 만들고 npm 설치
RUN mkdir /app
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/package.json

RUN npm install pm2 -g
RUN npm install --no-cache

# 소스를 작업폴더로 복사
COPY . /app





#CMD [ "node", "/app/src/index.js" ]
# CMD ["npm", "run", "server"]
CMD ["pm2-runtime", "/app/src/index.js"]