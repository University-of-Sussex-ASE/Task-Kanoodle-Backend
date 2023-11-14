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
<<<<<<< HEAD
ENV PM2_PUBLIC_KEY q5ydefvfpxdslq6
ENV PM2_SECRET_KEY 18asd6co4f0q5qn
=======
ENV PM2_PUBLIC_KEY hr6319phb5fgz57
ENV PM2_SECRET_KEY 95cv4tqswg1ih7g
>>>>>>> 5bc5449f559dee86b3ae621fe447b0b88b7af2ec

EXPOSE 8010

# Cmd script
<<<<<<< HEAD
CMD ["npm", "run", "deploy:dev"]
=======
CMD ["npm", "run", "deploy:prod"]
>>>>>>> 5bc5449f559dee86b3ae621fe447b0b88b7af2ec
