FROM node:12-alpine

# Add sources to container path and set as working directory
ADD . /app
WORKDIR /app

# Use yarn 2.0
yarn set version berry

# Force node linker to legacy mode
yarn config set nodeLinker node-modules

# Build app for production
RUN yarn

# Clean packages cache dirs
RUN rm -rf /app/.yarn/cache

# Expose public port which is 5000 by default in zeit/serve
EXPOSE 5000

# Pass all commands through yarn
ENTRYPOINT ["yarn"]

#  See https://bit.ly/2KAt3ZF for CLI options
CMD ["start"]
