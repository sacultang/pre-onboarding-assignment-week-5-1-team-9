# 원티드 프리온보딩 6차 5-1 과제

## ⛹️ 9팀 소개

| <img src="https://avatars.githubusercontent.com/u/92010078?v=4"/> | <img src="https://avatars.githubusercontent.com/u/92101831?v=4"/> | <img src="https://avatars.githubusercontent.com/u/69101321?v=4"/> | <img src="https://avatars.githubusercontent.com/u/85508157?v=4"/> | <img src="https://avatars.githubusercontent.com/u/97271725?v=4"> |
| ----------------------------------------------------------------- | ----------------------------------------------------------------- | ----------------------------------------------------------------- | ----------------------------------------------------------------- | ---------------------------------------------------------------- |
| <a href="https://github.com/many-yun">[팀장] 김다윤</a>           | <a href="https://github.com/blcklamb">김채정</a>                  | <a href="https://github.com/jaehyeon74">박재현</a>                | <a href="https://github.com/sacultang">오영재</a>                 | <a href="https://github.com/jungdeokwoo">정덕우</a>              |

## 📜 목차

- [과제 소개](#과제-소개)
- [설치 및 실행](#설치-및-실행)
- [영상](#영상)
- [구현 기능](#구현-기능)
- [기술 스택](#기술-스택)
- [파일 구조](#파일-구조)

## 📬 과제 소개

- 검색창 구현 + 검색어 추천 기능 구현
- [과제 관련 레포지토리](https://github.com/walking-sunset/assignment-api)
- 작업기간: 2022.09.27 ~ 2022.09.29

<br>

## [🏄‍♀️ 바로 실행하기](https://wanted-5-1.herokuapp.com/)

- 배포 주소: https://wanted-5-1.herokuapp.com/

## 💻 설치 및 실행

<br>

> git clone

```bash
> git clone https://github.com/wanted-9team/pre-onboarding-assignment-week-5-1-team-9

> cd pre-onboarding-assignment-week-5-1-team-9

# 동시실행 관련 패키지 설치
> npm install

# 서버 & 클라이언트 동시 실행
> npm run start
```

> 서버 및 데이터

```bash
# server directory
> cd server

# 관련 패키지 설치
> npm install

```

> 클라이언트

```bash
# client directory
> cd client

# 관련 패키지 설치
> npm install

```

## 🎥 데모

https://user-images.githubusercontent.com/85508157/192806655-a6c06ff7-3254-498e-9a68-76cb9f343388.mov

<br><br>

## 👍 구현 기능에 대한 Best Practices

### ☑️ 질환명 검색시 API 호출 통해서 검색어 추천 기능 구현

- [x] 사용자가 입력한 텍스트와 일치하는 부분 볼드처리
- [x] 검색어가 없을 시 "검색어 없음" 표출

### ☑️ API 호출 최적화

- [x] API 호출별로 로컬 캐싱 구현 => useRef를 이용한 커스텀 훅 useCache를 통해 구현

[참고 파일\_hooks/useCache](https://github.com/wanted-9team/pre-onboarding-assignment-week-5-1-team-9/tree/master/client/src/hooks/useCache.js)

처음에 cacheApi란 useRef를 생성시킵니다. useRef 초기값으론 빈 객체를 넣어줍니다.

useReducer와 useEffect를 이용해 상태를 업데이트하는 로직을 작성했습니다. 상태는 총 ‘RENDERING’, ‘REDNERED’, ‘RESET’, ‘NORESULTS’, ‘ERROR’로 나누었습니다. useEffect 로직 안에서 처음 if 문에서 만약 query 값이 falsy 값일 때 dispatch로 타입이 ‘RESET’인 액션을 실행시키고 이 때 빈 배열을 payload로 data에 넘겨줍니다. 이후 getData 함수를 실행하는데, 처음에 type이 ‘RENDERING’인 액션을 실행시키고 이 때도 역시 payload로 빈 배열을 넘겨줍니다. 이후 cacheApi의 current 프로퍼티에 해당 query 값이 key 값으로 존재한다면 api 호출을 실행시키지 않고 타입이 ‘RENDERED’란 액션을 실행시키고 원래 cacheApi.current에 존재하던 data를 payload로 넘겨줍니다. 해당 query 값이 key 값에 존재하지 않았다면 두 가지 상황에 처하게 됩니다. 하나는 api를 실행해서 데이터를 받아오고, 데이터의 길이가 0인 빈 배열일 때 type이 ‘NORESULTS’란 액션을 실행하고, 길이가 있는 배열이라면 cacheApi.current에 데이터를 저장하고, 타입이 ‘RENDERED’란 액션을 실행시킵니다.

getData 함수는 useEffect 안에서 해당 query를 의존성 배열로 받아서, query 값이 변할 때마다 실행됩니다. 위에서 설명했듯이 해당 query가 cacheApi.current 값에 존재하면 api를 호출하지 않고 원래 존재하던 값을 넘겨주게 됩니다.
<br>

- [x] API 호출 횟수를 줄이는 전략 수립 => useDebounce 훅을 이용해 구현

[참고 파일\_hooks/useDebounce](https://github.com/wanted-9team/pre-onboarding-assignment-week-5-1-team-9/tree/master/client/src/hooks/useDebounce.js)

1. 검색어가 입력될 때마다 커스텀 훅인 useDebounce()를 실행시킵니다.
2. useDebounce()는 입력한 검색어가 변경될 때마다 setTimeout()을 콜백 함수로 실행시킵니다.
3. 해당 함수를 실행시킨 다음 delay만큼 시간이 지난 뒤 가장 마지막으로 입력받은 검색어만을 useCache()로 넘깁니다.
4. 즉, 검색어를 입력한 뒤 delay ms 후 get 요청을 한 번 보냅니다.

```
function useDebounce(value, delay = 800) {
  const [debounceVal, setDebounceVal] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceVal(value)
    }, delay)
    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debounceVal
}

```

### ☑️ 키보드만으로 추천 검색어들로 이동 가능하도록 구현

일단 컴포넌트 상에서 index를 확인하기위해 useState로 currentIndex를 생성한 후,

전체 container에 onKeyDown 이벤트를 통해서 event.code를 통해 상하 화살표를 제외한 나머지 키코드가 입력되는 경우 early return 시키고, 검색결과의 경우 map을 돌릴 때 최상단 index가 0에서 부터 1씩 증가하기 때문에 위쪽 화살표가 입력되는 경우에는 index를 1씩 감소, 아래쪽 화살표는 index를 1씩 증가시킵니다.

추천검색의 리스트 컴포넌트에 `isSelected={ index === currentIndex }`를 통해 현재 선택된 리스트의 index값과 컴포넌트 자체의 index 값을 비교하여 isSelected의 값을 결정하고, isSelected가 true 일때 스타일 컴포넌트를 활용하여 배경색을 변경시켜주면 아래, 위 화살표를 누를 때마다 선택영역이 이동합니다.

input값을 입력할때 한글의 경우 조합어이기 때문에 한글을 입력하다가 다른키를 누르면 onKeyDown이 두번 작동하게 되는데 이때, onKeyDown 이벤트의 nativeEvent.isComposing(조합어를 작성하는지 여부를 확인)값이 true일때는 그냥 return 시키고, false일때(조합어를 작성하지 않는 경우) 조건에 따라 index 가 변경되도록 하여 키보드를 통해 이동 가능하도록 구현하였습니다.

## 📚 기술 스택

<div>
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white"/>
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=white"/>
<img src="https://img.shields.io/badge/styled components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white"/>
</div>
<br>

## 🗂 폴더 구조

```bash
├─ server
└─ client
    ├─ public
    └─ src
        ├─ api
        │   ├─ base.js
        │   └─ searchAPI.js
        ├─ components
        │   ├─ Header.jsx
        │   ├─ Highlights.jsx
        │   ├─ Loading.jsx
        │   ├─ NoResults.jsx
        │   ├─ RecommendedKeyword.jsx
        │   ├─ Searchbar.jsx
        │   └─ Spinner.jsx
        ├─ consts
        │   └─ api.js
        ├─ hooks
        │   ├─ useCache.js
        │   └─ useDebounce.js
        ├─ styles
        │   └─ GlobalStyle.jsx
        ├─ App.js
        └─ index.js

```
