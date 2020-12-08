FROM node:12
RUN echo 'fs.inotify.max_user_watches=524288' >> /etc/sysctl.conf
WORKDIR app/
COPY . .
COPY package.json .
COPY package-lock.json .
RUN npm i
EXPOSE $PORT
CMD npm run start
