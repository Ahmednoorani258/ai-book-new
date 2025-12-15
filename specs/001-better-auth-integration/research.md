## Question 1: Clarification on "Better Auth" Library

**Context**: Your request mentioned "learn better auth from her in detail then implement the correct code" and provided the URL `https://www.better-auth.com/docs/introduction`. However, I am unable to access external URLs directly. My web search for "Better Auth library" returned results heavily suggesting AWS Amplify as a common "better auth" solution for Node.js and React.

**What we need to know**: Is the "Better Auth" you are referring to specifically the library documented at `https://www.better-auth.com/docs/introduction`, or were you using "Better Auth" as a general term for a robust authentication solution, for which AWS Amplify is a suitable option?

**Suggested Answers**:

| Option | Answer | Implications |
|--------|--------|--------------|
| A      | **Confirm the library at `https://www.better-auth.com/docs/introduction` is the target.** | I will need you to provide key information (e.g., core concepts, integration steps, data models) from that documentation for me to proceed with planning. |
| B      | **Proceed with AWS Amplify as the "Better Auth" solution.** | I will base the design and implementation on AWS Amplify's architecture and best practices for Node.js and React. |
| Custom | Provide your own answer. | Please specify the exact authentication library or framework you intend to use. |

**Your choice**: A

**Next Step**: To proceed with option A and update the research file by learning everything from BetterAuth documentation, please provide the key information (core concepts, integration steps for Node.js backend and React frontend, and data models/schema requirements) from the following documentation pages:
1. `https://www.better-auth.com/docs/authentication/email-password`
2. `https://www.better-auth.com/docs/basic-usage`

You can paste the relevant sections or a summary of the content from these pages here.

# Basic Usage

Getting started with Better Auth

***

title: Basic Usage
description: Getting started with Better Auth
---------------------------------------------

Better Auth provides built-in authentication support for:

* **Email and password**
* **Social provider (Google, GitHub, Apple, and more)**

But also can easily be extended using plugins, such as: [username](/docs/plugins/username), [magic link](/docs/plugins/magic-link), [passkey](/docs/plugins/passkey), [email-otp](/docs/plugins/email-otp), and more.

## Email & Password

To enable email and password authentication:

```ts title="auth.ts"
import { betterAuth } from "better-auth"

export const auth = betterAuth({
    emailAndPassword: {    // [!code highlight]
        enabled: true // [!code highlight]
    } // [!code highlight]
})
```

### Sign Up

To sign up a user you need to call the client method `signUp.email` with the user's information.

```ts title="sign-up.ts"
import { authClient } from "@/lib/auth-client"; //import the auth client // [!code highlight]

const { data, error } = await authClient.signUp.email({
        email, // user email address
        password, // user password -> min 8 characters by default
        name, // user display name
        image, // User image URL (optional)
        callbackURL: "/dashboard" // A URL to redirect to after the user verifies their email (optional)
    }, {
        onRequest: (ctx) => {
            //show loading
        },
        onSuccess: (ctx) => {
            //redirect to the dashboard or sign in page
        },
        onError: (ctx) => {
            // display the error message
            alert(ctx.error.message);
        },
});
```

By default, the users are automatically signed in after they successfully sign up. To disable this behavior you can set `autoSignIn` to `false`.

```ts title="auth.ts"
import { betterAuth } from "better-auth"

export const auth = betterAuth({
    emailAndPassword: {
    	enabled: true,
    	autoSignIn: false //defaults to true // [!code highlight]
  },
})
```

### Sign In

To sign a user in, you can use the `signIn.email` function provided by the client.

```ts title="sign-in"
const { data, error } = await authClient.signIn.email({
        /**
         * The user email
         */
        email,
        /**
         * The user password
         */
        password,
        /**
         * A URL to redirect to after the user verifies their email (optional)
         */
        callbackURL: "/dashboard",
        /**
         * remember the user session after the browser is closed. 
         * @default true
         */
        rememberMe: false
}, {
    //callbacks
})
```

<Callout type="warn">
  Always invoke client methods from the client side. Don't call them from the server.
</Callout>

### Server-Side Authentication

To authenticate a user on the server, you can use the `auth.api` methods.

```ts title="server.ts"
import { auth } from "./auth"; // path to your Better Auth server instance

const response = await auth.api.signInEmail({
    body: {
        email,
        password
    },
    asResponse: true // returns a response object instead of data
});
```

<Callout>
  If the server cannot return a response object, you'll need to manually parse and set cookies. But for frameworks like Next.js we provide [a plugin](/docs/integrations/next#server-action-cookies) to handle this automatically
</Callout>

## Social Sign-On

Better Auth supports multiple social providers, including Google, GitHub, Apple, Discord, and more. To use a social provider, you need to configure the ones you need in the `socialProviders` option on your `auth` object.

```ts title="auth.ts"
import { betterAuth } from "better-auth";

export const auth = betterAuth({
    socialProviders: { // [!code highlight]
        github: { // [!code highlight]
            clientId: process.env.GITHUB_CLIENT_ID!, // [!code highlight]
            clientSecret: process.env.GITHUB_CLIENT_SECRET!, // [!code highlight]
        } // [!code highlight]
    }, // [!code highlight]
})
```

### Sign in with social providers

To sign in using a social provider you need to call `signIn.social`. It takes an object with the following properties:

```ts title="sign-in.ts"
import { authClient } from "@/lib/auth-client"; //import the auth client // [!code highlight]

await authClient.signIn.social({
    /**
     * The social provider ID
     * @example "github", "google", "apple"
     */
    provider: "github",
    /**
     * A URL to redirect after the user authenticates with the provider
     * @default "/"
     */
    callbackURL: "/dashboard", 
    /**
     * A URL to redirect if an error occurs during the sign in process
     */
    errorCallbackURL: "/error",
    /**
     * A URL to redirect if the user is newly registered
     */
    newUserCallbackURL: "/welcome",
    /**
     * disable the automatic redirect to the provider. 
     * @default false
     */
    disableRedirect: true,
});
```

You can also authenticate using `idToken` or `accessToken` from the social provider instead of redirecting the user to the provider's site. See social providers documentation for more details.

## Signout

To signout a user, you can use the `signOut` function provided by the client.

```ts title="user-card.tsx"
await authClient.signOut();
```

you can pass `fetchOptions` to redirect onSuccess

```ts title="user-card.tsx" 
await authClient.signOut({
  fetchOptions: {
    onSuccess: () => {
      router.push("/login"); // redirect to login page
    },
  },
});
```

## Session

Once a user is signed in, you'll want to access the user session. Better Auth allows you to easily access the session data from both the server and client sides.

### Client Side

#### Use Session

Better Auth provides a `useSession` hook to easily access session data on the client side. This hook is implemented using nanostore and has support for each supported framework and vanilla client, ensuring that any changes to the session (such as signing out) are immediately reflected in your UI.

<Tabs items={["React", "Vue","Svelte", "Solid", "Vanilla"]} defaultValue="react">
  <Tab value="React">
    ```tsx title="user.tsx"
    import { authClient } from "@/lib/auth-client" // import the auth client // [!code highlight] 

    export function User(){

        const { // [!code highlight]
            data: session, // [!code highlight]
            isPending, //loading state // [!code highlight]
            error, //error object // [!code highlight]
            refetch //refetch the session
        } = authClient.useSession() // [!code highlight]

        return (
            //...
        )
    }
    ```
  </Tab>

  <Tab value="Vue">
    ```vue title="index.vue"
    <script setup lang="ts">
    import { authClient } from "~/lib/auth-client" // [!code highlight]

    const session = authClient.useSession() // [!code highlight]
    </script>

    <template>
        <div>
            <div>
                <pre>{{ session.data }}</pre>
                <button v-if="session.data" @click="authClient.signOut()">
                    Sign out
                </button>
            </div>
        </div>
    </template>
    ```
  </Tab>

  <Tab value="Svelte">
    ```svelte title="user.svelte"
    <script lang="ts">
    import { authClient } from "$lib/auth-client"; // [!code highlight]

    const session = authClient.useSession(); // [!code highlight]
    </script>
    <p>
        {$session.data?.user.email}
    </p>
    ```
  </Tab>

  <Tab value="Vanilla">
    ```ts title="user.svelte"
    import { authClient } from "~/lib/auth-client"; //import the auth client

    authClient.useSession.subscribe((value)=>{
        //do something with the session //
    }) 
    ```
  </Tab>

  <Tab value="Solid">
    ```tsx title="user.tsx"
    import { authClient } from "~/lib/auth-client"; // [!code highlight]

    export default function Home() {
        const session = authClient.useSession() // [!code highlight]
        return (
            <pre>{JSON.stringify(session(), null, 2)}</pre>
        );
    }
    ```
  </Tab>
</Tabs>

#### Get Session

If you prefer not to use the hook, you can use the `getSession` method provided by the client.

```ts title="user.tsx"
import { authClient } from "@/lib/auth-client" // import the auth client // [!code highlight]

const { data: session, error } = await authClient.getSession()
```

You can also use it with client-side data-fetching libraries like [TanStack Query](https://tanstack.com/query/latest).

### Server Side

The server provides a `session` object that you can use to access the session data. It requires request headers object to be passed to the `getSession` method.

**Example: Using some popular frameworks**

<Tabs items={["Next.js", "Nuxt", "Svelte", "Astro", "Hono", "TanStack"]}>
  <Tab value="Next.js">
    ```ts title="server.ts"
    import { auth } from "./auth"; // path to your Better Auth server instance
    import { headers } from "next/headers";

    const session = await auth.api.getSession({
        headers: await headers() // you need to pass the headers object.
    })
    ```
  </Tab>

  <Tab value="Remix">
    ```ts title="route.ts"
    import { auth } from "lib/auth"; // path to your Better Auth server instance

    export async function loader({ request }: LoaderFunctionArgs) {
        const session = await auth.api.getSession({
            headers: request.headers
        })

        return json({ session })
    }
    ```
  </Tab>

  <Tab value="Astro">
    ```astro title="index.astro"
    ---
    import { auth } from "./auth";

    const session = await auth.api.getSession({
        headers: Astro.request.headers,
    });
    ---
    <!-- Your Astro Template -->
    ```
  </Tab>

  <Tab value="Svelte">
    ```ts title="+page.ts"
    import { auth } from "./auth";

    export async function load({ request }) {
        const session = await auth.api.getSession({
            headers: request.headers
        })
        return {
            props: {
                session
            }
        }
    }
    ```
  </Tab>

  <Tab value="Hono">
    ```ts title="index.ts"
    import { auth } from "./auth";

    const app = new Hono();

    app.get("/path", async (c) => {
        const session = await auth.api.getSession({
            headers: c.req.raw.headers
        })
    });
    ```
  </Tab>

  <Tab value="Nuxt">
    ```ts title="server/session.ts"
    import { auth } from "~/utils/auth";

    export default defineEventHandler((event) => {
        const session = await auth.api.getSession({
            headers: event.headers,
        })
    });
    ```
  </Tab>

  <Tab value="TanStack">
    ```ts title="app/routes/api/index.ts"
    import { auth } from "./auth";
    import { createAPIFileRoute } from "@tanstack/start/api";

    export const APIRoute = createAPIFileRoute("/api/$")({
        GET: async ({ request }) => {
            const session = await auth.api.getSession({
                headers: request.headers
            })
        },
    });
    ```
  </Tab>
</Tabs>

<Callout>
  For more details check [session-management](/docs/concepts/session-management) documentation.
</Callout>

## Using Plugins

One of the unique features of Better Auth is a plugins ecosystem. It allows you to add complex auth related functionality with small lines of code.

Below is an example of how to add two factor authentication using two factor plugin.

<Steps>
  <Step>
    ### Server Configuration

    To add a plugin, you need to import the plugin and pass it to the `plugins` option of the auth instance. For example, to add two factor authentication, you can use the following code:

    ```ts title="auth.ts"
    import { betterAuth } from "better-auth"
    import { twoFactor } from "better-auth/plugins" // [!code highlight]

    export const auth = betterAuth({
        //...rest of the options
        plugins: [ // [!code highlight]
            twoFactor() // [!code highlight]
        ] // [!code highlight]
    })
    ```

    now two factor related routes and method will be available on the server.
  </Step>

  <Step>
    ### Migrate Database

    After adding the plugin, you'll need to add the required tables to your database. You can do this by running the `migrate` command, or by using the `generate` command to create the schema and handle the migration manually.

    generating the schema:

    ```bash title="terminal"
    npx @better-auth/cli generate
    ```

    using the `migrate` command:

    ```bash title="terminal"
    npx @better-auth/cli migrate
    ```

    <Callout>
      If you prefer adding the schema manually, you can check the schema required on the [two factor plugin](/docs/plugins/2fa#schema) documentation.
    </Callout>
  </Step>

  <Step>
    ### Client Configuration

    Once we're done with the server, we need to add the plugin to the client. To do this, you need to import the plugin and pass it to the `plugins` option of the auth client. For example, to add two factor authentication, you can use the following code:

    ```ts title="auth-client.ts"  
    import { createAuthClient } from "better-auth/client";
    import { twoFactorClient } from "better-auth/client/plugins"; // [!code highlight]

    const authClient = createAuthClient({
        plugins: [ // [!code highlight]
            twoFactorClient({ // [!code highlight]
                twoFactorPage: "/two-factor" // the page to redirect if a user needs to verify 2nd factor // [!code highlight]
            }) // [!code highlight]
        ] // [!code highlight]
    })
    ```

    now two factor related methods will be available on the client.

    ```ts title="profile.ts"
    import { authClient } from "./auth-client"

    const enableTwoFactor = async() => {
        const data = await authClient.twoFactor.enable({
            password // the user password is required
        }) // this will enable two factor
    }

    const disableTwoFactor = async() => {
        const data = await authClient.twoFactor.disable({
            password // the user password is required
        }) // this will disable two factor
    }

    const signInWith2Factor = async() => {
        const data = await authClient.signIn.email({
            //...
        })
        //if the user has two factor enabled, it will redirect to the two factor page
    }

    const verifyTOTP = async() => {
        const data = await authClient.twoFactor.verifyTOTP({
            code: "123456", // the code entered by the user 
            /**
             * If the device is trusted, the user won't
             * need to pass 2FA again on the same device
             */
            trustDevice: true
        })
    }
    ```
  </Step>

  <Step>
    Next step: See the <Link href="/docs/plugins/2fa">two factor plugin documentation</Link>.
  </Step>
</Steps>

# Email & Password

Implementing email and password authentication with Better Auth.

***

title: Email & Password
description: Implementing email and password authentication with Better Auth.
-----------------------------------------------------------------------------

Email and password authentication is a common method used by many applications. Better Auth provides a built-in email and password authenticator that you can easily integrate into your project.

<Callout type="info">
  If you prefer username-based authentication, check out the{" "}
  <Link href="/docs/plugins/username">username plugin</Link>. It extends the
  email and password authenticator with username support.
</Callout>

## Enable Email and Password

To enable email and password authentication, you need to set the `emailAndPassword.enabled` option to `true` in the `auth` configuration.

```ts title="auth.ts"
import { betterAuth } from "better-auth";

export const auth = betterAuth({
  emailAndPassword: { // [!code highlight]
    enabled: true, // [!code highlight]
  }, // [!code highlight]
});
```

<Callout type="info">
  If it's not enabled, it'll not allow you to sign in or sign up with email and
  password.
</Callout>

## Usage

### Sign Up

To sign a user up, you can use the `signUp.email` function provided by the client.

### Client Side

```ts
const { data, error } = await authClient.signUp.email({
    name: John Doe,
    email: john.doe@example.com,
    password: password1234,
    image: https://example.com/image.png, // optional
    callbackURL: https://example.com/callback, // optional
});
```

### Server Side

```ts
const data = await auth.api.signUpEmail({
    body: {
        name: John Doe,
        email: john.doe@example.com,
        password: password1234,
        image: https://example.com/image.png, // optional
        callbackURL: https://example.com/callback, // optional
    }
});
```

### Type Definition

```ts
type signUpEmail = {
    /**
     * The name of the user.
     */
    name: string = "John Doe"
    /**
     * The email address of the user.
     */
    email: string = "john.doe@example.com"
    /**
     * The password of the user. It should be at least 8 characters long and max 128 by default.
     */
    password: string = "password1234"
    /**
     * An optional profile image of the user.
     */
    image?: string = "https://example.com/image.png"
    /**
     * An optional URL to redirect to after the user signs up.
     */
    callbackURL?: string = "https://example.com/callback"

}
```

<Callout>
  These are the default properties for the sign up email endpoint, however it's possible that with [additional fields](/docs/concepts/typescript#additional-fields) or special plugins you can pass more properties to the endpoint.
</Callout>

### Sign In

To sign a user in, you can use the `signIn.email` function provided by the client.

### Client Side

```ts
const { data, error } = await authClient.signIn.email({
    email: john.doe@example.com,
    password: password1234,
    rememberMe, // optional
    callbackURL: https://example.com/callback, // optional
});
```

### Server Side

```ts
const data = await auth.api.signInEmail({
    body: {
        email: john.doe@example.com,
        password: password1234,
        rememberMe, // optional
        callbackURL: https://example.com/callback, // optional
    },
    // This endpoint requires session cookies.
    headers: await headers()
});
```

### Type Definition

```ts
type signInEmail = {
    /**
     * The email address of the user.
     */
    email: string = "john.doe@example.com"
    /**
     * The password of the user. It should be at least 8 characters long and max 128 by default.
     */
    password: string = "password1234"
    /**
     * If false, the user will be signed out when the browser is closed. (optional) (default: true)
     */
    rememberMe?: boolean = true
    /**
     * An optional URL to redirect to after the user signs in. (optional)
     */
    callbackURL?: string = "https://example.com/callback"

}
```

<Callout>
  These are the default properties for the sign in email endpoint, however it's possible that with [additional fields](/docs/concepts/typescript#additional-fields) or special plugins you can pass different properties to the endpoint.
</Callout>

### Sign Out

To sign a user out, you can use the `signOut` function provided by the client.

### Client Side

```ts
const { data, error } = await authClient.signOut({});
```

### Server Side

```ts
await auth.api.signOut({

    // This endpoint requires session cookies.
    headers: await headers()
});
```

### Type Definition

```ts
type signOut = {

}
```

you can pass `fetchOptions` to redirect onSuccess

```ts title="auth-client.ts" 
await authClient.signOut({
  fetchOptions: {
    onSuccess: () => {
      router.push("/login"); // redirect to login page
    },
  },
});
```

### Email Verification

To enable email verification, you need to pass a function that sends a verification email with a link. The `sendVerificationEmail` function takes a data object with the following properties:

* `user`: The user object.
* `url`: The URL to send to the user which contains the token.
* `token`: A verification token used to complete the email verification.

and a `request` object as the second parameter.

```ts title="auth.ts"
import { betterAuth } from "better-auth";
import { sendEmail } from "./email"; // your email sending function

export const auth = betterAuth({
  emailVerification: {
    sendVerificationEmail: async ( { user, url, token }, request) => {
      void sendEmail({
        to: user.email,
        subject: "Verify your email address",
        text: `Click the link to verify your email: ${url}`,
      });
    },
  },
});
```

<Callout type="warn">
  Avoid awaiting the email sending to prevent
  timing attacks. On serverless platforms, use `waitUntil` or similar to ensure the email is sent.
</Callout>

On the client side you can use `sendVerificationEmail` function to send verification link to user. This will trigger the `sendVerificationEmail` function you provided in the `auth` configuration.

Once the user clicks on the link in the email, if the token is valid, the user will be redirected to the URL provided in the `callbackURL` parameter. If the token is invalid, the user will be redirected to the URL provided in the `callbackURL` parameter with an error message in the query string `?error=invalid_token`.

#### Require Email Verification

If you enable require email verification, users must verify their email before they can log in. And every time a user tries to sign in, sendVerificationEmail is called.

<Callout>
  This only works if you have sendVerificationEmail implemented and if the user
  is trying to sign in with email and password.
</Callout>

```ts title="auth.ts"
export const auth = betterAuth({
  emailAndPassword: {
    requireEmailVerification: true,
  },
});
```

If a user tries to sign in without verifying their email, you can handle the error and show a message to the user.

```ts title="auth-client.ts"
await authClient.signIn.email(
  {
    email: "email@example.com",
    password: "password",
  },
  {
    onError: (ctx) => {
      // Handle the error
      if (ctx.error.status === 403) {
        alert("Please verify your email address");
      }
      //you can also show the original error message
      alert(ctx.error.message);
    },
  }
);
```

#### Triggering manually Email Verification

You can trigger the email verification manually by calling the `sendVerificationEmail` function.

```ts
await authClient.sendVerificationEmail({
  email: "user@email.com",
  callbackURL: "/", // The redirect URL after verification
});
```

### Request Password Reset

To allow users to reset a password first you need to provide `sendResetPassword` function to the email and password authenticator. The `sendResetPassword` function takes a data object with the following properties:

* `user`: The user object.
* `url`: The URL to send to the user which contains the token.
* `token`: A verification token used to complete the password reset.

and a `request` object as the second parameter.

```ts title="auth.ts"
import { betterAuth } from "better-auth";
import { sendEmail } from "./email"; // your email sending function

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({user, url, token}, request) => {
      void sendEmail({
        to: user.email,
        subject: "Reset your password",
        text: `Click the link to reset your password: ${url}`,
      });
    },
    onPasswordReset: async ({ user }, request) => {
      // your logic here
      console.log(`Password for user ${user.email} has been reset.`);
    },
  },
});
```

<Callout type="warn">
  Avoid awaiting the email sending to prevent
  timing attacks. On serverless platforms, use `waitUntil` or similar to ensure the email is sent.
</Callout>

Additionally, you can provide an `onPasswordReset` callback to execute logic after a password has been successfully reset.

Once you configured your server you can call `requestPasswordReset` function to send reset password link to user. If the user exists, it will trigger the `sendResetPassword` function you provided in the auth config.

### Client Side

```ts
const { data, error } = await authClient.requestPasswordReset({
    email: john.doe@example.com,
    redirectTo: https://example.com/reset-password, // optional
});
```

### Server Side

```ts
const data = await auth.api.requestPasswordReset({
    body: {
        email: john.doe@example.com,
        redirectTo: https://example.com/reset-password, // optional
    }
});
```

### Type Definition

```ts
type requestPasswordReset = {
    /**
     * The email address of the user to send a password reset email to 
     */
    email: string = "john.doe@example.com"
    /**
     * The URL to redirect the user to reset their password. If the token isn't valid or expired, it'll be redirected with a query parameter `?error=INVALID_TOKEN`. If the token is valid, it'll be redirected with a query parameter `?token=VALID_TOKEN 
     */
    redirectTo?: string = "https://example.com/reset-password"

}
```

When a user clicks on the link in the email, they will be redirected to the reset password page. You can add the reset password page to your app. Then you can use `resetPassword` function to reset the password. It takes an object with the following properties:

* `newPassword`: The new password of the user.

```ts title="auth-client.ts"
const { data, error } = await authClient.resetPassword({
  newPassword: "password1234",
  token,
});
```

### Client Side

```ts
const { data, error } = await authClient.resetPassword({
    newPassword: password1234,
    token,
});
```

### Server Side

```ts
const data = await auth.api.resetPassword({
    body: {
        newPassword: password1234,
        token,
    }
});
```

### Type Definition

```ts
type resetPassword = {
    /**
     * The new password to set 
     */
    newPassword: string = "password1234"
    /**
     * The token to reset the password 
     */
    token: string

}
```

### Update password

A user's password isn't stored in the user table. Instead, it's stored in the account table. To change the password of a user, you can use one of the following approaches:

### Client Side

```ts
const { data, error } = await authClient.changePassword({
    newPassword: newpassword1234,
    currentPassword: oldpassword1234,
    revokeOtherSessions, // optional
});
```

### Server Side

```ts
const data = await auth.api.changePassword({
    body: {
        newPassword: newpassword1234,
        currentPassword: oldpassword1234,
        revokeOtherSessions, // optional
    },
    // This endpoint requires session cookies.
    headers: await headers()
});
```

### Type Definition

```ts
type changePassword = {
    /**
     * The new password to set 
     */
    newPassword: string = "newpassword1234"
    /**
     * The current user password 
     */
    currentPassword: string = "oldpassword1234"
    /**
     * When set to true, all other active sessions for this user will be invalidated
     */
    revokeOtherSessions?: boolean = true

}
```

### Configuration

**Password**

Better Auth stores passwords inside the `account` table with `providerId` set to `credential`.

**Password Hashing**: Better Auth uses `scrypt` to hash passwords. The `scrypt` algorithm is designed to be slow and memory-intensive to make it difficult for attackers to brute force passwords. OWASP recommends using `scrypt` if `argon2id` is not available. We decided to use `scrypt` because it's natively supported by Node.js.

You can pass custom password hashing algorithm by setting `password` option in the `emailAndPassword` configuration.

**Example**

Here's an example of customizing the password hashing to use Argon2:

```ts title="password.ts"
import { hash, type Options, verify } from "@node-rs/argon2";

const opts: Options = {
  memoryCost: 65536, // 64 MiB
  timeCost: 3, // 3 iterations
  parallelism: 4, // 4 lanes
  outputLen: 32, // 32 bytes
  algorithm: 2, // Argon2id
};

export async function hashPassword(password: string) {
  const result = await hash(password, opts);
  return result;
}

export async function verifyPassword(data: { password: string; hash: string }) {
  const { password, hash } = data;
  const result = await verify(hash, password, opts);
  return result;
}
```

```ts title="auth.ts"
import { betterAuth } from "better-auth";
import { hashPassword, verifyPassword } from "./password";

export const auth = betterAuth({
  emailAndPassword: {
    //...rest of the options
    enabled: true,
    password: {
      hash: hashPassword,
      verify: verifyPassword,
    },
  },
});
```

<TypeTable
  type={{
  enabled: {
    description: "Enable email and password authentication.",
    type: "boolean",
    default: "false",
  },
  disableSignUp: {
    description: "Disable email and password sign up.",
    type: "boolean",
    default: "false"
  },
  minPasswordLength: {
    description: "The minimum length of a password.",
    type: "number",
    default: 8,
  },
  maxPasswordLength: {
    description: "The maximum length of a password.",
    type: "number",
    default: 128,
  },
  sendResetPassword: {
    description:
      "Sends a password reset email. It takes a function that takes two parameters: token and user.",
    type: "function",
  },
  onPasswordReset: {
    description:
      "A callback function that is triggered when a user's password is changed successfully.",
    type: "function",
  },
  resetPasswordTokenExpiresIn: {
    description:
      "Number of seconds the reset password token is valid for.",
    type: "number",
    default: 3600
  },
  password: {
    description: "Password configuration.",
    type: "object",
    properties: {
      hash: {
        description: "custom password hashing function",
        type: "function",
      },
      verify: {
        description: "custom password verification function",
        type: "function",
      },
    },
  },
}}
/>

