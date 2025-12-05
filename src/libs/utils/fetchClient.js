/**
 * 서비스 클라이언트 예시
 * 다른 서비스에 사용할 패치 클라이언트
 */

import { getServerSideToken } from '../actions/auth';

// export const defaultFetch = async

// export const cookieFetch  = async

// export const formDataFetch = async

/**
 * 기본 fetch 클라이언트 - 인증이 필요 없는 일반 요청용
 */

export const defaultFetch = async (url, options = {}) => {
  const baseURL = process.env.NEXT_PUBLIC_API_URL;
  console.log('🔥 FULL URL:', `${baseURL}${url}`);
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
    // Next.js 기본 캐싱 활성화
    cache: 'force-cache',
    credentials: 'include',
  };

  const mergedOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  const response = await fetch(`${baseURL}${url}`, mergedOptions);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message);
  }

  return response.json();
};

/**
 * 토큰 인증 fetch 클라이언트
 */
export const tokenFetch = async (url, options = {}) => {
  const baseURL = process.env.NEXT_PUBLIC_API_URL;
  const token = await getServerSideToken('accessToken');
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    // 서버 컴포넌트에서도 매번 재검증
    cache: 'no-store',
  };

  const mergedOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  // 원래 요청 실행
  let response = await fetch(`${baseURL}${url}`, mergedOptions);

  // 401 에러 발생 시 토큰 갱신 시도
  if (response.status === 401 && url !== '/auth/refresh') {
    try {
      // 토큰 갱신 요청
      const refreshResponse = await fetch(`${baseURL}/auth/refresh`, {
        method: 'POST',
        credentials: 'include',
        cache: 'no-store',
      });

      if (refreshResponse.ok) {
        // 토큰 갱신 성공 시 원래 요청 재시도
        response = await fetch(`${baseURL}${url}`, mergedOptions);
      }
    } catch (error) {
      const errorData = await refreshResponse.json();
      throw new Error(JSON.stringify(errorData));
    }
  }

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message);
  }

  // 응답 본문이 있는지 확인
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return response.json();
  }

  // 본문이 없거나 JSON이 아닌 경우 응답 객체 자체 반환
  return { status: response.status, ok: response.ok };
};
