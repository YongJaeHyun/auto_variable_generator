# 가져올 이미지를 정의
FROM node:18

# root 에 app 폴더를 생성
WORKDIR /usr/src/app

# package.json과 package-lock.json를 Docker environment로 복사
COPY package*.json ./

# 모든 node production packages 설치
RUN npm ci --omit=dev

# 모든 파일 Docker environment로 복사
COPY . .

EXPOSE 5000
CMD [ "node", "server.js" ]