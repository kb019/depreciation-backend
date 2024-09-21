FROM node:20-alpine AS base-build
WORKDIR /app
COPY *.json ./
COPY ./docker-files/*.json ./
RUN npm install 
COPY ./src /app/src
RUN npm run build 

FROM node:20-alpine AS dev-build
WORKDIR /app
COPY --from=base-build /app/node_modules ./node_modules
COPY --from=base-build /app/*.json /app
CMD ["npm","run", "start:dev"]


FROM node:20-alpine AS final
WORKDIR /app
COPY --from=base-build /app/node_modules ./node_modules
COPY --from=base-build /app/dist ./
CMD ["node", "main.js"]