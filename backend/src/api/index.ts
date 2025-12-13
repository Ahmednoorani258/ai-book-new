import { Router } from 'express';
import { AuthService } from '../services/authService';
import { auth } from '../auth'; // Import auth from Better Auth

const router = Router();
const authService = new AuthService();

router.post('/register', async (req, res) => {
  const { email, password, experienceLevel } = req.body;
  try {
    const { userId } = await authService.registerUserWithProfile(email, password, experienceLevel);
    res.status(201).json({ userId, message: 'User registered successfully.' });
  } catch (error) {
    res.status(400).json({ message: 'Error registering user.', error: error.message });
  }
});

// New Login Endpoint
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const session = await auth.providers.emailAndPassword.methods.login({ email, password });
    // Assuming session has userId. Fetch profile to get experienceLevel
    const profile = await authService.getUserProfile(session.userId); // Assuming session.userId exists
    res.status(200).json({ message: 'Logged in successfully.', session: { ...session, userId: session.userId, experienceLevel: profile?.experienceLevel } });
  } catch (error) {
    res.status(401).json({ message: 'Login failed.', error: error.message });
  }
});

router.get('/users/:userId/profile', async (req, res) => {
  const { userId } = req.params;
  try {
    const profile = await authService.getUserProfile(userId);
    if (profile) {
      res.status(200).json(profile);
    } else {
      res.status(404).json({ message: 'Profile not found.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving profile.', error: error.message });
  }
});

router.put('/users/:userId/profile', async (req, res) => {
  const { userId } = req.params;
  const { experienceLevel } = req.body;
  try {
    const updatedProfile = await authService.updateUserProfile(userId, experienceLevel);
    if (updatedProfile) {
      res.status(200).json(updatedProfile);
    } else {
      res.status(404).json({ message: 'Profile not found.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating profile.', error: error.message });
  }
});

export default router;