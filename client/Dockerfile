#Stage 1
#######################################
# --platform=linux/amd64
FROM node:18 AS builder 

# root 에 app 폴더를 생성
WORKDIR /usr/src/app

# package.json과 package-lock.json를 Docker environment로 복사
COPY package-lock.json ./
COPY package.json ./

# 모든 node packages 설치
RUN npm ci 

# 모든 파일 Docker environment로 복사 후 빌드
COPY . .
RUN npm run build

#Stage 2
#######################################
FROM nginx

# 3000번 포트를 다른 컨테이너에게 노출
EXPOSE 3000

# nginx 설정을 docker container 환경으로 복사
COPY ./default.conf /etc/nginx/conf.d/default.conf 

# build 결과물을 docker container 환경으로 복사
COPY --from=builder usr/src/app/build  /usr/share/nginx/html 
