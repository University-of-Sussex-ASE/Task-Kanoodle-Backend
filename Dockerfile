# NodeJS Version 16
FROM node:16.18-buster-slim

# Copy Dir
COPY . ./app

# Work to Dir
WORKDIR /app

# Install Node Package
RUN npm install --legacy-peer-deps

# Set Env
ENV NODE_ENV dev
ENV PM2_PUBLIC_KEY q5ydefvfpxdslq6
ENV PM2_SECRET_KEY 18asd6co4f0q5qn

EXPOSE 80

# Cmd script
CMD ["npm", "run", "dev"]
