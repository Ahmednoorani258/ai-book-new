import { betterAuth } from 'better-auth';
import { emailAndPassword } from 'better-auth/plugins';
import pool from './db';

export const auth = betterAuth({
  database: pool,
  plugins: [
    emailAndPassword(),
  ],
});
