# 가져올 이미지를 정의
FROM --platform=linux/amd64 node:18

# root 에 app 폴더를 생성
RUN mkdir /app

# work dir 고정
WORKDIR /app

# 가능한 package.json 과 package-lock.json을 모두 복사하기 위해서 와일드 카드 사용
COPY package*.json /app/

# 명령어 실행 (의존성 설치)
RUN npm install

# 현재 디렉토리의 모든 파일을 도커 컨테이너의 work dir에 복사한다.
COPY . .

# 각각의 명령어들은 한줄 한줄씩 캐싱되어 실행된다.
# package.json의 내용은 자주 바뀌진 않을 거지만
# 소스 코드는 자주 바뀌는데
# npm install과 COPY . . 를 동시에 수행하면
# 소스 코드가 조금 달라질때도 항상 npm install을 수행해서 리소스가 낭비된다.

EXPOSE 8080:3306

# npm start 스크립트 실행
CMD ["npm", "start"]