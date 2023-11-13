# NodeJS Version 16
FROM node:16.18-buster-slim

# Copy Dir
COPY . ./app

# Work to Dir
WORKDIR /app

# Install Node Package
RUN npm install --legacy-peer-deps
RUN npm install pm2 -g

# Set Env
ENV NODE_ENV dev
ENV PM2_PUBLIC_KEY hr6319phb5fgz57
ENV PM2_SECRET_KEY 95cv4tqswg1ih7g

EXPOSE 8010

# Cmd script
CMD ["npm", "run", "deploy:prod"]
