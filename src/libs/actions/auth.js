'use server';

import { jwtDecode } from 'jwt-decode';
import { cookies } from 'next/headers';

import { authService } from '@/libs/services/authService';

// 서버 사이드 전용 함수
export async function getServerSideToken(type = 'accessToken') {
  const cookieStore = await cookies();
  const tokenCookie = cookieStore.get(type);
  return tokenCookie ? tokenCookie.value : null;
}

export async function setServerSideTokens(accessToken, refreshToken) {
  const cookieStore = await cookies();

  // accessToken 디코딩
  const accessTokenData = jwtDecode(accessToken);
  const accessTokenExpiresIn = accessTokenData.exp - Math.floor(Date.now() / 1000);

  // accessToken 쿠키 저장
  cookieStore.set('accessToken', accessToken, {
    path: '/',
    maxAge: accessTokenExpiresIn,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
  });

  // ⭐ refreshToken 이 있을 때만 처리 (loginAction에서는 null 넘기니까 여기 안 탐)
  if (refreshToken) {
    const refreshTokenData = jwtDecode(refreshToken);
    const refreshTokenExpiresIn = refreshTokenData.exp - Math.floor(Date.now() / 1000);

    cookieStore.set('refreshToken', refreshToken, {
      path: '/',
      maxAge: refreshTokenExpiresIn,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
    });
  }
}

export async function updateAccessToken(accessToken) {
  const cookieStore = await cookies();

  const accessTokenData = jwtDecode(accessToken);

  const accessTokenExpiresIn = accessTokenData.exp - Math.floor(Date.now() / 1000);

  cookieStore.set('accessToken', accessToken, {
    path: '/',
    maxAge: accessTokenExpiresIn,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
  });
}

export async function clearServerSideTokens() {
  const cookieStore = await cookies();

  // 액세스 토큰 삭제
  cookieStore.delete('accessToken');

  // 리프레시 토큰 삭제
  cookieStore.delete('refreshToken');

  return { success: true };
}

export async function loginAction(email, password) {
  const { user, accessToken } = await authService.login(email, password);

  if (!accessToken) {
    return { success: false, error: '액세스 토큰 없음' };
  }

  await setServerSideTokens(accessToken, null);
  return { success: true, userData: user };
}

export async function registerAction(nickname, email, password, passwordConfirmation) {
  const { user } = await authService.register(nickname, email, password, passwordConfirmation);

  return { success: true, userData: user };
}

// src/lib/actions/auth.js에 추가

/**
 * 인증 상태를 확인하고 필요시 토큰을 갱신합니다
 * @returns {Promise<boolean>} 인증 성공 여부
 */
export async function checkAndRefreshAuth() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  // 1. accessToken이 있으면 인증됨
  if (accessToken) {
    return true;
  }

  // 2. accessToken 없고 refreshToken도 없으면 인증 실패
  if (!refreshToken) {
    return false;
  }

  // 3. refreshToken으로 갱신 시도
  try {
    const baseURL = process.env.NEXT_PUBLIC_API_URL;
    const response = await fetch(`${baseURL}/auth/refresh`, {
      method: 'POST',
      credentials: 'include',
      cache: 'no-store',
    });

    if (response.ok) {
      const { accessToken: newAccessToken } = await response.json();

      // 새 토큰 저장
      await updateAccessToken(newAccessToken);

      return true; // 갱신 성공
    }

    return false; // 갱신 실패
  } catch (error) {
    console.error('토큰 갱신 중 오류:', error);
    return false;
  }
}
