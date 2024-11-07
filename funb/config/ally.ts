import env from '#start/env'
import { defineConfig, services } from '@adonisjs/ally'
// const BACKEND_HOST = env.get('BACKEND_HOST')

const allyConfig = defineConfig({
  google: services.google({
    clientId: env.get('GOOGLE_CLIENT_ID'),
    clientSecret: env.get('GOOGLE_CLIENT_SECRET'),
    callbackUrl: `http://localhost:3333/google/callback`,
  }),
  github: services.github({
    clientId: env.get('GITHUB_CLIENT_ID'),
    clientSecret: env.get('GITHUB_CLIENT_SECRET'),
    callbackUrl: `http://localhost:3333/github/callback`,
    scopes: ['user', 'user:email'],
  }),
})
export default allyConfig

declare module '@adonisjs/ally/types' {
  interface SocialProviders extends InferSocialProviders<typeof allyConfig> {}
}
