import { Router } from 'express';
import { AuthService } from '../services/authService';
import { auth } from '../auth'; // Import auth from Better Auth

interface BetterAuthUser {
  id: string;
  email: string;
  name?: string;
  image?: string;
}

interface BetterAuthSession {
  token: string;
  userId: string;
  expiresAt: number;
}

interface BetterAuthSignUpResponse {
  user?: BetterAuthUser;
  session?: BetterAuthSession;
  message?: string;
  error?: string;
}

interface BetterAuthSignInResponse {
  user?: BetterAuthUser;
  session?: BetterAuthSession;
  message?: string;
  error?: string;
}

function toHeadersInit(headers: Record<string, any>): Headers {
  const result = new Headers();
  for (const [key, value] of Object.entries(headers)) {
    if (typeof value === 'string') {
      result.append(key, value);
    }
  }
  return result;
}


const router = Router();
const authService = new AuthService();

router.post('/register', async (req, res) => {
  const { email, password, name, image, experienceLevel } = req.body;
  try {
    // Call Better Auth's sign-up endpoint internally
    const signUpResponse = await fetch(`${process.env.BETTER_AUTH_URL}/api/auth/sign-up/email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        email, 
        password, 
        name: name || email.split('@')[0],
        image 
      }),
    });

    const signUpResult = await signUpResponse.json() as BetterAuthSignUpResponse;
    console.log('Better Auth sign-up response:', signUpResponse.status, signUpResult);

    if (!signUpResponse.ok) {
      console.error('Better Auth sign-up failed:', signUpResult);
      return res.status(signUpResponse.status).json({ 
        message: signUpResult.message || 'Registration failed', 
        error: signUpResult.error || signUpResult.message
      });
    }

    const userId = signUpResult?.user?.id;
    console.log('User created with ID:', userId);

    if (!userId) {
      return res.status(500).json({ 
        message: 'User creation failed - no user ID returned',
        error: 'No user ID in response'
      });
    }

    // Create user profile with experience level
    if (experienceLevel) {
      console.log('Creating profile for user:', userId, 'with experience:', experienceLevel);
      await authService.updateUserProfile(userId, experienceLevel);
    }

    res.status(201).json({ userId, message: 'User registered successfully.' });
  } catch (error: any) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Error registering user.', error: error.message });
  }
});

// New Login Endpoint
router.post('/login', async (req, res) => {
  const { email, password, rememberMe } = req.body;
  try {
    // Call Better Auth's sign-in endpoint internally
    const signInResponse = await fetch(`${process.env.BETTER_AUTH_URL}/api/auth/sign-in/email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, rememberMe }),
    });

    const signInResult = await signInResponse.json() as BetterAuthSignInResponse;

    if (!signInResponse.ok) {
      return res.status(signInResponse.status).json({ 
        message: signInResult.message || 'Login failed', 
        error: signInResult.error 
      });
    }

    const userId = signInResult?.user?.id;
    let profile = null;
    if (userId) {
      profile = await authService.getUserProfile(userId);
    }

    // Forward Set-Cookie headers from Better Auth
    const setCookieHeaders = signInResponse.headers.get('set-cookie');
    if (setCookieHeaders) {
      res.setHeader('Set-Cookie', setCookieHeaders);
    }

    res.status(200).json({
      message: 'Logged in successfully.',
      session: { ...signInResult?.session, userId, experienceLevel: profile?.experienceLevel },
      user: signInResult?.user
    });
  } catch (error: any) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Login failed.', error: error.message });
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
  } catch (error: any) {
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
  } catch (error: any) {
    res.status(500).json({ message: 'Error updating profile.', error: error.message });
  }
});

router.get('/session', async (req, res) => {
  try {
    const { data, error }:any = await auth.api.getSession({ headers: toHeadersInit(req.headers), });

    if (error) {
      return res.status(error.status || 401).json({ message: error.message, error: error.name });
    }

    let profile = null;
    if (data?.user?.id) {
      profile = await authService.getUserProfile(data.user.id);
    }

    res.status(200).json({
      isAuthenticated: !!data?.user,
      user: data?.user ? { ...data.user, experienceLevel: profile?.experienceLevel } : null,
      session: data?.session,
    });
  } catch (error: any) {
    res.status(500).json({ message: 'Error retrieving session.', error: error.message });
  }
});

router.post('/logout', async (req, res) => {
  try {
    const { error }:any = await auth.api.signOut({ headers: toHeadersInit(req.headers) });

    if (error) {
      return res.status(error.status || 400).json({ message: error.message, error: error.name });
    }

    res.status(200).json({ message: 'Logged out successfully.' });
  } catch (error: any) {
    res.status(500).json({ message: 'Error logging out.', error: error.message });
  }
});
router.get('/', (req, res) => {
  res.send('Hello, World!');
});

export default router;