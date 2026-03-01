FROM node

ENV MONGO_DB_USERNAME=admin \
    MONGO_DB_PWD=qwerty 

RUN mkdir -p test-app

COPY . /test-app

CMD ["node", "/test-app/index.js"]
