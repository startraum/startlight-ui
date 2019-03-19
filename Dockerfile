FROM node as build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run lint
RUN npm run build

FROM arm32v7/node

EXPOSE 3000

ENV NODE_ENV production

RUN apt update && apt install bash

WORKDIR /app
COPY --from=build /app/package.json /app/package.json
COPY --from=build /app/package-lock.json /app/package-lock.json
RUN npm install --production
COPY --from=build /app/.next /app/.next

CMD ["npm", "start"]
