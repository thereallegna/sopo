######################################
### Stage 1: Build the application ###
######################################
FROM node:20 AS builder

# Add Maintainer Info
LABEL maintainer="devops@runsystem.id"

# Set the working directory
WORKDIR /app/build

# Copy the rest of the application files
COPY . .

# Run npmrc generator
#RUN npx npmrc-replace-env

# Install dependencies
RUN yarn install

# Ensure version.txt exists
RUN if [ ! -f version.txt ]; then touch version.txt; fi

# Build the Next.js application
RUN yarn build



# ####################################
# ### Stage 2: Run the application ###
# ####################################
FROM node:20-slim AS runner

# Add Maintainer Info
LABEL maintainer="devops@runsystem.id"

# Set the working directory
WORKDIR /app/standalone

# Copy the rest of the application files
COPY --from=builder /app/build/.next/standalone /app/standalone
COPY --from=builder /app/build/public /app/standalone/public
COPY --from=builder /app/build/.next/static /app/standalone/.next/static
#COPY --from=builder /app/build/next.config.js /app/standalone/next.config.js
#COPY --from=builder /app/build/package.json /app/standalone/package.json
COPY --from=builder /app/build/version.txt /app/standalone/version.txt

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["node", "server.js"]
