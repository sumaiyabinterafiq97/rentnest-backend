import bcrypt from 'bcrypt';
import config from '../../config';
import { jwtHelpers } from '../../shared/jwtHelpers';
import { Secret } from 'jsonwebtoken';

import prisma from "../../shared/prisma";

const registerUser = async (payload: any) => {
  const { name, email, password, role } = payload;
  
  // Check if user exists
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new Error('User already exists with this email');
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, Number(config.bcrypt_salt_rounds));

  // Create user
  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role: role || 'TENANT',
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    }
  });

  return newUser;
};

const loginUser = async (payload: any) => {
  const { email, password } = payload;
  
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new Error('User not found');
  }

  if (user.status === 'BANNED') {
    throw new Error('This user account is banned');
  }

  const isPasswordMatched = await bcrypt.compare(password, user.password);
  if (!isPasswordMatched) {
    throw new Error('Incorrect password');
  }

  const jwtPayload = {
    id: user.id,
    role: user.role,
    email: user.email,
  };

  const accessToken = jwtHelpers.createToken(
    jwtPayload,
    config.jwt_access_secret as Secret,
    config.jwt_access_expires_in as string
  );

  return {
    accessToken,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    }
  };
};

const getMe = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    }
  });
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};

export const AuthService = {
  registerUser,
  loginUser,
  getMe,
};
