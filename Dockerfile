FROM node:20.2-alpine as builder

ENV CURRENT_USER=node \
    HOME_DIR=/home/$CURRENT_USER \
    APP_DIR=$HOME/todo-list-app \
    NODE_ENV=production \
    YARN_VERSION=1.22.19 \
    PORT=""

#configure npm to setup global dependencies to a non-root user dir
ENV NPM_CONFIG_PREFIX=$HOME_DIR/.npm-global
#run npm global bin without specifying path
ENV PATH=$PATH:$HOME_DIR/.npm-global/bin

# create app files directory
RUN mkdir -p $APP_DIR/node_modules && chown -R $CURRENT_USER:$CURRENT_USER $APP_DIR

WORKDIR $APP_DIR

#install project deps
COPY package.json yarn.lock lerna.json .npmrc ./
COPY ./packages/application/package.json ./packages/application/
COPY ./packages/client-app/package.json ./packages/client-app/
COPY ./packages/domain/package.json ./packages/domain/
COPY ./packages/infrastructure/package.json ./packages/infrastructure/

USER $CURRENT_USER

# update yarn
RUN yarn policies set-version $YARN_VERSION
RUN yarn install --frozen-lockfile --non-interactive --production=true

#copy project files
COPY --chown=$CURRENT_USER:$CURRENT_USER . .

#build the client app project
ENV REST_API_SERVER_PORT=$PORT
ENV REST_API_SERVER_HOST=""
RUN yarn build:client

#clean cache
RUN yarn clean:build:cache
RUN yarn cache clean && npm cache --clean

#copy client file
FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /home/app/packages/client-app/build /usr/share/nginx/html

EXPOSE 3000 80