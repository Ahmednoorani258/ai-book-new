// import { auth } from '../auth'; // This import is no longer needed in AuthService
// import { User } from '../models/User'; // User model is a placeholder for Better Auth's internal user
import { Profile } from '../models/Profile';
import pool from '../db';

export class AuthService {
  // registerUserWithProfile method is removed as registration is now handled by Better Auth directly.
  // Application-specific profile management will occur after Better Auth handles core user creation.

  async getUserProfile(userId: string): Promise<Profile | null> {
    try {
      const result = await pool.query('SELECT * FROM profiles WHERE user_id = $1', [userId]);
      if (result.rows.length > 0) {
        const row = result.rows[0];
        return {
          id: row.id,
          userId: row.user_id,
          experienceLevel: row.experience_level,
        };
      }
      return null;
    } catch (error) {
      console.error('Error getting user profile:', error);
      throw error;
    }
  }

  async updateUserProfile(userId: string, experienceLevel: Profile['experienceLevel']): Promise<Profile | null> {
    try {
      const result = await pool.query(
        'INSERT INTO profiles(user_id, experience_level) VALUES($1, $2) ON CONFLICT (user_id) DO UPDATE SET experience_level = EXCLUDED.experience_level RETURNING *',
        [userId, experienceLevel]
      );
      if (result.rows.length > 0) {
        const row = result.rows[0];
        return {
          id: row.id,
          userId: row.user_id,
          experienceLevel: row.experience_level,
        };
      }
      return null;
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  }
}