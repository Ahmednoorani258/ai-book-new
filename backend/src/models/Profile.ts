export interface Profile {
  id: string; // Unique identifier for the profile
  userId: string; // Foreign key to User.id
  experienceLevel: 'beginner' | 'intermediate' | 'expert'; // User's experience level
}
