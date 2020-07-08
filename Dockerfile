FROM node:12-alpine

# Add sources to container path and set as working directory
ADD . /app
WORKDIR /app

# Use yarn 2.0
RUN yarn set version berry

# Force node linker to legacy mode
RUN yarn config set nodeLinker node-modules

# Install workspaces tools
RUN yarn plugin import workspace-tools

# Install version plugin
RUN yarn plugin import version

# Install dependencies
RUN yarn

# Build app for production
RUN yarn build

# Expose public port which is 5000 by default in zeit/serve
EXPOSE 5000

# Pass all commands through yarn
ENTRYPOINT ["yarn"]

#  See https://bit.ly/2KAt3ZF for CLI options
CMD ["start"]
