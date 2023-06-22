#Stage 1
#######################################
# --platform=linux/amd64
FROM node:18 AS builder 

# root 에 app 폴더를 생성
RUN mkdir /app

# work dir 고정
WORKDIR /app

# package.json과 package-lock.json를 Docker environment로 복사
COPY package-lock.json ./
COPY package.json ./

# 모든 node packages 설치
RUN npm ci 

# 모든 파일 Docker environment로 복사 후 빌드
COPY . .
RUN npm run build
