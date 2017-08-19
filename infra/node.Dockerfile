FROM alpine:3.4
MAINTAINER Alejandro Celaya <alejandro@alejandrocelaya.com>

# Install system packages
RUN apk add --no-cache --virtual nodejs
RUN apk add --no-cache --virtual git
RUN apk add --no-cache --virtual curl
RUN apk add --no-cache --virtual tar
# Install an alpine-compatible phantomjs binary
RUN curl -Ls https://github.com/fgrehm/docker-phantomjs2/releases/download/v2.0.0-20150722/dockerized-phantomjs.tar.gz | tar xz -C /

# Install global tools
RUN npm install -g grunt-cli

# Install project dependencies and run grunt watch at container startup
CMD cd /home/shlink/www && \
    npm install && \
    grunt watch
