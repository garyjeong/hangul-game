# 한글 놀이 🦊

어린이를 위한 재미있는 한글 학습 게임입니다.

## 게임 소개

### 🎨 그림 맞추기
그림(이모지)을 보고 맞는 한글 단어를 찾는 게임입니다.
- 10문제 출제
- 음성(TTS)으로 단어 발음 듣기
- 정답 개수에 따른 별점 획득

### 🃏 카드 뒤집기
같은 짝을 찾아 카드를 뒤집는 메모리 게임입니다.
- 한글 단어와 이모지 짝 맞추기
- 기억력과 한글 학습을 동시에

## 학습 단어

| 카테고리 | 단어 |
|---------|------|
| 🐶 동물 | 강아지, 고양이, 토끼, 새, 물고기, 곰, 사자, 코끼리 |
| 🍎 과일 | 사과, 바나나, 포도, 수박, 딸기, 오렌지, 복숭아, 체리 |
| 🚗 탈것 | 자동차, 버스, 비행기, 배, 자전거, 기차, 헬리콥터, 오토바이 |

## 기술 스택

- **프론트엔드**: React 19, Vite 7
- **스타일링**: Tailwind CSS 4
- **라우팅**: React Router DOM 7
- **음성**: Web Speech API (TTS)
- **배포**: Docker, Fly.io

## 시작하기

### 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

### 빌드

```bash
npm run build
```

### 미리보기

```bash
npm run preview
```

## 배포

### Docker

```bash
docker build -t hangul-game .
docker run -p 8080:80 hangul-game
```

### Fly.io

```bash
fly deploy
```

## 프로젝트 구조

```
src/
├── components/     # 공통 컴포넌트
├── data/          # 단어 데이터
├── hooks/         # 커스텀 훅 (TTS, 진행상황)
└── pages/         # 페이지 컴포넌트
    ├── Home.jsx
    ├── MatchingGame.jsx
    └── MemoryGame.jsx
```

## 라이선스

MIT
