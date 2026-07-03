# Build stage
FROM node:26.4.0-alpine AS builder

WORKDIR /app

# Set NODE_ENV to production during build
ENV NODE_ENV=production

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy source code
COPY . .

# Prepare nuxt (generate types, etc.)
RUN npm run prepare

# Build the app
RUN npm run build

# Production stage
FROM node:26.4.0-alpine AS production

WORKDIR /app

# Copy package.json for dependencies
COPY package.json ./
RUN npm ci --only=production

# Copy built output from builder
COPY --from=builder /app/.output ./

# Set environment variables
ENV NODE_ENV=production
ENV PORT=8080

# Expose port
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:8080/ || exit 1

# Start the server
CMD ["node", ".output/server/index.mjs"]