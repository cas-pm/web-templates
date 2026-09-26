# Build the static Astro site, then serve dist/ with nginx.
FROM node:22-alpine AS build
WORKDIR /app

# Corepack-managed pnpm.
RUN corepack enable

# TODO: for a standalone client repo this copies just this template's manifest.
# In the monorepo, build from the repo root instead.
COPY package.json ./
RUN pnpm install --prod=false
COPY . .
RUN pnpm build

FROM nginx:1.27-alpine AS runtime
# Static serve of the built site.
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
