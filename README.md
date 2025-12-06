
// (나의 최애의 포토 디자인 사진 (팀 , 최애의 포토 이미지))

---
## 목차
  1. [프로젝트 개요](#overview) 
  2. [팀원 소개](#team-members)
  3. [FE 시스템 아키텍처](#fe-system-architecture)
  4. [기술 스택](#tech-stack)
  5. [주요 기능](#key-features)
  6. [팀 문서](#team-documents)
  7. [폴더 구조](#directory-structure)
  8. [백엔드 구경해보기](#check-out-the-backend)
  9. [팀원 개발 리포트](#team-member-development-reports)
---

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![Next.js](https://img.shields.io/badge/Next.js-16.0.4-000000?style=flat&logo=next.js)
![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=flat&logo=react)

## Overview

**'최애의 포토'**는 단순히 사진을 저장하는 것을 넘어, 소중한 순간을 **'포토카드'**라는 자산으로 만들어 소장하고 유저들과 교류하는 웹 플랫폼입니다.

휘발되는 SNS 피드와 달리, 이곳에서는 당신의 '최애' 순간들이 고유한 가치를 지닌 카드가 됩니다. 나만의 컬렉션을 완성하고, 마켓플레이스에서 취향이 맞는 사람들과 카드를 교환하거나 거래하며 덕질의 즐거움을 확장해 보세요.

### 핵심 가치
- **Create**: 나만의 소중한 사진을 고유 등급과 장르를 가진 카드로 생성
- **Collect**: 랜덤 포인트 드로우를 통한 수집의 재미
- **Trade**: 유저 간 1:1 교환 및 마켓플레이스를 통한 경제 활동
- **Connect**: 같은 취향을 가진 팬덤과의 연결

---

## Team Members

| **Role** | **Name** | **GitHub / Contact** |
| :---: | :---: | :---: |
| **Team Leader** | **김윤기** | [@youn_gi_kim](https://github.com/rklpoi5678) |
| **FE/BE Developer** | **박창기** | [@changki](https://github.com/p-changki) |
| **FE/BE Developer** | **이유리** | [@yoorrll](https://github.com/yoorrll) |
| **FE Developer** | **오마린** | [@oh1marin](https://github.com/oh1marin) |

---
## FE System Architecture

(아키텍처 사진)

---

## Tech Stack

본 프로젝트는 최신 웹 트렌드를 반영하여 **Next.js 16 (App Router)** 과 **React 19** 환경에서 구축되었습니다.

### **Frontend Core**
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

### **Styling**
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

**Utilities**: `clsx`, `tailwind-merge`, `class-variance-authority (CVA)`

**UI Components**: Headless UI (`@headlessui/react`)

### **Form & state**
![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-%23EC5990.svg?style=for-the-badge&logo=reacthookform&logoColor=white) ![Zod](https://img.shields.io/badge/zod-%233068b7.svg?style=for-the-badge&logo=zod&logoColor=white) ![React Query](https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white) ![JWT-docoded](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)

### **Dev Tools & CI/CD**
![Prettier](https://img.shields.io/badge/prettier-%23192a32?style=for-the-badge&logo=prettier&logoColor=dc524a)
![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)

**other**: husky,lint-stage 

---

## Key Features


### 1️⃣ 마켓플레이스 (Marketplace)
- **둘러보기**: 판매 등록된 전 세계 유저들의 포토카드를 구경할 수 있습니다.
- **스마트 검색**: 키워드, 희귀도(등급), 가격순, 매진 여부 등 다양한 필터를 제공합니다.
- **무한 탐색**: 무한 스크롤(Infinite Scroll)을 적용하여 끊김 없는 사용자 경험을 제공합니다.

### 2️⃣ 나만의 갤러리 (My Gallery)
- **카드 생성(Minting)**: Cloudinary 연동을 통해 이미지를 업로드하고 나만의 포토카드를 발행합니다.
- **컬렉션 관리**: 내가 보유한 카드를 등급별로 정리하고 감상할 수 있습니다.

### 3️⃣ 포인트 시스템 (point system)
- **포인트 드로우**: 1시간마다 랜덤 포인트를 획득하여 구매 자금을 마련할 수 있습니다.
- **거래(Trading)**: 보유한 카드를 마켓에 판매 등록하거나, 원하는 카드를 구매할 수 있습니다.
- **물물 교환**: 포인트가 없어도 걱정 마세요. 1:1 카드 맞교환 제안 기능을 지원합니다.

### 4️⃣ 인터랙션 & 알림 (Interaction)
- **실시간 알림**: 내 카드에 대한 구매 요청, 교환 신청, 거래 성사 여부를 알림 센터에서 즉시 확인합니다.
- **거래 히스토리**: 나의 판매 및 구매 이력을 투명하게 관리합니다.

---

## Team Documents


노션 주소
미로 주소

## Directory Structure

```bash
📦 src
├── 📂 app              # Next.js App Router 페이지
├── 📂 components       # 재사용 가능한 공통 컴포넌트 (Atomic Design 지향)
│   ├── 📂 ui           # 버튼, 인풋 등 기본 UI 요소
│   └── 📂 common       # 헤더, 푸터 등 레이아웃 요소
├── 📂 hooks            # 커스텀 React Hooks
├── 📂 libs              # 유틸리티 함수 및 설정 (axios, utils 등)
```
## Check out the Backend
[나의 최애의 포토 백엔드](https://github.com/My-favorite-photo/be-my-favorite-photo)

## Team Member Development Reports

