FROM node:13.12.0-alpine as build_frontend

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY frontend/package.json ./
COPY frontend/package-lock.json ./
RUN npm install
RUN npm install react-scripts@3.4.1 -g

# add app
COPY ./frontend/ ./

ENV REACT_APP_BACKEND "/"

RUN npm run-script build


FROM node:13.12.0-alpine

WORKDIR /app

COPY backend/ .

RUN npm install

COPY --from=build_frontend /app/build ./built_frontend

RUN echo '{"MAIL_HOST": "example.com","MAIL_PORT": 465,"MAIL_SECURE": true,"MAIL_USER": "actionpaint@example.com","MAIL_PASS": "password1234","MAIL_RECEIVER": "actionpaint_notification@example.com"}' > ./mail.json

EXPOSE 4000

ENTRYPOINT [ "npm", "run", "start" ]