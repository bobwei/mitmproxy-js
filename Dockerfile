FROM nikolaik/python-nodejs:latest

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN pip install mitmproxy

COPY package.json package-lock.json ./
RUN npm install

COPY . .

ENV PATH ./node_modules/.bin:$PATH

RUN npm run build

CMD [ "npm", "start" ]
