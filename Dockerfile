FROM node:14 as build
WORKDIR /src

COPY package.json /src/.
COPY yarn.lock /src/.

RUN yarn install

COPY . /src/.
RUN yarn build

# Final image will only contain the following
FROM pierrezemb/gostatic
COPY --from=build /src/dist/ /srv/http/

CMD ["-fallback", "/index.html"]
