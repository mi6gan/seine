FROM node:12-alpine

# Add sources to container path and set as working directory
ADD . /app
WORKDIR /app

# Build app for production
RUN yarn install
RUN yarn build

# Serve static files
CMD ["yarn", "server"]
