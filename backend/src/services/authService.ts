import { auth } from '../auth';
// import { User } from '../models/User'; // User model is a placeholder for Better Auth's internal user
import { Profile } from '../models/Profile';
import pool from '../db';

export class AuthService {
  async registerUserWithProfile(email: string, password: string, experienceLevel: Profile['experienceLevel']): Promise<{ userId: string }> {
    try {
      // In a real implementation, Better Auth would handle user creation and return a user ID.
      // This is a simplified representation.
      const newUser = await auth.providers.emailAndPassword.methods.register({ email, password });
      const userId = newUser.id; // Assuming Better Auth returns an object with an ID

      // Create profile entry in the database
      await pool.query(
        'INSERT INTO profiles(user_id, experience_level) VALUES($1, $2)',
        [userId, experienceLevel]
      );

      return { userId };
    } catch (error) {
      console.error('Error registering user with profile:', error);
      throw error;
    }
  }

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
        'UPDATE profiles SET experience_level = $1 WHERE user_id = $2 RETURNING *',
        [experienceLevel, userId]
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
