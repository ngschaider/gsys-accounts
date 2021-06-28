FROM node:15 AS gsys-accounts-build
RUN npm install -g npm@7.19.0
WORKDIR /compile
COPY ./ ./
RUN npm install
RUN npm run build

FROM httpd:2.4
WORKDIR /usr/local/apache2/htdocs
COPY package.json ./
COPY package-lock.json ./
COPY --from=gsys-accounts-build /compile/build/ ./

EXPOSE 80