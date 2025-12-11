import bcrypt from 'bcryptjs';
import { readFileSync } from 'fs';
import { join } from 'path';

function getUserByEmail(email) {
  const dbPath = join(process.cwd(), 'db.json');
  const raw = readFileSync(dbPath, 'utf-8');
  const data = JSON.parse(raw);
  return data.users.filter((u) => u.email === email);
}

export const authOptions = {
  providers: [
    {
      id: 'credentials',
      name: 'Credentials',
      type: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password are required');
        }

        const users = getUserByEmail(credentials.email);
        const user = users[0];

        if (!user) {
          throw new Error('Invalid credentials');
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          throw new Error('Invalid credentials');
        }

        return {
          id: String(user.id),
          email: user.email,
          name: user.name,
          role: user.role,
          phone: user.phone,
        };
      },
    },
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.phone = user.phone;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.phone = token.phone;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET || 'rentify-secret-key-change-in-production',
};
