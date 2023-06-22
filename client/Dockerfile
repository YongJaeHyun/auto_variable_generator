#Stage 1
#######################################
FROM --platform=linux/amd64 node:18 AS builder

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

#Stage 2
#######################################
# nginx 이미지를 사용합니다. 뒤에 tag가 없으면 latest 를 사용합니다.
FROM nginx

# work dir 에 build 폴더 생성 /app/build
RUN mkdir ./build

# 빌드 단계에서 생성한 정적 리소스들을 복사
COPY --from=builder /app/build /app/build

# nginx 의 default.conf 를 삭제
RUN rm /etc/nginx/conf.d/default.conf

# host pc 의 nginx.conf 를 아래 경로에 복사
COPY ./nginx.conf /etc/nginx/conf.d

# 80 포트 오픈
EXPOSE 80

# container 실행 시 자동으로 실행할 command. nginx 시작함
CMD ["nginx", "-g", "daemon off;"]