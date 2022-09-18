FROM node:16.15-alpine

# 작업 폴더 만들고 해당 디렉토리로 이동
RUN mkdir /app
WORKDIR /app

# TIMEZONE 설정
ENV TZ="Asia/Seoul" 

# package.json을 현재 디렉토리에 복사
COPY ./app/package*.json ./

# npm으로 작업 디렉토리에 필요한 라이브러리 설치
RUN npm install

# npm으로 global에 필요한 라이브러리 설치
RUN npm install pm2 -g


# CMD ["sh"]
# PM2-Runtime을 watch모드를 활성화하여 index.js를 실행한다.
CMD ["pm2-runtime", "start", "/app/src/index.js", "--watch"]