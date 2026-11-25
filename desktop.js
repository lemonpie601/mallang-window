// ──────────────────────────────────────────────────────────────
// Marinara Desktop — a desktop-OS shell for Marinara Engine.
//
// Full-page Personal Extension. Marinara runs this file as the body of
// `async (marinara) => { ... }`, so top-level await and `return` work.
//
// How it works: Marinara's own React UI keeps running untouched. This
// extension only (1) restyles the shell regions through CSS variables and
// classes on <html>, (2) appends small chrome nodes (title bars, resize
// grips, a springboard on touch screens) to those regions, and (3) drives
// navigation by clicking Marinara's own (hidden) buttons. Disable the
// extension and everything is removed.
//
// Modes:
//   desktop — wide screens with a mouse: menu bar, Dock, floating windows,
//             and Home becomes the bare desktop with widgets.
//   touch   — phones and touch tablets (Marinara's own full-screen shell):
//             springboard home screen, iOS-style Dock and home indicator.
// ──────────────────────────────────────────────────────────────

const doc = document;
const html = doc.documentElement;
// Windows 11 edition: every Marinara app (Conversation, Roleplay, Game, each
// library panel, Home tab apps, single chats) opens as its own window, which
// is a separate Marinara page in a frame. Inside such a frame this script runs
// in "embed" mode: no taskbar or desktop, just the one app filling the frame.
const EMBED = (() => {
  try {
    return window.top !== window ? new URLSearchParams(location.search).get("mdos-embed") : null;
  } catch {
    return null;
  }
})();
if (EMBED) html.classList.add("mdos-embed");
const IS_MAC = /mac|iphone|ipad/i.test(navigator.userAgentData?.platform || navigator.platform || "");
const KO = /^ko/i.test(html.lang || navigator.language || "");

const L = KO
  ? {
      home: "홈",
      desktopTitle: "데스크톱",
      chats: "채팅",
      characters: "캐릭터",
      personas: "페르소나",
      lorebooks: "로어북",
      presets: "프리셋",
      connections: "연결",
      agents: "에이전트",
      settings: "설정",
      search: "검색",
      launchpad: "시작",
      snapLayouts: "스냅 레이아웃",
      separateWindows: "앱마다 따로 창 열기",
      recommended: "추천",
      noRecent: "최근 채팅이 여기에 표시돼요.",
      showDesktop: "바탕 화면 보기",
      focusSession: "집중 세션",
      pinned: "고정됨",
      power: "전원",
      wallpaper: "배경화면",
      accent: "강조 색상",
      classic: "클래식 레이아웃",
      desktop: "데스크톱 모드",
      reload: "새로 고침",
      about: "Marinara Desktop에 관하여",
      aboutShort: "정보",
      view: "보기",
      window: "창",
      dock: "작업 표시줄",
      help: "도움말",
      close: "닫기",
      minimize: "최소화",
      zoom: "확대/축소",
      tile: "창 정리",
      resetLayout: "창 배치 초기화",
      nextWindow: "다음 창",
      showDesktop: "데스크톱 보기",
      editor: "편집기",
      panel: "패널",
      magnify: "확대 효과",
      autohide: "작업 표시줄 자동 숨기기",
      recents: "작업 표시줄에 최근 채팅 보이기",
      bootSplash: "시작 화면 보이기",
      iconView: "캐릭터·페르소나 아이콘으로 보기",
      dockSize: "작업 표시줄 아이콘 크기",
      customImage: "이미지 업로드",
      imageUrl: "이미지 주소 (https://…)",
      apply: "적용",
      docs: "Marinara 문서",
      shortcuts: "단축키",
      controlCenter: "빠른 설정",
      tooLarge: "이미지가 너무 커요. 더 작은 이미지를 골라 주세요.",
      storageFull: "확장 저장 공간(1MB)이 거의 찼어요. 배경화면이나 사진·아이콘 이미지를 몇 개 지워 주세요.",
      badUrl: "https:// 로 시작하는 이미지 주소만 쓸 수 있어요.",
      themeWallpaper: "앱 테마",
      appearance: "모양",
      rpStyle: "롤플 화면",
      rpBook: "리더 (세피아·라이트)",
      rpNight: "리더 (다크)",
      rpClean: "깔끔하게",
      convoStyle: "대화 화면",
      convoMessages: "메시지 앱",
      convoMarinara: "마리나라 기본",
      customize: "꾸미기",
      iconStyle: "아이콘 스타일",
      iconShape: "아이콘 모양",
      iconStyles: { fluent: "Fluent (Windows 11)", gradient: "그라데이션", glass: "유리", pastel: "파스텔", tinted: "틴트", dark: "다크" },
      iconShapes: { squircle: "둥근 사각", circle: "동그라미", rounded: "각진 사각" },
      cursor: "마우스 포인터",
      cursorSize: "포인터 크기",
      cursors: { system: "시스템 기본", mac: "검은 화살표", white: "흰 화살표", accent: "강조색 화살표", dot: "동그라미", custom: "내 이미지" },
      cursorSizes: { m: "보통", l: "크게", xl: "아주 크게" },
      cursorImage: "포인터 이미지 올리기…",
      cursorHint: "내 이미지는 배경이 투명한 PNG가 좋아요. 그림의 왼쪽 위 끝이 클릭하는 점이에요. 검은·흰 화살표는 링크와 버튼 위에서 손가락 모양으로 바뀌어요.",
      editIcons: "아이콘 편집…",
      editIcon: "아이콘 편집",
      editWidgets: "위젯 편집",
      addWidget: "위젯 추가",
      done: "완료",
      label: "이름",
      colors: "색상",
      image: "이미지",
      pickImage: "이미지 고르기",
      removeImage: "이미지 빼기",
      reset: "기본값으로",
      remove: "삭제",
      size: "크기",
      style: "스타일",
      sizes: { s: "작게", m: "보통", l: "크게" },
      wStyles: { glass: "유리", light: "밝게", dark: "어둡게", accent: "강조색", clear: "투명" },
      noteColor: "메모 색",
      title: "제목",
      date: "날짜",
      text: "내용",
      modes: ["대화", "롤플레이", "게임"],
      widgetNames: {
        launcher: "새 채팅",
        clock: "시계",
        analog: "아날로그 시계",
        calendar: "캘린더",
        photo: "사진",
        note: "메모",
        dday: "디데이",
        greeting: "인사말",
        credits: "API 크레딧",
        locker: "확장",
        ledger: "API 가계부",
        credit: "크레딧",
      },
      creditPick: "보여 줄 크레딧",
      ledgerTopUse: "많이 쓴 곳",
      ledgerView: "보기 방식",
      ledgerViews: { summary: "요약", calendar: "달력", daily: "일별 막대", top: "많이 쓴 곳", facts: "숫자 모음" },
      ledgerLess: "적게",
      ledgerMore: "많이",
      lockerEmpty: "모아 둔 확장 버튼이 없어요",
      creditsEmpty: "홈을 한 번 열면 크레딧이 여기 표시돼요",
      pickPhoto: "사진을 골라 주세요",
      notePlaceholder: "메모를 적어 보세요",
      ddayDefault: "최애 생일",
      performance: "성능",
      reduceTransparency: "투명 효과 줄이기",
      reduceMotion: "움직임 줄이기",
      recentChats: "최근 채팅",
      open: "열기",
      homeIndicator: "홈으로",
      newChat: "새 채팅",
      notes: "메모장",
      browser: "인터넷",
      youtube: "YouTube",
      newNote: "새 메모",
      deleteNote: "메모 삭제",
      untitled: "제목 없음",
      urlPlaceholder: "주소나 검색어 입력",
      ytPlaceholder: "YouTube 링크를 붙여 넣으세요",
      ytHint: "보고 싶은 YouTube 영상이나 재생목록 링크를 위에 붙여 넣으세요. 창을 띄워 둔 채로 채팅할 수 있어요.",
      load: "열기",
      openOutside: "새 창에서 열기",
      addToHome: "홈 화면에 추가",
      cantEmbed: "이 사이트는 보안 설정 때문에 창 안에 바로 띄울 수 없어요. 리더로 보거나 새 창에서 열 수 있어요.",
      readerView: "리더로 보기",
      readerNote: "리더 보기: 주소를 외부 서비스(r.jina.ai)가 대신 열어 글과 이미지만 가져와요. 로그인·글쓰기는 새 창에서 해 주세요.",
      readerLoading: "불러오는 중… (몇 초 걸릴 수 있어요)",
      readerFail: "리더로 불러오지 못했어요",
      readerEmpty: "이 페이지는 사이트가 리더 서비스를 막고 있어 내용을 가져오지 못했어요. 새 창에서 열어 옆에 띄워 두세요.",
      back: "뒤로",
      favorites: "즐겨찾기",
      noFavorites: "아직 즐겨찾기가 없어요. 주소를 열고 ★ 를 누르면 여기와 홈 화면에 생겨요.",
      pinOnTop: "항상 위에",
      bookmarks: "북마크",
      addBookmark: "북마크 추가",
      bookmarkTitle: "이름",
      bookmarkUrl: "주소 (https://…)",
      add: "추가",
      rename: "이름 바꾸기",
      removeFromDesktop: "데스크톱에서 빼기",
      removeFromHome: "홈 화면에서 빼기",
      addToDesktop: "데스크톱에 추가",
      addApps: "앱·북마크 추가",
      homeLayout: "홈 구성",
      boardPos: "마리나라 홈 위치",
      boardPositions: { left: "왼쪽", center: "가운데", hidden: "숨기기" },
      showCredits: "API 크레딧 카드 보이기",
      showFeed: "마리나라 홈 위젯 보이기",
      arrangeIcons: "아이콘 자동 정렬",
      arrangeWidgets: "위젯 자동 정렬",
      realGlass: "진짜 유리 효과 (느릴 수 있음)",
      apps: "앱",
      settingsTitle: "꾸미기",
      openSettings: "꾸미기 설정 열기…",
      themeSync: "테마 라이브러리와 색상 동기화",
      themeSyncHint: "마리나라 설정 → 모양 → 테마 라이브러리에서 적용한 테마의 색·글꼴·배경을 따라가요. 테마를 바꾸면 바로 반영돼요.",
      themeNow: "지금 적용된 테마",
      themeNone: "기본 테마 (마리나라 강조색만 따라가요)",
      themeAccent: "테마",
      layoutMode: "위젯·아이콘 배치",
      layoutModes: { grid: "그리드", free: "자유" },
      chatDesign: "채팅 꾸미기",
      convo: "대화",
      roleplay: "롤플",
      presets: "프리셋",
      font: "글꼴",
      fonts: { "": "기본 (프리텐다드)", system: "시스템", serif: "명조", rounded: "둥근", hand: "손글씨", mono: "고정폭", theme: "테마 글꼴", custom: "직접 입력" },
      customFont: "글꼴 이름 (예: Pretendard)",
      textSize: "글자 크기",
      lineHeight: "줄 간격",
      myBubble: "내 말풍선",
      theirBubble: "상대 말풍선",
      bubbleText: "글자",
      corner: "모서리",
      chatBg: "채팅 배경",
      chatBgModes: { "": "기본", color: "색", wallpaper: "배경화면 비치게", image: "이미지" },
      avatars: "프로필 사진",
      avatarModes: { circle: "동그라미", rounded: "둥근 사각", hidden: "숨기기" },
      showNames: "이름 보이기",
      columnWidth: "글 폭",
      paper: "종이 색",
      ink: "글자 색",
      preview: "미리보기",
      resetChat: "기본 디자인으로",
      cvPresets: { base: "기본", yellow: "노랑 말풍선", green: "초록 말풍선", dark: "다크", pastel: "파스텔" },
      rpPresets: { book: "세피아", novel: "라이트", night: "다크", parchment: "양피지", typewriter: "타자기" },
      justify: "양쪽 정렬",
      actionsHover: "메시지 버튼은 가리킬 때만",
      actItalic: "행동(* *) 기울이기",
      weather: "날씨 효과(눈·비·햇빛)",
      readerLayout: "읽기 화면",
      sideMargin: "좌우 여백",
      sideMarginHint: "좁은 창과 휴대폰에서 글 양옆의 여백이에요. 0이면 화면 끝까지 써요.",
      lineWrap: "줄바꿈",
      wrapChars: "글자 단위",
      wrapWords: "단어 단위",
      lineWrapHint: "글자 단위는 줄 끝까지 채우고 아무 글자에서나 줄을 바꿔요(영어 단어는 자르지 않아요). 단어 단위는 한국어 단어를 자르지 않지만, 일본어·중국어 문장은 마침표 같은 문장부호에서만 줄이 바뀌어요.",
      pvThem: "오늘 뭐 했어?",
      pvMe: "마리나라 꾸미기 하고 있었어!",
      pvThem2: "오 진짜? 보여 줘 ✨",
      pvRpNar: "창밖으로 비가 내리기 시작했다. ",
      pvRpAct: "그는 찻잔을 내려놓고 조용히 웃었다.",
      pvRpDlg: "“오늘은 여기서 쉬어 가요.”",
      textTone: "대사·서술·행동 색 구분",
      textToneHint: "대사(\" \")는 진하게, 서술은 조금 연하게, 행동(* *)은 더 연하게 보여요.",
      dlgColor: "대사",
      narColor: "서술",
      actColor: "행동 (* *)",
      ytMode: "YouTube 사용 방식",
      ytModes: { link: "개인정보 보호 플레이어", account: "내 계정으로 재생" },
      ytApiKey: "YouTube Data API 키",
      ytApiHint: "Google Cloud 콘솔에서 만든 YouTube Data API v3 키를 넣으면 홈(인기)·검색·채널을 이 창에서 볼 수 있어요. 키는 입력하는 대로 이 확장의 저장 공간에 저장돼요.",
      ytAccountHint: "로그인한 YouTube 계정으로 재생해요(광고 없음·기록 등). 브라우저가 다른 사이트 쿠키를 막으면 창 안 플레이어에는 로그인이 안 보일 수 있어요.",
      ytLogin: "YouTube 로그인",
      ytOpenSite: "YouTube 열기",
      ytSearchPlaceholder: "검색어나 링크 입력",
      ytNoKey: "검색하려면 설정에서 API 키를 넣어 주세요. 링크는 바로 재생돼요.",
      ytSearching: "검색 중…",
      ytError: "검색하지 못했어요",
      ytResults: "검색 결과",
      ytSettings: "YouTube 설정",
      ytHome: "홈",
      ytCats: [["all", "인기"], ["10", "음악"], ["20", "게임"], ["24", "엔터테인먼트"], ["1", "영화·애니"], ["17", "스포츠"], ["25", "뉴스"], ["28", "과학·기술"]],
      ytNeedKey: "YouTube 자체 화면(youtube.com)은 다른 창 안에 띄우는 걸 YouTube가 막아 두었어요. 대신 YouTube Data API 키를 넣으면 이 창에서 홈·검색·채널·영상 화면을 YouTube처럼 볼 수 있어요. 링크를 붙여 넣으면 키 없이도 바로 재생돼요.",
      ytAddKey: "API 키 넣기",
      ytLoading: "불러오는 중…",
      ytViews: (n) => `조회수 ${n}회`,
      ytSubs: (n) => `구독자 ${n}명`,
      ytMore: "더보기",
      ytLess: "간략히",
      ytFromChannel: "이 채널의 다른 영상",
      ytUploads: "동영상",
      ytLive: "실시간",
      ytEmpty: "영상이 없어요",
      zoom: "확대/축소",
      zoomFit: "창에 맞춤",
      quick: "빠른 설정",
      allSettings: "모든 꾸미기 설정",
      greeting: (hour) =>
        hour < 5 ? "늦은 밤이에요" : hour < 12 ? "좋은 아침이에요" : hour < 18 ? "좋은 오후예요" : "좋은 저녁이에요",
      lk: {
        title: "확장",
        edit: "편집",
        done: "완료",
        empty: "담긴 버튼이 없어요. 다른 확장이 화면에 띄운 버튼은 저절로 담겨요.",
        onScreen: "화면에 둠",
        keep: "화면에 두기",
        remove: "빼기",
        forget: "지우기",
        putBack: "다시 넣기",
        removed: "뺀 버튼",
        rename: "이름",
        auto: "새로 뜨는 버튼은 저절로 담기",
        on: "확장 버튼 모으기",
        pick: "직접 담기",
        pickBanner: "담을 버튼을 눌러 주세요",
        pickNo: "마리나라 기본 화면의 버튼은 담을 수 없어요",
        picked: "확장에 담았어요",
        up: "위로",
        down: "아래로",
        unnamed: "이름 없는 버튼",
        engine: "버튼을 모으는 쪽",
        engineBuiltin: "내장",
        engineBgh: "확장 보관함 확장",
        engineHint: "어느 쪽을 써도 이름·순서·화면에 두기·뺀 버튼·저절로 담기는 서로 맞춰져요.",
        bghOff: "\"확장 보관함\" 확장이 꺼져 있거나 설치돼 있지 않아요. 마리나라 설정 → 확장에서 켜 주세요.",
        bghReload: "새로 고침하면 \"확장 보관함\" 확장이 버튼을 모아요.",
        reload: "새로 고침",
        bghEdit: "이름·순서·화면에 두기는 \"확장 보관함\" 확장의 보관함 아이콘 → 보관함 편집에서 고쳐요.",
        bghOpen: "확장 보관함 열기",
        bghNoButton: "\"확장 보관함\" 아이콘을 찾지 못했어요",
      },
      chatTools: "채팅 도구",
      sceneBarTop: "롤플 장면 바를 위쪽 아이콘으로 (실행 전에 확인)",
      quickPaletteOn: "입력창 + 메뉴 (따옴표·별표·이미지·문구 보관함)",
      chatToolsHint: "\"Scene Bar Top\"·\"퀵 팔레트\" 확장의 기능이에요. 그 확장들은 꺼 두세요(켜져 있으면 이쪽이 비켜요).",
      scene: {
        cancel: "취소",
        back: { title: "대화로 돌아갈까요?", message: "장면은 끝나지 않고 그대로 남아 있어요.", ok: "돌아가기" },
        end: { title: "장면을 끝낼까요?", message: "장면을 마무리하고 요약을 저장해요.", ok: "끝내기" },
        discard: { title: "장면을 버릴까요?", message: "저장하지 않고 장면을 지워요. 되돌릴 수 없어요.", ok: "버리기", danger: true },
      },
      qp: {
        menu: "빠른 입력",
        quote: "대사 따옴표",
        narration: "나레이션 별표",
        image: "이미지 추가",
        memo: "문구 보관함",
        bookmark: "턴 북마크",
        pinTitle: "입력창 위에 버튼으로",
        openChat: "채팅방을 먼저 열어 주세요",
        noBookmark: "턴 북마크 확장이 켜져 있지 않아요",
        search: "제목이나 내용으로 검색",
        add: "새 문구",
        title: "제목",
        content: "내용",
        untitled: "제목 없음",
        save: "저장",
        cancel: "취소",
        empty: "아직 문구가 없어요. 자주 쓰는 말을 넣어 두세요.",
        noResult: "검색 결과가 없어요.",
        insert: "입력창에 넣기",
        copy: "복사",
        pin: "위에 고정",
        unpin: "고정 해제",
        edit: "수정",
        del: "삭제",
        delConfirm: "한 번 더 누르면 삭제",
        up: "위로",
        down: "아래로",
        saved: "저장했어요",
        inserted: "입력창에 넣었어요",
        copied: "복사했어요",
        deleted: "삭제했어요",
        needText: "제목이나 내용을 적어 주세요",
      },
      messengerPane: "메신저 한 창 (목록을 대화 창에 붙이기)",
      pickChat: "목록에서 채팅을 골라 주세요",
      toggleList: "채팅 목록 접기/펼치기",
      menu: "메뉴",
      focusMode: "집중 모드",
      focusExit: "집중 모드 끄기",
      chars: "자",
      shortcutList: [
        ["Ctrl + Alt + 1 · 2 · 3", "대화 · 롤플 · 게임 앱"],
        ["Ctrl + Alt + N", "지금 모드에서 새 채팅"],
        ["Ctrl + Alt + F", "집중 모드 (채팅 창만 꽉 차게)"],
        ["Ctrl + Alt + ,", "설정"],
        ["Ctrl(⌘) + S", "편집 화면 저장"],
        ["Ctrl + Alt + D", "데스크톱 ↔ 클래식 레이아웃"],
        ["Ctrl + Alt + L", "시작 메뉴"],
        ["Ctrl + Alt + H", "데스크톱 보기"],
        ["Ctrl + Alt + M", "앞에 있는 창 최소화"],
        ["Ctrl + `", "다음 창으로"],
        ["Ctrl + K", "검색"],
        ["바탕화면 오른쪽 클릭", "위젯·배경화면·꾸미기 메뉴"],
        ["작업 표시줄 아이콘 오른쪽 클릭", "열기·닫기·아이콘 편집"],
        ["제목 표시줄 더블클릭", "확대/축소"],
        ["창을 화면 위/왼쪽/오른쪽 끝으로", "꽉 채우기 / 반쪽 배치"],
      ],
      aboutBody: "마리나라를 데스크톱처럼 쓰게 해 주는 확장이에요. 원래 화면으로 돌아가려면 Ctrl + Alt + D를 누르세요.",
    }
  : {
      home: "Home",
      desktopTitle: "Desktop",
      chats: "Chats",
      characters: "Characters",
      personas: "Personas",
      lorebooks: "Lorebooks",
      presets: "Presets",
      connections: "Connections",
      agents: "Agents",
      settings: "Settings",
      search: "Search",
      launchpad: "Start",
      snapLayouts: "Snap layouts",
      separateWindows: "Open each app in its own window",
      recommended: "Recommended",
      noRecent: "Your recent chats show up here.",
      showDesktop: "Show desktop",
      focusSession: "Focus session",
      pinned: "Pinned",
      power: "Power",
      wallpaper: "Wallpaper",
      accent: "Accent colour",
      classic: "Classic layout",
      desktop: "Desktop mode",
      reload: "Reload",
      about: "About Marinara Desktop",
      aboutShort: "About",
      view: "View",
      window: "Window",
      dock: "Taskbar",
      help: "Help",
      close: "Close",
      minimize: "Minimize",
      zoom: "Zoom",
      tile: "Tile windows",
      resetLayout: "Reset window layout",
      nextWindow: "Next window",
      showDesktop: "Show desktop",
      editor: "Editor",
      panel: "Panel",
      magnify: "Magnification",
      autohide: "Automatically hide the taskbar",
      recents: "Show recent chats on the taskbar",
      bootSplash: "Show start-up screen",
      iconView: "Show characters & personas as icons",
      dockSize: "Taskbar icon size",
      customImage: "Upload image",
      imageUrl: "Image address (https://…)",
      apply: "Apply",
      docs: "Marinara documentation",
      shortcuts: "Shortcuts",
      controlCenter: "Quick Settings",
      tooLarge: "That image is too large. Please pick a smaller one.",
      storageFull: "Extension storage (1 MB) is nearly full. Remove a wallpaper, photo or icon image first.",
      badUrl: "Only image addresses starting with https:// are supported.",
      themeWallpaper: "App theme",
      appearance: "Appearance",
      rpStyle: "Roleplay view",
      rpBook: "Reader (sepia / light)",
      rpNight: "Reader (dark)",
      rpClean: "Clean",
      convoStyle: "Conversation view",
      convoMessages: "Messages app",
      convoMarinara: "Marinara default",
      customize: "Customize",
      iconStyle: "Icon style",
      iconShape: "Icon shape",
      iconStyles: { fluent: "Fluent (Windows 11)", gradient: "Gradient", glass: "Glass", pastel: "Pastel", tinted: "Tinted", dark: "Dark" },
      iconShapes: { squircle: "Squircle", circle: "Circle", rounded: "Rounded" },
      cursor: "Mouse pointer",
      cursorSize: "Pointer size",
      cursors: { system: "System", mac: "Black arrow", white: "White arrow", accent: "Accent arrow", dot: "Dot", custom: "My image" },
      cursorSizes: { m: "Regular", l: "Large", xl: "Extra large" },
      cursorImage: "Upload pointer image…",
      cursorHint: "A PNG with a transparent background works best. The image's top-left corner is the click point. The black and white arrows turn into a hand over links and buttons.",
      editIcons: "Edit icons…",
      editIcon: "Edit icon",
      editWidgets: "Edit widgets",
      addWidget: "Add widget",
      done: "Done",
      label: "Name",
      colors: "Colours",
      image: "Image",
      pickImage: "Choose image",
      removeImage: "Remove image",
      reset: "Reset",
      remove: "Remove",
      size: "Size",
      style: "Style",
      sizes: { s: "Small", m: "Medium", l: "Large" },
      wStyles: { glass: "Glass", light: "Light", dark: "Dark", accent: "Accent", clear: "Clear" },
      noteColor: "Note colour",
      title: "Title",
      date: "Date",
      text: "Text",
      modes: ["Chat", "Roleplay", "Game"],
      widgetNames: {
        launcher: "New chat",
        clock: "Clock",
        analog: "Analog clock",
        calendar: "Calendar",
        photo: "Photo",
        note: "Note",
        dday: "Countdown",
        greeting: "Greeting",
        credits: "API credits",
        locker: "Extensions",
        ledger: "API budget",
        credit: "Credit",
      },
      creditPick: "Credit to show",
      ledgerTopUse: "Top uses",
      ledgerView: "View",
      ledgerViews: { summary: "Summary", calendar: "Calendar", daily: "Daily bars", top: "Top uses", facts: "Numbers" },
      ledgerLess: "Less",
      ledgerMore: "More",
      lockerEmpty: "No extension buttons gathered yet",
      creditsEmpty: "Open Home once to load your credits here",
      pickPhoto: "Choose a photo",
      notePlaceholder: "Write a note",
      ddayDefault: "Bias birthday",
      performance: "Performance",
      reduceTransparency: "Reduce transparency",
      reduceMotion: "Reduce motion",
      recentChats: "Recent chats",
      open: "Open",
      homeIndicator: "Go home",
      newChat: "New chat",
      notes: "Notes",
      browser: "Web",
      youtube: "YouTube",
      newNote: "New note",
      deleteNote: "Delete note",
      untitled: "Untitled",
      urlPlaceholder: "Address or search",
      ytPlaceholder: "Paste a YouTube link",
      ytHint: "Paste a YouTube video or playlist link above. Keep the window open while you chat.",
      load: "Open",
      openOutside: "Open in new window",
      addToHome: "Add to home screen",
      cantEmbed: "This site's security settings stop it from opening inside a window. Read it in reader view, or open it in a new window.",
      readerView: "Reader view",
      readerNote: "Reader view: an outside service (r.jina.ai) opens the address and returns its text and images. Sign in or post in a new window.",
      readerLoading: "Loading… (this can take a few seconds)",
      readerFail: "Couldn't load this page in reader view",
      readerEmpty: "This site blocks the reader service for this page, so nothing came back. Open it in a new window to keep it alongside.",
      back: "Back",
      favorites: "Favorites",
      noFavorites: "No favorites yet. Open an address and press ★ to add it here and to your home screen.",
      pinOnTop: "Keep on top",
      bookmarks: "Bookmarks",
      addBookmark: "Add bookmark",
      bookmarkTitle: "Name",
      bookmarkUrl: "Address (https://…)",
      add: "Add",
      rename: "Rename",
      removeFromDesktop: "Remove from desktop",
      removeFromHome: "Remove from home screen",
      addToDesktop: "Add to desktop",
      addApps: "Add apps & bookmarks",
      homeLayout: "Home layout",
      boardPos: "Marinara Home position",
      boardPositions: { left: "Left", center: "Centre", hidden: "Hidden" },
      showCredits: "Show API credit cards",
      showFeed: "Show Marinara Home widgets",
      arrangeIcons: "Arrange icons",
      arrangeWidgets: "Arrange widgets",
      realGlass: "Real glass blur (can be slow)",
      apps: "Apps",
      settingsTitle: "Customize",
      openSettings: "Open Customize…",
      themeSync: "Sync colours with the theme library",
      themeSyncHint: "Follows the colours, font and background of the theme applied in Marinara's Settings → Appearance → Theme library, and updates when you switch themes.",
      themeNow: "Applied theme",
      themeNone: "Default theme (follows Marinara's accent only)",
      themeAccent: "Theme",
      layoutMode: "Widget & icon placement",
      layoutModes: { grid: "Grid", free: "Free" },
      chatDesign: "Chat design",
      convo: "Conversation",
      roleplay: "Roleplay",
      presets: "Presets",
      font: "Font",
      fonts: { "": "Default (Pretendard)", system: "System", serif: "Serif", rounded: "Rounded", hand: "Handwriting", mono: "Monospace", theme: "Theme font", custom: "Custom" },
      customFont: "Font name (e.g. Inter)",
      textSize: "Text size",
      lineHeight: "Line height",
      myBubble: "My bubble",
      theirBubble: "Their bubble",
      bubbleText: "Text",
      corner: "Corners",
      chatBg: "Chat background",
      chatBgModes: { "": "Default", color: "Colour", wallpaper: "Show wallpaper", image: "Image" },
      avatars: "Avatars",
      avatarModes: { circle: "Circle", rounded: "Rounded", hidden: "Hidden" },
      showNames: "Show names",
      columnWidth: "Column width",
      paper: "Paper",
      ink: "Ink",
      preview: "Preview",
      resetChat: "Reset to default",
      cvPresets: { base: "Default", yellow: "Yellow bubbles", green: "Green bubbles", dark: "Dark", pastel: "Pastel" },
      rpPresets: { book: "Sepia", novel: "Light", night: "Dark", parchment: "Parchment", typewriter: "Typewriter" },
      justify: "Justify text",
      actionsHover: "Message buttons on hover only",
      actItalic: "Italic actions (* *)",
      weather: "Weather effects (snow, rain, sun)",
      readerLayout: "Reading view",
      sideMargin: "Side margins",
      sideMarginHint: "Space on each side of the text in narrow windows and on phones; 0 uses the full width.",
      lineWrap: "Line breaks",
      wrapChars: "Any character",
      wrapWords: "Between words",
      lineWrapHint: "Any character fills each line and breaks wherever needed (English words stay whole). Between words keeps Korean words whole, but Japanese and Chinese then break only at punctuation such as full stops.",
      pvThem: "What did you do today?",
      pvMe: "Decorating my Marinara!",
      pvThem2: "Ooh, show me ✨",
      pvRpNar: "Rain began to fall outside the window. ",
      pvRpAct: "He set down his teacup and smiled quietly.",
      pvRpDlg: "“Rest here for tonight.”",
      textTone: "Tone dialogue, narration and actions",
      textToneHint: "Dialogue (\" \") reads darkest, narration a little lighter, actions (* *) lighter still.",
      dlgColor: "Dialogue",
      narColor: "Narration",
      actColor: "Actions (* *)",
      ytMode: "How YouTube works",
      ytModes: { link: "Privacy player", account: "Play with my account" },
      ytApiKey: "YouTube Data API key",
      ytApiHint: "Add a YouTube Data API v3 key from the Google Cloud console to browse trending, search and channels in this window. The key is saved as you type, in this extension's storage only.",
      ytAccountHint: "Plays with your signed-in YouTube account (no ads, history…). If the browser blocks third-party cookies, the in-window player may not show you as signed in.",
      ytLogin: "Sign in to YouTube",
      ytOpenSite: "Open YouTube",
      ytSearchPlaceholder: "Search or paste a link",
      ytNoKey: "Add an API key in settings to search. Links play right away.",
      ytSearching: "Searching…",
      ytError: "Search failed",
      ytResults: "Results",
      ytSettings: "YouTube settings",
      ytHome: "Home",
      ytCats: [["all", "Trending"], ["10", "Music"], ["20", "Gaming"], ["24", "Entertainment"], ["1", "Film & animation"], ["17", "Sports"], ["25", "News"], ["28", "Science & tech"]],
      ytNeedKey: "YouTube doesn't allow youtube.com itself inside another window. With a YouTube Data API key this window browses YouTube instead: home, search, channels and the watch page. Pasted links play without a key.",
      ytAddKey: "Add an API key",
      ytLoading: "Loading…",
      ytViews: (n) => `${n} views`,
      ytSubs: (n) => `${n} subscribers`,
      ytMore: "More",
      ytLess: "Less",
      ytFromChannel: "More from this channel",
      ytUploads: "Videos",
      ytLive: "Live",
      ytEmpty: "No videos",
      zoom: "Zoom",
      zoomFit: "Fit to window",
      quick: "Quick settings",
      allSettings: "All customize settings",
      greeting: (hour) =>
        hour < 5 ? "Burning the midnight oil" : hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening",
      lk: {
        title: "Extensions",
        edit: "Edit",
        done: "Done",
        empty: "Nothing here yet. Buttons other extensions float on the screen are collected here.",
        onScreen: "On screen",
        keep: "Keep on screen",
        remove: "Remove",
        forget: "Forget",
        putBack: "Put back",
        removed: "Removed",
        rename: "Name",
        auto: "Collect new buttons automatically",
        on: "Gather extension buttons",
        pick: "Add by tapping",
        pickBanner: "Tap the button to add",
        pickNo: "Marinara's own buttons can't be added",
        picked: "Added to Extensions",
        up: "Move up",
        down: "Move down",
        unnamed: "Unnamed button",
        engine: "Gathered by",
        engineBuiltin: "Built in",
        engineBgh: "The 확장 보관함 extension",
        engineHint: "Either way, names, order, kept-on-screen, removed buttons and auto-collect stay in sync between the two.",
        bghOff: "The \"확장 보관함\" extension is off or not installed. Turn it on in Marinara's Settings → Extensions.",
        bghReload: "Reload so the \"확장 보관함\" extension gathers the buttons.",
        reload: "Reload",
        bghEdit: "Names, order and keep-on-screen are edited in the \"확장 보관함\" extension (its box icon → edit).",
        bghOpen: "Open 확장 보관함",
        bghNoButton: "Couldn't find the 확장 보관함 icon",
      },
      chatTools: "Chat tools",
      sceneBarTop: "Roleplay scene bar as icons at the top (asks first)",
      quickPaletteOn: "Composer + menu (quotes, asterisks, image, snippets)",
      chatToolsHint: "The features of the \"Scene Bar Top\" and \"Quick Palette\" extensions. Turn those off (while they run, these step aside).",
      scene: {
        cancel: "Cancel",
        back: { title: "Back to conversation?", message: "The scene stays open.", ok: "Go back" },
        end: { title: "End this scene?", message: "The scene ends and a summary is saved.", ok: "End scene" },
        discard: { title: "Discard this scene?", message: "The scene is deleted without saving. This can't be undone.", ok: "Discard", danger: true },
      },
      qp: {
        menu: "Quick input",
        quote: "Dialogue quotes",
        narration: "Narration asterisks",
        image: "Add image",
        memo: "Snippets",
        bookmark: "Turn bookmarks",
        pinTitle: "Show as buttons above the composer",
        openChat: "Open a chat first",
        noBookmark: "The turn bookmark extension isn't on",
        search: "Search titles and text",
        add: "New snippet",
        title: "Title",
        content: "Text",
        untitled: "Untitled",
        save: "Save",
        cancel: "Cancel",
        empty: "No snippets yet. Keep the lines you use often here.",
        noResult: "Nothing matches.",
        insert: "Insert",
        copy: "Copy",
        pin: "Pin to top",
        unpin: "Unpin",
        edit: "Edit",
        del: "Delete",
        delConfirm: "Press again to delete",
        up: "Move up",
        down: "Move down",
        saved: "Saved",
        inserted: "Inserted",
        copied: "Copied",
        deleted: "Deleted",
        needText: "Add a title or some text",
      },
      messengerPane: "One messenger window (list attached to the chat)",
      pickChat: "Pick a chat from the list",
      toggleList: "Show/hide the chat list",
      menu: "Menu",
      focusMode: "Focus mode",
      focusExit: "Leave focus mode",
      chars: " chars",
      shortcutList: [
        ["Ctrl + Alt + 1 · 2 · 3", "Chat · Roleplay · Game apps"],
        ["Ctrl + Alt + N", "New chat in the current mode"],
        ["Ctrl + Alt + F", "Focus mode (the chat window fills the screen)"],
        ["Ctrl + Alt + ,", "Settings"],
        ["Ctrl(⌘) + S", "Save the open editor"],
        ["Ctrl + Alt + D", "Desktop ↔ classic layout"],
        ["Ctrl + Alt + L", "Start"],
        ["Ctrl + Alt + H", "Show desktop"],
        ["Ctrl + Alt + M", "Minimize the front window"],
        ["Ctrl + `", "Next window"],
        ["Ctrl + K", "Search"],
        ["Right-click the desktop", "Widgets, wallpaper, customize"],
        ["Right-click a taskbar icon", "Open, close, edit icon"],
        ["Double-click a title bar", "Zoom"],
        ["Drag a window to the top/left/right edge", "Fill / half the screen"],
      ],
      aboutBody: "Use Marinara like a desktop. Press Ctrl + Alt + D to switch back to the classic layout at any time.",
    };

// ── Constants ─────────────────────────────────────────────────

// Windows 11: one taskbar along the bottom (MENUBAR_H = its height, reserved
// at the bottom); nothing sits along the top edge (TOP_H).
const MENUBAR_H = 48;
const TOP_H = 0;
const MIN_W = 300;
const MIN_H = 240;
const MIN_VIEWPORT = 768;
const SNAP_EDGE = 6;
const STORAGE_BUDGET = 900_000; // extension storage is capped at 1 MB of JSON

const SEL = {
  root: "#root",
  shell: '[data-component="AppShell"]',
  chats: '[data-component="ChatSidebarSlot"]',
  main: '[data-component="CenterContent"]',
  panel: '[data-component="RightPanelDesktopSlot"]',
  topbar: '[data-component="TopBar"]',
  hub: '[data-component="HomeBrowserHub"]',
  homePage: '[data-component="HomeBrowserHub.HomePage"]',
  homeTabs: '[data-component="HomeBrowserHub.TabList"] [role="tab"]',
  detail: '[data-component="DetailEditor"], [data-component="MobileDetailSheet"]',
  sheets: '[data-component="RightPanelMobile"], aside[data-component="ChatSidebarPanel"], [data-component="MobileDetailSheet"]',
  chatsBtn: '[data-tour="sidebar-toggle"]',
  homeBtn: '[data-topbar-hover-key="home"]',
  sideHeaders: ".mari-sidebar-header, .mari-right-panel-header",
  chatRows: '[data-component="ChatSidebar"] [data-drag-kind="chat"]',
};
const PANEL_IDS = ["characters", "personas", "lorebooks", "presets", "connections", "agents", "settings"];
const panelBtn = (id) => doc.querySelector(`[data-tour="panel-${id}"]`);

const WALLPAPERS = [
  // Windows 11 look: soft blue petals of light (pure CSS gradients).
  {
    id: "bloom",
    name: KO ? "블룸" : "Bloom",
    css: "radial-gradient(38% 52% at 50% 58%, rgba(120, 200, 255, 0.95) 0%, transparent 70%), conic-gradient(from 200deg at 50% 62%, #0a3d91, #2f8cf0, #7ec8ff, #2a6fe0, #0d47a8, #1a62d6, #0a3d91), radial-gradient(120% 90% at 50% 120%, #0b2a6b 0%, #071a45 70%)",
    dark: true,
  },
  {
    id: "bloom-light",
    name: KO ? "블룸 (밝게)" : "Bloom Light",
    css: "radial-gradient(40% 50% at 50% 60%, rgba(255, 255, 255, 0.95) 0%, transparent 70%), conic-gradient(from 210deg at 50% 62%, #9cc8f5, #d6ebff, #6aa8ef, #c4e0ff, #88b8ee, #9cc8f5), linear-gradient(180deg, #dceaf9, #b9d4f2)",
    dark: false,
  },
  {
    id: "dusk",
    name: KO ? "마리나라 노을" : "Marinara Dusk",
    css: "radial-gradient(110% 85% at 12% 8%, #ffb27a 0%, transparent 55%), radial-gradient(85% 75% at 88% 18%, #ff5d7d 0%, transparent 60%), radial-gradient(120% 110% at 50% 105%, #6a2c91 0%, #2b1242 72%)",
    dark: true,
  },
  {
    id: "basil",
    name: KO ? "바질 숲" : "Basil Grove",
    css: "radial-gradient(95% 75% at 18% 0%, #57d6a8 0%, transparent 55%), radial-gradient(90% 90% at 100% 65%, #2a8a63 0%, transparent 60%), linear-gradient(160deg, #11433a, #06201b)",
    dark: true,
  },
  {
    id: "mozzarella",
    name: KO ? "모차렐라" : "Mozzarella",
    css: "radial-gradient(90% 70% at 18% 10%, #fffaf0 0%, transparent 60%), radial-gradient(80% 80% at 92% 28%, #ffd3bd 0%, transparent 62%), radial-gradient(90% 80% at 40% 100%, #f2c6d8 0%, transparent 65%), linear-gradient(180deg, #f7efe3, #ead9c7)",
    dark: false,
  },
  {
    id: "aurora",
    name: KO ? "오로라" : "Aurora",
    css: "radial-gradient(75% 60% at 28% 18%, #6fe7f7 0%, transparent 55%), radial-gradient(70% 70% at 76% 32%, #a98bfb 0%, transparent 60%), radial-gradient(95% 85% at 50% 100%, #233f94 0%, #0a0f27 75%)",
    dark: true,
  },
  {
    id: "midnight",
    name: KO ? "한밤중" : "Midnight",
    css: "radial-gradient(55% 45% at 72% 18%, #3d4c80 0%, transparent 70%), radial-gradient(40% 35% at 15% 85%, #4b2a63 0%, transparent 70%), linear-gradient(180deg, #0d1020, #05060c)",
    dark: true,
  },
  {
    id: "theme",
    name: L.themeWallpaper,
    // Built at runtime from the applied theme's colours (themeWallpaperCss).
    css: "linear-gradient(135deg, var(--mdos-accent, #ec4b97), var(--mdos-win-bg, #faf8ff))",
    dark: null,
  },
];

// "marinara" keeps the app's own accent; the rest replace it everywhere.
const ACCENTS = [
  { id: "theme", color: null, theme: true, name: L.themeAccent },
  { id: "blue", color: "#0078d4", name: KO ? "파랑" : "Blue" },
  { id: "purple", color: "#a259e6", name: KO ? "보라" : "Purple" },
  { id: "pink", color: "#ec4b8f", name: KO ? "분홍" : "Pink" },
  { id: "red", color: "#ff453a", name: KO ? "빨강" : "Red" },
  { id: "orange", color: "#ff9500", name: KO ? "주황" : "Orange" },
  { id: "yellow", color: "#e6b800", name: KO ? "노랑" : "Yellow" },
  { id: "green", color: "#30b956", name: KO ? "초록" : "Green" },
  { id: "graphite", color: "#8e8e93", name: KO ? "흑연" : "Graphite" },
  { id: "marinara", color: null, name: "Marinara" },
];
const NOTE_COLORS = ["#ffe57a", "#ffc2d6", "#b8e4ff", "#c4f0b4", "#e2ccff", "#ffffff"];

// Icons: simple 24×24 strokes drawn for this extension.
const ICONS = {
  locker: '<path d="M3.5 8 5 4.5h14L20.5 8"/><rect x="3.5" y="8" width="17" height="11.5" rx="2"/><path d="M9.5 12h5"/>',
  home: '<path d="M3.5 10.5 12 3.5l8.5 7V19a1.5 1.5 0 0 1-1.5 1.5h-4.5V15h-5v5.5H5A1.5 1.5 0 0 1 3.5 19z"/>',
  chat: '<path d="M20.5 11.5a8 8 0 0 1-11.7 7.1L3.5 20l1.4-4.7a8 8 0 1 1 15.6-3.8z"/><path d="M8.5 11.5h.01M12.5 11.5h.01M16.5 11.5h.01"/>',
  characters:
    '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.8-3.6 3.4-5.6 6.5-5.6s5.7 2 6.5 5.6"/><path d="M15.5 4.7a3.5 3.5 0 0 1 0 6.6"/><path d="M18.2 14.7c1.7.8 2.8 2.6 3.2 5.3"/>',
  personas:
    '<path d="M3.5 6.5c2.8 1.1 5.7 1.1 8.5 0 2.8 1.1 5.7 1.1 8.5 0v4.5c0 5-3.8 9-8.5 9s-8.5-4-8.5-9z"/><path d="M7.5 11.2h2.6M13.9 11.2h2.6"/><path d="M9.5 15.3c1.6 1 3.4 1 5 0"/>',
  lorebooks: '<path d="M4.5 19V5a2 2 0 0 1 2-2h13v15h-13a2 2 0 0 0 0 4h13"/><path d="M9 7.5h6M9 11h4"/>',
  presets:
    '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/><path d="M9 13h6M9 17h4"/>',
  connections:
    '<path d="M10 14a4.5 4.5 0 0 0 6.4 0l3-3a4.5 4.5 0 0 0-6.4-6.4l-1.1 1.1"/><path d="M14 10a4.5 4.5 0 0 0-6.4 0l-3 3a4.5 4.5 0 0 0 6.4 6.4l1.1-1.1"/>',
  agents:
    '<path d="M11 3.5 12.9 9l5.6 1.9-5.6 1.9L11 18.5l-1.9-5.7-5.6-1.9L9.1 9z"/><path d="M18.5 15.5l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8z"/>',
  settings:
    '<circle cx="12" cy="12" r="3"/><circle cx="12" cy="12" r="7"/><path d="M12 2.5V5M12 19v2.5M2.5 12H5M19 12h2.5M5.3 5.3l1.8 1.8M16.9 16.9l1.8 1.8M5.3 18.7l1.8-1.8M16.9 7.1l1.8-1.8"/>',
  search: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="M20.5 20.5 15.3 15.3"/>',
  launchpad:
    '<rect x="3.5" y="3.5" width="4.5" height="4.5" rx="1.2"/><rect x="9.75" y="3.5" width="4.5" height="4.5" rx="1.2"/><rect x="16" y="3.5" width="4.5" height="4.5" rx="1.2"/><rect x="3.5" y="9.75" width="4.5" height="4.5" rx="1.2"/><rect x="9.75" y="9.75" width="4.5" height="4.5" rx="1.2"/><rect x="16" y="9.75" width="4.5" height="4.5" rx="1.2"/><rect x="3.5" y="16" width="4.5" height="4.5" rx="1.2"/><rect x="9.75" y="16" width="4.5" height="4.5" rx="1.2"/><rect x="16" y="16" width="4.5" height="4.5" rx="1.2"/>',
  wallpaper: '<rect x="3" y="4" width="18" height="16" rx="2.5"/><circle cx="9" cy="9.5" r="1.8"/><path d="m21 16-5-5-9 9"/>',
  classic: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 8.5h18M8.5 8.5V20M15.5 8.5V20"/>',
  reload: '<path d="M20 11a8 8 0 1 0-2.3 5.7"/><path d="M20 4.5V11h-6.5"/>',
  info: '<circle cx="12" cy="12" r="8.5"/><path d="M12 11v5.5M12 7.6h.01"/>',
  sliders:
    '<path d="M4 7h10M18 7h2M4 17h4M12 17h8"/><circle cx="16" cy="7" r="2"/><circle cx="10" cy="17" r="2"/>',
  widgets: '<rect x="3.5" y="3.5" width="7" height="7" rx="2"/><rect x="13.5" y="3.5" width="7" height="7" rx="2"/><rect x="3.5" y="13.5" width="17" height="7" rx="2"/>',
  brush: '<path d="M14.5 4.5 19.5 9.5 11 18l-5-5z"/><path d="M6 13c-2 0-3 1.5-3 3.5S2 20 2 20s3.5.5 5-.5 2-2.5 2-3.5"/><path d="M16.5 2.5l5 5"/>',
  roleplay: '<path d="M3 5.5c3-1.3 6-1.3 9 .5 3-1.8 6-1.8 9-.5V19c-3-1.3-6-1.3-9 .5-3-1.8-6-1.8-9-.5z"/><path d="M12 6v13.5"/>',
  game: '<rect x="2.5" y="7" width="19" height="11" rx="5.5"/><path d="M7.5 10.5v4M5.5 12.5h4"/><path d="M15.5 11.5h.01M18 13.5h.01"/>',
  notes: '<rect x="4.5" y="3" width="15" height="18" rx="2.5"/><path d="M8 8h8M8 12h8M8 16h5"/>',
  compass: '<circle cx="12" cy="12" r="9"/><path d="m15.8 8.2-2.4 5.2-5.2 2.4 2.4-5.2z"/>',
  play: '<rect x="2.5" y="5.5" width="19" height="13" rx="4"/><path d="m10 9.2 5 2.8-5 2.8z" fill="currentColor"/>',
  star: '<path d="m12 3.5 2.6 5.4 5.9.8-4.3 4.1 1 5.9L12 17l-5.2 2.7 1-5.9-4.3-4.1 5.9-.8z"/>',
  external: '<path d="M14 4h6v6"/><path d="M20 4l-9 9"/><path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',
  pin: '<path d="M9 3h6l-1 6 3 3H7l3-3z"/><path d="M12 12v9"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  trash: '<path d="M4 7h16M9 7V4h6v3M6.5 7l1 13h9l1-13"/>',
  back: '<path d="M15 5l-7 7 7 7"/>',
  reader: '<path d="M6 3.5h8.5L19 8v12.5H6z"/><path d="M9.5 11h6M9.5 14.5h6M9.5 18h4"/>',
};
// Windows 11: full-colour Fluent-style app icons (no tile behind them).
// Shapes fill from the app's two colours (--g1 light, --g2 deep), so the
// icon editor's colour choices still apply. Classes: a = --g1, b = --g2,
// w = white, l = soft white highlight, d = soft shade, s/t = strokes.
const FLUENT = {
  home: '<path class="b" d="M16 3.2 29.4 14a1.3 1.3 0 0 1-1.7 2L16 6.6 4.3 16a1.3 1.3 0 1 1-1.7-2z"/><path class="a" d="M6.5 15.3 16 7.7l9.5 7.6V26a2.5 2.5 0 0 1-2.5 2.5H9A2.5 2.5 0 0 1 6.5 26z"/><path class="l" d="M6.5 15.3 16 7.7l9.5 7.6v2.2L16 9.9l-9.5 7.6z"/><rect class="w" x="13" y="19" width="6" height="9.5" rx="1.4"/>',
  chat: '<path class="b" d="M16 5.5c6.9 0 12.5 4.6 12.5 10.3S22.9 26 16 26c-1.2 0-2.4-.1-3.5-.4L6 28.6l1.4-5.4C5 21.3 3.5 18.7 3.5 15.8 3.5 10.1 9.1 5.5 16 5.5z"/><path class="a" d="M16 4c6.9 0 12.5 4.6 12.5 10.3S22.9 24.5 16 24.5c-1.2 0-2.4-.1-3.5-.4L6 27.1l1.4-5.4C5 19.8 3.5 17.2 3.5 14.3 3.5 8.6 9.1 4 16 4z"/><circle class="w" cx="10.6" cy="14.3" r="1.9"/><circle class="w" cx="16" cy="14.3" r="1.9"/><circle class="w" cx="21.4" cy="14.3" r="1.9"/>',
  roleplay: '<path class="b" d="M3 7.5c4.4-1.6 8.8-1.2 13 1.2 4.2-2.4 8.6-2.8 13-1.2V27c-4.4-1.4-8.8-1-13 1.4C11.8 26 7.4 25.6 3 27z"/><path class="a" d="M4.5 6c3.9-1.3 7.7-.9 11.5 1.3v18.4c-3.8-2.1-7.6-2.5-11.5-1.3z"/><path class="l" d="M16 7.3c3.8-2.2 7.6-2.6 11.5-1.3v18.4c-3.9-1.2-7.7-.8-11.5 1.3z"/><path class="t" d="M7.5 11.2c1.9-.4 3.8-.2 5.6.6M7.5 15.2c1.9-.4 3.8-.2 5.6.6M18.9 11.8c1.8-.8 3.7-1 5.6-.6M18.9 15.8c1.8-.8 3.7-1 5.6-.6"/>',
  game: '<path class="b" d="M9.5 10.5h13a7 7 0 0 1 6.9 8.2l-.7 4a3.9 3.9 0 0 1-6.6 2.1l-2.6-2.6h-7l-2.6 2.6a3.9 3.9 0 0 1-6.6-2.1l-.7-4a7 7 0 0 1 6.9-8.2z"/><path class="a" d="M9.5 9h13a7 7 0 0 1 6.9 8.2l-.7 4a3.9 3.9 0 0 1-6.6 2.1l-2.6-2.6h-7l-2.6 2.6a3.9 3.9 0 0 1-6.6-2.1l-.7-4A7 7 0 0 1 9.5 9z"/><rect class="w" x="7.2" y="14.6" width="6.6" height="2.2" rx="1.1"/><rect class="w" x="9.4" y="12.4" width="2.2" height="6.6" rx="1.1"/><circle class="w" cx="21.5" cy="13.6" r="1.6"/><circle class="w" cx="24.3" cy="16.9" r="1.6"/>',
  characters: '<circle class="b" cx="22" cy="10.5" r="4.2"/><path class="b" d="M14.8 20.2c1.2-3.1 4-4.7 7.2-4.7 4.2 0 7.3 2.8 7.5 7.3a1.6 1.6 0 0 1-1.6 1.7H17z"/><circle class="a" cx="12" cy="10" r="5.3"/><path class="a" d="M12 16.8c5.2 0 9.2 3.4 9.5 9a1.7 1.7 0 0 1-1.7 1.8H4.2a1.7 1.7 0 0 1-1.7-1.8c.3-5.6 4.3-9 9.5-9z"/><path class="l" d="M8.2 8.2A5.3 5.3 0 0 1 16.6 7a6 6 0 0 0-8.4 1.2z"/>',
  personas: '<path class="b" d="M3.5 8.2c4.2 1.7 8.4 1.7 12.5 0 4.1 1.7 8.3 1.7 12.5 0v7c0 7.6-5.6 13.4-12.5 13.4S3.5 22.8 3.5 15.2z"/><path class="a" d="M3.5 6.7c4.2 1.7 8.4 1.7 12.5 0 4.1 1.7 8.3 1.7 12.5 0v7C28.5 21.3 22.9 27 16 27S3.5 21.3 3.5 13.7z"/><path class="w" d="M7.5 13.6c1.3-1.2 3.4-1.2 4.7 0-1.3 1-3.4 1-4.7 0zM19.8 13.6c1.3-1.2 3.4-1.2 4.7 0-1.3 1-3.4 1-4.7 0z"/><path class="t" d="M12.4 19.6c2.3 1.5 4.9 1.5 7.2 0"/>',
  lorebooks: '<path class="w2" d="M8 24.5h18v4H9.6A1.6 1.6 0 0 1 8 26.9z"/><path class="a" d="M9.5 3.5H26a1.5 1.5 0 0 1 1.5 1.5v19.5H9.5A3.5 3.5 0 0 0 6 28V7a3.5 3.5 0 0 1 3.5-3.5z"/><path class="b" d="M9.5 3.5h2.5v21H9.5A3.5 3.5 0 0 0 6 28V7a3.5 3.5 0 0 1 3.5-3.5z"/><rect class="w" x="15.5" y="8.5" width="8.5" height="2.2" rx="1.1"/><rect class="l" x="15.5" y="12.8" width="6" height="2.2" rx="1.1"/><path class="b" d="M6 27.5A3.5 3.5 0 0 1 9.5 24h18v1.5H9.6A2 2 0 0 0 9.6 28.5h17.9V30H9.5A3.5 3.5 0 0 1 6 27.5z"/>',
  presets: '<path class="a" d="M8 3h11l7 7v17a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"/><path class="b" d="M19 3l7 7h-5a2 2 0 0 1-2-2z"/><rect class="w" x="10" y="15" width="12" height="2.2" rx="1.1"/><rect class="l" x="10" y="19.6" width="12" height="2.2" rx="1.1"/><rect class="l" x="10" y="24.2" width="7" height="2.2" rx="1.1"/>',
  connections: '<path class="s2" d="M13.6 18.4a5.4 5.4 0 0 0 7.6 0l4.3-4.3a5.4 5.4 0 0 0-7.6-7.6l-1.4 1.4"/><path class="s1" d="M18.4 13.6a5.4 5.4 0 0 0-7.6 0l-4.3 4.3a5.4 5.4 0 0 0 7.6 7.6l1.4-1.4"/>',
  agents: '<path class="a" d="M13.5 3.5c.4 0 .8.3.9.7l1.9 6.1 6.1 1.9a1 1 0 0 1 0 1.8l-6.1 1.9-1.9 6.1a1 1 0 0 1-1.8 0l-1.9-6.1-6.1-1.9a1 1 0 0 1 0-1.8l6.1-1.9 1.9-6.1c.1-.4.5-.7.9-.7z"/><path class="l" d="M13.5 3.5c.4 0 .8.3.9.7l1.9 6.1-2.8 2.8z"/><path class="b" d="M23.5 18.5c.3 0 .6.2.7.5l.9 2.8 2.8.9a.7.7 0 0 1 0 1.4l-2.8.9-.9 2.8a.7.7 0 0 1-1.4 0l-.9-2.8-2.8-.9a.7.7 0 0 1 0-1.4l2.8-.9.9-2.8c.1-.3.4-.5.7-.5z"/>',
  settings: '<path class="b" d="M13.9 3.6a2.1 2.1 0 0 1 4.2 0l.3 2.2 1.9.8 1.8-1.3a2.1 2.1 0 0 1 3 3l-1.3 1.8.8 1.9 2.2.3a2.1 2.1 0 0 1 0 4.2l-2.2.3-.8 1.9 1.3 1.8a2.1 2.1 0 0 1-3 3l-1.8-1.3-1.9.8-.3 2.2a2.1 2.1 0 0 1-4.2 0l-.3-2.2-1.9-.8-1.8 1.3a2.1 2.1 0 0 1-3-3l1.3-1.8-.8-1.9-2.2-.3a2.1 2.1 0 0 1 0-4.2l2.2-.3.8-1.9-1.3-1.8a2.1 2.1 0 0 1 3-3l1.8 1.3 1.9-.8z"/><circle class="a" cx="16" cy="16" r="7.6"/><circle class="w" cx="16" cy="16" r="3.4"/>',
  search: '<path class="s2" d="M20.4 20.4 27 27"/><circle class="s1" cx="13.5" cy="13.5" r="8.5"/><path class="l" d="M8.6 11.4a5.6 5.6 0 0 1 4-3.6"/>',
  launchpad: '<rect class="a" x="4" y="4" width="11" height="11" rx="2"/><rect class="b" x="17" y="4" width="11" height="11" rx="2"/><rect class="b" x="4" y="17" width="11" height="11" rx="2"/><rect class="a" x="17" y="17" width="11" height="11" rx="2"/>',
  wallpaper: '<rect class="a" x="3" y="5" width="26" height="22" rx="3"/><path class="b" d="M3 22.5 11.5 14l7 7 3.5-3.5 7 7V24a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3z"/><circle class="w" cx="21.5" cy="11" r="2.6"/>',
  classic: '<rect class="a" x="3" y="5" width="26" height="22" rx="3"/><path class="b" d="M6 5h20a3 3 0 0 1 3 3v3H3V8a3 3 0 0 1 3-3z"/><rect class="l" x="6" y="14" width="6" height="10" rx="1"/><rect class="w" x="14" y="14" width="12" height="10" rx="1"/>',
  reload: '<path class="s1" d="M26 15.5A10 10 0 1 1 22.6 8"/><path class="b" d="M27.3 4.6v8.1a1.3 1.3 0 0 1-1.3 1.3h-8.1a1.3 1.3 0 0 1-.9-2.2l8.1-8.1a1.3 1.3 0 0 1 2.2.9z"/>',
  info: '<circle class="b" cx="16" cy="17" r="12.5"/><circle class="a" cx="16" cy="16" r="12.5"/><rect class="w" x="14.4" y="13.8" width="3.2" height="9.2" rx="1.6"/><circle class="w" cx="16" cy="10" r="2"/>',
  sliders: '<rect class="a" x="3.5" y="3.5" width="25" height="25" rx="6"/><rect class="l" x="8" y="9.8" width="16" height="2.4" rx="1.2"/><rect class="l" x="8" y="19.8" width="16" height="2.4" rx="1.2"/><circle class="w" cx="19.5" cy="11" r="3.3"/><circle class="w" cx="12.5" cy="21" r="3.3"/><circle class="b" cx="19.5" cy="11" r="1.5"/><circle class="b" cx="12.5" cy="21" r="1.5"/>',
  widgets: '<rect class="a" x="3.5" y="3.5" width="11" height="11" rx="2.6"/><rect class="b" x="17.5" y="3.5" width="11" height="11" rx="2.6"/><rect class="b" x="3.5" y="17.5" width="25" height="11" rx="2.6"/><rect class="l" x="7" y="21" width="10" height="2.2" rx="1.1"/>',
  brush: '<path class="b" d="M19.6 4.4a2 2 0 0 1 2.8 0l5.2 5.2a2 2 0 0 1 0 2.8l-8.9 8.9-8-8z"/><path class="l" d="M19.6 4.4a2 2 0 0 1 2.8 0l1.5 1.5-10.2 10.2-3-3z"/><path class="a" d="M9.8 14.2l8 8-1.6 1.6a3 3 0 0 1-2.8.8l-1.6-.4c-.7 2.6-3 4.3-5.8 4.3H3.5c1.5-1 2-2.4 2.2-4.4.2-2.4 1.6-4.3 4-4.9l-.4-1.6a3 3 0 0 1 .8-2.8z"/>',
  notes: '<rect class="a" x="5" y="4" width="22" height="25" rx="3"/><path class="b" d="M8 4h16a3 3 0 0 1 3 3v3H5V7a3 3 0 0 1 3-3z"/><rect class="w" x="9" y="14" width="14" height="2.2" rx="1.1"/><rect class="l" x="9" y="18.6" width="14" height="2.2" rx="1.1"/><rect class="l" x="9" y="23.2" width="9" height="2.2" rx="1.1"/><rect class="w" x="10" y="2" width="2.4" height="5" rx="1.2"/><rect class="w" x="19.6" y="2" width="2.4" height="5" rx="1.2"/>',
  compass: '<circle class="b" cx="16" cy="17" r="13"/><circle class="a" cx="16" cy="16" r="13"/><path class="l" d="M5 13.5a11.3 11.3 0 0 1 19.6-5.4A13 13 0 0 0 5 13.5z"/><path class="w" d="m21.9 10.1-3.4 8.4-8.4 3.4 3.4-8.4z"/><circle class="b" cx="16" cy="16" r="1.8"/>',
  play: '<rect class="b" x="2.5" y="7" width="27" height="20" rx="6"/><rect class="a" x="2.5" y="5.5" width="27" height="20" rx="6"/><path class="w" d="M13 11.4a1 1 0 0 1 1.5-.9l7 4.1a1 1 0 0 1 0 1.8l-7 4.1a1 1 0 0 1-1.5-.9z"/>',
  locker: '<path class="b" d="M6.5 5h19l3 7H3.5z"/><rect class="a" x="3.5" y="11" width="25" height="17" rx="3"/><rect class="w" x="12" y="15.5" width="8" height="2.6" rx="1.3"/><path class="l" d="M3.5 14a3 3 0 0 1 3-3h19a3 3 0 0 1 3 3z"/>',
};
const fluentSvg = (name) =>
  FLUENT[name] ? `<svg class="mdos-fi" viewBox="0 0 32 32" aria-hidden="true">${FLUENT[name]}</svg>` : "";
const svg = (name) =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ICONS.launchpad}</svg>`;
const LOGO =
  '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="13.6" r="7.9" fill="currentColor"/><path d="M12 6.2c-.9-1.9-2.8-2.6-4.4-2.1 1 .4 1.8 1.2 2.2 2.1-1.6-.3-2.9.2-3.7 1.1 1.8.2 3.6.1 5.9-1.2 2.3 1.3 4.1 1.4 5.9 1.2-.8-.9-2.1-1.4-3.7-1.1.4-.9 1.2-1.7 2.2-2.1-1.6-.5-3.5.2-4.4 2.1z" fill="#45c46f"/></svg>';
// Windows 11 caption buttons: minimize, maximize, close (thin 1 px glyphs).
const LIGHT_GLYPHS = {
  close: '<svg viewBox="0 0 10 10" aria-hidden="true"><path d="M.5.5l9 9M9.5.5l-9 9"/></svg>',
  minimize: '<svg viewBox="0 0 10 10" aria-hidden="true"><path d="M0 5h10"/></svg>',
  zoom: '<svg viewBox="0 0 10 10" aria-hidden="true"><rect x=".5" y=".5" width="9" height="9" rx="1.5"/></svg>',
};
// The Start button: four rounded panes.
const START_GLYPH =
  '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="2" width="9.5" height="9.5" rx="1.2"/><rect x="12.5" y="2" width="9.5" height="9.5" rx="1.2"/><rect x="2" y="12.5" width="9.5" height="9.5" rx="1.2"/><rect x="12.5" y="12.5" width="9.5" height="9.5" rx="1.2"/></svg>';

// label(): prefer Marinara's own (already localized) button title.
const hostLabel = (el, fallback) => el?.getAttribute("title") || el?.getAttribute("aria-label") || fallback;

const APPS = [
  { id: "home", icon: "home", g: ["#61b0ff", "#2f62f5"], label: () => hostLabel(doc.querySelector(SEL.homeBtn), L.home) },
  { id: "chats", icon: "chat", g: ["#6ef08d", "#17a84d"], label: () => hostLabel(doc.querySelector(SEL.chatsBtn), L.chats), hidden: true },
  // Conversation, Roleplay and Game are apps of their own (like Messages,
  // Books and Arcade): each opens the chat list on its mode.
  { id: "mode:conversation", icon: "chat", g: ["#6ef08d", "#17a84d"], label: () => L.modes[0], mode: "conversation" },
  { id: "mode:roleplay", icon: "roleplay", g: ["#ffb35c", "#f06a1d"], label: () => L.modes[1], mode: "roleplay" },
  { id: "mode:game", icon: "game", g: ["#ff7ab0", "#7b5cff"], label: () => L.modes[2], mode: "game" },
  { id: "characters", icon: "characters", g: ["#ffb35c", "#f06a1d"], panel: true },
  { id: "personas", icon: "personas", g: ["#d48bff", "#8a3ff0"], panel: true },
  { id: "lorebooks", icon: "lorebooks", g: ["#f3c46b", "#b9772a"], panel: true },
  { id: "presets", icon: "presets", g: ["#5fe0d4", "#1b9a9a"], panel: true },
  { id: "connections", icon: "connections", g: ["#8a9bff", "#4651e0"], panel: true },
  { id: "agents", icon: "agents", g: ["#ff8fc4", "#e23f86"], panel: true },
  { id: "settings", icon: "settings", g: ["#b9bec9", "#6b7281"], panel: true },
];
const TAIL_APPS = [
  { id: "launchpad", icon: "launchpad", g: ["#ff9f7a", "#7b61ff"], label: () => L.launchpad },
  { id: "search", icon: "search", g: ["#9aa6bb", "#4f5a70"], label: () => L.search },
];
const EXTRA_APPS = [
  { id: "controlcenter", icon: "sliders", g: ["#8e9cff", "#4b5ae0"], label: () => L.controlCenter },
  { id: "locker", icon: "locker", g: ["#c7b8ff", "#6f5bd9"], label: () => L.lk.title },
  { id: "widgets", icon: "widgets", g: ["#ffd36b", "#ff8a3d"], label: () => L.editWidgets },
  { id: "customize", icon: "brush", g: ["#ff9ad1", "#b25cff"], label: () => L.customize },
  { id: "wallpaper", icon: "wallpaper", g: ["#7ad7ff", "#ff7aa8"], label: () => L.wallpaper },
  { id: "classic", icon: "classic", g: ["#c9ced8", "#868d9b"], label: () => L.classic },
  { id: "about", icon: "info", g: ["#7fb6ff", "#4b7cf2"], label: () => L.aboutShort },
  { id: "reload", icon: "reload", g: ["#9be37b", "#3f9f46"], label: () => L.reload },
];
for (const app of APPS) {
  if (app.panel) app.label = () => hostLabel(panelBtn(app.id), L[app.id]);
}
// Marinara's Home tabs (Professor Mari, Noodle, …) become apps of their own.
const homeApps = () =>
  (state.homeApps || []).map((t) => ({
    id: `tab:${t.key}`,
    tab: t.key,
    img: t.img,
    g: ["#ffffff", "#e9e9ef"],
    label: () => t.label,
  }));
// Small apps that run in our own windows.
const UTIL_APPS = [
  { id: "notes", icon: "notes", g: ["#ffe27a", "#f5b400"], label: () => L.notes, util: true },
  { id: "browser", icon: "compass", g: ["#6fd3ff", "#1f7cf2"], label: () => L.browser, util: true },
  { id: "youtube", icon: "play", g: ["#ff6b6b", "#d91c1c"], label: () => L.youtube, util: true },
];
const hostOf = (url) => {
  try {
    return new URL(url).host.replace(/^www\./, "");
  } catch {
    return url;
  }
};
const hueOf = (text) => [...text].reduce((a, c) => (a * 31 + c.charCodeAt(0)) % 360, 7);
// Bookmarks are apps too: an icon on the home screen that opens the address.
const bookmarkApps = () =>
  (state.bookmarks || []).map((b) => {
    const host = hostOf(b.url);
    const hue = hueOf(host);
    let favicon = null;
    try {
      const u = new URL(b.url);
      if (u.protocol === "https:") favicon = `${u.origin}/favicon.ico`;
    } catch {
      /* not a URL: letter tile only */
    }
    return {
      id: `bm:${b.id}`,
      bm: b,
      favicon,
      letter: (b.title || host || "?").trim().charAt(0).toUpperCase(),
      g: [`hsl(${hue} 70% 62%)`, `hsl(${(hue + 40) % 360} 65% 46%)`],
      label: () => b.title || host,
    };
  });
const shownApps = () => APPS.filter((a) => !a.hidden);
const allApps = () => [...APPS, ...UTIL_APPS, ...homeApps(), ...bookmarkApps(), ...TAIL_APPS, ...EXTRA_APPS];
const appById = (id) => allApps().find((a) => a.id === id);

// ── State ─────────────────────────────────────────────────────

const DEFAULTS = {
  enabled: true,
  wallpaper: "bloom",
  accent: "blue",
  dockSize: 54,
  magnify: false,
  dockAutohide: false,
  dockRecents: true,
  bootSplash: true,
  sceneBarTop: true,
  messengerPane: true,
  listW: 320,
  lockerOn: true,
  lockerEngine: "builtin", // "builtin" | "bgh" (the 확장 보관함 extension)
  locker: null,
  quickPalette: true,
  qp: null,
  iconView: true,
  mainMinimized: false,
  windows: {},
  iconStyle: "fluent",
  iconShape: "squircle",
  cursor: "system",
  cursorSize: "m",
  icons: {},
  widgets: null,
  reduceTransparency: false,
  reduceMotion: false,
  rpStyle: "book",
  convoStyle: "messages",
  rpTone: true,
  homeApps: [],
  apps: [], // open small-app windows
  bookmarks: [],
  desk: null, // desktop icons [{ id, app, x, y }]
  sbOrder: [], // touch home screen: app order
  sbHidden: [], // touch home screen: apps taken off the grid
  board: "left", // Marinara's Home blocks: left | center | hidden
  showCredits: true,
  showFeed: true,
  realGlass: false,
  themeSync: true, // follow the theme applied in Marinara's theme library
  layoutMode: "grid", // widgets & desktop icons: grid | free
  chat: { convo: {}, rp: {} }, // chat design overrides (empty = default)
  yt: { mode: "link", apiKey: "" },
};
let stored = {};
try {
  stored = (await marinara.storage.get()) || {};
} catch (error) {
  marinara.log.warn("Could not read saved desktop state", error);
}
const state = { ...DEFAULTS, ...(stored.desktop && typeof stored.desktop === "object" ? stored.desktop : {}) };
state.windows = { ...(state.windows || {}) };
state.icons = { ...(state.icons || {}) };
{
  const scrub = (v) =>
    typeof v === "string" ? (/^(?:#|rgb|hsl|color\()/i.test(v) ? v : cleanText(v)) : Array.isArray(v) ? v.map(scrub) : v && typeof v === "object" ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, k === "color" ? x : scrub(x)])) : v;
  if (state.credits) state.credits = scrub(state.credits);
  if (state.ledger) state.ledger = scrub(state.ledger);
}
// Images live under their own storage key so ordinary saves stay small.
const images = {
  wallpaper: "",
  chatBg: "",
  cursor: "",
  icons: {},
  photos: {},
  ...(stored.desktopImages && typeof stored.desktopImages === "object" ? stored.desktopImages : {}),
};
if (state.wallpaperImage) {
  images.wallpaper = state.wallpaperImage;
  delete state.wallpaperImage;
}
let widgetSeq = Date.now();
// Extension locker records (key -> { key, el, hidden, saved, base, revealed }); see lockerTick.
function hasHangul(t) {
  return /[가-힣]/.test(t || "");
}
const lkRecs = new Map();
// The 확장 보관함 extension's names by button label (desktop.js bghPull).
const bghNames = new Map();
const newId = () => `w${(widgetSeq++).toString(36)}`;
if (!Array.isArray(state.widgets)) {
  state.widgets = [
    { id: newId(), type: "launcher", size: "m", style: "glass", x: null, y: null },
    { id: newId(), type: "clock", size: "m", style: "glass", x: null, y: null },
    { id: newId(), type: "calendar", size: "s", style: "glass", x: null, y: null },
    { id: newId(), type: "dday", size: "s", style: "accent", title: L.ddayDefault, date: "", x: null, y: null },
  ];
  state.launcherSeeded = true;
}
// Older layouts had the New chat buttons in Marinara's greeting; add the
// launcher widget once at the top of the right column and restack around it.
if (!state.launcherSeeded) {
  if (!state.widgets.some((w) => w.type === "launcher")) {
    state.widgets.unshift({ id: newId(), type: "launcher", size: "m", style: "glass", x: null, y: null });
    for (const w of state.widgets) w.x = w.y = null, (w.manual = false);
  }
  state.launcherSeeded = true;
}

// 2.3: the document window now leaves the widget column free by default;
// forget an older saved size once so the new default applies.
if (!state.mainFitWidgets) {
  if (state.windows && !state.windows.main?.snap) delete state.windows.main;
  state.mainFitWidgets = true;
}
// 2.18: the saved chat window no longer includes the joined list (the list is
// added on its left); take the list's width off a size saved with it once.
if (!state.paneChatOnly) {
  const m = state.windows?.main;
  const lw = Math.min(Math.max(state.listW || 320, 240), 480);
  if (state.messengerPane !== false && m && !m.snap && Number.isFinite(m.w) && m.w - lw >= 520) {
    state.windows.main = { ...m, x: m.x + lw, w: m.w - lw };
  }
  state.paneChatOnly = true;
}
for (const key of ["apps", "bookmarks", "sbOrder", "sbHidden", "readerHosts"]) if (!Array.isArray(state[key])) state[key] = [];
state.chat = { convo: { ...(state.chat?.convo || {}) }, rp: { ...(state.chat?.rp || {}) } };
state.yt = { mode: "link", apiKey: "", ...(state.yt || {}) };
if (state.yt.mode === "api") state.yt.mode = "link";
if (!("separateWindows" in state)) state.separateWindows = true;
// App windows are frames of whole Marinara pages: like Windows after a restart
// they don't reopen by themselves (each would load the app again).
state.apps = state.apps.filter((a) => a.type !== "mwin");
if (EMBED) {
  // The frame shows one app; it never writes the desktop's saved layout.
  state.enabled = true;
  state.apps = [];
  state.mainMinimized = false;
  state.messengerPane = true;
}
if (!Array.isArray(state.desk)) {
  state.desk = UTIL_APPS.map((a) => ({ id: newId(), app: a.id, x: null, y: null }));
}
// Notes live under their own storage key and save on their own schedule.
const notesStore = {
  notes: Array.isArray(stored.desktopNotes?.notes) ? stored.desktopNotes.notes : [],
};
let notesTimer = 0;
function saveNotes() {
  marinara.clearTimeout(notesTimer);
  notesTimer = marinara.setTimeout(() => {
    notesTimer = 0;
    marinara.storage
      .patch({ desktopNotes: notesStore })
      .catch((error) => marinara.log.warn("Could not save notes", error));
  }, 500);
}

let saveTimer = 0;
function save() {
  if (EMBED) return;
  marinara.clearTimeout(saveTimer);
  saveTimer = marinara.setTimeout(() => {
    saveTimer = 0;
    marinara.storage.patch({ desktop: state }).catch((error) => marinara.log.warn("Could not save desktop state", error));
  }, 400);
}
let imageTimer = 0;
function saveImages() {
  if (EMBED) return;
  marinara.clearTimeout(imageTimer);
  imageTimer = marinara.setTimeout(() => {
    imageTimer = 0;
    marinara.storage
      .patch({ desktopImages: images })
      .catch((error) => marinara.log.warn("Could not save desktop images", error));
  }, 300);
}
const imagesSize = () =>
  JSON.stringify(images).length + JSON.stringify(state).length + JSON.stringify(notesStore).length;

// ── Small DOM helpers ─────────────────────────────────────────

const $ = (s, r = doc) => r.querySelector(s);
const $$ = (s, r = doc) => Array.from(r.querySelectorAll(s));
// Within one sync() the same few shell parts are looked up many times
// (is Home showing, is the chat list open…); each miss scans the whole page.
// During a sync they are looked up once (sync only reads the page).
let lookups = null;
const $once = (s) => {
  if (!lookups) return doc.querySelector(s);
  if (!lookups.has(s)) lookups.set(s, doc.querySelector(s));
  return lookups.get(s);
};
const disposers = [];
function on(target, type, fn, opts) {
  target.addEventListener(type, fn, opts);
  disposers.push(() => target.removeEventListener(type, fn, opts));
}
function h(tag, attrs = {}, ...kids) {
  const el = doc.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (v == null || v === false) continue;
    if (k === "class") el.className = v;
    else if (k === "svg") el.innerHTML = v; // static icon markup defined above only
    else if (k === "text") el.textContent = v;
    else if (k === "style") el.style.cssText = v;
    else if (k === "value") el.value = v;
    else if (k.startsWith("on") && typeof v === "function") el.addEventListener(k.slice(2), v);
    else el.setAttribute(k, v === true ? "" : String(v));
  }
  for (const kid of kids.flat()) {
    if (kid == null || kid === false) continue;
    el.append(kid instanceof Node ? kid : doc.createTextNode(String(kid)));
  }
  return el;
}
const setVar = (name, value) => {
  if (html.style.getPropertyValue(name) !== value) html.style.setProperty(name, value);
};
const setText = (el, text) => {
  if (el && el.textContent !== text) el.textContent = text;
};
const setAttr = (el, name, value) => {
  if (!el) return;
  if (value == null) {
    if (el.hasAttribute(name)) el.removeAttribute(name);
  } else if (el.getAttribute(name) !== value) el.setAttribute(name, value);
};
const toggleClass = (cls, on) => {
  if (html.classList.contains(cls) !== !!on) html.classList.toggle(cls, !!on);
};
const reducedMotion = () => state.reduceMotion || matchMedia("(prefers-reduced-motion: reduce)").matches;
const raf = (fn) =>
  requestAnimationFrame(() => {
    if (!disposed) fn();
  });

// Downscale a picked image to a data URL that fits the storage budget.
async function fileToDataUrl(file, maxSide, maxBytes, square = false) {
  const bitmap = await createImageBitmap(file);
  let sx = 0;
  let sy = 0;
  let sw = bitmap.width;
  let sh = bitmap.height;
  if (square) {
    const side = Math.min(sw, sh);
    sx = (sw - side) / 2;
    sy = (sh - side) / 2;
    sw = sh = side;
  }
  const scale = Math.min(1, maxSide / Math.max(sw, sh));
  const canvas = doc.createElement("canvas");
  canvas.width = Math.round(sw * scale);
  canvas.height = Math.round(sh * scale);
  canvas.getContext("2d").drawImage(bitmap, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);
  bitmap.close?.();
  let quality = 0.86;
  let type = "image/webp";
  let data = canvas.toDataURL(type, quality);
  if (!data.startsWith("data:image/webp")) {
    type = "image/jpeg";
    data = canvas.toDataURL(type, quality);
  }
  while (data.length > maxBytes && quality > 0.35) {
    quality -= 0.1;
    data = canvas.toDataURL(type, quality);
  }
  if (data.length > maxBytes) throw new Error("too large");
  return data;
}
function pickImage(onPicked, { maxSide, maxBytes, square }) {
  const input = h("input", { type: "file", accept: "image/*", hidden: true });
  input.addEventListener("change", async () => {
    const file = input.files?.[0];
    input.remove();
    if (!file) return;
    try {
      const data = await fileToDataUrl(file, maxSide, maxBytes, square);
      onPicked(data);
    } catch (error) {
      marinara.log.warn("Image upload failed", error);
      window.alert(L.tooLarge);
    }
  });
  doc.body.append(input);
  input.click();
}
// Store an image only if the whole extension storage stays under budget.
function storeImage(apply) {
  const backup = JSON.stringify(images);
  apply();
  if (imagesSize() > STORAGE_BUDGET) {
    Object.assign(images, JSON.parse(backup));
    window.alert(L.storageFull);
    return false;
  }
  saveImages();
  return true;
}

// ── Host state readers ────────────────────────────────────────

const isOpen = (sel) => {
  const el = $once(sel);
  return !!el && el.getAttribute("aria-hidden") !== "true";
};
const chatsOpen = () => isOpen(SEL.chats);
const panelOpen = () => isOpen(SEL.panel);
const activePanelId = () => PANEL_IDS.find((id) => panelBtn(id)?.getAttribute("aria-pressed") === "true") || null;
const homeVisible = () => !!$once(SEL.hub);
const homePageVisible = () => !!$once(SEL.homePage) && !$once(SEL.detail);
const click = (el) => {
  if (el) el.click();
  return !!el;
};

// ── Roots (our own nodes live outside #root) ──────────────────

const ui = h("div", { id: "mdos-ui", "data-mdos": "" });
const wallpaper = h("div", { id: "mdos-wallpaper", "aria-hidden": "true" });
const widgetLayer = h("div", { id: "mdos-widgets" });
const snapPreview = h("div", { id: "mdos-snap", "aria-hidden": "true" });
const hostRoot = $(SEL.root);
// apps + touch CSS ship in styles.js (Marinara caps extension CSS at 256 KiB);
// they go after the manifest CSS, as the last two stylesheets did.
const lateCss = h("style", { id: "mdos-late-css", "data-exd": "" });
lateCss.textContent = typeof MDOS_LATE_CSS === "string" ? MDOS_LATE_CSS : "";
doc.head.append(lateCss);
doc.body.prepend(wallpaper);
// The widget layer sits before #root so Marinara's windows paint above it.
if (hostRoot?.parentNode) hostRoot.parentNode.insertBefore(widgetLayer, hostRoot);
else doc.body.append(widgetLayer);
doc.body.append(ui);
ui.append(snapPreview);
// Launcher drawers such as "확장 보관함" skip roots marked data-exd. Our layers
// aren't floating launchers, and without the mark every clock tick, Dock or
// window change woke a full-page scan there (~125 ms each, twice a second).
for (const el of [ui, wallpaper, widgetLayer]) el.setAttribute("data-exd", "");

// ── Mode ──────────────────────────────────────────────────────

let mode = "off"; // "desktop" | "touch" | "off"
function computeMode() {
  if (!state.enabled) return "off";
  const main = $(SEL.main);
  if (!main) return "off";
  if (main.getAttribute("data-shell-overlay-mode") === "true") return "touch";
  if (EMBED) return "desktop";
  return innerWidth >= MIN_VIEWPORT ? "desktop" : "off";
}
const isDesktop = () => mode === "desktop";
const isTouch = () => mode === "touch";
const isPhone = () => mode === "touch" && !html.classList.contains("mdos-tablet");

// ── App icons ─────────────────────────────────────────────────

function appLabel(app) {
  return state.icons[app.id]?.label || app.label();
}
function appIcon(app) {
  const custom = state.icons[app.id] || {};
  const g1 = custom.g1 || app.g[0];
  const g2 = custom.g2 || app.g[1];
  const el = h("span", { class: "mdos-app-icon", style: `--g1:${g1};--g2:${g2}` });
  const image = images.icons[app.id];
  if (image) {
    el.classList.add("has-image");
    el.append(h("img", { src: image, alt: "", draggable: "false" }));
  } else if (app.img) {
    el.classList.add("has-host-image");
    el.append(h("img", { src: app.img, alt: "", draggable: "false" }));
  } else if (app.letter) {
    // Bookmark: a letter tile, covered by the site's favicon when it loads.
    el.classList.add("has-letter");
    el.append(h("span", { class: "mdos-icon-letter", text: app.letter }));
    if (app.favicon) {
      const img = h("img", { class: "mdos-icon-favicon", src: app.favicon, alt: "", draggable: "false", loading: "lazy", referrerpolicy: "no-referrer" });
      img.addEventListener("error", () => img.remove());
      img.addEventListener("load", () => {
        if (img.naturalWidth < 12) img.remove();
      });
      el.append(img);
    }
  } else {
    // Both drawings ship: the Fluent colour icon (default style) and the
    // single-colour glyph the other icon styles put on a tile.
    el.innerHTML = fluentSvg(app.icon) + svg(app.icon);
    if (FLUENT[app.icon]) el.classList.add("has-fluent");
  }
  return el;
}

// ── Window manager (desktop) ──────────────────────────────────

const WIN_IDS = ["chats", "main", "panel"];
const WIN_SEL = { chats: SEL.chats, main: SEL.main, panel: SEL.panel };
let zOrder = ["chats", "panel", "main"];
let focused = "main";
const chrome = {};
let desktopHome = false;
// Small-app windows ("app:<id>") share the same manager as Marinara's windows.
const isAppWin = (id) => typeof id === "string" && id.startsWith("app:");
const appRec = (id) => state.apps.find((a) => `app:${a.id}` === id);
const appWins = new Map(); // "app:<id>" → { el, rec, … }
const winIds = () => [...WIN_IDS, ...appWins.keys()];
const APP_SIZES = { notes: [660, 460], browser: [1000, 660], youtube: [640, 404], customize: [880, 620] };
function defaultAppRect(rec) {
  const a = area();
  const [w0, h0] =
    rec?.type === "mwin"
      ? rec.target === "settings"
        ? [920, 680]
        : PANEL_IDS.includes(rec.target)
          ? [560, 720]
          : [1040, 720]
      : APP_SIZES[rec?.type] || [640, 460];
  const w = Math.min(w0, a.right - a.left - 40);
  const hh = Math.min(h0, a.bottom - a.top - 40);
  const n = (state.apps.indexOf(rec) + 6) % 6;
  return { x: Math.round((innerWidth - w) / 2) - 70 + n * 28, y: a.top + 40 + n * 28, w, h: hh };
}

function area() {
  if (EMBED) return { left: 0, top: 0, right: innerWidth, bottom: innerHeight };
  const reserve = state.dockAutohide ? 4 : MENUBAR_H + 8;
  return { left: 8, top: TOP_H + 8, right: innerWidth - 8, bottom: innerHeight - reserve };
}
function defaultRect(id) {
  if (isAppWin(id)) return defaultAppRect(appRec(id));
  const a = area();
  const height = a.bottom - a.top;
  const chatsW = Math.round(Math.min(320, Math.max(260, innerWidth * 0.2)));
  if (id === "chats") return { x: a.left + 4, y: a.top, w: chatsW, h: height };
  if (id === "main") {
    const x = a.left + 4 + chatsW + 10;
    // Leave the right-hand widget column showing beside the chat when the
    // screen is wide enough, so the desktop doesn't vanish behind a window.
    let right = a.right - 4;
    const col = state.widgets.filter((w) => Number.isFinite(w.x) && w.x > innerWidth / 2).map((w) => w.x);
    if (isDesktop() && col.length && Math.min(...col) - 16 - x >= 600) right = Math.min(...col) - 16;
    return { x, y: a.top, w: Math.max(MIN_W, right - x), h: height };
  }
  if (activePanelId() === "settings") {
    // Wide enough for the two-pane Settings layout (layout.css, ≥ 620 px).
    const w = Math.round(Math.min(860, a.right - a.left - 40));
    const hh = Math.round(Math.min(680, height - 30));
    return { x: Math.round((innerWidth - w) / 2), y: a.top + 16, w, h: hh };
  }
  const w = Math.round(Math.min(460, Math.max(360, innerWidth * 0.3)));
  return { x: a.right - w - 18, y: a.top + 22, w, h: height - 34 };
}
// The panel window remembers a size per panel (Settings wide, libraries narrow).
const winKey = (id) => (id === "panel" ? `panel:${activePanelId() || "none"}` : id);
const savedRect = (id) => (isAppWin(id) ? appRec(id) : state.windows[winKey(id)]);
function writeRect(id, r) {
  if (isAppWin(id)) {
    const rec = appRec(id);
    if (rec) Object.assign(rec, { x: r.x, y: r.y, w: r.w, h: r.h, snap: r.snap ?? null });
  } else state.windows[winKey(id)] = r;
}
// Moves use the compositor-only `translate`; left/top are committed on release.
function setTranslate(id, dx, dy) {
  if (isAppWin(id)) {
    const w = appWins.get(id);
    if (w) w.el.style.translate = dx || dy ? `${dx}px ${dy}px` : "";
    return;
  }
  setVar(`--mdos-${id}-tx`, `${dx}px`);
  setVar(`--mdos-${id}-ty`, `${dy}px`);
}
function maxRect() {
  const a = area();
  return { x: a.left, y: a.top, w: a.right - a.left, h: a.bottom - a.top };
}
// Windows 11 snap zones as fractions of the work area: [x, y, w, h].
const SNAPS = {
  max: [0, 0, 1, 1],
  left: [0, 0, 1 / 2, 1],
  right: [1 / 2, 0, 1 / 2, 1],
  tl: [0, 0, 1 / 2, 1 / 2],
  tr: [1 / 2, 0, 1 / 2, 1 / 2],
  bl: [0, 1 / 2, 1 / 2, 1 / 2],
  br: [1 / 2, 1 / 2, 1 / 2, 1 / 2],
  l3: [0, 0, 1 / 3, 1],
  c3: [1 / 3, 0, 1 / 3, 1],
  r3: [2 / 3, 0, 1 / 3, 1],
  l23: [0, 0, 2 / 3, 1],
  r23: [1 / 3, 0, 2 / 3, 1],
  l4: [0, 0, 1 / 4, 1],
  c24: [1 / 4, 0, 1 / 2, 1],
  r4: [3 / 4, 0, 1 / 4, 1],
};
// The layouts the maximize button offers (hover it), like Windows 11.
const SNAP_LAYOUTS = [
  ["left", "right"],
  ["l23", "r3"],
  ["l3", "c3", "r3"],
  ["left", "tr", "br"],
  ["tl", "tr", "bl", "br"],
  ["l4", "c24", "r4"],
];
function snapRect(kind) {
  const m = maxRect();
  const [fx, fy, fw, fh] = SNAPS[kind] || SNAPS.max;
  const gap = 4;
  let x0 = m.x + m.w * fx;
  let x1 = m.x + m.w * (fx + fw);
  let y0 = m.y + m.h * fy;
  let y1 = m.y + m.h * (fy + fh);
  if (fx > 0) x0 += gap;
  if (fx + fw < 0.999) x1 -= gap;
  if (fy > 0) y0 += gap;
  if (fy + fh < 0.999) y1 -= gap;
  return { x: Math.round(x0), y: Math.round(y0), w: Math.round(x1 - x0), h: Math.round(y1 - y0) };
}
const halfRect = (side) => snapRect(side);
function clampRect(r) {
  const w = Math.min(Math.max(r.w, MIN_W), innerWidth - 8);
  const hh = Math.min(Math.max(r.h, MIN_H), innerHeight - MENUBAR_H - 8);
  const x = Math.min(Math.max(r.x, 120 - w), innerWidth - 120);
  const y = Math.min(Math.max(r.y, TOP_H + 2), innerHeight - MENUBAR_H - 40);
  return { x: Math.round(x), y: Math.round(y), w: Math.round(w), h: Math.round(hh) };
}
const validRect = (r) => r && ["x", "y", "w", "h"].every((k) => Number.isFinite(r[k]));
// One messenger window (desktop): while the chat list is open it is the left
// part of the chat window's frame (the main window's saved rect); the two
// move and resize as one, and the seam sets the list's width.
const LIST_MIN = 240;
const LIST_MAX = 480;
const paneReady = () => isDesktop() && state.messengerPane !== false && !state.mainMinimized && !desktopHome && !html.classList.contains("mdos-focus");
// An editor (model, character, preset...) replaces the chat in this window
// (Marinara unmounts the chat meanwhile): it is its own window then, without
// the list, which waits hidden behind it and joins again when the chat is back.
const editorShown = () => isDesktop() && !!$once(SEL.detail);
const paneOn = () => paneReady() && chatsOpen() && !editorShown();
function listWidth(frame) {
  return Math.round(Math.min(Math.max(state.listW || 320, LIST_MIN), LIST_MAX, frame.w - MIN_W));
}
// The main window's saved rect is the chat alone; the open list is added on
// its left (the chat keeps its width), shifted / trimmed only to fit the screen.
// Snapped windows keep their screen area and the list shares it.
function paneFrame() {
  const f = baseRect("main");
  if (savedRect("main")?.snap) return f;
  const lw = Math.round(Math.min(Math.max(state.listW || 320, LIST_MIN), LIST_MAX));
  const x = Math.max(8, f.x - lw);
  const w = Math.max(LIST_MIN + MIN_W, Math.min(f.w + lw, innerWidth - 8 - x));
  return { x, y: f.y, w, h: f.h };
}
// A frame rect (list + chat) back to the chat-only rect that is saved.
function chatPart(r) {
  const lw = listWidth(r);
  return { ...r, x: r.x + lw, w: r.w - lw };
}
function rectOf(id) {
  if ((id === "chats" || id === "main") && paneOn()) {
    const f = paneFrame();
    const lw = listWidth(f);
    return id === "chats" ? { x: f.x, y: f.y, w: lw, h: f.h } : { x: f.x + lw, y: f.y, w: f.w - lw, h: f.h };
  }
  if (id === "chats" && paneReady()) {
    // Closed, the list waits tucked behind the chat's left edge, so opening
    // slides it out from there (not across the screen from its old place).
    const m = baseRect("main");
    return { x: m.x, y: m.y, w: Math.min(Math.round(Math.min(Math.max(state.listW || 320, LIST_MIN), LIST_MAX)), m.w), h: m.h };
  }
  return baseRect(id);
}
function baseRect(id) {
  const saved = savedRect(id);
  if (saved?.snap === "max") return maxRect();
  if (saved?.snap && SNAPS[saved.snap]) return snapRect(saved.snap);
  return clampRect(validRect(saved) ? saved : defaultRect(id));
}
function applyRect(id) {
  const r = rectOf(id);
  const snapped = savedRect(id)?.snap || "";
  const winEl = isAppWin(id) ? appWins.get(id)?.el : doc.querySelector(`[data-mdos-win="${id}"]`);
  if (winEl && (winEl.dataset.mdosSnap || "") !== snapped) {
    if (snapped) winEl.dataset.mdosSnap = snapped;
    else delete winEl.dataset.mdosSnap;
  }
  if (isAppWin(id)) {
    const w = appWins.get(id);
    if (w) Object.assign(w.el.style, { left: `${r.x}px`, top: `${r.y}px`, width: `${r.w}px`, height: `${r.h}px` });
    return;
  }
  const moved = html.style.getPropertyValue(`--mdos-${id}-x`) !== `${r.x}px` || html.style.getPropertyValue(`--mdos-${id}-y`) !== `${r.y}px`;
  setVar(`--mdos-${id}-x`, `${r.x}px`);
  setVar(`--mdos-${id}-y`, `${r.y}px`);
  setVar(`--mdos-${id}-w`, `${r.w}px`);
  setVar(`--mdos-${id}-h`, `${r.h}px`);
  if (id === "main" && moved) remeasureBubbles();
}
// Marinara places its chat bubbles (chat settings, tracker) in screen
// coordinates measured from the chat area, and measures again only when the
// browser window resizes. Inside our chat window they are shifted back by the
// window's position (apps.css); when the window moves, ask for a new measure.
let bubbleTimer = 0;
function remeasureBubbles() {
  marinara.clearTimeout(bubbleTimer);
  bubbleTimer = marinara.setTimeout(() => window.dispatchEvent(new Event("marinara:chat-visual-viewport-change")), 350);
}
const applyAllRects = () => winIds().forEach(applyRect);
function applyZ() {
  zOrder.forEach((id, i) => {
    if (!isAppWin(id)) return setVar(`--mdos-${id}-z`, String(10 + i));
    const w = appWins.get(id);
    // A pinned window ("keep on top") stays above every other window.
    if (w) w.el.style.zIndex = String(w.rec.pinned ? 7900 : 10 + i);
  });
  for (const id of WIN_IDS) setAttr($(WIN_SEL[id]), "data-mdos-focused", focused === id ? "true" : null);
  for (const [id, w] of appWins) setAttr(w.el, "data-mdos-focused", focused === id ? "true" : null);
}
function windowVisible(id) {
  if (isAppWin(id)) {
    const rec = appRec(id);
    return !!rec && !rec.min;
  }
  if (id === "chats") return chatsOpen() && !(paneReady() && editorShown());
  if (id === "panel") return panelOpen();
  return !state.mainMinimized && !desktopHome;
}
function focusWin(id) {
  if (!id) return;
  if (id === "chats" && paneOn()) id = "main";
  zOrder = zOrder.filter((x) => x !== id).concat(id);
  focused = id;
  applyZ();
  updateMenubar();
  refreshDockFocus();
}
function focusTopVisible() {
  const next = [...zOrder].reverse().find((id) => windowVisible(id));
  focused = next || null;
  applyZ();
  updateMenubar();
  refreshDockFocus();
}
function cycleWindows() {
  const visible = winIds().filter(windowVisible);
  if (visible.length < 2) return;
  // Bring the back-most visible window forward.
  const back = zOrder.find((id) => visible.includes(id) && id !== focused);
  focusWin(back);
}
function animateGeometry() {
  if (reducedMotion()) return;
  html.classList.add("mdos-animating");
  marinara.setTimeout(() => html.classList.remove("mdos-animating"), 320);
}
function zoomWin(id) {
  const saved = savedRect(id);
  if (saved?.snap) writeRect(id, { ...saved, snap: null });
  else if (isAppWin(id)) {
    // App records hold the restore size; the snap flag says "show maximised".
    const r = rectOf(id);
    writeRect(id, { ...r, snap: "max" });
  } else writeRect(id, { ...rectOf(id), snap: "max" });
  animateGeometry();
  applyRect(id);
  save();
}
// Put a window into one snap zone (Snap layouts, Ctrl Alt arrows).
function snapTo(id, kind) {
  if (!id) return;
  if (id === "chats" && paneOn()) id = "main";
  const saved = savedRect(id);
  // A snapped record still holds the size to restore to.
  const restore = validRect(saved) ? saved : rectOf(id);
  writeRect(id, { x: restore.x, y: restore.y, w: restore.w, h: restore.h, snap: kind });
  animateGeometry();
  applyRect(id);
  if (id === "main" && paneOn()) applyRect("chats");
  focusWin(id);
  save();
}
let snapFly = null;
let snapFlyTimer = 0;
function closeSnapFly() {
  marinara.clearTimeout(snapFlyTimer);
  snapFlyTimer = 0;
  snapFly?.el.remove();
  snapFly = null;
}
function openSnapFly(button) {
  const host = button.closest("[data-mdos-win]");
  let id = host?.getAttribute("data-mdos-win");
  if (!id || !isDesktop()) return;
  if (id === "chats" && paneOn()) id = "main";
  closeSnapFly();
  const el = h(
    "div",
    { class: "mdos-snapfly", role: "menu", "aria-label": L.snapLayouts },
    ...SNAP_LAYOUTS.map((layout) =>
      h(
        "div",
        { class: "mdos-snapfly-layout" },
        ...layout.map((kind) => {
          const [fx, fy, fw, fh] = SNAPS[kind];
          return h("button", {
            type: "button",
            class: "mdos-snapfly-zone",
            role: "menuitem",
            "aria-label": `${L.snapLayouts} ${kind}`,
            style: `left:calc(${fx * 100}% + 2px);top:calc(${fy * 100}% + 2px);width:calc(${fw * 100}% - 4px);height:calc(${fh * 100}% - 4px)`,
            onclick: () => {
              closeSnapFly();
              snapTo(id, kind);
            },
          });
        }),
      ),
    ),
  );
  ui.append(el);
  const r = button.getBoundingClientRect();
  el.style.left = `${Math.max(8, Math.min(r.left + r.width / 2 - el.offsetWidth / 2, innerWidth - el.offsetWidth - 8))}px`;
  el.style.top = `${r.bottom + 6}px`;
  el.addEventListener("pointerenter", () => marinara.clearTimeout(snapFlyTimer));
  el.addEventListener("pointerleave", () => (snapFlyTimer = marinara.setTimeout(closeSnapFly, 300)));
  snapFly = { el, button };
}
on(doc, "pointerover", (event) => {
  const button = event.target instanceof Element ? event.target.closest(".mdos-light--zoom") : null;
  if (!button || snapFly?.button === button) return;
  marinara.clearTimeout(snapFlyTimer);
  snapFlyTimer = marinara.setTimeout(() => openSnapFly(button), 450);
  const leave = () => {
    button.removeEventListener("pointerleave", leave);
    marinara.clearTimeout(snapFlyTimer);
    snapFlyTimer = snapFly ? marinara.setTimeout(closeSnapFly, 300) : 0;
  };
  button.addEventListener("pointerleave", leave);
});

function setMainMinimized(min) {
  if (state.mainMinimized === min) return;
  state.mainMinimized = min;
  toggleClass("mdos-main-min", min);
  save();
  if (min) focusTopVisible();
  else focusWin("main");
  syncSoon();
}
// App agents (Otome Hearth, Story Writer…) open as Home tabs. Leaving one
// selects Home's own tab; Marinara's Home button does nothing there.
const hubAppTab = () => {
  if (!homeVisible()) return null;
  const tab = $(`${SEL.homeTabs}[aria-selected="true"]`);
  return tab && tab.id !== "marinara-home-tab-home" ? tab : null;
};
const leaveHubApp = () => !!hubAppTab() && click($("#marinara-home-tab-home"));
// App agents paint their own backdrop (Otome Hearth is always dark, for
// example). The window's title strip takes that colour, with light or dark
// controls to match, instead of a light strip over a dark app.
// Cached per tab and theme: getComputedStyle forces a style pass, and sync
// runs over once a second.
let tintKey = "";
function tintHubApp(on) {
  const key = on ? `${hubAppTab()?.id}|${html.dataset.theme}|${themeCssSeen.length}` : "";
  if (key === tintKey) return;
  let bg = "";
  if (on) {
    let el = $('[data-component="HomeBrowserHub.Content"]')?.firstElementChild;
    for (let depth = 0; el && depth < 4; el = el.firstElementChild, depth++) {
      const c = getComputedStyle(el).backgroundColor;
      if (c && c !== "transparent" && !/^rgba\(.*,\s*0\)$/.test(c)) {
        bg = c;
        break;
      }
    }
  }
  // Remember only a found colour: a tab that just opened may not have painted yet.
  tintKey = on && !bg ? "" : key;
  if (bg) setVar("--mdos-hubapp-bg", bg);
  else html.style.removeProperty("--mdos-hubapp-bg");
  html.dataset.mdosHubTone = bg ? (luminance(bg) < 0.35 ? "dark" : "light") : "";
}
function goHome() {
  closeOverlays();
  if (state.mainMinimized) setMainMinimized(false);
  // On touch screens Home stays mounted under open sheets; Marinara's Home
  // button also closes those sheets there. Open small apps go to the background.
  if (isTouch()) for (const rec of state.apps) if (!rec.min) setAppMinimized(`app:${rec.id}`, true);
  // An app agent is a Home tab, so Home looks "visible" to nothing here:
  // always try to leave it first, then close any sheet with the Home button.
  const sheet = isTouch() && !!$(SEL.sheets);
  const leftApp = leaveHubApp();
  if ((!leftApp && !homePageVisible()) || sheet) click($(SEL.homeBtn));
}
function closeWin(id) {
  if (isAppWin(id)) return closeApp(id);
  if (id === "chats") {
    if (chatsOpen()) click($(SEL.chatsBtn));
  } else if (id === "panel") {
    const active = activePanelId();
    if (active) click(panelBtn(active));
  } else {
    // Closing the document window shows the desktop (Home).
    leaveHubApp() || click($(SEL.homeBtn));
  }
  marinara.setTimeout(focusTopVisible, 60);
}
function minimizeWin(id) {
  if (isAppWin(id)) setAppMinimized(id, true);
  else if (id === "main") setMainMinimized(true);
  else closeWin(id);
}
function showDesktop() {
  if (chatsOpen()) click($(SEL.chatsBtn));
  const active = activePanelId();
  if (active) click(panelBtn(active));
  goHome();
}

function windowTitle(id) {
  if (isAppWin(id)) {
    const rec = appRec(id);
    return rec ? appLabel(recApp(rec)) : "";
  }
  if (id === "chats") {
    const mode = activeChatMode();
    return appLabel(appById(mode ? `mode:${mode}` : "chats"));
  }
  if (id === "panel") {
    const active = activePanelId();
    return active ? appLabel(appById(active)) : L.panel;
  }
  if (desktopHome) return L.desktopTitle;
  if (homeVisible()) {
    const tab = $once(`${SEL.homeTabs}[aria-selected="true"]`);
    return tab?.getAttribute("aria-label") || appLabel(appById("home"));
  }
  if ($once(SEL.detail)) return L.editor;
  return "Marinara";
}

function makeTitlebar(id) {
  const lights = h(
    "div",
    { class: "mdos-lights" },
    ...["minimize", "zoom", "close"].map((act) =>
      h("button", {
        type: "button",
        class: `mdos-light mdos-light--${act}`,
        "aria-label": L[act],
        title: L[act],
        svg: LIGHT_GLYPHS[act],
        onclick: (event) => {
          event.stopPropagation();
          // Joined: the list and the chat are one messenger window, whose
          // caption buttons sit on the chat's right edge (Windows 11).
          const joined = paneOn();
          const target = id === "chats" && joined ? "main" : id;
          if (act === "close") {
            if (joined) click($(SEL.chatsBtn));
            closeWin(target);
          } else if (act === "minimize") minimizeWin(target);
          else zoomWin(target);
        },
      }),
    ),
  );
  // The chat window's strip: the sidebar button folds the list away / back.
  const toggle =
    id === "main"
      ? h("button", {
          type: "button",
          class: "mdos-pane-toggle",
          "aria-label": L.toggleList,
          title: L.toggleList,
          svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4.5" width="18" height="15" rx="3"/><path d="M9.5 4.5v15"/></svg>',
          onclick: (event) => {
            event.stopPropagation();
            animateGeometry();
            click($(SEL.chatsBtn));
            syncSoon();
          },
        })
      : null;
  // Marinara's own header (top bar / sidebar header / panel header) is the
  // title bar; we only add the lights on its left edge.
  return h("div", { class: `mdos-titlebar mdos-titlebar--${id === "main" ? "main" : "side"}` }, lights, toggle);
}

function ensureChrome() {
  for (const id of WIN_IDS) {
    const host = $(WIN_SEL[id]);
    const current = chrome[id];
    if (!host) continue;
    if (current && current.host === host && current.bar.parentNode === host) continue;
    current?.nodes.forEach((n) => n.remove());
    const bar = makeTitlebar(id);
    const grips = ["n", "e", "s", "w", "ne", "nw", "se", "sw"].map((dir) =>
      h("div", { class: `mdos-grip mdos-grip--${dir}`, "data-mdos-grip": dir, "aria-hidden": "true" }),
    );
    host.append(bar, ...grips);
    host.setAttribute("data-mdos-win", id);
    chrome[id] = { host, bar, nodes: [bar, ...grips] };
  }
  applyZ();
}
function removeChrome() {
  for (const id of WIN_IDS) {
    chrome[id]?.nodes.forEach((n) => n.remove());
    const host = chrome[id]?.host;
    host?.removeAttribute("data-mdos-win");
    host?.removeAttribute("data-mdos-focused");
    delete chrome[id];
  }
}

// ── Pointer gestures: windows and widgets ─────────────────────

let gesture = null;
let gestureFrame = 0;
const INTERACTIVE =
  'button, a, input, textarea, select, label, summary, [role="button"], [role="slider"], [role="tab"], [role="menuitem"], [contenteditable=""], [contenteditable="true"]';
const isDragSurface = (target, id) =>
  !!target.closest(".mdos-titlebar") ||
  (!target.closest(INTERACTIVE) &&
    !!target.closest(isAppWin(id) ? ".mdos-appwin-bar" : id === "main" ? SEL.topbar : SEL.sideHeaders));

function onPointerDown(event) {
  if (mode === "off") return;
  const target = event.target instanceof Element ? event.target : null;
  if (!target) return;
  if (openMenu && !target.closest(".mdos-menu, #mdos-menubar")) closeMenu();
  if (ccEl && !target.closest("#mdos-cc, [data-mdos-cc-toggle]")) closeCC();
  if (calEl && !target.closest("#mdos-cal, .mdos-mb-clock")) closeCal();
  if (snapFly && !target.closest(".mdos-snapfly")) closeSnapFly();
  if (popEl && !target.closest(".mdos-pop")) closePop();
  if (event.button !== 0) return;

  // Desktop icons drag any time (a click without movement opens them);
  // widgets drag in edit mode. Desktop only.
  const icon = target.closest(".mdos-dicon");
  if (icon && isDesktop() && !target.closest(".mdos-wg-badge")) {
    const rec = state.desk.find((d) => d.id === icon.dataset.did);
    if (rec) return startItemDrag(event, icon, rec, "icon");
  }
  const widget = target.closest(".mdos-wg");
  if (widget && editMode && isDesktop() && !target.closest(".mdos-wg-badge, textarea, input")) {
    const w = state.widgets.find((x) => x.id === widget.dataset.wid);
    if (w) return startItemDrag(event, widget, w, "widget");
  }
  if (!isDesktop()) return;

  const host = target.closest("[data-mdos-win]");
  const id = host?.getAttribute("data-mdos-win");
  if (!id || !(WIN_IDS.includes(id) || isAppWin(id))) return;
  if (!(id === "main" && desktopHome)) focusWin(id);
  if (id === "main" && desktopHome) return;

  const grip = target.closest("[data-mdos-grip]");
  if (grip) return startGesture(event, id, grip.getAttribute("data-mdos-grip"));
  if (target.closest(".mdos-light")) return;
  if (isDragSurface(target, id)) startGesture(event, id, "move");
}

function startGesture(event, id, gmode) {
  event.preventDefault();
  // The title strip sits on Marinara's TopBar, whose "pull down to search /
  // ask Mari" drag starts from the same press. We listen on the document in
  // the capture phase, so stopping here keeps that press from React entirely.
  event.stopPropagation();
  let frame = false;
  if (paneOn() && (id === "chats" || id === "main")) {
    // The seam between list and chat sets the list's width.
    if ((id === "chats" && gmode === "e") || (id === "main" && gmode === "w")) {
      gesture = { kind: "seam", sx: event.clientX, sy: event.clientY, startW: rectOf("chats").w, moved: false };
      html.classList.add("mdos-gesture");
      html.dataset.mdosGesture = "e-resize";
      return;
    }
    // Everything else moves / resizes the whole window (its frame).
    id = "main";
    frame = true;
  }
  const saved = savedRect(id);
  let start = frame ? paneFrame() : rectOf(id);
  if (gmode === "move" && saved?.snap) {
    // Pull a snapped window off the edge at its remembered size, under the pointer.
    const restore = clampRect(validRect(saved) ? saved : defaultRect(id));
    const ratio = (event.clientX - start.x) / start.w;
    start = { ...restore, x: event.clientX - restore.w * ratio, y: start.y };
    writeRect(id, { ...start, snap: null });
    if (frame) start = paneFrame();
    applyRect(id);
    if (frame) applyRect("chats");
  }
  gesture = { kind: "window", id, frame, mode: gmode, sx: event.clientX, sy: event.clientY, start, rect: start, moved: false, snap: null };
  html.classList.add("mdos-gesture");
  html.dataset.mdosGesture = gmode === "move" ? "move" : `${gmode}-resize`;
}

// Widgets and desktop icons both live in the widget layer and drag the same way.
function startItemDrag(event, el, rec, kind) {
  event.preventDefault();
  const r = el.getBoundingClientRect();
  const layer = widgetLayer.getBoundingClientRect();
  gesture = {
    kind,
    el,
    w: rec,
    sx: event.clientX,
    sy: event.clientY,
    start: { x: r.left - layer.left, y: r.top - layer.top },
    moved: false,
    dx: 0,
    dy: 0,
  };
  el.classList.add("is-dragging");
  html.classList.add("mdos-gesture");
}

function onPointerMove(event) {
  if (state.dockAutohide && isDesktop()) dockProximity(event);
  if (!gesture) return;
  const dx = event.clientX - gesture.sx;
  const dy = event.clientY - gesture.sy;
  if (!gesture.moved && Math.abs(dx) + Math.abs(dy) < 3) return;
  gesture.moved = true;
  gesture.dx = dx;
  gesture.dy = dy;
  gesture.cx = event.clientX;
  gesture.cy = event.clientY;
  if (!gestureFrame) gestureFrame = raf(applyGestureFrame);
}

// One style write per frame. Moves use the compositor-only `translate`
// property; left/top are committed once when the pointer is released.
function applyGestureFrame() {
  gestureFrame = 0;
  const g = gesture;
  if (!g) return;
  if (g.kind === "widget" || g.kind === "icon") {
    g.el.style.translate = `${g.dx}px ${g.dy}px`;
    return;
  }
  if (g.kind === "seam") {
    state.listW = Math.round(Math.min(Math.max(g.startW + g.dx, LIST_MIN), LIST_MAX));
    applyRect("chats");
    applyRect("main");
    return;
  }
  const s = g.start;
  if (g.mode === "move") {
    setTranslate(g.id, g.dx, Math.max(g.dy, TOP_H + 2 - s.y));
    if (g.frame) setTranslate("chats", g.dx, Math.max(g.dy, TOP_H + 2 - s.y));
    // Edges snap to halves (top: maximize), corners to quarters.
    const C = 90;
    const bottom = area().bottom;
    if (g.cy <= TOP_H + SNAP_EDGE) g.snap = g.cx <= C ? "tl" : g.cx >= innerWidth - C ? "tr" : "max";
    else if (g.cx <= SNAP_EDGE) g.snap = g.cy <= TOP_H + C ? "tl" : g.cy >= bottom - C ? "bl" : "left";
    else if (g.cx >= innerWidth - SNAP_EDGE) g.snap = g.cy <= TOP_H + C ? "tr" : g.cy >= bottom - C ? "br" : "right";
    else g.snap = null;
    showSnapPreview(g.snap);
    return;
  }
  let { x, y, w, h: hh } = s;
  const m = g.mode;
  if (m.includes("e")) w = Math.max(MIN_W, s.w + g.dx);
  if (m.includes("s")) hh = Math.max(MIN_H, s.h + g.dy);
  if (m.includes("w")) {
    w = Math.max(MIN_W, s.w - g.dx);
    x = s.x + s.w - w;
  }
  if (m.includes("n")) {
    hh = Math.max(MIN_H, s.h - g.dy);
    y = s.y + s.h - hh;
    if (y < TOP_H + 2) {
      hh -= TOP_H + 2 - y;
      y = TOP_H + 2;
    }
  }
  g.rect = clampRect({ x, y, w: g.frame ? Math.max(w, LIST_MIN + MIN_W) : w, h: hh });
  writeRect(g.id, { ...(g.frame ? chatPart(g.rect) : g.rect), snap: null });
  applyRect(g.id);
  if (g.frame) applyRect("chats");
}

function onPointerUp() {
  if (!gesture) return;
  const g = gesture;
  gesture = null;
  if (gestureFrame) {
    cancelAnimationFrame(gestureFrame);
    gestureFrame = 0;
  }
  html.classList.remove("mdos-gesture");
  delete html.dataset.mdosGesture;
  if (g.kind === "widget" || g.kind === "icon") {
    g.el.classList.remove("is-dragging");
    g.el.style.translate = "";
    if (g.moved) {
      const snap = (v) => Math.round(v / 8) * 8;
      g.w.x = snap(g.start.x + g.dx);
      g.w.y = snap(g.start.y + g.dy);
      if (g.kind === "widget") {
        clampWidget(g.w);
        g.w.manual = true;
      } else clampIcon(g.w);
      if (state.layoutMode === "grid") {
        const list = g.kind === "widget" ? state.widgets : state.desk;
        snapToGrid(g.w, g.kind, list.filter((o) => o !== g.w));
        if (!reducedMotion()) {
          g.el.classList.add("is-settling");
          marinara.setTimeout(() => g.el.classList.remove("is-settling"), 260);
        }
      }
      // Free placement too: a widget dropped onto another slides to a free spot.
      if (g.kind === "widget" && state.layoutMode !== "grid") {
        const others = state.widgets.filter((o) => o !== g.w);
        if (others.some((o) => Number.isFinite(o.x) && rectsOverlap(wgRect(g.w), wgRect(o)))) snapToGrid(g.w, "widget", others);
      }
      placeWidget(g.el, g.w);
      save();
    } else if (g.kind === "icon" && !editMode) {
      launch(g.w.app);
    }
    return;
  }
  if (g.kind === "seam") {
    if (g.moved) save();
    return;
  }
  if (g.mode === "move") {
    const own = (r) => (g.frame ? chatPart(r) : r);
    if (g.moved && g.snap) {
      // Settle where it was dropped first (the drag offset is a translate),
      // so the snap animates from there instead of jumping back to the start.
      writeRect(g.id, clampRect(own({ ...g.start, x: g.start.x + g.dx, y: g.start.y + g.dy })));
      applyRect(g.id);
      setTranslate(g.id, 0, 0);
      if (g.frame) {
        applyRect("chats");
        setTranslate("chats", 0, 0);
      }
      void html.offsetWidth;
      writeRect(g.id, { ...own(g.start), snap: g.snap });
      animateGeometry();
    } else if (g.moved) {
      writeRect(g.id, clampRect(own({ ...g.start, x: g.start.x + g.dx, y: g.start.y + g.dy })));
    }
    applyRect(g.id);
    setTranslate(g.id, 0, 0);
    if (g.frame) {
      applyRect("chats");
      setTranslate("chats", 0, 0);
    }
    showSnapPreview(null);
  }
  if (g.moved) save();
}

function onDoubleClick(event) {
  if (!isDesktop()) return;
  const target = event.target instanceof Element ? event.target : null;
  const host = target?.closest("[data-mdos-win]");
  const id = host?.getAttribute("data-mdos-win");
  if (!id || target.closest(".mdos-light") || (id === "main" && desktopHome)) return;
  if (isDragSurface(target, id)) zoomWin(id);
}

function showSnapPreview(snap) {
  if (!snap) {
    snapPreview.classList.remove("is-visible");
    return;
  }
  const r = snap === "max" ? maxRect() : snapRect(snap);
  snapPreview.style.cssText = `left:${r.x}px;top:${r.y}px;width:${r.w}px;height:${r.h}px`;
  snapPreview.classList.add("is-visible");
}

function tileWindows() {
  const a = area();
  const height = a.bottom - a.top;
  const chatsW = Math.round(Math.min(320, Math.max(260, innerWidth * 0.2)));
  const panelW = panelOpen() ? Math.round(Math.min(440, Math.max(360, innerWidth * 0.28))) : 0;
  const gap = 10;
  const mainX = a.left + 4 + (chatsOpen() ? chatsW + gap : 0);
  const mainRight = a.right - 4 - (panelW ? panelW + gap : 0);
  state.windows.chats = { x: a.left + 4, y: a.top, w: chatsW, h: height, snap: null };
  state.windows.main = { x: mainX, y: a.top, w: Math.max(MIN_W, mainRight - mainX), h: height, snap: null };
  if (panelW) state.windows[winKey("panel")] = { x: a.right - 4 - panelW, y: a.top, w: panelW, h: height, snap: null };
  if (state.mainMinimized) setMainMinimized(false);
  animateGeometry();
  applyAllRects();
  save();
}
function resetLayout() {
  state.windows = {};
  animateGeometry();
  applyAllRects();
  save();
}

// ── Menus (menu bar dropdowns and context menus) ──────────────

let openMenu = null;
function menuEl(items) {
  const el = h("div", { class: "mdos-menu", role: "menu" });
  for (const item of items) {
    if (item === "-") {
      el.append(h("div", { class: "mdos-menu-sep", role: "separator" }));
      continue;
    }
    el.append(
      h(
        "button",
        {
          type: "button",
          role: "menuitem",
          class: "mdos-menu-item",
          disabled: !!item.disabled,
          onclick: (event) => {
            // A toggle that keeps the menu open (pick several in one go).
            if (item.keepOpen) {
              item.action?.();
              const mark = event.currentTarget.querySelector(".mdos-menu-check");
              if (mark && item.isChecked) mark.textContent = item.isChecked() ? "✓" : "";
              return;
            }
            closeMenu();
            item.action?.();
          },
        },
        h("span", { class: "mdos-menu-check", text: item.checked ? "✓" : "" }),
        h("span", { class: "mdos-menu-label", text: item.label }),
        h("span", { class: "mdos-menu-key", text: item.key || "" }),
      ),
    );
  }
  return el;
}
function showMenu(id, anchor) {
  closeMenu();
  const el = menuEl(MENUS[id]());
  ui.append(el);
  const r = anchor.getBoundingClientRect();
  el.style.left = `${Math.max(6, Math.min(r.left, innerWidth - el.offsetWidth - 6))}px`;
  el.style.top = `${Math.max(6, r.top - el.offsetHeight - 8)}px`;
  anchor.classList.add("is-open");
  anchor.setAttribute("aria-expanded", "true");
  openMenu = { id, el, anchor };
}
function showMenuAt(items, x, y) {
  closeMenu();
  const el = menuEl(items);
  ui.append(el);
  el.style.left = `${Math.max(6, Math.min(x, innerWidth - el.offsetWidth - 6))}px`;
  el.style.top = `${Math.max(TOP_H + 6, Math.min(y, innerHeight - el.offsetHeight - 6))}px`;
  openMenu = { id: "context", el, anchor: null };
}
function closeMenu() {
  if (!openMenu) return;
  openMenu.el.remove();
  openMenu.anchor?.classList.remove("is-open");
  openMenu.anchor?.removeAttribute("aria-expanded");
  openMenu = null;
}

// ── Menu bar ──────────────────────────────────────────────────

const menubar = h("div", { id: "mdos-menubar", role: "menubar", "aria-label": "Marinara Desktop" });
const mbLeft = h("div", { class: "mdos-mb-left" });
const mbRight = h("div", { class: "mdos-mb-right" });
const mbLogo = h("button", {
  type: "button",
  class: "mdos-mb-item mdos-mb-logo",
  "data-menu": "logo",
  "aria-label": "Marinara",
  "aria-haspopup": "menu",
  svg: LOGO,
});
const mbApp = h("button", { type: "button", class: "mdos-mb-item mdos-mb-app", "data-menu": "app", "aria-haspopup": "menu" });
const mbMenus = [
  ["view", L.view],
  ["window", L.window],
  ["dock", L.dock],
  ["help", L.help],
].map(([id, label]) =>
  h("button", { type: "button", class: "mdos-mb-item", "data-menu": id, "aria-haspopup": "menu", text: label }),
);
mbLeft.append(mbLogo, mbApp, ...mbMenus);
// Windows 11: the clock opens the calendar; Quick Settings has its own button.
const mbClock = h("button", { type: "button", class: "mdos-mb-item mdos-mb-clock", "aria-haspopup": "dialog", onclick: () => toggleCal() });
const mbLocker = h("button", {
  type: "button",
  class: "mdos-mb-item mdos-mb-icon mdos-mb-locker",
  "aria-label": L.lk.title,
  title: L.lk.title,
  svg: svg("locker"),
  onclick: (e) => openLocker(e.currentTarget),
});
mbRight.append(
  mbLocker,
  h("button", {
    type: "button",
    class: "mdos-mb-item mdos-mb-icon",
    "aria-label": L.search,
    title: L.search,
    svg: svg("search"),
    onclick: () => openSpotlight(),
  }),
  h("button", {
    type: "button",
    class: "mdos-mb-item mdos-mb-icon",
    "aria-label": L.controlCenter,
    title: L.controlCenter,
    "data-mdos-cc-toggle": "",
    svg: svg("sliders"),
    onclick: () => toggleCC(),
  }),
  mbClock,
  // The sliver at the far right: Show desktop.
  h("button", { type: "button", class: "mdos-mb-showdesk", "aria-label": L.showDesktop, title: L.showDesktop, onclick: () => showDesktop() }),
);
menubar.append(mbLeft, mbRight);
ui.append(menubar);

function updateMenubar() {
  setText(mbApp, focused ? windowTitle(focused) : L.desktopTitle);
}

const MENUS = {
  logo: () => [
    { label: L.about, action: showAbout },
    "-",
    { label: `${appLabel(appById("settings"))}…`, action: () => launch("settings") },
    { label: `${L.controlCenter}…`, action: () => toggleCC(true) },
    { label: `${L.customize}…`, action: () => toggleCC(true, "customize") },
    "-",
    { label: L.classic, key: "Ctrl Alt D", action: () => setEnabled(false) },
    { label: L.reload, action: () => location.reload() },
  ],
  app: () => {
    const id = focused;
    const onDesk = id === "main" && desktopHome;
    return [
      { label: L.minimize, key: "Ctrl Alt M", disabled: !id || onDesk, action: () => minimizeWin(id) },
      { label: L.zoom, disabled: !id || onDesk, action: () => zoomWin(id) },
      { label: L.close, disabled: !id || onDesk, action: () => closeWin(id) },
    ];
  },
  view: () => [
    { label: L.showDesktop, key: "Ctrl Alt H", action: showDesktop },
    { label: L.editWidgets, action: () => setEditMode(true) },
    { label: L.launchpad, key: "Ctrl Alt L", action: toggleLaunchpad },
    { label: L.focusMode, key: "Ctrl Alt F", checked: focusMode, action: () => setFocusMode(!focusMode) },
    { label: L.messengerPane, checked: state.messengerPane !== false, action: () => (updateSetting("messengerPane", state.messengerPane === false), syncSoon()) },
    "-",
    ...shownApps().map((a) => ({ label: appLabel(a), checked: isAppRunning(a.id), action: () => launch(a.id) })),
    ...(homeApps().length ? ["-", ...homeApps().map((a) => ({ label: appLabel(a), action: () => launch(a.id) }))] : []),
  ],
  window: () => [
    { label: L.minimize, key: "Ctrl Alt M", disabled: !focused, action: () => minimizeWin(focused) },
    { label: L.zoom, disabled: !focused, action: () => zoomWin(focused) },
    { label: L.nextWindow, key: "Ctrl `", action: cycleWindows },
    "-",
    { label: L.tile, action: tileWindows },
    { label: L.resetLayout, action: resetLayout },
    "-",
    ...WIN_IDS.filter(windowVisible).map((id) => ({
      label: windowTitle(id),
      checked: focused === id,
      action: () => focusWin(id),
    })),
  ],
  dock: () => [
    { label: L.separateWindows, checked: state.separateWindows !== false, action: () => updateSetting("separateWindows", state.separateWindows === false) },
    { label: L.autohide, checked: state.dockAutohide, action: () => updateSetting("dockAutohide", !state.dockAutohide) },
    { label: L.magnify, checked: state.magnify, action: () => updateSetting("magnify", !state.magnify) },
    { label: L.recents, checked: state.dockRecents, action: () => updateSetting("dockRecents", !state.dockRecents) },
    "-",
    ...[
      [44, KO ? "작게" : "Small"],
      [54, KO ? "보통" : "Medium"],
      [66, KO ? "크게" : "Large"],
    ].map(([size, label]) => ({
      label: `${L.dockSize}: ${label}`,
      checked: state.dockSize === size,
      action: () => updateSetting("dockSize", size),
    })),
  ],
  help: () => [
    {
      label: L.docs,
      action: () => window.open("https://github.com/Pasta-Devs/Marinara-Engine/tree/main/docs", "_blank", "noopener"),
    },
    { label: L.shortcuts, action: showAbout },
  ],
};
on(mbLeft, "click", (event) => {
  const btn = event.target.closest("[data-menu]");
  if (!btn) return;
  if (openMenu?.anchor === btn) closeMenu();
  else showMenu(btn.dataset.menu, btn);
});
on(mbLeft, "mouseover", (event) => {
  const btn = event.target.closest("[data-menu]");
  if (btn && openMenu?.anchor && openMenu.anchor !== btn) showMenu(btn.dataset.menu, btn);
});

// Right-click on the bare desktop.
function desktopMenuItems() {
  return [
    { label: L.editWidgets, action: () => setEditMode(true) },
    { label: `${L.addApps}…`, action: () => openAddApps() },
    { label: `${L.addBookmark}…`, action: () => openBookmarkForm() },
    { label: `${L.homeLayout}…`, action: () => openHomeLayout() },
    "-",
    { label: L.notes, action: () => openApp("notes") },
    { label: L.browser, action: () => openApp("browser") },
    { label: L.youtube, action: () => openApp("youtube") },
    "-",
    { label: `${L.wallpaper}…`, action: () => toggleCC(true, "wallpaper") },
    { label: `${L.customize}…`, action: () => toggleCC(true, "customize") },
    "-",
    { label: L.showDesktop, action: showDesktop },
    { label: L.tile, action: tileWindows },
  ];
}
function onContextMenu(event) {
  if (mode === "off") return;
  const target = event.target instanceof Element ? event.target : null;
  if (!target) return;
  const dockItem = target.closest(".mdos-dock-item");
  if (dockItem) {
    event.preventDefault();
    return showMenuAt(dockMenuItems(dockItem.dataset.app), event.clientX, event.clientY - 10);
  }
  const deskIcon = target.closest(".mdos-dicon");
  if (deskIcon) {
    event.preventDefault();
    const entry = state.desk.find((d) => d.id === deskIcon.dataset.did);
    const app = entry && appById(entry.app);
    if (app) showMenuAt([{ label: L.open, action: () => launch(app.id) }, ...appMenuExtras(app, entry)], event.clientX, event.clientY);
    return;
  }
  const onDesktop =
    target === doc.body ||
    target === html ||
    target === widgetLayer ||
    target === wallpaper ||
    target.id === "mdos-sb" ||
    (desktopHome && !target.closest(INTERACTIVE) && !!target.closest(SEL.main) && !target.closest(".mari-home-widget, .mlh-card, section"));
  const widget = target.closest(".mdos-wg");
  if (widget && !editMode) {
    event.preventDefault();
    const w = state.widgets.find((x) => x.id === widget.dataset.wid);
    return showMenuAt(
      [
        { label: L.editWidgets, action: () => setEditMode(true) },
        ...(w ? [{ label: `${L.style}…`, action: () => openWidgetEditor(w, widget) }] : []),
        ...(w ? [{ label: L.remove, action: () => removeWidget(w.id) }] : []),
      ],
      event.clientX,
      event.clientY,
    );
  }
  if (onDesktop && isDesktop()) {
    event.preventDefault();
    showMenuAt(desktopMenuItems(), event.clientX, event.clientY);
  }
}

// ── Dock ──────────────────────────────────────────────────────

const dock = h("nav", { id: "mdos-dock", "aria-label": "Taskbar" });
const dockInner = h("div", { class: "mdos-dock-inner" });
dock.append(dockInner);
ui.append(dock);
const dockItems = new Map();
let dockSignature = "";

// Recent chats: the first rows of Marinara's chat list (already sorted by recency).
function recentChats() {
  if (!state.dockRecents || !isDesktop()) return [];
  // Only the first three rows (indexing the live list, not copying it all).
  const list = doc.querySelectorAll(SEL.chatRows);
  return [list[0], list[1], list[2]]
    .filter(Boolean)
    .map((row) => ({
      id: `chat:${row.getAttribute("data-chat-id")}`,
      chatId: row.getAttribute("data-chat-id"),
      // The row also carries the chat's background thumbnail; skip it for the avatar.
      img: $$("img", row).find((i) => !/\/backgrounds\//.test(i.getAttribute("src") || ""))?.getAttribute("src") || null,
      title: row.getAttribute("title") || "",
    }))
    .filter((c) => c.chatId);
}
// Touch: the tablet taskbar shows Start and Search, then these apps.
const TOUCH_DOCK = ["launchpad", "search", "mode:conversation", "mode:roleplay", "mode:game", "settings"];

function dockItem(app) {
  const label = h("span", { class: "mdos-dock-label", text: appLabel(app) });
  const item = h(
    "button",
    {
      type: "button",
      class: "mdos-dock-item",
      "data-app": app.id,
      "data-touch": TOUCH_DOCK.includes(app.id) ? "1" : "0",
      "aria-label": appLabel(app),
      onclick: () => launch(app.id),
    },
    label,
    appIcon(app),
    h("span", { class: "mdos-dock-dot", "aria-hidden": "true" }),
  );
  dockItems.set(app.id, { item, label, app });
  return item;
}
function renderDock() {
  const recents = recentChats();
  const signature = JSON.stringify([
    state.icons,
    state.iconStyle,
    Object.keys(images.icons),
    recents.map((r) => [r.id, r.img, r.title]),
    APPS.map(appLabel),
  ]);
  if (signature === dockSignature) return;
  dockSignature = signature;
  dockItems.clear();
  // Windows 11: Start and Search lead the centred group; no separators.
  const lead = TAIL_APPS.map((app) => {
    const item = dockItem(app);
    item.classList.add(`mdos-dock-item--${app.id}`);
    if (app.id === "launchpad") item.querySelector(".mdos-app-icon")?.insertAdjacentHTML("afterbegin", START_GLYPH);
    return item;
  });
  const kids = [...lead, ...shownApps().map(dockItem)];
  kids.push(h("div", { class: "mdos-dock-sep", "aria-hidden": "true" }), ...UTIL_APPS.map(dockItem));
  if (recents.length) {
    kids.push(h("div", { class: "mdos-dock-sep", "aria-hidden": "true" }));
    for (const chat of recents) {
      const app = {
        id: chat.id,
        chatId: chat.chatId,
        img: chat.img,
        icon: "chat",
        g: ["#6ef08d", "#17a84d"],
        label: () => chat.title,
      };
      const item = dockItem(app);
      item.classList.add("mdos-dock-item--recent");
      kids.push(item);
    }
  }
  dockInner.replaceChildren(...kids);
  dockCenters = null;
  updateDockState();
}
// Focus can change before the taskbar exists (start-up); skip it then.
function refreshDockFocus() {
  try {
    updateDockState();
  } catch {
    /* taskbar not built yet */
  }
}
// The app whose window has focus gets the long accent pill (Windows 11).
function focusedAppId() {
  if (!focused || desktopHome) return null;
  if (isAppWin(focused)) {
    const rec = appRec(focused);
    return rec ? (rec.type === "mwin" ? rec.target : rec.type) : null;
  }
  if (focused === "panel") return activePanelId() || null;
  if (focused === "chats" || focused === "main") {
    const mode = chatsOpen() || paneOn() ? activeChatMode() : null;
    if (mode) return `mode:${mode}`;
    return homePageVisible() ? "home" : null;
  }
  return null;
}
function updateDockState() {
  const active = focusedAppId();
  for (const [id, { item }] of dockItems) {
    const running = isAppRunning(id);
    item.classList.toggle("is-running", running);
    item.classList.toggle("is-focused", running && id === active);
  }
}

let dockCenters = null;
let magnifyFrame = 0;
let magnifyX = 0;
on(dockInner, "mouseenter", () => {
  dockCenters = [...dockItems.values()].map(({ item }) => {
    const r = item.getBoundingClientRect();
    return r.left + r.width / 2;
  });
});
on(dockInner, "mousemove", (event) => {
  if (!state.magnify || reducedMotion() || !dockCenters) return;
  magnifyX = event.clientX;
  if (!magnifyFrame)
    magnifyFrame = raf(() => {
      magnifyFrame = 0;
      const range = state.dockSize * 2.6;
      [...dockItems.values()].forEach(({ item }, i) => {
        const d = Math.abs(magnifyX - dockCenters[i]);
        const s = d >= range ? 1 : 1 + 0.6 * Math.cos(((d / range) * Math.PI) / 2);
        item.style.setProperty("--mag", s.toFixed(3));
      });
    });
});
on(dockInner, "mouseleave", () => {
  dockCenters = null;
  for (const { item } of dockItems.values()) item.style.removeProperty("--mag");
});

// Auto-hide: the Dock slides in when the pointer nears the bottom edge.
let dockShown = false;
let dockHideTimer = 0;
function dockProximity(event) {
  const near = event.clientY >= innerHeight - 6;
  if (near) {
    marinara.clearTimeout(dockHideTimer);
    dockHideTimer = 0;
    if (!dockShown) {
      dockShown = true;
      dock.classList.add("is-peek");
      menubar.classList.add("is-peek");
    }
    return;
  }
  if (!dockShown || dockHideTimer) return;
  const inside = event.clientY >= innerHeight - (MENUBAR_H + 24) || openMenu?.id === "context";
  if (!inside) {
    dockHideTimer = marinara.setTimeout(() => {
      dockHideTimer = 0;
      dockShown = false;
      dock.classList.remove("is-peek");
      menubar.classList.remove("is-peek");
    }, 350);
  }
}

function bounce(id) {
  const entry = dockItems.get(id);
  if (!entry || reducedMotion()) return;
  entry.item.classList.remove("is-bouncing");
  void entry.item.offsetWidth;
  entry.item.classList.add("is-bouncing");
  marinara.setTimeout(() => entry.item.classList.remove("is-bouncing"), 700);
}

function isAppRunning(id) {
  if (APP_TYPES[id]) return state.apps.some((a) => a.type === id);
  if (separateWindows() && isWindowApp(id)) return state.apps.some((a) => a.type === "mwin" && a.target === id);
  if (id === "home") return homePageVisible();
  if (id === "chats") return chatsOpen() || (isTouch() && !!$('aside[data-component="ChatSidebarPanel"]'));
  if (id.startsWith("mode:")) return isAppRunning("chats") && activeChatMode() === id.slice(5);
  if (PANEL_IDS.includes(id)) return (panelOpen() || (isTouch() && !!$(SEL.sheets))) && activePanelId() === id;
  if (id.startsWith("chat:")) return !!$(`${SEL.chatRows}[data-chat-id="${CSS.escape(id.slice(5))}"][class~="bg-[var(--marinara-chat-chrome-highlight-bg)]"]`);
  return false;
}

function dockMenuItems(id) {
  const app = appById(id);
  const running = isAppRunning(id);
  const items = [];
  const mwins = separateWindows() && isWindowApp(id) ? state.apps.filter((a) => a.type === "mwin" && a.target === id) : [];
  if (mwins.length) {
    items.push({ label: L.open, action: () => openApp("mwin", { target: id }) });
    items.push({ label: L.close, action: () => mwins.forEach((a) => closeApp(`app:${a.id}`)) });
    if (app) items.push(...appMenuExtras(app));
    return items;
  }
  if (id.startsWith("chat:")) items.push({ label: L.open, action: () => launch(id) });
  else if (app) {
    items.push({ label: running && (id === "chats" || PANEL_IDS.includes(id)) ? L.close : L.open, action: () => launch(id, { toggle: true }) });
    if (APP_TYPES[id] && running) {
      items.push({ label: L.close, action: () => state.apps.filter((a) => a.type === id).forEach((a) => closeApp(`app:${a.id}`)) });
    }
    items.push(...appMenuExtras(app));
  }
  return items;
}
// Shared by the Dock, desktop icons and Launchpad.
function appMenuExtras(app, deskEntry) {
  const items = ["-"];
  if (app.bm) {
    items.push(
      { label: L.openOutside, action: () => openExternal(app.bm.url) },
      { label: L.rename, action: () => renameBookmark(app.bm) },
      { label: L.remove, action: () => removeBookmark(app.bm.id) },
    );
  }
  if (deskEntry) items.push({ label: L.removeFromDesktop, action: () => removeDeskIcon(deskEntry.id) });
  else if (isDesktop() && !state.desk.some((d) => d.app === app.id)) {
    items.push({ label: L.addToDesktop, action: () => addDeskIcon(app.id) });
  }
  items.push({ label: L.editIcon, action: () => openIconEditor(app) });
  return items;
}

// Opening a panel or the chat list brings its window forward; if it is
// already in front, the Dock icon closes it again (like toggling the app).
// Apps that open as their own window (a Marinara page in a frame).
const isWindowApp = (id) =>
  typeof id === "string" && (id.startsWith("mode:") || id.startsWith("chat:") || id.startsWith("tab:") || PANEL_IDS.includes(id));
const separateWindows = () => !EMBED && isDesktop() && state.separateWindows !== false;
function launch(id, { toggle = false } = {}) {
  closeMenu();
  closeLaunchpad();
  if (separateWindows() && isWindowApp(id)) {
    openMwin(id);
    syncSoon();
    return;
  }
  if (id === "home") {
    goHome();
    focusWin("main");
    bounce(id);
  } else if (id.startsWith("chat:")) {
    const row = $(`${SEL.chatRows}[data-chat-id="${CSS.escape(id.slice(5))}"]`);
    if (state.mainMinimized) setMainMinimized(false);
    click(row);
    focusWin("main");
  } else if (id.startsWith("mode:")) {
    openChatMode(id.slice(5), toggle);
  } else if (id.startsWith("tab:")) {
    openHomeTab(id.slice(4));
  } else if (APP_TYPES[id]) {
    openApp(id);
  } else if (id.startsWith("bm:")) {
    const bm = state.bookmarks.find((b) => `bm:${b.id}` === id);
    if (bm) openUrl(bm.url);
  } else if (id === "chats") {
    if (isTouch()) {
      if (!$('aside[data-component="ChatSidebarPanel"]')) click($(SEL.chatsBtn));
    } else if (chatsOpen()) {
      if (focused === "chats" || toggle) closeWin("chats");
      else focusWin("chats");
    } else {
      click($(SEL.chatsBtn));
      focusWin("chats");
      bounce(id);
    }
  } else if (PANEL_IDS.includes(id)) {
    const btn = panelBtn(id);
    if (!btn) return;
    if (isTouch()) {
      if (activePanelId() !== id || !$(SEL.sheets)) btn.click();
    } else if (panelOpen() && activePanelId() === id) {
      if (focused === "panel" || toggle) closeWin("panel");
      else focusWin("panel");
    } else {
      btn.click();
      focusWin("panel");
      bounce(id);
    }
  } else if (id === "launchpad") toggleLaunchpad();
  else if (id === "search") openSpotlight();
  else if (id === "controlcenter") toggleCC(true);
  else if (id === "locker") openLocker();
  else if (id === "widgets") setEditMode(true);
  else if (id === "customize") toggleCC(true, "customize");
  else if (id === "wallpaper") toggleCC(true, "wallpaper");
  else if (id === "classic") setEnabled(false);
  else if (id === "about") showAbout();
  else if (id === "reload") location.reload();
  syncSoon();
}

// The chat list's mode tab that is selected (conversation / roleplay / game).
const activeChatMode = () => $('[data-chat-mode-tab][aria-pressed="true"]')?.getAttribute("data-chat-mode-tab") || null;
// A chat app opens the chat list and selects its mode; launched again while
// in front on that mode, it closes the list (like the other Dock apps).
function openChatMode(mode, toggle) {
  const id = `mode:${mode}`;
  if (isTouch()) {
    if (!$('aside[data-component="ChatSidebarPanel"]')) click($(SEL.chatsBtn));
  } else if (chatsOpen()) {
    if (activeChatMode() === mode && (focused === "chats" || toggle)) return closeWin("chats");
    focusWin("chats");
  } else {
    click($(SEL.chatsBtn));
    focusWin("chats");
    bounce(id);
  }
  const pick = () => {
    const tab = $(`[data-chat-mode-tab="${mode}"]`);
    if (tab && tab.getAttribute("aria-pressed") !== "true") tab.click();
    if (tab) {
      syncSoon();
      followApp(mode);
    }
    return !!tab;
  };
  if (pick()) return;
  let tries = 0;
  const poll = () => {
    if (!pick() && ++tries < 15) marinara.setTimeout(poll, 100);
  };
  marinara.setTimeout(poll, 100);
}
// ── Chat apps own their chats (desktop) ──
// Conversation, Roleplay and Game are separate apps, so each shows a chat of
// its own mode: opening one switches to the chat last open in it (else its
// newest), and a chat of another mode is covered by an empty "pick a chat"
// view. The chat's name sits in the window's title bar.
const chatInfo = new Map(); // id → { name, mode, at }
let chatInfoAt = -1e9;
let chatInfoBusy = null;
function loadChatInfo(maxAge = 30_000) {
  if (chatInfoBusy) return chatInfoBusy;
  if (performance.now() - chatInfoAt < maxAge) return Promise.resolve();
  chatInfoAt = performance.now();
  chatInfoBusy = window
    .fetch("/api/chats", { credentials: "same-origin" })
    .then((r) => (r.ok ? r.json() : null))
    .then((list) => {
      if (!Array.isArray(list)) return;
      chatInfo.clear();
      for (const c of list) {
        if (c?.id) chatInfo.set(c.id, { name: String(c.name || ""), mode: String(c.mode || ""), at: Date.parse(c.lastMessageAt || c.updatedAt || "") || 0 });
      }
      syncSoon();
    })
    .catch(() => {})
    .finally(() => (chatInfoBusy = null));
  return chatInfoBusy;
}
const openChatId = () => {
  try {
    return localStorage.getItem("marinara-active-chat-id") || "";
  } catch {
    return "";
  }
};
function followApp(mode) {
  if (!isDesktop()) return;
  loadChatInfo().then(() => {
    if (chatInfo.get(openChatId())?.mode === mode) return;
    let id = state.lastChat?.[mode];
    if (chatInfo.get(id)?.mode !== mode) {
      id = [...chatInfo].filter(([, c]) => c.mode === mode).sort((a, b) => b[1].at - a[1].at)[0]?.[0];
    }
    if (!id) return;
    let tries = 0;
    // The list re-renders for the new mode a moment after its tab is pressed.
    const go = () => {
      const row = activeChatMode() === mode ? $(`${SEL.chatRows}[data-chat-id="${CSS.escape(id)}"]`) : null;
      if (row) click(row);
      else if (++tries < 20) marinara.setTimeout(go, 100);
    };
    go();
  });
}
let chatTitleEl = null;
let chatOtherEl = null;
let chatAppSig = "";
function refreshChatApp() {
  const main = $once(SEL.main);
  const inChat = isDesktop() && !!main && !!$once("[data-chat-mode]") && !homeVisible() && !$once(SEL.detail);
  const id = inChat ? openChatId() : "";
  let info = chatInfo.get(id);
  if (id && !info) loadChatInfo(4000);
  // Same chat, same app, same list, our title still in place: nothing to do.
  const sig = `${inChat}|${id}|${info?.name}|${info?.mode}|${paneOn() ? activeChatMode() : ""}`;
  if (sig === chatAppSig && (!chatTitleEl || chatTitleEl.parentElement === main)) return;
  chatAppSig = sig;
  // Remember the chat last open in each app.
  if (info?.mode && MODE_KEYS.includes(info.mode) && state.lastChat?.[info.mode] !== id) {
    state.lastChat = { ...(state.lastChat || {}), [info.mode]: id };
    save();
  }
  const row = id ? $(`${SEL.chatRows}[data-chat-id="${CSS.escape(id)}"]`) : null;
  const name = (info?.name || row?.querySelector(".truncate")?.textContent || "").trim();
  if (inChat && name) {
    if (!chatTitleEl || chatTitleEl.parentElement !== main) {
      chatTitleEl ||= h("div", { class: "mdos-chat-title", "data-exd": "", "aria-hidden": "true" });
      main.append(chatTitleEl);
    }
    if (chatTitleEl.textContent !== name) chatTitleEl.textContent = name;
  } else chatTitleEl?.remove();
  // A chat of another app behind the list: cover it until one is picked.
  setAttr(html, "data-mdos-chatapp", inChat && info?.mode ? info.mode : null);
  const listMode = paneOn() ? activeChatMode() : null;
  const other = inChat && !!listMode && !!info?.mode && info.mode !== listMode;
  toggleClass("mdos-chat-other", other);
  if (other) {
    if (!chatOtherEl || chatOtherEl.parentElement !== main) {
      chatOtherEl ||= h("div", { class: "mdos-pickchat", "data-exd": "" }, h("div", { class: "mdos-pickchat-icon" }), h("p", {}, ""));
      main.append(chatOtherEl);
    }
    const app = appById(`mode:${listMode}`);
    const icon = chatOtherEl.firstChild;
    if (icon.dataset.app !== app?.id) {
      icon.dataset.app = app?.id || "";
      icon.replaceChildren(app ? appIcon(app) : "");
    }
    const p = chatOtherEl.lastChild;
    if (p.textContent !== L.pickChat) p.textContent = L.pickChat;
  } else chatOtherEl?.remove();
}

// Home tabs live inside Marinara's Home view; show Home first if needed.
function openHomeTab(key) {
  const find = () => $(`#marinara-home-tab-${CSS.escape(key)}`);
  if (state.mainMinimized) setMainMinimized(false);
  const tab = find();
  if (tab) {
    tab.click();
    focusWin("main");
    return;
  }
  click($(SEL.homeBtn));
  let tries = 0;
  const poll = () => {
    const t = find();
    if (t) {
      t.click();
      focusWin("main");
    } else if (++tries < 15) marinara.setTimeout(poll, 100);
  };
  marinara.setTimeout(poll, 100);
}
let homeAppsSig = "";
function readHomeApps() {
  const tabs = $$(SEL.homeTabs);
  if (!tabs.length) return;
  // Cloning each tab is only needed when the tabs themselves changed.
  const sig = tabs.map((t) => `${t.id}\u0001${t.textContent}`).join("\u0002");
  if (sig === homeAppsSig) return;
  homeAppsSig = sig;
  // Visible tab text ("Noodle"), not the aria-label ("Open Noodle") or an unread badge.
  const tabText = (t) => {
    const copy = t.cloneNode(true);
    copy.querySelectorAll('[data-component*="Badge"]').forEach((b) => b.remove());
    return copy.textContent.trim();
  };
  const list = tabs
    .map((t) => ({
      key: (t.id || "").replace(/^marinara-home-tab-/, ""),
      label: tabText(t) || t.getAttribute("aria-label"),
      img: t.querySelector("img")?.getAttribute("src") || null,
    }))
    .filter((t) => t.key && t.key !== "home" && t.label);
  if (JSON.stringify(list) !== JSON.stringify(state.homeApps)) {
    state.homeApps = list;
    save();
    if (sbEl) renderSpringboardApps();
  }
}

function openSpotlight() {
  closeMenu();
  closeLaunchpad();
  window.dispatchEvent(
    new KeyboardEvent("keydown", {
      key: "k",
      code: "KeyK",
      ctrlKey: !IS_MAC,
      metaKey: IS_MAC,
      bubbles: true,
      cancelable: true,
    }),
  );
}

// ── Launchpad ─────────────────────────────────────────────────

let launchpadEl = null;
function toggleLaunchpad() {
  if (launchpadEl) closeLaunchpad();
  else openLaunchpad();
}
function launchpadApps() {
  return allApps().filter((a) => !a.hidden && a.id !== "launchpad" && !(isTouch() && ["classic", "search"].includes(a.id)));
}
function appTile(a, i, onPick) {
  return h(
    "button",
    {
      type: "button",
      role: "listitem",
      class: "mdos-lp-app",
      style: `--i:${i}`,
      "data-app": a.id,
      onclick: () => onPick(a),
      oncontextmenu: (event) => {
        if (!isDesktop()) return;
        event.preventDefault();
        event.stopPropagation();
        showMenuAt(appMenuExtras(a).slice(1), event.clientX, event.clientY);
      },
    },
    appIcon(a),
    h("span", { class: "mdos-lp-label", text: appLabel(a) }),
  );
}
function openLaunchpad() {
  closeMenu();
  closeCC();
  const apps = launchpadApps();
  const input = h("input", {
    type: "search",
    class: "mdos-lp-search",
    placeholder: L.search,
    "aria-label": L.search,
    autocomplete: "off",
  });
  const grid = h("div", { class: "mdos-lp-grid", role: "list" });
  const render = () => {
    const q = input.value.trim().toLowerCase();
    grid.replaceChildren(
      ...apps
        .filter((a) => !q || appLabel(a).toLowerCase().includes(q) || a.id.includes(q))
        .map((a, i) => appTile(a, i, (picked) => launch(picked.id))),
    );
  };
  input.addEventListener("input", render);
  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") grid.querySelector("button")?.click();
  });
  launchpadEl = h(
    "div",
    {
      id: "mdos-launchpad",
      role: "dialog",
      "aria-modal": "true",
      "aria-label": L.launchpad,
      onclick: (event) => {
        if (event.target === launchpadEl) closeLaunchpad();
      },
    },
    // Windows 11 Start: one panel above the taskbar — search, pinned apps,
    // and a footer with the app's name, settings and power.
    h(
      "div",
      { class: "mdos-start" },
      input,
      h("div", { class: "mdos-start-head" }, h("h2", { text: L.pinned })),
      grid,
      h("div", { class: "mdos-start-head mdos-start-head--rec" }, h("h2", { text: L.recommended })),
      startRecommended(),
      h(
        "div",
        { class: "mdos-start-foot" },
        h("span", { class: "mdos-start-user" }, h("span", { class: "mdos-start-avatar", svg: LOGO }), h("span", { text: "Marinara" })),
        h(
          "span",
          { class: "mdos-start-actions" },
          h("button", {
            type: "button",
            class: "mdos-start-btn",
            "aria-label": L.customize,
            title: L.customize,
            svg: svg("sliders"),
            onclick: () => {
              closeLaunchpad();
              openApp("customize");
            },
          }),
          h("button", {
            type: "button",
            class: "mdos-start-btn",
            "aria-label": L.power,
            title: L.power,
            svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M12 3.5v8"/><path d="M7.2 6.6a7.5 7.5 0 1 0 9.6 0"/></svg>',
            onclick: (event) => {
              const r = event.currentTarget.getBoundingClientRect();
              closeLaunchpad();
              showMenuAt(
                [
                  { label: L.reload, action: () => location.reload() },
                  { label: L.classic, key: "Ctrl Alt D", action: () => setEnabled(false) },
                ],
                r.left - 120,
                r.top - 96,
              );
            },
          }),
        ),
      ),
    ),
  );
  render();
  ui.append(launchpadEl);
  raf(() => {
    launchpadEl?.classList.add("is-open");
    if (isDesktop()) input.focus();
  });
}
// Start's Recommended: the latest chats from Marinara's list (two columns).
function startRecommended() {
  const rows = [...doc.querySelectorAll(SEL.chatRows)].slice(0, 6);
  const items = rows
    .map((row) => ({
      chatId: row.getAttribute("data-chat-id"),
      img: $$("img", row).find((i) => !/\/backgrounds\//.test(i.getAttribute("src") || ""))?.getAttribute("src") || null,
      title: row.getAttribute("title") || row.textContent.trim().split("\n")[0] || "",
    }))
    .filter((c) => c.chatId);
  if (!items.length) return h("div", { class: "mdos-start-rec mdos-start-rec--empty", text: L.noRecent });
  return h(
    "div",
    { class: "mdos-start-rec" },
    ...items.map((c) =>
      h(
        "button",
        {
          type: "button",
          class: "mdos-start-rec-item",
          title: c.title,
          onclick: () => {
            closeLaunchpad();
            launch(`chat:${c.chatId}`);
          },
        },
        c.img
          ? h("img", { class: "mdos-start-rec-img", src: c.img, alt: "", draggable: "false" })
          : appIcon({ id: "mode:conversation", icon: "chat", g: ["#6ef08d", "#17a84d"] }),
        h("span", { class: "mdos-start-rec-text" }, h("span", { class: "mdos-start-rec-title", text: c.title }), h("span", { class: "mdos-start-rec-sub", text: L.chats })),
      ),
    ),
  );
}
function closeLaunchpad() {
  if (!launchpadEl) return;
  const el = launchpadEl;
  launchpadEl = null;
  el.classList.remove("is-open");
  marinara.setTimeout(() => el.remove(), reducedMotion() ? 0 : 220);
}

// ── Popovers (icon editor, widget editor, widget gallery) ─────

let popEl = null;
function openPop(content, anchor, { title, wide = false, cls = "" } = {}) {
  closePop();
  popEl = h(
    "div",
    { class: `mdos-pop${wide ? " mdos-pop--wide" : ""}${cls ? ` ${cls}` : ""}`, role: "dialog", "aria-label": title || "" },
    title ? h("div", { class: "mdos-pop-head" }, h("h3", { text: title }), h("button", { type: "button", class: "mdos-pop-close", "aria-label": L.close, text: "×", onclick: () => closePop() })) : null,
    content,
  );
  ui.append(popEl);
  // A bottom sheet dims the screen behind it; tapping the dim closes it.
  if (cls.includes("mdos-pop--sheet")) popEl.before(h("div", { class: "mdos-sheet-scrim", onclick: () => closePop() }));
  const r = anchor?.getBoundingClientRect?.();
  const pw = popEl.offsetWidth;
  const ph = popEl.offsetHeight;
  if (r && isDesktop()) {
    let left = r.left + r.width / 2 - pw / 2;
    let top = r.top - ph - 12;
    if (top < TOP_H + 8) top = r.bottom + 12;
    left = Math.max(8, Math.min(left, innerWidth - pw - 8));
    top = Math.max(TOP_H + 8, Math.min(top, innerHeight - ph - 8));
    popEl.style.left = `${left}px`;
    popEl.style.top = `${top}px`;
  } else {
    popEl.classList.add("is-centered");
  }
}
function closePop() {
  for (const el of $$(".mdos-sheet-scrim")) el.remove();
  popEl?.remove();
  popEl = null;
}
function field(label, control) {
  // A div, not a label: several fields hold more than one button.
  if (control.matches?.("input, select, textarea")) control.setAttribute("aria-label", label);
  return h("div", { class: "mdos-field" }, h("span", { class: "mdos-field-label", text: label }), control);
}
function segmented(options, value, onChange) {
  const el = h("div", { class: "mdos-seg", role: "radiogroup" });
  for (const [id, label] of options) {
    el.append(
      h("button", {
        type: "button",
        role: "radio",
        class: "mdos-seg-btn",
        "aria-checked": String(value === id),
        text: label,
        onclick: () => {
          el.querySelectorAll(".mdos-seg-btn").forEach((b) => b.setAttribute("aria-checked", "false"));
          el.querySelector(`[data-v="${CSS.escape(id)}"]`)?.setAttribute("aria-checked", "true");
          onChange(id);
        },
        "data-v": id,
      }),
    );
  }
  return el;
}

function openIconEditor(app, anchor) {
  const custom = state.icons[app.id] || {};
  const preview = h("div", { class: "mdos-iconed-preview" });
  const refresh = () => {
    preview.replaceChildren(appIcon(app), h("span", { text: appLabel(app) }));
    dockSignature = "";
    renderDock();
    if (sbEl) renderSpringboardApps();
  };
  const commit = (patch) => {
    const next = { ...(state.icons[app.id] || {}), ...patch };
    for (const k of Object.keys(next)) if (next[k] === "" || next[k] == null) delete next[k];
    if (Object.keys(next).length) state.icons[app.id] = next;
    else delete state.icons[app.id];
    save();
    refresh();
  };
  const labelInput = h("input", {
    type: "text",
    class: "mdos-input",
    value: custom.label || "",
    placeholder: app.label(),
    maxlength: "24",
    oninput: (event) => commit({ label: event.target.value.trim() }),
  });
  const color1 = h("input", { type: "color", value: custom.g1 || app.g[0], oninput: (e) => commit({ g1: e.target.value }) });
  const color2 = h("input", { type: "color", value: custom.g2 || app.g[1], oninput: (e) => commit({ g2: e.target.value }) });
  const content = h(
    "div",
    { class: "mdos-pop-body" },
    preview,
    field(L.label, labelInput),
    field(L.colors, h("div", { class: "mdos-row" }, color1, color2)),
    h(
      "div",
      { class: "mdos-row" },
      h("button", {
        type: "button",
        class: "mdos-btn",
        text: L.pickImage,
        onclick: () =>
          pickImage(
            (data) => {
              if (storeImage(() => (images.icons[app.id] = data))) refresh();
            },
            { maxSide: 160, maxBytes: 40_000, square: true },
          ),
      }),
      h("button", {
        type: "button",
        class: "mdos-btn",
        text: L.removeImage,
        onclick: () => {
          delete images.icons[app.id];
          saveImages();
          refresh();
        },
      }),
    ),
    h("button", {
      type: "button",
      class: "mdos-btn mdos-btn--quiet",
      text: L.reset,
      onclick: () => {
        delete state.icons[app.id];
        delete images.icons[app.id];
        labelInput.value = "";
        color1.value = app.g[0];
        color2.value = app.g[1];
        save();
        saveImages();
        refresh();
      },
    }),
  );
  refresh();
  openPop(content, anchor || dockItems.get(app.id)?.item, { title: L.editIcon });
}

function openIconPicker() {
  const apps = [...APPS, ...homeApps(), ...TAIL_APPS, ...EXTRA_APPS];
  const grid = h("div", { class: "mdos-iconpick" }, ...apps.map((a, i) => appTile(a, i, (picked) => openIconEditor(picked))));
  openPop(grid, null, { title: L.editIcons.replace("…", ""), wide: true });
}

// ── Widgets ───────────────────────────────────────────────────

let editMode = false;
const WIDGET_TYPES = ["launcher", "clock", "analog", "calendar", "greeting", "dday", "note", "photo", "credits", "ledger", "credit", "locker"];
// New chat launcher: the three buttons of Marinara's (hidden) Home greeting.
const LAUNCH_MODES = [
  { icon: "chat", g: ["#6ef08d", "#17a84d"] },
  { icon: "roleplay", g: ["#ffb35c", "#f06a1d"] },
  { icon: "game", g: ["#ff7ab0", "#7b5cff"] },
];
const heroButton = (n) => $(`.mari-home-hero .grid > button:nth-child(${n + 1})`);
function startChat(n) {
  const btn = heroButton(n);
  if (btn) return btn.click();
  goHome();
  let tries = 0;
  const poll = () => {
    const b = heroButton(n);
    if (b) b.click();
    else if (++tries < 15) marinara.setTimeout(poll, 100);
  };
  marinara.setTimeout(poll, 100);
}
// Matches home.css: small 160², medium 340×160, large 340² (the widget column width).
const WIDGET_SIZES = { s: [160, 160], m: [340, 160], l: [340, 340] };
const timeFmt = new Intl.DateTimeFormat(undefined, { hour: "numeric", minute: "2-digit" });
const dateLongFmt = new Intl.DateTimeFormat(undefined, { month: "long", day: "numeric", weekday: "long" });
const weekdayFmt = new Intl.DateTimeFormat(undefined, { weekday: "short" });
const monthFmt = new Intl.DateTimeFormat(undefined, { month: "long" });
const menubarDateFmt = new Intl.DateTimeFormat(undefined, { month: "short", day: "numeric", weekday: "short" });
const trayDateFmt = new Intl.DateTimeFormat(undefined, { year: "numeric", month: "numeric", day: "numeric" });
const shortDateFmt = new Intl.DateTimeFormat(undefined, { year: "numeric", month: "short", day: "numeric" });

function ddayText(dateStr) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr || "")) return "D-?";
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const [y, m, d] = dateStr.split("-").map(Number);
  let target = new Date(y, m - 1, d);
  const diff = Math.round((target - today) / 86_400_000);
  return diff === 0 ? "D-DAY" : diff > 0 ? `D-${diff}` : `D+${-diff}`;
}
function calendarGrid(now) {
  const first = new Date(now.getFullYear(), now.getMonth(), 1);
  const days = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  const names = [];
  for (let i = 0; i < 7; i++) names.push(weekdayFmt.format(new Date(2024, 0, 7 + i)).slice(0, KO ? 1 : 1));
  const cells = [...names.map((n) => h("span", { class: "mdos-cal-head", text: n }))];
  for (let i = 0; i < first.getDay(); i++) cells.push(h("span"));
  for (let d = 1; d <= days; d++) cells.push(h("span", { class: d === now.getDate() ? "is-today" : "", text: String(d) }));
  return h("div", { class: "mdos-cal-grid" }, ...cells);
}

// Bodies list optional parts as null; h() skips those, but the refreshes use
// replaceChildren(), which would print them as the text "null".
function widgetBody(w) {
  return widgetParts(w).filter((part) => part != null && part !== false);
}
function widgetParts(w) {
  const now = new Date();
  switch (w.type) {
    case "launcher":
      return [
        h("div", { class: "mdos-wg-label", text: L.newChat }),
        h(
          "div",
          { class: "mdos-launcher" },
          ...LAUNCH_MODES.map((m, n) =>
            h(
              "button",
              {
                type: "button",
                class: "mdos-launch",
                "data-mode": n,
                onclick: (event) => {
                  event.stopPropagation();
                  if (!editMode) startChat(n);
                },
              },
              h("span", { class: "mdos-app-icon", style: `--g1:${m.g[0]};--g2:${m.g[1]}`, svg: svg(m.icon) }),
              // Marinara's own (localized) label when Home is mounted.
              h("span", { class: "mdos-launch-label", text: heroButton(n)?.textContent.trim() || L.modes[n] }),
            ),
          ),
        ),
      ];
    case "clock":
      return [
        h("div", { class: "mdos-wg-time", text: timeFmt.format(now) }),
        h("div", { class: "mdos-wg-sub", text: dateLongFmt.format(now) }),
      ];
    case "analog": {
      const hr = now.getHours() % 12;
      const min = now.getMinutes();
      const face = h("div", {
        class: "mdos-analog",
        style: `--h:${hr * 30 + min * 0.5}deg;--m:${min * 6}deg`,
      });
      for (let i = 0; i < 12; i++) face.append(h("i", { style: `--t:${i * 30}deg` }));
      face.append(h("b", { class: "mdos-analog-h" }), h("b", { class: "mdos-analog-m" }), h("em"));
      return [face];
    }
    case "calendar":
      if (w.size === "s")
        return [
          h("div", { class: "mdos-wg-weekday", text: weekdayFmt.format(now) }),
          h("div", { class: "mdos-wg-daynum", text: String(now.getDate()) }),
          h("div", { class: "mdos-wg-sub", text: monthFmt.format(now) }),
        ];
      return [
        h("div", { class: "mdos-wg-weekday", text: monthFmt.format(now) }),
        calendarGrid(now),
      ];
    case "greeting":
      return [
        h("div", { class: "mdos-wg-greet", text: L.greeting(now.getHours()) }),
        h("div", { class: "mdos-wg-time", text: timeFmt.format(now) }),
        h("div", { class: "mdos-wg-sub", text: dateLongFmt.format(now) }),
      ];
    case "dday":
      return [
        h("div", { class: "mdos-wg-sub mdos-wg-strong", text: w.title || L.ddayDefault }),
        h("div", { class: "mdos-wg-dday", text: ddayText(w.date) }),
        h("div", { class: "mdos-wg-sub", text: w.date ? shortDateFmt.format(new Date(`${w.date}T00:00`)) : L.date }),
      ];
    case "note": {
      const area = h("textarea", {
        class: "mdos-wg-note",
        placeholder: L.notePlaceholder,
        "aria-label": L.widgetNames.note,
        maxlength: "600",
        value: w.text || "",
      });
      area.addEventListener("input", () => {
        w.text = area.value;
        save();
      });
      return [area];
    }
    case "photo": {
      const src = images.photos[w.id];
      return src
        ? [h("img", { class: "mdos-wg-photo", src, alt: "", draggable: "false" })]
        : [h("div", { class: "mdos-wg-empty", text: L.pickPhoto })];
    }
    case "locker": {
      // The "확장 보관함" extension gathers other extensions' floating buttons
      // (marked data-bgh-stored); the widget lists them and clicks the real one.
      // Every button is listed; the row (medium) or grid (small, large)
      // scrolls by dragging, swiping or the mouse wheel.
      const items = lockerItems();
      return [
        h("div", { class: "mdos-wg-label", text: L.widgetNames.locker }),
        items.length
          ? dragScroll(h(
              "div",
              { class: "mdos-locker" },
              ...items.map((it) =>
                h(
                  "button",
                  {
                    type: "button",
                    class: "mdos-locker-item",
                    title: it.label,
                    "aria-label": it.label,
                    onclick: (event) => {
                      event.stopPropagation();
                      if (!editMode) lkActivate(it.el);
                    },
                  },
                  h("span", { class: "mdos-locker-ico" }, it.icon),
                  h("span", { class: "mdos-locker-name", text: it.label }),
                ),
              ),
            ))
          : h("div", { class: "mdos-wg-empty", text: L.lockerEmpty }),
      ];
    }
    case "credits": {
      // All credit cards as a list, synced from the credit extension.
      const c = state.credits;
      const head = h("div", { class: "mdos-wg-label mdos-cr-head" }, h("span", { text: L.widgetNames.credits }), c?.total ? h("b", { text: c.total }) : null);
      if (!c?.rows?.length) return [head, h("div", { class: "mdos-wg-empty", text: L.creditsEmpty })];
      const max = w.size === "l" ? 8 : w.size === "m" ? 3 : 4;
      return [
        head,
        h(
          "div",
          { class: "mdos-cr-list" },
          ...c.rows.slice(0, max).map((r) =>
            h(
              "div",
              { class: "mdos-cr-row" },
              h("span", { class: "mdos-cr-brand", text: r.brand }),
              h("span", { class: "mdos-cr-amt", text: r.amount || "—" }),
              r.pct != null ? h("i", { class: "mdos-cr-bar", style: `--p:${r.pct}%` }) : null,
            ),
          ),
        ),
      ];
    }
    case "credit": {
      // One credit card, chosen in the widget's settings (by the credit
      // extension's own card id, so it survives reordering there).
      const rows = state.credits?.rows || [];
      const r = rows.find((x) => x.id && x.id === w.card) || rows[0];
      if (!r) return [h("div", { class: "mdos-wg-label", text: L.widgetNames.credit }), h("div", { class: "mdos-wg-empty", text: L.creditsEmpty })];
      return [
        h("div", { class: "mdos-wg-label mdos-crd-brand", text: r.brand }),
        r.sub ? h("div", { class: "mdos-wg-sub mdos-crd-sub", text: r.sub }) : null,
        w.size !== "s" && r.lines?.length
          ? h("div", { class: "mdos-crd-lines" }, ...r.lines.slice(0, 2).map((line) => h("div", { text: line })))
          : null,
        h("div", { class: "mdos-crd-amount" }, h("b", { text: r.amount || "—" }), r.of ? h("span", { text: r.of }) : null),
        r.pct != null ? h("i", { class: "mdos-crd-bar", style: `--p:${r.pct}%` }) : null,
      ];
    }
    case "ledger":
      return ledgerBody(w, state.ledger);
    default:
      return [];
  }
}
// The credit extension's "API 가계부", synced: month total, change, today /
// month-end, the daily heat map and where the money went. One data set, five
// ways to look at it (w.view), each laid out for the three sizes.
const LEDGER_VIEWS = ["summary", "calendar", "daily", "top", "facts"];
function ledgerBody(w, d) {
  const view = LEDGER_VIEWS.includes(w.view) ? w.view : "summary";
  const s = w.size === "s";
  const l = w.size === "l";
  const title = view === "summary" ? L.widgetNames.ledger : L.ledgerViews[view];
  const head = h("div", { class: "mdos-wg-label mdos-lg-head" }, h("span", { text: title }), d?.month ? h("em", { text: d.month }) : null);
  if (!d?.total) return [head, h("div", { class: "mdos-wg-empty", text: L.creditsEmpty })];
  const total = (small) => h("div", { class: `mdos-lg-total${small ? " is-small" : ""}` }, h("b", { text: d.total }), d.usd && !small ? h("span", { text: d.usd }) : null);
  const chip = (note) =>
    d.chip
      ? h("div", { class: "mdos-lg-cmp" }, h("span", { class: `mdos-lg-chip${d.up ? " is-up" : d.down ? " is-down" : ""}`, text: d.chip }), note ? h("small", { text: d.cmpNote || "" }) : null)
      : null;
  const facts = (n) => h("div", { class: "mdos-lg-facts" }, ...(d.facts || []).slice(0, n).map(([k, v]) => h("span", {}, k, h("b", { text: v }))));
  const days = d.cal?.days || [];
  const cal = (fill) => {
    const el = h("div", { class: `mdos-lg-cal${fill ? " is-fill" : ""}` });
    days.forEach((day, i) =>
      el.append(h("i", { class: `lv${day.lv}${day.today ? " is-today" : ""}`, style: i === 0 ? `grid-column-start:${(d.cal.offset || 0) + 1}` : "", title: day.t || "" })),
    );
    return el;
  };
  const uses = (n) =>
    h(
      "div",
      { class: "mdos-lg-uses" },
      view === "top" ? null : h("div", { class: "mdos-lg-uses-title", text: L.ledgerTopUse }),
      ...(d.uses || []).slice(0, n).map((u) => h("div", { class: "mdos-lg-use" }, h("i", { style: `background:${u.color}` }), h("span", { text: u.name }), h("b", { text: u.pct }))),
    );
  switch (view) {
    case "calendar": {
      if (s) return [head, cal(true)];
      const legend = h(
        "div",
        { class: "mdos-lg-legend" },
        h("span", { text: L.ledgerLess }),
        ...[0, 1, 2, 3, 4].map((lv) => h("i", { class: `lv${lv}` })),
        h("span", { text: L.ledgerMore }),
      );
      if (!l) return [head, h("div", { class: "mdos-lg-split" }, h("div", { class: "mdos-lg-col" }, total(true), chip(false)), cal(true))];
      return [head, total(), chip(true), cal(true), legend];
    }
    case "daily": {
      // Bars by the day's own amount; days without one fall back to the heat level.
      const max = Math.max(0, ...days.map((x) => x.n || 0));
      const bars = h(
        "div",
        { class: "mdos-lg-bars" },
        ...days.map((day) => {
          const p = max > 0 ? (day.n || 0) / max : day.lv / 4;
          return h("i", { class: `${day.today ? "is-today" : ""}${p > 0 ? "" : " is-zero"}`, style: `--h:${Math.round(p * 100)}%`, title: day.t || "" });
        }),
      );
      if (s) return [head, total(true), bars];
      if (!l) return [head, total(), bars];
      return [head, total(), chip(true), bars, facts(4)];
    }
    case "top": {
      // A ring of the shares, coloured like the credit extension's pie.
      let at = 0;
      const stops = (d.uses || []).map((u) => {
        const pct = Math.max(0, parseFloat(u.pct) || 0);
        const from = at;
        at = Math.min(100, at + pct);
        return `${u.color} ${from}% ${at}%`;
      });
      if (at < 100) stops.push(`var(--mdos-widget-fill) ${at}% 100%`);
      const ring = h("div", { class: "mdos-lg-ring", style: `background:conic-gradient(${stops.join(",")})` });
      if (s) return [head, uses(3)];
      if (!l) return [head, h("div", { class: "mdos-lg-split" }, ring, uses(4))];
      return [head, total(), h("div", { class: "mdos-lg-split is-big" }, ring, uses(5)), facts(2)];
    }
    case "facts": {
      const list = [[L.widgetNames.ledger, d.total], ...(d.facts || [])].slice(0, s ? 2 : l ? 7 : 4);
      return [head, h("div", { class: "mdos-lg-tiles" }, ...list.map(([k, v]) => h("div", { class: "mdos-lg-tile" }, h("small", { text: k }), h("b", { text: v }))))];
    }
    default: {
      if (s) return [head, total(), chip(false)];
      if (!l) return [head, total(), chip(true), facts(2)];
      return [head, total(), chip(true), h("div", { class: "mdos-lg-grid" }, cal(false), uses(4)), facts(4)];
    }
  }
}
// Scrolls a widget's list by dragging with the mouse (touch scrolls natively)
// and turns a vertical wheel into sideways scrolling for a sideways row. A
// drag doesn't count as a click on the item under the pointer. Edges fade
// while there is more to see in that direction.
function dragScroll(el) {
  let start = null;
  let moved = false;
  const fade = () => {
    const sideways = el.scrollWidth > el.clientWidth + 1;
    const max = sideways ? el.scrollWidth - el.clientWidth : el.scrollHeight - el.clientHeight;
    const pos = sideways ? el.scrollLeft : el.scrollTop;
    el.dataset.more = max <= 1 ? "" : `${pos > 1 ? "start " : ""}${pos < max - 1 ? "end" : ""}`.trim();
  };
  el.addEventListener("pointerdown", (event) => {
    if (event.pointerType !== "mouse" || event.button !== 0 || editMode) return;
    start = { x: event.clientX, y: event.clientY, left: el.scrollLeft, top: el.scrollTop, id: event.pointerId };
    moved = false;
  });
  el.addEventListener("pointermove", (event) => {
    if (!start || event.pointerId !== start.id) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (!moved && Math.hypot(dx, dy) < 5) return;
    if (!moved) {
      moved = true;
      el.setPointerCapture(event.pointerId);
      el.classList.add("is-dragging");
    }
    el.scrollLeft = start.left - dx;
    el.scrollTop = start.top - dy;
  });
  const end = () => {
    start = null;
    el.classList.remove("is-dragging");
  };
  el.addEventListener("pointerup", end);
  el.addEventListener("pointercancel", end);
  el.addEventListener(
    "click",
    (event) => {
      if (!moved) return;
      moved = false;
      event.stopPropagation();
      event.preventDefault();
    },
    true,
  );
  el.addEventListener(
    "wheel",
    (event) => {
      if (el.scrollWidth <= el.clientWidth + 1 || Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
      el.scrollLeft += event.deltaY;
      event.preventDefault();
    },
    { passive: false },
  );
  el.addEventListener("scroll", fade, { passive: true });
  raf(fade);
  return el;
}
// The hidden buttons: built in, from our records in our order (no page-wide
// query); with the 확장 보관함 extension in charge, the ones it marked.
function storedEls() {
  if (lkBuiltin()) {
    const st = state.locker;
    if (!st) return [];
    return st.order.map((k) => lkRecs.get(k)).filter((r) => r?.saved && r.el.isConnected).map((r) => r.el);
  }
  return $$("[data-bgh-stored]");
}
function lockerItems() {
  return storedEls()
    .map((el) => {
      const own = [...lkRecs.values()].find((r) => r.el === el);
      const raw = (el.getAttribute("aria-label") || el.title || el.textContent || "").trim();
      const theirs = own ? null : bghNames.get(lkClean(lkLabel(el)));
      const label = own
        ? lkName(own.key)
        : (theirs?.name || (hasHangul(theirs?.owner) ? theirs.owner : "") || raw.replace(/\s*(열기|Open)$/i, "")).slice(0, 30);
      // Clone the button's own artwork (already on the page); else a letter.
      const art = el.querySelector("svg, img");
      return { el, label, icon: art ? art.cloneNode(true) : label.charAt(0) };
    })
    .filter((it) => it.label);
}
let lockerSig = "";
function refreshLocker() {
  const sig = `${lkBuiltin() ? "b" : "x"}|${bghNames.size}|` + storedEls()
    .map((el) => el.getAttribute("aria-label") || el.title || "")
    .join("|");
  if (sig === lockerSig) return;
  lockerSig = sig;
  if (sig && !state.lockerSeeded) {
    state.lockerSeeded = true;
    if (!state.widgets.some((w) => w.type === "locker")) {
      state.widgets.push({ id: newId(), type: "locker", size: "m", style: "glass", x: null, y: null });
      save();
      return renderWidgets();
    }
  }
  for (const w of state.widgets) {
    if (w.type !== "locker") continue;
    for (const el of $$(`.mdos-wg[data-wid="${w.id}"] .mdos-wg-body`)) el.replaceChildren(...widgetBody(w));
  }
}
// Reads the credit extension's cards (#mac-credit-home) while Home is
// mounted — also when its board is switched off, since the cards stay in the
// page. The result is cached, so the widgets keep showing it anywhere.
// A provider that hasn't answered yet leaves "NULL", "undefined" or "NaN" in
// the card ("$NULL", "/ null"); those show as nothing (the widget prints —).
const textOf = (el) => cleanText(el?.textContent);
function cleanText(text) {
  if (typeof text !== "string") return "";
  const t = text
    .replace(/\b(?:null|undefined|NaN)\b/gi, "")
    .replace(/[$₩¥€£](?!\s*[\d.])/g, "")
    .replace(/\s+/g, " ")
    .replace(/^[\s/·:|,-]+|[\s/·:|,-]+$/g, "")
    .trim();
  return /[\p{L}\p{N}]/u.test(t) ? t : "";
}
function scrapeLedger(card) {
  if (!card) return null;
  const facts = [];
  for (const row of card.querySelectorAll(".mac-led-facts")) {
    let label = "";
    for (const n of row.childNodes) {
      if (n.nodeType === 1 && n.tagName === "B") {
        const value = textOf(n).slice(0, 24);
        if (value) facts.push([label.replace(/[·\s]+$/g, "").replace(/^[·\s]+/g, "").slice(0, 24), value]);
        label = "";
      } else label += n.textContent;
    }
  }
  const days = [...card.querySelectorAll(".mac-cal .mac-cal-day")].map((b) => ({
    lv: Number((b.className.match(/lv(\d)/) || [0, 0])[1]),
    today: b.classList.contains("is-today"),
    t: `${textOf(b.querySelector("span"))} · ${textOf(b.querySelector("small"))}`.slice(0, 24),
    n: parseFloat(textOf(b.querySelector("small")).replace(/[^\d.]/g, "")) || 0,
  }));
  const first = card.querySelector(".mac-cal .mac-cal-day");
  const start = first ? parseInt(getComputedStyle(first).gridColumnStart, 10) : 1;
  const chip = card.querySelector(".mac-led-chip");
  return {
    month: textOf(card.querySelector(".mac-led-nav b")).slice(0, 20),
    total: textOf(card.querySelector(".mac-led-total b")).slice(0, 24),
    usd: textOf(card.querySelector(".mac-led-total em")).slice(0, 20),
    chip: textOf(chip).slice(0, 16),
    up: !!chip?.classList.contains("is-up"),
    down: !!chip?.classList.contains("is-down"),
    cmpNote: textOf(card.querySelector(".mac-led-cmp small")).slice(0, 30),
    facts: facts.slice(0, 6),
    cal: { offset: Number.isFinite(start) ? Math.max(0, start - 1) : 0, days: days.slice(0, 31) },
    uses: [...card.querySelectorAll(".mac-pie-legend li")].slice(0, 5).map((li) => ({
      name: textOf(li.querySelector("span")).slice(0, 18),
      pct: textOf(li.querySelector("b")).slice(0, 8),
      color: getComputedStyle(li.querySelector("i") || li).backgroundColor,
    })),
  };
}
// The credit extension prints "null" where a provider sent no value (a
// missing balance line, an empty sub-amount), on its own cards. Those cells
// are hidden — tagged, not removed, so its own rendering is untouched. A small
// observer catches its re-renders between our 2.5 s reads.
// Also runs of them: the credit extension joins two empty parts of a card into
// one "nullnull" text (`${extra}${googleHelperStatusHTML(w)}`).
const NULL_TEXT = /^\s*(?:(?:null|undefined|NaN)\s*)+$/i;
const nullWatched = new WeakSet();
const nullObservers = new Set();
function hideNullCells(root) {
  for (const el of root.getElementsByTagName("*")) {
    if (el.childElementCount) continue;
    const isNull = NULL_TEXT.test(el.textContent);
    if (isNull !== el.hasAttribute("data-mdos-null")) el.toggleAttribute("data-mdos-null", isNull);
  }
  // Some cards print it as a bare line of text beside their elements (no
  // element of its own to hide), so that text is emptied instead.
  const walker = doc.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  for (let n = walker.nextNode(); n; n = walker.nextNode()) {
    if (n.parentElement?.childElementCount && NULL_TEXT.test(n.data)) n.data = "";
  }
}
function watchCreditNulls(home) {
  hideNullCells(home);
  if (nullWatched.has(home)) return;
  nullWatched.add(home);
  let queued = false;
  const mo = new MutationObserver(() => {
    if (queued) return;
    queued = true;
    raf(() => {
      queued = false;
      if (home.isConnected) hideNullCells(home);
      else {
        mo.disconnect();
        nullObservers.delete(mo);
      }
    });
  });
  mo.observe(home, { childList: true, subtree: true, characterData: true });
  nullObservers.add(mo);
}
let creditSig = "";
function scrapeCredits() {
  const home = $("#mac-credit-home");
  if (!home) return;
  watchCreditNulls(home);
  // The cards' text (plus element count, for the heat map and bars) changes
  // whenever their numbers do; skip the ~30 queries otherwise.
  const sig = `${home.getElementsByTagName("*").length}|${home.textContent}`;
  if (sig === creditSig) return;
  creditSig = sig;
  const rows = [];
  for (const card of home.querySelectorAll(".mlh-crcard")) {
    const brand = textOf(card.querySelector(".mlh-cr-brand b"));
    if (!brand) continue;
    const amount = textOf(card.querySelector(".mlh-cr-big b")) || textOf(card.querySelector(".mlh-cr-big")) || textOf(card.querySelector(".mlh-rc-line b")) || "";
    const pct = parseFloat(card.querySelector(".mlh-cr-bar i")?.style.width);
    rows.push({
      id: (card.dataset.widgetId || "").slice(0, 40),
      brand: brand.slice(0, 40),
      sub: textOf(card.querySelector(".mlh-cr-brand em")).slice(0, 40),
      amount: amount.slice(0, 40),
      of: textOf(card.querySelector(".mlh-cr-big span")).slice(0, 24),
      lines: [...card.querySelectorAll(".mlh-cr > .mlh-rc-line")].map((l) => textOf(l).slice(0, 40)).filter(Boolean).slice(0, 2),
      pct: Number.isFinite(pct) ? Math.round(pct) : null,
    });
  }
  const total = textOf(home.querySelector(".mac-led-total b")).slice(0, 30);
  const credits = { total, rows: rows.slice(0, 12) };
  const ledger = scrapeLedger(home.querySelector(".mlh-rcptcard"));
  const changed = JSON.stringify(credits) !== JSON.stringify(state.credits || null) || JSON.stringify(ledger) !== JSON.stringify(state.ledger || null);
  if (!changed) return;
  state.credits = credits;
  state.ledger = ledger;
  save();
  // 2.4: the budget and credit cards become desktop widgets (once). The
  // board's own cards are switched off; Home layout can bring them back.
  if (!state.creditWidgetsV && (ledger?.total || rows.length)) {
    state.creditWidgetsV = 1;
    state.creditsSeeded = true;
    if (ledger?.total && !state.widgets.some((w) => w.type === "ledger")) state.widgets.push({ id: newId(), type: "ledger", size: "l", style: "glass", x: null, y: null });
    if (rows.length && !state.widgets.some((w) => w.type === "credits")) state.widgets.push({ id: newId(), type: "credits", size: "m", style: "glass", x: null, y: null });
    state.showCredits = false;
    applySettings();
    return renderWidgets();
  }
  for (const w of state.widgets) {
    if (!["credits", "credit", "ledger"].includes(w.type)) continue;
    for (const el of $$(`.mdos-wg[data-wid="${w.id}"] .mdos-wg-body`)) el.replaceChildren(...widgetBody(w));
  }
}

function widgetEl(w) {
  const el = h("div", {
    class: `mdos-wg mdos-wg--${w.type} mdos-wg--${w.size} mdos-wg-style--${w.style || "glass"}`,
    "data-wid": w.id,
    style: w.type === "note" ? `--note:${w.color || NOTE_COLORS[0]}` : "",
  });
  el.append(
    h("div", { class: "mdos-wg-body" }, ...widgetBody(w)),
    h("button", {
      type: "button",
      class: "mdos-wg-badge mdos-wg-remove",
      "aria-label": L.remove,
      text: "−",
      onclick: (event) => {
        event.stopPropagation();
        removeWidget(w.id);
      },
    }),
    h("button", {
      type: "button",
      class: "mdos-wg-badge mdos-wg-edit",
      "aria-label": L.style,
      text: "i",
      onclick: (event) => {
        event.stopPropagation();
        openWidgetEditor(w, el);
      },
    }),
  );
  if (w.type === "photo" && !images.photos[w.id]) {
    el.addEventListener("click", () => {
      if (!editMode) pickPhotoFor(w);
    });
  }
  return el;
}
function pickPhotoFor(w) {
  pickImage(
    (data) => {
      if (storeImage(() => (images.photos[w.id] = data))) renderWidgets();
    },
    { maxSide: 640, maxBytes: 90_000, square: false },
  );
}
function clampWidget(w) {
  const [ww, wh] = WIDGET_SIZES[w.size] || WIDGET_SIZES.s;
  const maxX = Math.max(0, innerWidth - ww - 8);
  const maxY = Math.max(0, innerHeight - MENUBAR_H - wh - 12);
  w.x = Math.min(Math.max(w.x ?? 0, 8), maxX);
  w.y = Math.min(Math.max(w.y ?? 0, 8), maxY);
}
// Widgets without a position line up in a column on the right.
// Unplaced widgets fill the right-hand column top-down; two small widgets
// share a row, like a widget stack.
function autoPlace() {
  const colW = WIDGET_SIZES.m[0];
  const gap = 16;
  const maxY = innerHeight - MENUBAR_H - 90;
  let col = 0;
  let y = 16;
  let half = false; // a small widget already sits on the left of this row
  for (const w of state.widgets) {
    if (Number.isFinite(w.x) && Number.isFinite(w.y)) continue;
    const [ww, wh] = WIDGET_SIZES[w.size] || WIDGET_SIZES.s;
    const small = w.size === "s";
    if (half && !small) {
      y += WIDGET_SIZES.s[1] + gap;
      half = false;
    }
    if (!half && y + wh > maxY && y > 16) {
      y = 16;
      col += 1;
    }
    const colX = innerWidth - 24 - colW - col * (colW + 18);
    if (small && half) {
      w.x = colX + colW - ww;
      w.y = y;
      y += wh + gap;
      half = false;
      continue;
    }
    w.x = colX;
    w.y = y;
    if (small) half = true;
    else y += wh + gap;
  }
}
// ── Grid placement ────────────────────────────────────────────
// Widgets snap to 160 px cells with 20 px gaps, counted from the right edge
// so the widget column lines up; desktop icons snap to their own grid from
// the left. Dropping on an occupied spot takes the nearest free cell.
const WG_CELL = 180;
const IC_CELL_W = 96;
const IC_CELL_H = 104;
const wgSpan = (w) => ({ s: [1, 1], m: [2, 1], l: [2, 2] })[w.size] || [1, 1];
const wgX = (k) => innerWidth - 24 - 160 - k * WG_CELL;
function snapToGrid(item, kind, others) {
  const isIcon = kind === "icon";
  const [cw, ch] = isIcon ? [1, 1] : wgSpan(item);
  const maxK = isIcon
    ? Math.max(0, Math.floor((innerWidth - 14 - ICON_W) / IC_CELL_W))
    : Math.max(cw - 1, Math.floor((innerWidth - 24 - 160 - 16) / WG_CELL));
  const maxJ = Math.max(0, Math.floor((innerHeight - MENUBAR_H - 90 - (isIcon ? ICON_H : ch * WG_CELL - 20)) / (isIcon ? IC_CELL_H : WG_CELL)));
  const cellOf = (x, y, span) =>
    isIcon
      ? [Math.round((x - 14) / IC_CELL_W), Math.round((y - 12) / IC_CELL_H)]
      : [Math.max(span - 1, Math.round((innerWidth - 24 - 160 - x) / WG_CELL)), Math.round((y - 16) / WG_CELL)];
  const used = new Set();
  for (const o of others) {
    if (!Number.isFinite(o.x) || !Number.isFinite(o.y)) continue;
    const [ow, oh] = isIcon ? [1, 1] : wgSpan(o);
    const [ok, oj] = cellOf(o.x, o.y, ow);
    for (let a = 0; a < ow; a++) for (let b = 0; b < oh; b++) used.add(`${isIcon ? ok + a : ok - a},${oj + b}`);
  }
  const fits = (k, j) => {
    if (k < (isIcon ? 0 : cw - 1) || k > maxK || j < 0 || j > maxJ) return false;
    for (let a = 0; a < cw; a++) for (let b = 0; b < ch; b++) if (used.has(`${isIcon ? k + a : k - a},${j + b}`)) return false;
    return true;
  };
  const [k0, j0] = cellOf(item.x ?? 0, item.y ?? 0, cw);
  for (let r = 0; r <= 12; r++) {
    for (let dk = -r; dk <= r; dk++) {
      for (let dj = -r; dj <= r; dj++) {
        if (Math.max(Math.abs(dk), Math.abs(dj)) !== r) continue;
        const k = k0 + dk;
        const j = j0 + dj;
        if (!fits(k, j)) continue;
        item.x = isIcon ? 14 + k * IC_CELL_W : wgX(k);
        item.y = isIcon ? 12 + j * IC_CELL_H : 16 + j * WG_CELL;
        return;
      }
    }
  }
}
// Widgets never sit on top of each other: one that lands on another (after a
// drop, a resize of the window or auto-placement) moves to the nearest free cell.
const wgRect = (w) => {
  const [ww, wh] = WIDGET_SIZES[w.size] || WIDGET_SIZES.s;
  return { x: w.x, y: w.y, w: ww, h: wh };
};
const rectsOverlap = (a, b) => a.x < b.x + b.w && b.x < a.x + a.w && a.y < b.y + b.h && b.y < a.y + a.h;
function fixOverlaps(list = state.widgets) {
  const placed = [];
  for (const w of list) {
    if (!Number.isFinite(w.x) || !Number.isFinite(w.y)) continue;
    if (placed.some((o) => rectsOverlap(wgRect(w), wgRect(o)))) snapToGrid(w, "widget", placed);
    placed.push(w);
  }
}
function snapAll() {
  if (state.layoutMode !== "grid") return;
  state.widgets.forEach((w, i) => snapToGrid(w, "widget", state.widgets.slice(0, i)));
  state.desk.forEach((d, i) => snapToGrid(d, "icon", state.desk.slice(0, i)));
}

function placeWidget(el, w) {
  el.style.left = `${w.x}px`;
  el.style.top = `${w.y}px`;
}
// Widgets on the right half keep their distance from the right edge when the
// browser width changes, so the widget column stays a column.
function reanchorWidgets() {
  const last = state.layoutW;
  if (last && last !== innerWidth) {
    const dx = innerWidth - last;
    for (const w of state.widgets) if (Number.isFinite(w.x) && w.x > last / 2) w.x += dx;
  }
  if (state.layoutW !== innerWidth) {
    state.layoutW = innerWidth;
    save();
  }
}
// Home's board (feed + credit cards) ends 20 px before the widget column.
// Measured, because the board's own left edge moves with the icon column.
function fitBoard() {
  const board = desktopHome && $(`${SEL.homePage} > div.relative`);
  if (!board) return;
  const xs = state.widgets.filter((w) => Number.isFinite(w.x) && w.x > innerWidth * 0.3).map((w) => w.x);
  const right = xs.length ? Math.min(...xs) - 20 : innerWidth - 24;
  setVar("--mdos-board-max", `${Math.max(360, Math.round(right - board.getBoundingClientRect().left))}px`);
}
function renderWidgets() {
  if (isDesktop()) {
    reanchorWidgets();
    // Widgets the user never dragged are packed afresh for this window size;
    // dragged ones (manual) keep their place.
    for (const w of state.widgets) if (!w.manual) w.x = w.y = null;
    autoPlace();
    autoPlaceIcons();
    snapAll();
    fixOverlaps();
    // Home's own board (feed, credit cards) stops short of the widget column.
    const col = state.widgets.filter((w) => Number.isFinite(w.x) && w.x > innerWidth * 0.3).map((w) => w.x);
    setVar("--mdos-widget-reserve", `${col.length ? Math.max(0, innerWidth - Math.min(...col)) + 12 : 24}px`);
    fitBoard();
    toggleClass("mdos-has-icons", state.desk.length > 0);
    widgetLayer.replaceChildren(
      ...state.desk
        .map((d) => {
          clampIcon(d);
          const el = deskIconEl(d);
          if (el) placeWidget(el, d);
          return el;
        })
        .filter(Boolean),
      ...state.widgets.map((w) => {
        clampWidget(w);
        const el = widgetEl(w);
        placeWidget(el, w);
        return el;
      }),
    );
  } else widgetLayer.replaceChildren();
  if (sbWidgets) sbWidgets.replaceChildren(...state.widgets.map(widgetEl));
}
// Refresh only the time-based widgets (notes keep their focus/caret).
function tickWidgets() {
  for (const w of state.widgets) {
    if (!["clock", "analog", "calendar", "greeting", "dday"].includes(w.type)) continue;
    for (const el of $$(`.mdos-wg[data-wid="${w.id}"] .mdos-wg-body`)) el.replaceChildren(...widgetBody(w));
  }
}
function addWidget(type, size, extra) {
  const w = { id: newId(), type, size, style: type === "note" ? "note" : "glass", x: null, y: null, ...extra };
  if (type === "dday") Object.assign(w, { title: L.ddayDefault, date: "", style: "accent" });
  if (type === "note") w.color = NOTE_COLORS[0];
  state.widgets.push(w);
  save();
  renderWidgets();
  if (type === "photo") pickPhotoFor(w);
}
function removeWidget(id) {
  state.widgets = state.widgets.filter((w) => w.id !== id);
  if (images.photos[id]) {
    delete images.photos[id];
    saveImages();
  }
  save();
  renderWidgets();
  closePop();
}
function moveWidget(id, delta) {
  const i = state.widgets.findIndex((w) => w.id === id);
  const j = i + delta;
  if (i < 0 || j < 0 || j >= state.widgets.length) return;
  [state.widgets[i], state.widgets[j]] = [state.widgets[j], state.widgets[i]];
  save();
  renderWidgets();
}

function openWidgetEditor(w, anchor) {
  const rerender = () => {
    save();
    renderWidgets();
  };
  const body = h(
    "div",
    { class: "mdos-pop-body" },
    field(
      L.size,
      segmented(
        Object.entries(L.sizes),
        w.size,
        (v) => {
          w.size = v;
          rerender();
        },
      ),
    ),
    w.type === "note"
      ? field(
          L.noteColor,
          h(
            "div",
            { class: "mdos-row mdos-swatches" },
            ...NOTE_COLORS.map((c) =>
              h("button", {
                type: "button",
                class: "mdos-swatch",
                style: `background:${c}`,
                "aria-label": c,
                onclick: () => {
                  w.color = c;
                  rerender();
                },
              }),
            ),
          ),
        )
      : field(
          L.style,
          segmented(Object.entries(L.wStyles), w.style || "glass", (v) => {
            w.style = v;
            rerender();
          }),
        ),
    w.type === "credit"
      ? field(
          L.creditPick,
          (() => {
            const sel = h("select", {
              class: "mdos-cc-select",
              onchange: (e) => {
                w.card = e.target.value;
                rerender();
              },
            });
            for (const r of state.credits?.rows || []) {
              sel.append(h("option", { value: r.id, text: r.sub ? `${r.brand} · ${r.sub}` : r.brand, selected: r.id === w.card }));
            }
            return sel;
          })(),
        )
      : null,
    w.type === "ledger"
      ? field(
          L.ledgerView,
          (() => {
            const sel = h("select", {
              class: "mdos-cc-select",
              onchange: (e) => {
                w.view = e.target.value;
                rerender();
              },
            });
            for (const v of LEDGER_VIEWS) sel.append(h("option", { value: v, text: L.ledgerViews[v], selected: (w.view || "summary") === v }));
            return sel;
          })(),
        )
      : null,
    w.type === "dday"
      ? field(
          L.title,
          h("input", {
            type: "text",
            class: "mdos-input",
            value: w.title || "",
            maxlength: "30",
            oninput: (e) => {
              w.title = e.target.value;
              rerender();
            },
          }),
        )
      : null,
    w.type === "dday"
      ? field(
          L.date,
          h("input", {
            type: "date",
            class: "mdos-input",
            value: w.date || "",
            onchange: (e) => {
              w.date = e.target.value;
              rerender();
            },
          }),
        )
      : null,
    w.type === "photo"
      ? h("button", { type: "button", class: "mdos-btn", text: L.pickImage, onclick: () => pickPhotoFor(w) })
      : null,
    isTouch()
      ? h(
          "div",
          { class: "mdos-row" },
          h("button", { type: "button", class: "mdos-btn", text: "◀", onclick: () => moveWidget(w.id, -1) }),
          h("button", { type: "button", class: "mdos-btn", text: "▶", onclick: () => moveWidget(w.id, 1) }),
        )
      : null,
    h("button", { type: "button", class: "mdos-btn mdos-btn--danger", text: L.remove, onclick: () => removeWidget(w.id) }),
  );
  openPop(body, anchor, { title: L.widgetNames[w.type] });
}

function openWidgetGallery(anchor) {
  let size = "s";
  const grid = h("div", { class: "mdos-gallery" });
  const render = () =>
    grid.replaceChildren(
      // Each way to view the API budget is its own gallery entry.
      ...WIDGET_TYPES.flatMap((type) => (type === "ledger" ? LEDGER_VIEWS.map((view) => [type, { view }]) : [[type, null]])).map(([type, extra]) => {
        const sample = widgetEl({ id: `preview-${type}`, type, size: "s", style: type === "note" ? "note" : type === "dday" ? "accent" : "glass", title: L.ddayDefault, color: NOTE_COLORS[0], ...extra });
        sample.classList.add("is-sample");
        return h(
          "button",
          {
            type: "button",
            class: "mdos-gallery-item",
            onclick: () => {
              addWidget(type, size, extra);
              closePop();
            },
          },
          sample,
          h("span", { text: extra?.view && extra.view !== "summary" ? `${L.widgetNames.ledger} · ${L.ledgerViews[extra.view]}` : L.widgetNames[type] }),
        );
      }),
    );
  render();
  const body = h(
    "div",
    { class: "mdos-pop-body" },
    field(L.size, segmented(Object.entries(L.sizes), size, (v) => (size = v))),
    grid,
  );
  openPop(body, anchor, { title: L.addWidget, wide: true });
}

const editBar = h(
  "div",
  { id: "mdos-editbar", role: "toolbar", "aria-label": L.editWidgets },
  h("button", { type: "button", class: "mdos-btn", text: `+ ${L.addWidget}`, onclick: (e) => openWidgetGallery(e.currentTarget) }),
  h("button", { type: "button", class: "mdos-btn", text: `+ ${L.addApps}`, onclick: (e) => openAddApps(e.currentTarget) }),
  h("button", { type: "button", class: "mdos-btn", text: L.homeLayout, onclick: (e) => openHomeLayout(e.currentTarget) }),
  h("button", { type: "button", class: "mdos-btn", text: L.wallpaper, onclick: () => toggleCC(true, "wallpaper") }),
  h("button", { type: "button", class: "mdos-btn mdos-btn--primary", text: L.done, onclick: () => setEditMode(false) }),
);
ui.append(editBar);
function setEditMode(next) {
  editMode = next;
  toggleClass("mdos-edit", next);
  closeMenu();
  closeLaunchpad();
  closeCC();
  if (!next) closePop();
  if (next && isDesktop()) goHome();
}

// ── Small apps: Notes, Web, YouTube ───────────────────────────

// App windows live inside Marinara's shell element so they stack with its
// windows (same z-order), but the nodes are ours.
const appLayer = h("div", { id: "mdos-appwins" });
function ensureAppLayer() {
  const shell = $(SEL.shell);
  if (shell && appLayer.parentNode !== shell) shell.append(appLayer);
}
const YT_ID = /^[\w-]{11}$/;
function parseYouTube(input) {
  const text = (input || "").trim();
  if (YT_ID.test(text)) return { id: text, list: null };
  let u;
  try {
    u = new URL(text.includes("://") ? text : `https://${text}`);
  } catch {
    return null;
  }
  const host = u.hostname.replace(/^(www|m|music)\./, "");
  let id = null;
  if (host === "youtu.be") id = u.pathname.slice(1).split("/")[0];
  else if (/^youtube(-nocookie)?\.com$/.test(host)) {
    id = u.searchParams.get("v") || (u.pathname.match(/^\/(?:embed|shorts|live|v)\/([\w-]{11})/) || [])[1] || null;
  } else return null;
  if (id && !YT_ID.test(id)) id = null;
  const list = u.searchParams.get("list");
  return id || list ? { id, list } : null;
}
function youTubeEmbed(yt, autoplay = false) {
  const params = new URLSearchParams({ rel: "0", playsinline: "1" });
  if (yt.list) params.set("list", yt.list);
  if (autoplay) params.set("autoplay", "1");
  // "My account" mode uses youtube.com so a signed-in session can apply;
  // otherwise the privacy-enhanced (no-cookie) player.
  const host = state.yt.mode === "account" ? "www.youtube.com" : "www.youtube-nocookie.com";
  return `https://${host}/embed/${yt.id || "videoseries"}?${params}`;
}
function normalizeUrl(input) {
  const text = (input || "").trim();
  if (!text) return "";
  if (/^https?:\/\//i.test(text)) return text;
  if (/^[^\s/]+\.[^\s]{2,}$/.test(text)) return `https://${text}`;
  return `https://duckduckgo.com/?q=${encodeURIComponent(text)}`;
}
// Marinara's security policy only lets its own pages and YouTube load in a
// frame (CSP frame-src); everything else opens in a separate browser window.
function embedSrc(url, autoplay) {
  const yt = parseYouTube(url);
  if (yt) return youTubeEmbed(yt, autoplay);
  try {
    if (new URL(url).origin === location.origin) return url;
  } catch {
    /* not a URL */
  }
  return null;
}
function openExternal(url) {
  const w = Math.min(1200, screen.availWidth - 80);
  const hh = Math.min(820, screen.availHeight - 80);
  window.open(url, "_blank", `noopener,noreferrer,popup,width=${w},height=${hh}`);
}
function openUrl(url) {
  if (parseYouTube(url)) openApp("youtube", { url, autoplay: true });
  else openApp("browser", { url });
}
const toolBtn = (icon, label, onclick) =>
  h("button", { type: "button", class: "mdos-tool", title: label, "aria-label": label, svg: svg(icon), onclick });
function frame(src, title, sandbox = null) {
  return h("iframe", {
    class: "mdos-frame",
    src,
    title,
    sandbox,
    allow: "autoplay; encrypted-media; picture-in-picture; fullscreen; clipboard-write",
    allowfullscreen: true,
    referrerpolicy: "strict-origin-when-cross-origin",
  });
}
function urlField(win, placeholder, onGo) {
  const input = h("input", { type: "text", class: "mdos-url", placeholder, "aria-label": placeholder, spellcheck: "false", autocomplete: "off" });
  const form = h(
    "form",
    {
      class: "mdos-url-form",
      onsubmit: (event) => {
        event.preventDefault();
        onGo(input.value);
      },
    },
    input,
  );
  win.title.replaceWith(form);
  return input;
}

const APP_TYPES = {
  notes: { mount: mountNotes },
  browser: { mount: mountBrowser },
  youtube: { mount: mountYouTube },
  customize: { mount: (win) => mountCustomize(win) },
  mwin: { mount: mountMwin },
};
function makeLights(id) {
  return h(
    "div",
    { class: "mdos-lights" },
    ...["minimize", "zoom", "close"].map((act) =>
      h("button", {
        type: "button",
        class: `mdos-light mdos-light--${act}`,
        "aria-label": L[act],
        title: L[act],
        svg: LIGHT_GLYPHS[act],
        onclick: (event) => {
          event.stopPropagation();
          if (act === "close") closeWin(id);
          else if (act === "minimize") minimizeWin(id);
          else zoomWin(id);
        },
      }),
    ),
  );
}
function openApp(type, opts = {}) {
  if (!APP_TYPES[type] || mode === "off") return;
  closeLaunchpad();
  let rec = state.apps.find((a) => a.type === type && (type !== "mwin" || a.target === opts.target));
  if (!rec) {
    rec = { id: newId(), type, x: null, y: null, w: null, h: null, snap: null, min: false, pinned: false };
    if (type === "mwin") rec.target = opts.target;
    state.apps.push(rec);
  }
  if (opts.url) rec.url = opts.url;
  if (opts.section) rec.section = opts.section;
  rec.min = false;
  const id = `app:${rec.id}`;
  const win = appWins.get(id) || renderAppWin(rec);
  win.autoplay = !!opts.autoplay;
  if (opts.section) win.openSection?.(opts.section);
  else win.refresh?.();
  setAttr(win.el, "aria-hidden", null);
  focusWin(id);
  bounce(type === "mwin" ? rec.target : type);
  save();
  syncSoon();
}
// What an app window shows: its own app, or for a Marinara window its target.
function recApp(rec) {
  if (rec.type !== "mwin") return appById(rec.type);
  const app = appById(rec.target);
  if (app) return app;
  if (rec.target.startsWith("chat:")) {
    const row = $(`${SEL.chatRows}[data-chat-id="${CSS.escape(rec.target.slice(5))}"]`);
    const title = row?.getAttribute("title") || rec.title || L.chats;
    rec.title = title;
    return { id: rec.target, icon: "chat", g: ["#6ef08d", "#17a84d"], label: () => title };
  }
  return { id: rec.target, icon: "launchpad", g: ["#9aa6bb", "#4f5a70"], label: () => rec.title || "Marinara" };
}
// Taskbar click on an app: open it, bring it forward, or minimize it when it
// already has focus (Windows behaviour).
function openMwin(target) {
  const rec = state.apps.find((a) => a.type === "mwin" && a.target === target);
  const id = rec && `app:${rec.id}`;
  if (rec && focused === id && !rec.min && appWins.has(id)) return setAppMinimized(id, true);
  openApp("mwin", { target });
}
function mountMwin(win) {
  const url = new URL(location.href);
  url.searchParams.set("mdos-embed", win.rec.target);
  url.hash = "";
  const frame = h("iframe", {
    class: "mdos-frame mdos-mframe",
    src: url.href,
    title: appLabel(recApp(win.rec)),
    allow: "clipboard-read; clipboard-write; fullscreen; autoplay; microphone",
  });
  const loading = h("div", { class: "mdos-mframe-loading", "aria-hidden": "true" }, h("div", { class: "mdos-boot-bar" }));
  frame.addEventListener("load", () => loading.classList.add("is-done"));
  win.tools.append(
    h("button", {
      type: "button",
      class: "mdos-tool",
      "aria-label": L.reload,
      title: L.reload,
      svg: svg("reload"),
      onclick: () => {
        loading.classList.remove("is-done");
        frame.src = url.href;
      },
    }),
  );
  win.body.append(frame, loading);
  win.frame = frame;
}
function renderAppWin(rec) {
  ensureAppLayer();
  const id = `app:${rec.id}`;
  const app = recApp(rec);
  const tools = h("div", { class: "mdos-appwin-tools" });
  const title = h("div", { class: "mdos-appwin-title", text: appLabel(app) });
  const bar = h("div", { class: "mdos-appwin-bar" }, makeLights(id), title, tools);
  const body = h("div", { class: "mdos-appwin-body" });
  const grips = ["n", "e", "s", "w", "ne", "nw", "se", "sw"].map((dir) =>
    h("div", { class: `mdos-grip mdos-grip--${dir}`, "data-mdos-grip": dir, "aria-hidden": "true" }),
  );
  const el = h(
    "section",
    { class: `mdos-appwin mdos-appwin--${rec.type}`, "data-mdos-win": id, role: "dialog", "aria-label": appLabel(app) },
    bar,
    body,
    ...grips,
  );
  if (rec.min) el.setAttribute("aria-hidden", "true");
  const win = { id, el, rec, bar, tools, title, body };
  appWins.set(id, win);
  APP_TYPES[rec.type].mount(win);
  appLayer.append(el);
  if (!zOrder.includes(id)) zOrder.push(id);
  applyRect(id);
  applyZ();
  return win;
}
function closeApp(id) {
  const win = appWins.get(id);
  win?.dispose?.();
  win?.el.remove();
  appWins.delete(id);
  state.apps = state.apps.filter((a) => `app:${a.id}` !== id);
  zOrder = zOrder.filter((x) => x !== id);
  save();
  focusTopVisible();
  syncSoon();
}
function setAppMinimized(id, min) {
  const rec = appRec(id);
  const win = appWins.get(id);
  if (!rec || !win) return;
  rec.min = min;
  setAttr(win.el, "aria-hidden", min ? "true" : null);
  save();
  if (min) focusTopVisible();
  else focusWin(id);
  syncSoon();
}
const renderAllApps = () => state.apps.forEach((rec) => appWins.has(`app:${rec.id}`) || renderAppWin(rec));
function removeAllAppWins() {
  for (const [id, w] of appWins) {
    w.dispose?.();
    w.el.remove();
    zOrder = zOrder.filter((x) => x !== id);
  }
  appWins.clear();
}

// Notes: a list of notes and an editor; saved to extension storage as you type.
const noteDateFmt = new Intl.DateTimeFormat(undefined, { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
const noteTitle = (n) => (n.text || "").trim().split("\n")[0].slice(0, 60) || L.untitled;
let notesWarned = false;
function mountNotes(win) {
  const list = h("div", { class: "mdos-notes-list", role: "listbox", "aria-label": L.notes });
  const editor = h("textarea", { class: "mdos-notes-editor", placeholder: L.notePlaceholder, spellcheck: "false", "aria-label": L.notes });
  const current = () => notesStore.notes.find((n) => n.id === win.rec.noteId) || null;
  const sorted = () => [...notesStore.notes].sort((a, b) => (b.updated || 0) - (a.updated || 0));
  const renderList = () =>
    list.replaceChildren(
      ...sorted().map((n) =>
        h(
          "button",
          {
            type: "button",
            role: "option",
            class: "mdos-notes-item",
            "aria-selected": String(n.id === win.rec.noteId),
            onclick: () => select(n.id),
          },
          h("b", { text: noteTitle(n) }),
          h("span", { text: noteDateFmt.format(n.updated || Date.now()) }),
        ),
      ),
    );
  const select = (nid) => {
    win.rec.noteId = nid;
    save();
    const n = current();
    editor.value = n ? n.text : "";
    editor.disabled = !n;
    renderList();
  };
  const create = () => {
    const n = { id: newId(), text: "", updated: Date.now() };
    notesStore.notes.push(n);
    saveNotes();
    select(n.id);
    editor.focus();
  };
  const remove = () => {
    const n = current();
    if (!n) return;
    if (n.text.trim() && !window.confirm(`${L.deleteNote}?`)) return;
    notesStore.notes = notesStore.notes.filter((x) => x.id !== n.id);
    saveNotes();
    select(sorted()[0]?.id || null);
  };
  let listTimer = 0;
  editor.addEventListener("input", () => {
    const n = current();
    if (!n) return;
    n.text = editor.value;
    n.updated = Date.now();
    saveNotes();
    if (!notesWarned && imagesSize() > STORAGE_BUDGET) {
      notesWarned = true;
      window.alert(L.storageFull);
    }
    marinara.clearTimeout(listTimer);
    listTimer = marinara.setTimeout(renderList, 400);
  });
  win.tools.append(toolBtn("plus", L.newNote, create), toolBtn("trash", L.deleteNote, remove));
  win.body.append(list, editor);
  if (!notesStore.notes.length) {
    notesStore.notes.push({ id: newId(), text: "", updated: Date.now() });
    saveNotes();
  }
  select(current() ? win.rec.noteId : sorted()[0].id);
  win.dispose = () => marinara.clearTimeout(listTimer);
}

// ── Reader view ───────────────────────────────────────────────
// Most sites refuse to be framed (X-Frame-Options / CSP), and Marinara has no
// page proxy. Reader view asks r.jina.ai for the page as Markdown and renders
// it here as plain elements — never as HTML from the site. Opt-in per site,
// because the address is sent to that service.
// ponytail: line-based Markdown subset (headings, lists, quotes, links,
// images, bold); upgrade to a real parser if pages need tables or code.
const READER = "https://r.jina.ai/";
async function fetchReader(url) {
  const doFetch = typeof marinara.fetch === "function" ? marinara.fetch : window.fetch.bind(window);
  const res = await doFetch(READER + url, { headers: { Accept: "text/plain" } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.text();
}
function safeHref(href, base) {
  try {
    const u = new URL(href, base);
    return u.protocol === "https:" || u.protocol === "http:" ? u.href : null;
  } catch {
    return null;
  }
}
function mdImg(alt, src, base) {
  const u = safeHref(src, base);
  // Image hosts that refuse hotlinking just drop out instead of showing a broken icon.
  return u ? h("img", { src: u, alt, loading: "lazy", decoding: "async", referrerpolicy: "no-referrer", onerror: (e) => e.target.remove() }) : null;
}
function mdLink(kids, href, onLink) {
  return h(
    "a",
    {
      href,
      target: "_blank",
      rel: "noopener noreferrer",
      onclick: (e) => {
        if (e.ctrlKey || e.metaKey || e.shiftKey || e.button) return;
        e.preventDefault();
        onLink(href);
      },
    },
    ...kids,
  );
}
// Link text may hold images ("[![thumb](src) title](href)"), so it is parsed again.
const MD_INLINE = /!\[([^\]]*)\]\(([^)\s]+)[^)]*\)|\[((?:[^[\]]|!\[[^\]]*\]\([^)\s]*\)|\[[^[\]]*\])+)\]\(([^)\s]+)[^)]*\)|\*\*([^*]+)\*\*/g;
function mdInline(text, base, onLink) {
  const out = [];
  let last = 0;
  for (const m of text.matchAll(MD_INLINE)) {
    if (m.index > last) out.push(text.slice(last, m.index));
    last = m.index + m[0].length;
    if (m[1] !== undefined) out.push(mdImg(m[1], m[2], base));
    else if (m[3] !== undefined) {
      const href = safeHref(m[4], base);
      const kids = mdInline(m[3], base, onLink);
      out.push(href ? mdLink(kids, href, onLink) : kids);
    } else out.push(h("strong", { text: m[5] }));
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}
function mdBlocks(md, base, onLink) {
  const blocks = [];
  let para = [];
  let list = null;
  const flush = () => {
    if (para.length) blocks.push(h("p", {}, ...mdInline(para.join(" "), base, onLink)));
    para = [];
  };
  for (const raw of md.split(/\r?\n/)) {
    if (blocks.length > 2500) break;
    const line = raw.trim();
    if (!line || /^([-=*_]\s*){3,}$/.test(line) || /^\|?\s*:?-{2,}/.test(line)) {
      flush();
      list = null;
      continue;
    }
    const head = line.match(/^(#{1,6})\s+(.*)$/);
    const item = line.match(/^(?:(?:[*+-]|\d+\.)\s+)+(.*)$/);
    if (head) {
      flush();
      list = null;
      blocks.push(h(`h${Math.min(6, head[1].length + 1)}`, {}, ...mdInline(head[2], base, onLink)));
    } else if (item) {
      flush();
      if (!list) blocks.push((list = h("ul")));
      list.append(h("li", {}, ...mdInline(item[1], base, onLink)));
    } else if (line.startsWith(">")) {
      flush();
      list = null;
      blocks.push(h("blockquote", {}, ...mdInline(line.replace(/^>+\s*/, ""), base, onLink)));
    } else if (line.startsWith("|")) {
      flush();
      list = null;
      const cells = line.split("|").map((c) => c.trim()).filter(Boolean);
      blocks.push(h("p", { class: "mdos-reader-row" }, ...mdInline(cells.join("  ·  "), base, onLink)));
    } else para.push(line);
  }
  flush();
  return blocks;
}
const readerOn = (url) => state.readerHosts.includes(hostOf(url));
// Web pages open in a real iframe first. Marinara's own security policy
// (frame-src) refuses most sites; the browser reports that as a
// "securitypolicyviolation", and the window then falls back to reader view or
// the open-in-new-window card for that site.
const frameBlocked = new Set();
const originOf = (u) => {
  try {
    return new URL(u).origin;
  } catch {
    return "";
  }
};
// No top navigation: a framed page can't take Marinara's tab away.
const WEB_SANDBOX = "allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox allow-modals";
function setReader(url, on) {
  const host = hostOf(url);
  state.readerHosts = state.readerHosts.filter((x) => x !== host);
  if (on) state.readerHosts.push(host);
  save();
}

// Web: an address bar. YouTube and Marinara pages open in the window; other
// sites can't be framed under Marinara's security policy, so they get a card
// with "open in new window" and "add to home screen".
function mountBrowser(win) {
  const input = urlField(win, L.urlPlaceholder, (value) => go(normalizeUrl(value)));
  const star = toolBtn("star", L.addToHome, () => win.rec.url && addBookmark({ url: win.rec.url }));
  const ext = toolBtn("external", L.openOutside, () => win.rec.url && openExternal(win.rec.url));
  const history = [];
  const back = toolBtn("back", L.back, () => history.length && go(history.pop(), false));
  const reader = toolBtn("reader", L.readerView, () => {
    if (!win.rec.url) return;
    setReader(win.rec.url, !readerOn(win.rec.url));
    render();
  });
  win.tools.prepend(back);
  win.tools.append(reader, star, ext);
  let shown = null;
  let readSeq = 0;
  const readerView = (url) => {
    const note = h("p", { class: "mdos-reader-note", text: L.readerNote });
    const status = h("p", { class: "mdos-web-note", text: L.readerLoading });
    const box = h("div", { class: "mdos-reader" }, note, status);
    const token = ++readSeq;
    fetchReader(url).then(
      (text) => {
        if (token !== readSeq) return;
        const title = text.match(/^Title:[ \t]*(.*)$/m)?.[1]?.trim();
        const at = text.indexOf("Markdown Content:");
        const body = at >= 0 ? text.slice(at + 17) : text;
        const blocks = mdBlocks(body, url, go);
        if (!blocks.length) {
          // Some sites (DCInside galleries, for one) refuse the reader service.
          status.textContent = L.readerEmpty;
          box.append(h("button", { type: "button", class: "mdos-btn mdos-btn--primary", text: L.openOutside, onclick: () => openExternal(url) }));
          return;
        }
        box.replaceChildren(note, ...(title ? [h("h1", { class: "mdos-reader-title", text: title })] : []), ...blocks);
        box.scrollTop = 0;
      },
      (err) => {
        if (token === readSeq) status.textContent = `${L.readerFail} (${err.message})`;
      },
    );
    return box;
  };
  const startPage = () => {
    const tiles = bookmarkApps().map((a) =>
      h(
        "button",
        { type: "button", class: "mdos-web-fav", onclick: () => go(a.bm.url) },
        appIcon(a),
        h("span", { text: appLabel(a) }),
      ),
    );
    return h(
      "div",
      { class: "mdos-web-start" },
      h("h3", { text: L.favorites }),
      tiles.length ? h("div", { class: "mdos-web-favs" }, ...tiles) : h("p", { class: "mdos-web-note", text: L.noFavorites }),
    );
  };
  const blocked = (url) =>
    h(
      "div",
      { class: "mdos-web-card" },
      appIcon({ id: "", letter: hostOf(url).charAt(0).toUpperCase(), favicon: url.startsWith("https:") ? `${new URL(url).origin}/favicon.ico` : null, g: [`hsl(${hueOf(hostOf(url))} 70% 62%)`, `hsl(${(hueOf(hostOf(url)) + 40) % 360} 65% 46%)`], label: () => hostOf(url) }),
      h("h3", { text: hostOf(url) }),
      h("p", { class: "mdos-web-url", text: url }),
      h("p", { class: "mdos-web-note", text: L.cantEmbed }),
      h(
        "div",
        { class: "mdos-row" },
        h("button", {
          type: "button",
          class: "mdos-btn mdos-btn--primary",
          text: L.readerView,
          onclick: () => {
            setReader(url, true);
            render();
          },
        }),
        h("button", { type: "button", class: "mdos-btn", text: L.openOutside, onclick: () => openExternal(url) }),
        h("button", { type: "button", class: "mdos-btn", text: L.addToHome, onclick: () => addBookmark({ url }) }),
      ),
    );
  const render = () => {
    const url = win.rec.url || "";
    input.value = url;
    star.disabled = ext.disabled = !url;
    back.disabled = !history.length;
    const src = url ? embedSrc(url, win.autoplay) : null;
    const useReader = !!url && !src && readerOn(url);
    const page = url && !src && !useReader && /^https?:/i.test(url) && !frameBlocked.has(originOf(url)) ? url : null;
    reader.disabled = !url || !!src;
    reader.setAttribute("aria-pressed", String(useReader));
    const key = url ? (src ? `embed:${src}` : page ? `frame:${page}` : `${useReader ? "reader" : "card"}:${url}`) : `start:${state.bookmarks.length}`;
    if (key === shown) return;
    shown = key;
    win.body.replaceChildren(
      !url ? startPage() : src ? frame(src, hostOf(url)) : page ? h("div", { class: "mdos-zoom" }, frame(page, hostOf(url), WEB_SANDBOX)) : useReader ? readerView(url) : blocked(url),
    );
    zoomBtn.hidden = !page;
    applyZoom();
  };
  // Pages built for wide screens (DCInside and the like) are drawn at a wider
  // virtual width and scaled down to the window ("fit"), or at a zoom picked
  // per site (− / %, kept in state.webZoom).
  const zoomOf = () => state.webZoom?.[hostOf(win.rec.url || "")] ?? "fit";
  const zoomValue = () => {
    const z = zoomOf();
    if (z !== "fit") return z;
    return Math.max(0.45, Math.min(1, (win.body.clientWidth || 1280) / 1280));
  };
  function applyZoom() {
    const box = win.body.querySelector(":scope > .mdos-zoom");
    if (!box) return;
    const z = zoomValue();
    box.style.setProperty("--z", String(Math.round(z * 1000) / 1000));
    zoomBtn.textContent = `${Math.round(z * 100)}%`;
  }
  const zoomBtn = h("button", {
    type: "button",
    class: "mdos-tool mdos-zoom-btn",
    title: L.zoom,
    "aria-label": L.zoom,
    text: "100%",
    onclick: (e) => {
      const set = (v) => {
        const host = hostOf(win.rec.url || "");
        state.webZoom = { ...(state.webZoom || {}) };
        if (v === "fit") delete state.webZoom[host];
        else state.webZoom[host] = v;
        save();
        applyZoom();
        closePop();
      };
      const cur = zoomOf();
      openPop(
        h(
          "div",
          { class: "mdos-pop-body mdos-zoom-menu" },
          h("button", { type: "button", class: `mdos-menu-item${cur === "fit" ? " is-on" : ""}`, text: L.zoomFit, onclick: () => set("fit") }),
          ...[0.5, 0.67, 0.8, 0.9, 1, 1.1, 1.25].map((v) =>
            h("button", { type: "button", class: `mdos-menu-item${cur === v ? " is-on" : ""}`, text: `${Math.round(v * 100)}%`, onclick: () => set(v) }),
          ),
        ),
        e.currentTarget,
        { title: L.zoom },
      );
    },
  });
  win.tools.prepend(zoomBtn);
  if (typeof ResizeObserver === "function") new ResizeObserver(() => zoomOf() === "fit" && applyZoom()).observe(win.body);
  const go = (url, remember = true) => {
    if (remember && win.rec.url && win.rec.url !== url) history.push(win.rec.url);
    if (history.length > 50) history.shift();
    win.rec.url = url;
    win.autoplay = true;
    save();
    render();
  };
  win.refresh = render;
  render();
}

// YouTube. youtube.com itself refuses to load inside another page
// (X-Frame-Options), so with a YouTube Data API key this window browses like
// YouTube: home (trending, by category), search, the watch page (player,
// details, more from the channel) and channel pages; videos play in the
// embeddable player. Without a key, pasted links still play.
// Player: privacy-enhanced (youtube-nocookie) or youtube.com ("my account").
// The player keeps playing while minimized; 📌 keeps the window on top.
function setYtKey(value) {
  const key = String(value || "").trim();
  if (key === state.yt.apiKey) return;
  state.yt.apiKey = key;
  ytCache.clear();
  save();
  for (const w of appWins.values()) if (w.rec.type === "youtube") w.refresh?.(true);
}
const YT_REGION = KO ? "KR" : "US";
const ytCache = new Map(); // request → { at, data }, 10 minutes
async function ytApi(path, params) {
  const q = new URLSearchParams({ ...params, key: state.yt.apiKey });
  const k = `${path}?${q}`;
  const hit = ytCache.get(k);
  if (hit && Date.now() - hit.at < 600_000) return hit.data;
  const doFetch = typeof marinara.fetch === "function" ? marinara.fetch : window.fetch.bind(window);
  const res = await doFetch(`https://www.googleapis.com/youtube/v3/${k}`);
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data?.error?.message || `HTTP ${res.status}`);
  ytCache.set(k, { at: Date.now(), data });
  if (ytCache.size > 80) ytCache.delete(ytCache.keys().next().value);
  return data;
}
const ytNum = (n) => {
  const v = Number(n);
  if (!Number.isFinite(v)) return "";
  try {
    return new Intl.NumberFormat(KO ? "ko" : "en", { notation: "compact", maximumFractionDigits: 1 }).format(v);
  } catch {
    return String(v);
  }
};
function ytDur(iso) {
  const m = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/.exec(iso || "");
  if (!m) return "";
  const [hh, mm, ss] = [m[1], m[2], m[3]].map((x) => Number(x) || 0);
  const two = (x) => String(x).padStart(2, "0");
  return hh ? `${hh}:${two(mm)}:${two(ss)}` : `${mm}:${two(ss)}`;
}
const ytThumb = (t) => t?.medium?.url || t?.high?.url || t?.default?.url || "";
function ytVideo(it) {
  const sn = it.snippet || {};
  return {
    id: typeof it.id === "string" ? it.id : it.id?.videoId,
    title: decodeEntities(sn.title || ""),
    channel: decodeEntities(sn.channelTitle || ""),
    channelId: sn.channelId || "",
    thumb: ytThumb(sn.thumbnails),
    at: Date.parse(sn.publishedAt || "") || 0,
    desc: sn.description || "",
    dur: ytDur(it.contentDetails?.duration),
    live: sn.liveBroadcastContent === "live",
    views: it.statistics?.viewCount,
  };
}
async function ytDetails(ids) {
  if (!ids.length) return [];
  const data = await ytApi("videos", { part: "snippet,contentDetails,statistics", id: ids.join(","), maxResults: "50" });
  const byId = new Map((data.items || []).map((it) => [it.id, ytVideo(it)]));
  return ids.map((id) => byId.get(id)).filter(Boolean);
}
async function ytPopular(cat) {
  const params = { part: "snippet,contentDetails,statistics", chart: "mostPopular", regionCode: YT_REGION, maxResults: "30" };
  if (cat && cat !== "all") params.videoCategoryId = cat;
  const data = await ytApi("videos", params);
  return (data.items || []).map(ytVideo);
}
async function ytSearchVideos(query) {
  const data = await ytApi("search", { part: "snippet", type: "video", maxResults: "24", q: query, regionCode: YT_REGION });
  return ytDetails((data.items || []).map((it) => it.id?.videoId).filter(Boolean));
}
async function ytChannel(id) {
  const data = await ytApi("channels", { part: "snippet,statistics,contentDetails", id });
  const c = data.items?.[0];
  if (!c) throw new Error("channel");
  return {
    id,
    title: decodeEntities(c.snippet?.title || ""),
    avatar: ytThumb(c.snippet?.thumbnails),
    subs: c.statistics?.hiddenSubscriberCount ? "" : c.statistics?.subscriberCount,
    uploads: c.contentDetails?.relatedPlaylists?.uploads || "",
  };
}
async function ytUploads(playlistId) {
  if (!playlistId) return [];
  const data = await ytApi("playlistItems", { part: "contentDetails", playlistId, maxResults: "24" });
  return ytDetails((data.items || []).map((it) => it.contentDetails?.videoId).filter(Boolean));
}
// Titles from the API arrive HTML-escaped; decode them as text, never markup.
const decodeEntities = (text) => new DOMParser().parseFromString(`<!doctype html><body>${text}`, "text/html").body.textContent || "";
function openYouTubeSettings(anchor) {
  const key = h("input", {
    type: "password",
    class: "mdos-input",
    placeholder: L.ytApiKey,
    autocomplete: "off",
    value: state.yt.apiKey || "",
    oninput: (e) => setYtKey(e.target.value),
    onchange: (e) => setYtKey(e.target.value),
  });
  const body = h(
    "div",
    { class: "mdos-pop-body" },
    field(
      L.ytMode,
      segmented(Object.entries(L.ytModes), state.yt.mode, (v) => {
        state.yt.mode = v;
        save();
        for (const w of appWins.values()) if (w.rec.type === "youtube") w.refresh?.(true);
        openYouTubeSettings(anchor);
      }),
    ),
    field(L.ytApiKey, key),
    h("p", { class: "mdos-pop-note", text: L.ytApiHint }),
    state.yt.mode === "account" ? h("p", { class: "mdos-pop-note", text: L.ytAccountHint }) : null,
    state.yt.mode === "account"
      ? h(
          "div",
          { class: "mdos-row" },
          h("button", {
            type: "button",
            class: "mdos-btn mdos-btn--primary",
            text: L.ytLogin,
            onclick: () => openExternal("https://accounts.google.com/ServiceLogin?service=youtube&continue=https%3A%2F%2Fwww.youtube.com%2F"),
          }),
          h("button", { type: "button", class: "mdos-btn", text: L.ytOpenSite, onclick: () => openExternal("https://www.youtube.com/") }),
        )
      : null,
  );
  openPop(body, anchor, { title: L.ytSettings });
}
function mountYouTube(win) {
  // Views: home (by category), search, watch, channel; a stack for "back".
  const stack = [];
  let view = parseYouTube(win.rec.url || "") ? { type: "watch", url: win.rec.url } : { type: "home", cat: "all" };
  let seq = 0;
  const boxTokens = new WeakMap();
  const go = (next) => {
    stack.push(view);
    if (stack.length > 40) stack.shift();
    view = next;
    if (next.type === "watch") {
      win.rec.url = next.url;
      win.autoplay = true;
      save();
    }
    render(true);
  };
  const input = urlField(win, L.ytSearchPlaceholder, (value) => {
    const text = value.trim();
    if (!text) return go({ type: "home", cat: "all" });
    if (parseYouTube(text)) return go({ type: "watch", url: text });
    go({ type: "search", q: text });
  });
  const back = toolBtn("back", L.back, () => {
    if (!stack.length) return;
    view = stack.pop();
    render(true);
  });
  const homeBtn = toolBtn("home", L.ytHome, () => go({ type: "home", cat: "all" }));
  const settingsBtn = toolBtn("sliders", L.ytSettings, (e) => openYouTubeSettings(e.currentTarget));
  const pin = toolBtn("pin", L.pinOnTop, () => {
    win.rec.pinned = !win.rec.pinned;
    pin.setAttribute("aria-pressed", String(!!win.rec.pinned));
    applyZ();
    save();
  });
  pin.setAttribute("aria-pressed", String(!!win.rec.pinned));
  const ext = toolBtn("external", L.openOutside, () => openExternal(view.type === "watch" ? view.url : view.type === "channel" ? `https://www.youtube.com/channel/${view.id}` : "https://www.youtube.com/"));
  win.tools.prepend(back, homeBtn);
  win.tools.append(settingsBtn, pin, ext);

  const note = (text) => h("p", { class: "mdos-yt-note", text });
  const needKey = () =>
    h(
      "div",
      { class: "mdos-yt-empty" },
      h("span", { class: "mdos-yt-logo", "aria-hidden": "true" }),
      note(L.ytNeedKey),
      h("button", { type: "button", class: "mdos-btn mdos-btn--primary", text: L.ytAddKey, onclick: (e) => openYouTubeSettings(e.currentTarget) }),
    );
  const meta = (v) => [v.views != null ? L.ytViews(ytNum(v.views)) : "", v.live ? L.ytLive : relTime(v.at)].filter(Boolean).join(" · ");
  const card = (v, { channel = true } = {}) =>
    h(
      "div",
      { class: "mdos-yt-card" },
      h(
        "button",
        { type: "button", class: "mdos-yt-thumbbox", "aria-label": v.title, onclick: () => go({ type: "watch", url: `https://youtu.be/${v.id}` }) },
        v.thumb ? h("img", { src: v.thumb, alt: "", loading: "lazy", referrerpolicy: "no-referrer" }) : null,
        v.live ? h("span", { class: "mdos-yt-dur is-live", text: L.ytLive }) : v.dur ? h("span", { class: "mdos-yt-dur", text: v.dur }) : null,
      ),
      h("button", { type: "button", class: "mdos-yt-title", text: v.title, title: v.title, onclick: () => go({ type: "watch", url: `https://youtu.be/${v.id}` }) }),
      channel && v.channel ? h("button", { type: "button", class: "mdos-yt-chan", text: v.channel, onclick: () => v.channelId && go({ type: "channel", id: v.channelId }) }) : null,
      h("span", { class: "mdos-yt-meta", text: meta(v) }),
    );
  const grid = (list, opts) => (list.length ? h("div", { class: "mdos-yt-grid" }, ...list.map((v) => card(v, opts))) : note(L.ytEmpty));
  // Fills a box when its request answers; a box replaced or no longer on the
  // page (another view) ignores a late answer.
  const later = (box, load) => {
    const token = ++seq;
    boxTokens.set(box, token);
    box.replaceChildren(note(L.ytLoading));
    const fresh = () => box.isConnected && boxTokens.get(box) === token;
    load().then(
      (nodes) => fresh() && box.replaceChildren(...[].concat(nodes)),
      (err) => fresh() && box.replaceChildren(note(`${L.ytError}: ${err.message}`)),
    );
    return box;
  };
  const homeView = () => {
    const chips = h(
      "div",
      { class: "mdos-yt-chips", role: "tablist" },
      ...L.ytCats.map(([id, label]) =>
        h("button", {
          type: "button",
          role: "tab",
          class: `mdos-yt-chip${String(view.cat) === id ? " is-on" : ""}`,
          "aria-selected": String(String(view.cat) === id),
          text: label,
          onclick: () => {
            view = { type: "home", cat: id };
            render(true);
          },
        }),
      ),
    );
    return [chips, later(h("div"), async () => grid(await ytPopular(view.cat)))];
  };
  const watchView = () => {
    const yt = parseYouTube(view.url);
    const player = h("div", { class: "mdos-yt-player" }, yt ? frame(youTubeEmbed(yt, win.autoplay), "YouTube") : null);
    win.autoplay = false;
    const info = h("div", { class: "mdos-yt-info" });
    const side = h("div", { class: "mdos-yt-side" });
    if (yt?.id && state.yt.apiKey) {
      later(info, async () => {
        const [v] = await ytDetails([yt.id]);
        if (!v) return [];
        const desc = h("div", { class: "mdos-yt-desc", text: v.desc });
        const more = h("button", {
          type: "button",
          class: "mdos-yt-more",
          text: L.ytMore,
          onclick: () => {
            const open = desc.classList.toggle("is-open");
            more.textContent = open ? L.ytLess : L.ytMore;
          },
        });
        const ch = v.channelId ? await ytChannel(v.channelId).catch(() => null) : null;
        if (ch?.uploads) {
          later(side, async () => {
            const list = (await ytUploads(ch.uploads)).filter((x) => x.id !== v.id);
            return [h("h3", { class: "mdos-yt-h", text: L.ytFromChannel }), h("div", { class: "mdos-yt-list" }, ...list.map((x) => card(x, { channel: false })))];
          });
        } else side.replaceChildren();
        return [
          h("h2", { class: "mdos-yt-wtitle", text: v.title }),
          h(
            "button",
            { type: "button", class: "mdos-yt-owner", onclick: () => v.channelId && go({ type: "channel", id: v.channelId }) },
            ch?.avatar ? h("img", { src: ch.avatar, alt: "", referrerpolicy: "no-referrer" }) : h("span", { class: "mdos-yt-avatar" }),
            h("span", {}, h("b", { text: v.channel }), ch?.subs ? h("small", { text: L.ytSubs(ytNum(ch.subs)) }) : null),
          ),
          h("div", { class: "mdos-yt-descbox" }, h("b", { text: meta(v) }), desc, v.desc ? more : null),
        ];
      });
    }
    return [h("div", { class: "mdos-yt-watch" }, h("div", { class: "mdos-yt-main" }, player, info), side)];
  };
  const searchView = () => [later(h("div"), async () => grid(await ytSearchVideos(view.q)))];
  const channelView = () => [
    later(h("div"), async () => {
      const ch = await ytChannel(view.id);
      const list = await ytUploads(ch.uploads);
      return [
        h(
          "div",
          { class: "mdos-yt-chhead" },
          ch.avatar ? h("img", { src: ch.avatar, alt: "", referrerpolicy: "no-referrer" }) : h("span", { class: "mdos-yt-avatar" }),
          h("div", {}, h("h2", { text: ch.title }), ch.subs ? h("small", { text: L.ytSubs(ytNum(ch.subs)) }) : null),
        ),
        h("h3", { class: "mdos-yt-h", text: L.ytUploads }),
        grid(list, { channel: false }),
      ];
    }),
  ];
  let shown = "";
  const render = (force = false) => {
    back.disabled = !stack.length;
    input.value = view.type === "search" ? view.q : view.type === "watch" ? view.url : "";
    const key = JSON.stringify(view) + state.yt.mode + !!state.yt.apiKey;
    if (key === shown && !force) return;
    shown = key;
    const watch = view.type === "watch";
    const parts = !state.yt.apiKey && !watch ? [needKey()] : watch ? watchView() : view.type === "search" ? searchView() : view.type === "channel" ? channelView() : homeView();
    const page = h("div", { class: `mdos-yt${watch ? " is-watch" : ""}` }, ...parts);
    win.body.replaceChildren(page);
  };
  win.refresh = render;
  render();
}

// ── Bookmarks & desktop icons ─────────────────────────────────

function addBookmark({ url, title }) {
  const clean = normalizeUrl(url);
  if (!clean) return null;
  let b = state.bookmarks.find((x) => x.url === clean);
  if (!b) {
    b = { id: newId(), url: clean, title: (title || hostOf(clean)).trim().slice(0, 40) };
    state.bookmarks.push(b);
  }
  if (isDesktop() && !state.desk.some((d) => d.app === `bm:${b.id}`)) {
    state.desk.push({ id: newId(), app: `bm:${b.id}`, x: null, y: null });
  }
  state.sbHidden = state.sbHidden.filter((id) => id !== `bm:${b.id}`);
  save();
  refreshHomeItems();
  return b;
}
function removeBookmark(id) {
  state.bookmarks = state.bookmarks.filter((b) => b.id !== id);
  state.desk = state.desk.filter((d) => d.app !== `bm:${id}`);
  delete state.icons[`bm:${id}`];
  if (images.icons[`bm:${id}`]) {
    delete images.icons[`bm:${id}`];
    saveImages();
  }
  save();
  refreshHomeItems();
}
function renameBookmark(b) {
  const next = window.prompt(L.rename, b.title);
  if (next == null || !next.trim()) return;
  b.title = next.trim().slice(0, 40);
  save();
  refreshHomeItems();
}
function refreshHomeItems() {
  renderWidgets();
  if (sbEl) renderSpringboardApps();
  for (const w of appWins.values()) w.refresh?.();
}
function openBookmarkForm(anchor) {
  const title = h("input", { type: "text", class: "mdos-input", placeholder: L.bookmarkTitle, maxlength: "40" });
  const url = h("input", { type: "url", class: "mdos-input", placeholder: L.bookmarkUrl, required: true });
  const form = h(
    "form",
    {
      class: "mdos-pop-body",
      onsubmit: (event) => {
        event.preventDefault();
        if (addBookmark({ url: url.value, title: title.value })) closePop();
      },
    },
    field(L.bookmarkTitle, title),
    field(L.bookmarkUrl, url),
    h("button", { type: "submit", class: "mdos-btn mdos-btn--primary", text: L.add }),
  );
  openPop(form, anchor, { title: L.addBookmark });
  url.focus();
}

const ICON_W = 92;
const ICON_H = 100;
function clampIcon(d) {
  d.x = Math.min(Math.max(d.x ?? 0, 4), innerWidth - ICON_W - 4);
  d.y = Math.min(Math.max(d.y ?? 0, 4), innerHeight - MENUBAR_H - ICON_H - 10);
}
// Unplaced icons fill the left edge top-down, column by column, like a desktop.
function autoPlaceIcons() {
  const taken = state.desk.filter((d) => Number.isFinite(d.x) && Number.isFinite(d.y));
  const maxY = innerHeight - MENUBAR_H - ICON_H - 90;
  let x = 14;
  let y = 12;
  for (const d of state.desk) {
    if (Number.isFinite(d.x) && Number.isFinite(d.y)) continue;
    while (taken.some((t) => Math.abs(t.x - x) < ICON_W - 12 && Math.abs(t.y - y) < ICON_H - 12)) {
      y += ICON_H;
      if (y > maxY) {
        y = 12;
        x += ICON_W;
      }
    }
    d.x = x;
    d.y = y;
    taken.push(d);
  }
}
function deskIconEl(d) {
  const app = appById(d.app);
  if (!app) return null;
  return h(
    "div",
    {
      class: "mdos-dicon",
      "data-app": app.id,
      role: "button",
      tabindex: "0",
      "data-did": d.id,
      "aria-label": appLabel(app),
      onkeydown: (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          launch(app.id);
        }
      },
    },
    appIcon(app),
    h("span", { class: "mdos-dicon-label", text: appLabel(app) }),
    h("button", {
      type: "button",
      class: "mdos-wg-badge mdos-wg-remove",
      "aria-label": L.removeFromDesktop,
      text: "−",
      onclick: (event) => {
        event.stopPropagation();
        removeDeskIcon(d.id);
      },
    }),
  );
}
function addDeskIcon(appId) {
  if (state.desk.some((d) => d.app === appId)) return;
  state.desk.push({ id: newId(), app: appId, x: null, y: null });
  save();
  renderWidgets();
}
function removeDeskIcon(id) {
  state.desk = state.desk.filter((d) => d.id !== id);
  save();
  renderWidgets();
}

// ── Home screen customization ─────────────────────────────────

// Touch home screen: app order and apps taken off the grid.
function springboardApps() {
  const base = [
    ...shownApps().filter((a) => a.id !== "home"),
    ...UTIL_APPS,
    ...homeApps(),
    ...bookmarkApps(),
    ...TAIL_APPS.filter((a) => a.id !== "search"),
    ...EXTRA_APPS.filter((a) => ["controlcenter", "widgets", "customize", "locker"].includes(a.id)),
  ];
  const rank = (a) => {
    const i = state.sbOrder.indexOf(a.id);
    return i < 0 ? 1e4 + base.indexOf(a) : i;
  };
  return base.filter((a) => !state.sbHidden.includes(a.id)).sort((a, b) => rank(a) - rank(b));
}
function moveSpringboardApp(id, delta) {
  const ids = springboardApps().map((a) => a.id);
  const i = ids.indexOf(id);
  const j = i + delta;
  if (i < 0 || j < 0 || j >= ids.length) return;
  [ids[i], ids[j]] = [ids[j], ids[i]];
  state.sbOrder = ids;
  save();
  renderSpringboardApps();
}
function hideFromHome(id) {
  if (!state.sbHidden.includes(id)) state.sbHidden.push(id);
  save();
  renderSpringboardApps();
}

// "Add apps & bookmarks": every app not yet on the desktop (or hidden from the
// touch home screen), plus a button to add a website.
function openAddApps(anchor) {
  const candidates = launchpadApps().filter((a) =>
    isTouch() ? state.sbHidden.includes(a.id) : !state.desk.some((d) => d.app === a.id),
  );
  const grid = h(
    "div",
    { class: "mdos-iconpick" },
    ...candidates.map((a, i) =>
      appTile(a, i, (picked) => {
        if (isTouch()) {
          state.sbHidden = state.sbHidden.filter((x) => x !== picked.id);
          save();
          renderSpringboardApps();
        } else addDeskIcon(picked.id);
        grid.querySelector(`[data-app="${CSS.escape(picked.id)}"]`)?.remove();
      }),
    ),
  );
  const body = h(
    "div",
    { class: "mdos-pop-body" },
    grid,
    h("button", { type: "button", class: "mdos-btn", text: `+ ${L.addBookmark}`, onclick: () => openBookmarkForm(anchor) }),
  );
  openPop(body, anchor, { title: L.addApps, wide: true });
}

// "Home layout": where Marinara's Home blocks sit and what shows.
function openHomeLayout(anchor) {
  const toggle = (key, label) =>
    h(
      "label",
      { class: "mdos-cc-toggle" },
      h("span", { text: label }),
      h("input", { type: "checkbox", role: "switch", checked: !!state[key], onchange: (e) => updateSetting(key, e.target.checked) }),
    );
  const body = h(
    "div",
    { class: "mdos-pop-body" },
    field(L.boardPos, segmented(Object.entries(L.boardPositions), state.board, (v) => updateSetting("board", v))),
    toggle("showCredits", L.showCredits),
    toggle("showFeed", L.showFeed),
    h(
      "div",
      { class: "mdos-row" },
      h("button", {
        type: "button",
        class: "mdos-btn",
        text: L.arrangeIcons,
        onclick: () => {
          for (const d of state.desk) d.x = d.y = null;
          save();
          renderWidgets();
        },
      }),
      h("button", {
        type: "button",
        class: "mdos-btn",
        text: L.arrangeWidgets,
        onclick: () => {
          for (const w of state.widgets) w.x = w.y = null, (w.manual = false);
          save();
          renderWidgets();
        },
      }),
    ),
  );
  openPop(body, anchor, { title: L.homeLayout });
}

// ── Shared setting controls ───────────────────────────────────

function settingToggle(key, label, onChange) {
  return h(
    "label",
    { class: "mdos-cc-toggle" },
    h("span", { text: label }),
    h("input", {
      type: "checkbox",
      role: "switch",
      checked: !!state[key],
      onchange: (event) => {
        updateSetting(key, event.target.checked);
        onChange?.(event.target.checked);
      },
    }),
  );
}
function settingSelect(key, options, onChange) {
  const el = h("select", {
    class: "mdos-cc-select",
    onchange: (e) => {
      updateSetting(key, e.target.value);
      onChange?.(e.target.value);
    },
  });
  for (const [v, label] of options) el.append(h("option", { value: v, text: label, selected: state[key] === v }));
  return el;
}
function accentRow() {
  return h(
    "div",
    { class: "mdos-cc-accents", role: "radiogroup", "aria-label": L.accent },
    ...ACCENTS.map((accent) =>
      h("button", {
        type: "button",
        role: "radio",
        class: `mdos-cc-accent${accent.color ? "" : accent.theme ? " mdos-cc-accent--theme" : " mdos-cc-accent--app"}`,
        title: accent.name,
        "aria-label": accent.name,
        "aria-checked": String(state.accent === accent.id),
        "data-accent": accent.id,
        style: accent.color ? `--c:${accent.color}` : accent.theme ? `--c:${themePalette.accent || "#0a84ff"}` : "",
        onclick: () => {
          updateSetting("accent", accent.id);
          refreshCC();
        },
      }),
    ),
  );
}
function wallpaperSwatches() {
  return h(
    "div",
    { class: "mdos-cc-swatches", role: "radiogroup", "aria-label": L.wallpaper },
    ...WALLPAPERS.map((wp) =>
      h("button", {
        type: "button",
        role: "radio",
        class: "mdos-cc-swatch",
        title: wp.name,
        "aria-label": wp.name,
        "aria-checked": String(!images.wallpaper && state.wallpaper === wp.id),
        "data-wp": wp.id,
        style: `background:${wp.id === "theme" ? themeWallpaperCss() : wp.css}`,
        onclick: () => {
          if (images.wallpaper) {
            images.wallpaper = "";
            saveImages();
          }
          updateSetting("wallpaper", wp.id);
          refreshCC();
        },
      }),
    ),
  );
}
function wallpaperImageControls() {
  const urlInput = h("input", { type: "url", class: "mdos-cc-input", placeholder: L.imageUrl, "aria-label": L.imageUrl });
  return [
    h(
      "div",
      { class: "mdos-cc-row" },
      h("button", {
        type: "button",
        class: "mdos-cc-btn mdos-cc-btn--wide",
        text: L.customImage,
        onclick: () =>
          pickImage(
            (data) => {
              if (storeImage(() => (images.wallpaper = data))) {
                applyWallpaper();
                refreshCC();
              }
            },
            { maxSide: 2200, maxBytes: 450_000 },
          ),
      }),
    ),
    h(
      "form",
      {
        class: "mdos-cc-row",
        onsubmit: (event) => {
          event.preventDefault();
          const url = urlInput.value.trim();
          if (!/^https:\/\/[^\s"'()\\]+$/i.test(url)) {
            urlInput.setCustomValidity(L.badUrl);
            urlInput.reportValidity();
            return;
          }
          urlInput.setCustomValidity("");
          if (storeImage(() => (images.wallpaper = url))) {
            applyWallpaper();
            refreshCC();
          }
        },
      },
      urlInput,
      h("button", { type: "submit", class: "mdos-cc-btn", text: L.apply }),
    ),
  ];
}
function refreshCC() {
  for (const el of $$(".mdos-cc-swatch[data-wp]")) {
    el.setAttribute("aria-checked", String(!images.wallpaper && state.wallpaper === el.dataset.wp));
  }
  for (const el of $$(".mdos-cc-accent[data-accent]")) {
    el.setAttribute("aria-checked", String(state.accent === el.dataset.accent));
  }
}

// ── Calendar (the clock's flyout, Windows 11) ─────────────────

let calEl = null;
function closeCal() {
  calEl?.remove();
  calEl = null;
  mbClock.classList.remove("is-open");
}
function toggleCal() {
  if (calEl) return closeCal();
  closeMenu();
  closeCC();
  closeLaunchpad();
  const today = new Date();
  let view = new Date(today.getFullYear(), today.getMonth(), 1);
  const monthFmt = new Intl.DateTimeFormat(undefined, { year: "numeric", month: "long" });
  const longFmt = new Intl.DateTimeFormat(undefined, { month: "long", day: "numeric", weekday: "long" });
  const dayFmt = new Intl.DateTimeFormat(undefined, { weekday: "narrow" });
  const title = h("span", { class: "mdos-cal-month" });
  const grid = h("div", { class: "mdos-cal-grid", role: "grid" });
  const render = () => {
    title.textContent = monthFmt.format(view);
    const start = new Date(view);
    start.setDate(1 - view.getDay());
    const cells = [];
    // Weekday names (Sunday first, as Windows shows by default in Korea/US).
    for (let i = 0; i < 7; i++) cells.push(h("span", { class: "mdos-cal-wd", text: dayFmt.format(new Date(2023, 0, 1 + i)) }));
    for (let i = 0; i < 42; i++) {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      const cls = ["mdos-cal-day"];
      if (d.getMonth() !== view.getMonth()) cls.push("is-other");
      if (d.toDateString() === today.toDateString()) cls.push("is-today");
      cells.push(h("span", { class: cls.join(" "), role: "gridcell", text: String(d.getDate()) }));
    }
    grid.replaceChildren(...cells);
  };
  const nav = (delta) =>
    h("button", {
      type: "button",
      class: "mdos-cal-nav",
      "aria-label": delta < 0 ? "‹" : "›",
      svg: `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${delta < 0 ? "M4 10l4-4 4 4" : "M4 6l4 4 4-4"}"/></svg>`,
      onclick: () => {
        view = new Date(view.getFullYear(), view.getMonth() + delta, 1);
        render();
      },
    });
  calEl = h(
    "div",
    { id: "mdos-cal", role: "dialog", "aria-label": longFmt.format(today) },
    h(
      "div",
      { class: "mdos-cal-card" },
      h("button", {
        type: "button",
        class: "mdos-cal-today",
        text: longFmt.format(today),
        onclick: () => {
          view = new Date(today.getFullYear(), today.getMonth(), 1);
          render();
        },
      }),
      h("div", { class: "mdos-cal-head" }, title, h("span", { class: "mdos-cal-navs" }, nav(-1), nav(1))),
      grid,
    ),
    isDesktop()
      ? h(
          "div",
          { class: "mdos-cal-card mdos-cal-focus" },
          h("span", { text: L.focusSession }),
          h("button", {
            type: "button",
            class: "mdos-cc-btn mdos-cc-btn--accent",
            text: "Ctrl Alt F",
            onclick: () => {
              closeCal();
              setFocusMode(true);
            },
          }),
        )
      : null,
  );
  render();
  ui.append(calEl);
  mbClock.classList.add("is-open");
  raf(() => calEl?.classList.add("is-open"));
}

// ── Control Center (quick settings) ───────────────────────────

let ccEl = null;
function toggleCC(forceOpen, section) {
  // Detailed settings live in the Customize window.
  if (section) {
    closeCC();
    return openApp("customize", { section });
  }
  if (ccEl && !forceOpen) return closeCC();
  closeMenu();
  closeLaunchpad();
  if (!ccEl) buildCC();
}
function buildCC() {
  const card = (title, ...kids) => h("section", { class: "mdos-cc-card" }, title ? h("h3", { text: title }) : null, ...kids);
  // Windows 11 Quick Settings: a grid of toggle tiles, then the details,
  // then a footer with settings and power.
  const tile = ({ key, label, icon, run, onChange }) => {
    const btn = h(
      "button",
      {
        type: "button",
        class: "mdos-qs-tile",
        title: label,
        "aria-pressed": key ? String(!!state[key]) : null,
        onclick: () => {
          if (run) return run();
          const next = !state[key];
          updateSetting(key, next);
          onChange?.(next);
          btn.setAttribute("aria-pressed", String(next));
        },
      },
      h("span", { class: "mdos-qs-tile-btn", svg: svg(icon) }),
      h("span", { class: "mdos-qs-tile-label", text: label }),
    );
    return btn;
  };
  const tiles = [
    { key: "themeSync", label: L.themeSync, icon: "brush", onChange: (on) => on && updateSetting("accent", "theme") },
    { key: "dockAutohide", label: L.autohide, icon: "launchpad" },
    { key: "realGlass", label: L.realGlass, icon: "wallpaper" },
    isDesktop() ? { label: L.focusSession, icon: "star", run: () => (closeCC(), setFocusMode(true)) } : null,
    { label: L.editWidgets, icon: "widgets", run: () => setEditMode(true) },
    isDesktop() ? { label: L.tile, icon: "classic", run: tileWindows } : null,
  ].filter(Boolean);
  ccEl = h(
    "div",
    { id: "mdos-cc", role: "dialog", "aria-label": L.controlCenter },
    h("section", { class: "mdos-qs-tiles" }, ...tiles.map(tile)),
    card(L.accent, accentRow()),
    card(L.wallpaper, wallpaperSwatches()),
    card(
      null,
      h(
        "label",
        { class: "mdos-cc-slider" },
        h("span", { text: L.layoutMode }),
        settingSelect("layoutMode", Object.entries(L.layoutModes), () => renderWidgets()),
      ),
    ),
    h(
      "div",
      { class: "mdos-qs-foot" },
      h("span", { class: "mdos-qs-foot-name" }, h("span", { svg: LOGO }), h("span", { text: "Marinara" })),
      h(
        "span",
        { class: "mdos-qs-foot-actions" },
        h("button", { type: "button", class: "mdos-start-btn", "aria-label": L.openSettings, title: L.openSettings, svg: svg("settings"), onclick: () => { closeCC(); openApp("customize"); } }),
        h("button", { type: "button", class: "mdos-start-btn", "aria-label": L.classic, title: L.classic, svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M12 3.5v8"/><path d="M7.2 6.6a7.5 7.5 0 1 0 9.6 0"/></svg>', onclick: () => setEnabled(false) }),
      ),
    ),
    isTouch() ? h("button", { type: "button", class: "mdos-cc-btn mdos-cc-done", text: L.done, onclick: () => closeCC() }) : null,
  );
  ui.append(ccEl);
  raf(() => ccEl?.classList.add("is-open"));
}
function closeCC() {
  if (!ccEl) return;
  ccEl.remove();
  ccEl = null;
}

// ── Customize window (all settings) ───────────────────────────

const SET_SECTIONS = [
  ["appearance", () => L.appearance, "brush", "#ff7ab0", "#b25cff"],
  ["wallpaper", () => L.wallpaper, "wallpaper", "#7ad7ff", "#2f7cf2"],
  ["home", () => L.homeLayout, "widgets", "#ffd36b", "#ff8a3d"],
  ["chat", () => L.chatDesign, "chat", "#6ef08d", "#17a84d"],
  ["dock", () => L.dock, "launchpad", "#9aa6bb", "#4f5a70"],
  ["youtube", () => "YouTube", "play", "#ff6b6b", "#d91c1c"],
  ["performance", () => L.performance, "sliders", "#8e9cff", "#4b5ae0"],
  ["about", () => L.aboutShort, "info", "#c9ced8", "#868d9b"],
];
function openSettings(section) {
  openApp("customize", { section });
}
function mountCustomize(win) {
  const nav = h("nav", { class: "mdos-set-nav", "aria-label": L.settingsTitle });
  const pane = h("div", { class: "mdos-set-pane" });
  const group = (title, ...kids) => h("section", { class: "mdos-set-group" }, title ? h("h3", { text: title }) : null, ...kids);
  const row = (label, control) => h("div", { class: "mdos-set-row" }, h("span", { text: label }), control);
  const hint = (text) => h("p", { class: "mdos-set-hint", text });
  const btn = (text, onclick, primary) => h("button", { type: "button", class: `mdos-btn${primary ? " mdos-btn--primary" : ""}`, text, onclick });
  const show = (id) => {
    win.rec.section = id;
    save();
    for (const b of nav.children) b.setAttribute("aria-current", String(b.dataset.section === id));
    pane.replaceChildren(...(SECTION_BUILDERS[id] || SECTION_BUILDERS.appearance)());
    pane.scrollTop = 0;
  };
  const SECTION_BUILDERS = {
    appearance: () => {
      const status = h("p", { class: "mdos-set-hint" });
      fetch("/api/themes", { credentials: "same-origin" })
        .then((r) => (r.ok ? r.json() : []))
        .then((list) => {
          const active = Array.isArray(list) ? list.find((t) => t.isActive) : null;
          const applied = doc.getElementById("marinara-custom-theme");
          status.textContent = `${L.themeNow}: ${applied && active ? active.name : L.themeNone}`;
        })
        .catch(() => (status.textContent = ""));
      return [
        group(
          null,
          settingToggle("themeSync", L.themeSync, (on) => {
            if (on) updateSetting("accent", "theme");
            show("appearance");
          }),
          status,
          hint(L.themeSyncHint),
        ),
        group(L.accent, accentRow()),
        group(
          L.customize,
          row(L.iconStyle, settingSelect("iconStyle", Object.entries(L.iconStyles))),
          row(L.iconShape, settingSelect("iconShape", Object.entries(L.iconShapes))),
          settingToggle("iconView", L.iconView),
          h("div", { class: "mdos-row" }, btn(L.editIcons, () => openIconPicker())),
        ),
        group(
          L.cursor,
          row(L.cursor, settingSelect("cursor", Object.entries(L.cursors), () => show("appearance"))),
          !["system", "custom"].includes(state.cursor) ? row(L.cursorSize, settingSelect("cursorSize", Object.entries(L.cursorSizes))) : null,
          state.cursor === "custom"
            ? h(
                "div",
                { class: "mdos-row" },
                btn(L.cursorImage, () =>
                  pickCursorImage((data) => {
                    if (storeImage(() => (images.cursor = data))) applyCursor();
                  }),
                ),
              )
            : null,
          hint(L.cursorHint),
        ),
      ];
    },
    wallpaper: () => [group(L.wallpaper, wallpaperSwatches(), ...wallpaperImageControls())],
    home: () => [
      group(
        L.layoutMode,
        segmented(Object.entries(L.layoutModes), state.layoutMode, (v) => {
          updateSetting("layoutMode", v);
          renderWidgets();
        }),
      ),
      group(
        L.homeLayout,
        row(L.boardPos, segmented(Object.entries(L.boardPositions), state.board, (v) => updateSetting("board", v))),
        settingToggle("showCredits", L.showCredits),
        settingToggle("showFeed", L.showFeed),
        h(
          "div",
          { class: "mdos-row" },
          btn(L.arrangeIcons, () => {
            for (const d of state.desk) d.x = d.y = null;
            save();
            renderWidgets();
          }),
          btn(L.arrangeWidgets, () => {
            for (const w of state.widgets) w.x = w.y = null, (w.manual = false);
            save();
            renderWidgets();
          }),
        ),
      ),
      group(
        L.editWidgets,
        h(
          "div",
          { class: "mdos-row" },
          btn(L.editWidgets, () => setEditMode(true), true),
          btn(`${L.addApps}…`, (e) => openAddApps(e.currentTarget)),
          btn(`${L.addBookmark}…`, (e) => openBookmarkForm(e.currentTarget)),
        ),
      ),
    ],
    chat: () => [
      ...chatDesignSection(win, { group, row, hint, btn, rerender: () => show("chat") }),
      group(L.chatTools, settingToggle("sceneBarTop", L.sceneBarTop, () => syncSoon()), settingToggle("quickPalette", L.quickPaletteOn, () => syncSoon()), hint(L.chatToolsHint)),
    ],
    dock: () => [
      group(
        L.dock,
        row(
          L.dockSize,
          h("input", {
            type: "range",
            min: "40",
            max: "80",
            step: "2",
            value: String(state.dockSize),
            "aria-label": L.dockSize,
            oninput: (e) => updateSetting("dockSize", Number(e.target.value)),
          }),
        ),
        settingToggle("dockAutohide", L.autohide),
        settingToggle("magnify", L.magnify),
        settingToggle("dockRecents", L.recents),
      ),
    ],
    youtube: () => {
      const key = h("input", {
        type: "password",
        class: "mdos-input",
        placeholder: L.ytApiKey,
        autocomplete: "off",
        value: state.yt.apiKey || "",
        oninput: (e) => setYtKey(e.target.value),
        onchange: (e) => setYtKey(e.target.value),
      });
      return [
        group(
          L.ytMode,
          segmented(Object.entries(L.ytModes), state.yt.mode, (v) => {
            state.yt.mode = v;
            save();
            for (const w of appWins.values()) if (w.rec.type === "youtube") w.refresh?.(true);
            show("youtube");
          }),
          field(L.ytApiKey, key),
          hint(L.ytApiHint),
          state.yt.mode === "account" ? hint(L.ytAccountHint) : null,
          state.yt.mode === "account"
            ? h(
                "div",
                { class: "mdos-row" },
                btn(L.ytLogin, () => openExternal("https://accounts.google.com/ServiceLogin?service=youtube&continue=https%3A%2F%2Fwww.youtube.com%2F"), true),
                btn(L.ytOpenSite, () => openExternal("https://www.youtube.com/")),
              )
            : null,
        ),
      ];
    },
    performance: () => [
      group(
        L.performance,
        settingToggle("realGlass", L.realGlass),
        settingToggle("reduceTransparency", L.reduceTransparency),
        settingToggle("reduceMotion", L.reduceMotion),
        settingToggle("bootSplash", L.bootSplash),
      ),
    ],
    about: () => [
      group(
        "Marinara Desktop 2.2.0",
        hint(L.aboutBody),
        h("dl", { class: "mdos-about-keys" }, ...L.shortcutList.flatMap(([k, v]) => [h("dt", { text: k }), h("dd", { text: v })])),
        h("div", { class: "mdos-row" }, btn(L.classic, () => setEnabled(false)), isDesktop() ? btn(L.resetLayout, resetLayout) : null),
      ),
    ],
  };
  for (const [id, label, icon, g1, g2] of SET_SECTIONS) {
    nav.append(
      h(
        "button",
        { type: "button", class: "mdos-set-nav-item", "data-section": id, onclick: () => show(id) },
        appIcon({ id: `set:${id}`, icon, g: [g1, g2] }),
        h("span", { text: label() }),
      ),
    );
  }
  win.body.append(h("div", { class: "mdos-set" }, nav, pane));
  win.refresh = () => {
    if (win.rec.section && nav.querySelector(`[aria-current="true"]`)?.dataset.section !== win.rec.section) show(win.rec.section);
  };
  win.openSection = show;
  show(win.rec.section || "appearance");
}

// Chat design: presets, controls and a live preview; changes also apply to
// the real chat behind the window as you make them.
function chatDesignSection(win, { group, row, hint, btn, rerender }) {
  const target = win.rec.chatTarget || "convo";
  const spec = state.chat[target];
  const commit = (patch, redraw = false) => {
    Object.assign(spec, patch);
    for (const k of Object.keys(spec)) if (spec[k] === "" || spec[k] == null) delete spec[k];
    save();
    applyChatStyle();
    if (redraw) rerender();
  };
  const toHex = (value, fallback) => {
    const c = toColor(value) || toColor(fallback) || "rgb(0, 0, 0)";
    const m = c.match(/[\d.]+/g) || [0, 0, 0];
    return `#${m.slice(0, 3).map((v) => Number(v).toString(16).padStart(2, "0")).join("")}`;
  };
  const color = (key, fallback) =>
    h("input", { type: "color", class: "mdos-color", value: toHex(spec[key], fallback), oninput: (e) => commit({ [key]: e.target.value }) });
  const range = (key, min, max, step, fallback, unit = "") => {
    const out = h("output", { text: `${spec[key] ?? fallback}${unit}` });
    return h(
      "div",
      { class: "mdos-set-range" },
      h("input", {
        type: "range",
        min: String(min),
        max: String(max),
        step: String(step),
        value: String(spec[key] ?? fallback),
        oninput: (e) => {
          out.textContent = `${e.target.value}${unit}`;
          commit({ [key]: Number(e.target.value) });
        },
      }),
      out,
    );
  };
  const fontPicker = () => {
    const sel = h("select", {
      class: "mdos-cc-select",
      onchange: (e) => commit({ font: e.target.value }, true),
    });
    for (const [v, label] of Object.entries(L.fonts)) sel.append(h("option", { value: v, text: label, selected: (spec.font || "") === v }));
    const custom = h("input", {
      type: "text",
      class: "mdos-input",
      placeholder: L.customFont,
      value: spec.customFont || "",
      onchange: (e) => commit({ customFont: e.target.value.trim() }),
    });
    return [row(L.font, sel), spec.font === "custom" ? custom : null];
  };
  const preview = h(
    "div",
    { class: `mdos-cv-preview mdos-cv-preview--${target}`, "aria-label": L.preview },
    target === "convo"
      ? [
          h("div", { class: "mdos-pv-row mdos-pv-them" }, h("span", { class: "mdos-pv-avatar" }), h("div", { class: "mdos-pv-col" }, h("small", { class: "mdos-pv-name", text: "Mari" }), h("p", { class: "mdos-pv-bubble", text: L.pvThem }), h("p", { class: "mdos-pv-bubble", text: L.pvThem2 }))),
          h("div", { class: "mdos-pv-row mdos-pv-me" }, h("p", { class: "mdos-pv-bubble", text: L.pvMe })),
        ]
      : [
          h("small", { class: "mdos-pv-name", text: "MARI" }),
          h("p", { class: "mdos-pv-rp" }, L.pvRpNar, h("em", { text: L.pvRpAct }), " ", h("span", { class: "mdos-pv-dlg", text: L.pvRpDlg })),
        ],
  );
  const out = [
    group(
      null,
      segmented(
        [
          ["convo", L.convo],
          ["rp", L.roleplay],
        ],
        target,
        (v) => {
          win.rec.chatTarget = v;
          save();
          rerender();
        },
      ),
      preview,
    ),
  ];
  if (target === "convo") {
    out.push(
      group(
        L.presets,
        h(
          "div",
          { class: "mdos-row" },
          ...Object.entries(L.cvPresets).map(([id, label]) =>
            btn(label, () => {
              state.chat.convo = { ...CV_PRESETS[id] };
              save();
              applyChatStyle();
              rerender();
            }),
          ),
        ),
        row(L.convoStyle, settingSelect("convoStyle", [["messages", L.convoMessages], ["marinara", L.convoMarinara]])),
      ),
      group(
        L.font,
        ...fontPicker(),
        row(L.textSize, range("size", 12, 22, 1, 15, "px")),
        row(L.corner, range("radius", 2, 26, 1, 18, "px")),
        row(L.columnWidth, range("width", 520, 1200, 20, 860, "px")),
      ),
      group(
        L.myBubble,
        row(L.myBubble, color("me", "var(--mdos-accent)")),
        row(L.bubbleText, color("meFg", "#ffffff")),
        row(L.theirBubble, color("them", "var(--mdos-bubble-other)")),
        row(L.bubbleText, color("themFg", "var(--mdos-bubble-other-fg)")),
      ),
      group(
        L.chatBg,
        segmented(Object.entries(L.chatBgModes), spec.bgMode || "", (v) => commit({ bgMode: v }, true)),
        spec.bgMode === "color" ? row(L.chatBg, color("bg", "var(--mdos-win-bg)")) : null,
        spec.bgMode === "image"
          ? btn(L.pickImage, () =>
              pickImage(
                (data) => {
                  if (storeImage(() => (images.chatBg = data))) applyChatStyle();
                },
                { maxSide: 1600, maxBytes: 260_000 },
              ),
            )
          : null,
        row(L.avatars, segmented(Object.entries(L.avatarModes), spec.avatars || "circle", (v) => commit({ avatars: v }))),
        h(
          "label",
          { class: "mdos-cc-toggle" },
          h("span", { text: L.showNames }),
          h("input", { type: "checkbox", role: "switch", checked: spec.names !== false, onchange: (e) => commit({ names: e.target.checked ? "" : false }) }),
        ),
      ),
    );
  } else {
    out.push(
      group(
        L.presets,
        h(
          "div",
          { class: "mdos-row" },
          ...Object.entries(L.rpPresets).map(([id, label]) =>
            btn(label, () => {
              const { style, ...rest } = RP_PRESETS[id];
              state.chat.rp = { ...rest };
              updateSetting("rpStyle", style);
              applyChatStyle();
              rerender();
            }),
          ),
        ),
        row(L.rpStyle, settingSelect("rpStyle", [["book", L.rpBook], ["night", L.rpNight], ["clean", L.rpClean]], () => rerender())),
      ),
      group(
        L.font,
        ...fontPicker(),
        row(L.textSize, range("size", 13, 24, 1, 16, "px")),
        row(L.lineHeight, range("line", 1.3, 2.4, 0.05, 1.8)),
        row(L.columnWidth, range("width", 480, 1000, 20, 640, "px")),
        row(L.sideMargin, range("gutter", 0, 48, 2, 14, "px")),
        hint(L.sideMarginHint),
        row(
          L.lineWrap,
          segmented(
            [
              ["", L.wrapChars],
              ["words", L.wrapWords],
            ],
            spec.wrap || "",
            (v) => commit({ wrap: v }),
          ),
        ),
        hint(L.lineWrapHint),
      ),
      group(
        L.readerLayout,
        ...[
          ["justify", L.justify, !!spec.justify, (on) => ({ justify: on || "" })],
          ["actItalic", L.actItalic, !spec.actUpright, (on) => ({ actUpright: on ? "" : true })],
          ["actions", L.actionsHover, !spec.actionsAlways, (on) => ({ actionsAlways: on ? "" : true })],
          ["weather", L.weather, !spec.weatherOff, (on) => ({ weatherOff: on ? "" : true })],
        ].map(([key, label, checked, patch]) =>
          h(
            "label",
            { class: "mdos-cc-toggle", "data-key": key },
            h("span", { text: label }),
            h("input", { type: "checkbox", role: "switch", checked, onchange: (e) => commit(patch(e.target.checked)) }),
          ),
        ),
      ),
      group(L.paper, row(L.paper, color("paper", "var(--mdos-paper)")), row(L.ink, color("ink", "var(--mdos-ink)"))),
      group(
        L.textTone,
        h(
          "label",
          { class: "mdos-cc-toggle" },
          h("span", { text: L.textTone }),
          h("input", {
            type: "checkbox",
            role: "switch",
            checked: !!state.rpTone,
            onchange: (e) => {
              updateSetting("rpTone", e.target.checked);
              rerender();
            },
          }),
        ),
        hint(L.textToneHint),
        state.rpTone ? row(L.dlgColor, color("dlg", "var(--mdos-rp-dlg-c)")) : null,
        state.rpTone ? row(L.narColor, color("nar", "var(--mdos-rp-nar-c)")) : null,
        state.rpTone ? row(L.actColor, color("act", "var(--mdos-rp-act-c)")) : null,
      ),
    );
  }
  out.push(
    h(
      "div",
      { class: "mdos-row" },
      btn(L.resetChat, () => {
        state.chat[target] = {};
        if (target === "convo" && images.chatBg) {
          images.chatBg = "";
          saveImages();
        }
        save();
        applyChatStyle();
        rerender();
      }),
    ),
  );
  return out;
}

// ── About / shortcuts ─────────────────────────────────────────

let aboutEl = null;
function showAbout() {
  closeMenu();
  closeLaunchpad();
  if (aboutEl) return;
  aboutEl = h(
    "div",
    {
      id: "mdos-about",
      role: "dialog",
      "aria-modal": "true",
      "aria-label": L.about,
      onclick: (event) => {
        if (event.target === aboutEl) closeAbout();
      },
    },
    h(
      "div",
      { class: "mdos-about-card" },
      h("div", { class: "mdos-about-logo", svg: LOGO }),
      h("h2", { text: "Marinara Desktop" }),
      h("p", { class: "mdos-about-version", text: "2.2.0" }),
      h("p", { text: L.aboutBody }),
      h(
        "dl",
        { class: "mdos-about-keys" },
        ...L.shortcutList.flatMap(([k, v]) => [h("dt", { text: k }), h("dd", { text: v })]),
      ),
      h("button", { type: "button", class: "mdos-cc-btn", text: L.close, onclick: () => closeAbout() }),
    ),
  );
  ui.append(aboutEl);
  aboutEl.querySelector("button")?.focus();
}
function closeAbout() {
  aboutEl?.remove();
  aboutEl = null;
}
function closeOverlays() {
  closeMenu();
  closeLaunchpad();
  closeCC();
  closeCal();
  closeSnapFly();
  closeAbout();
  closePop();
}

// ── Touch: springboard, Dock and home indicator ───────────────

let sbEl = null;
let sbWidgets = null;
let sbApps = null;
function renderSpringboardApps() {
  if (!sbApps) return;
  // In edit mode each icon gets − (take off the home screen) and ◀ ▶ (move).
  sbApps.replaceChildren(
    ...springboardApps().map((a, i) =>
      h(
        "div",
        { class: "mdos-sb-cell" },
        appTile(a, i, (picked) => {
          if (!editMode) launch(picked.id);
        }),
        h("button", {
          type: "button",
          class: "mdos-wg-badge mdos-wg-remove",
          "aria-label": L.removeFromHome,
          text: "−",
          onclick: () => hideFromHome(a.id),
        }),
        h(
          "div",
          { class: "mdos-sb-move" },
          h("button", { type: "button", "aria-label": "◀", text: "◀", onclick: () => moveSpringboardApp(a.id, -1) }),
          h("button", { type: "button", "aria-label": "▶", text: "▶", onclick: () => moveSpringboardApp(a.id, 1) }),
        ),
      ),
    ),
  );
}
function ensureSpringboard() {
  const page = $(SEL.homePage);
  const host = page?.querySelector(":scope > div.relative") || page?.lastElementChild;
  if (!isTouch() || !host) {
    if (sbEl && !sbEl.isConnected) sbEl = sbWidgets = sbApps = null;
    return;
  }
  if (sbEl && sbEl.parentNode === host) return;
  sbEl?.remove();
  sbWidgets = h("div", { class: "mdos-sb-widgets" });
  sbApps = h("div", { class: "mdos-sb-apps", role: "list" });
  sbEl = h("section", { id: "mdos-sb", "aria-label": L.home }, sbWidgets, sbApps);
  // Long-press empty space to edit widgets, like a phone home screen.
  let pressTimer = 0;
  sbEl.addEventListener("pointerdown", (event) => {
    if (editMode || event.target.closest("button, textarea, input")) return;
    pressTimer = marinara.setTimeout(() => setEditMode(true), 550);
  });
  for (const type of ["pointerup", "pointercancel", "pointerleave", "pointermove"]) {
    sbEl.addEventListener(type, () => marinara.clearTimeout(pressTimer));
  }
  host.prepend(sbEl);
  renderSpringboardApps();
  renderWidgets();
}
function removeSpringboard() {
  sbEl?.remove();
  sbEl = sbWidgets = sbApps = null;
}
const homebar = h("button", {
  type: "button",
  id: "mdos-homebar",
  "aria-label": L.homeIndicator,
  onclick: () => goHome(),
});
ui.append(homebar);
homebar.innerHTML = START_GLYPH;
// Phones: a Windows-style navigation bar along the bottom of the Start screen.
const navbar = h(
  "nav",
  { id: "mdos-navbar", "aria-label": L.launchpad },
  h("button", { type: "button", class: "mdos-nav-btn mdos-nav-start", "aria-label": L.launchpad, svg: START_GLYPH, onclick: () => toggleLaunchpad() }),
  h("button", { type: "button", class: "mdos-nav-btn", "aria-label": L.search, svg: svg("search"), onclick: () => openSpotlight() }),
  h("button", { type: "button", class: "mdos-nav-btn", "aria-label": L.controlCenter, "data-mdos-cc-toggle": "", svg: svg("sliders"), onclick: () => toggleCC() }),
);
ui.append(navbar);
// Swipe up on the home indicator also goes home.
let swipeStart = null;
on(homebar, "pointerdown", (e) => (swipeStart = e.clientY));
on(homebar, "pointerup", (e) => {
  if (swipeStart != null && swipeStart - e.clientY > 24) goHome();
  swipeStart = null;
});

// Long how-to lines under library toolbars ("drag characters into folders…")
// collapse into an ⓘ icon; the text shows as a tooltip (desktop.css).
function compactHelpers() {
  for (const el of $$(".mari-folder-helper:not([data-mdos-tip])")) {
    const text = el.textContent.trim();
    if (!text) continue;
    el.setAttribute("data-mdos-tip", text);
    el.setAttribute("tabindex", "0");
    el.setAttribute("role", "note");
    el.setAttribute("aria-label", `${L.help}: ${text}`);
    // Tagged here instead of a CSS :has() rule, which the browser would
    // re-check on every DOM change anywhere on the page.
    el.parentElement?.setAttribute("data-mdos-tip-row", "");
  }
  // Chat-mode tabs (Conversation / Roleplay / Game) show only their icons;
  // the label stays as the tooltip and accessible name.
  for (const b of $$(".mari-chat-sidebar [data-chat-mode-tab]:not([data-mdos-icon-tab])")) {
    const label = b.textContent.trim();
    b.setAttribute("data-mdos-icon-tab", "");
    if (!b.title) {
      b.title = label;
      b.setAttribute("data-mdos-set-title", "");
    }
    if (!b.hasAttribute("aria-label")) b.setAttribute("aria-label", label);
  }
}

// ── Settings, wallpaper, clock ────────────────────────────────

function updateSetting(key, value) {
  state[key] = value;
  applySettings();
  save();
}
// ── Theme library sync ────────────────────────────────────────
//
// Marinara injects the theme applied in Settings → Appearance → Theme library
// as <style id="marinara-custom-theme">. We read its root-level variables,
// resolve them to real colours and feed them to our design: accent, window
// surfaces, text, font, and the "theme" wallpaper. Our own token overrides
// on <html> don't affect this, because we read the theme's CSS text itself.

let themePalette = {};
let themeCssSeen = null;
const colorProbe = h("span", { style: "display:none" });
ui.append(colorProbe);
function toColor(value) {
  if (!value) return null;
  colorProbe.style.color = "";
  colorProbe.style.color = value;
  if (!colorProbe.style.color) return null;
  const out = getComputedStyle(colorProbe).color;
  return out && out !== "rgba(0, 0, 0, 0)" ? out : null;
}
const luminance = (rgb) => {
  const m = (rgb || "").match(/[\d.]+/g);
  if (!m) return 0.5;
  const [r, g, b] = m.slice(0, 3).map((v) => {
    const c = Number(v) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
function readThemeVars(cssText) {
  const vars = {};
  let font = null;
  const sheet = new CSSStyleSheet();
  try {
    sheet.replaceSync(cssText.replace(/@import[^;]+;/g, ""));
  } catch {
    return { vars, font };
  }
  const dark = html.dataset.theme !== "light";
  const rootish = /^(:root|html|body|\[data-theme(=["']?(light|dark)["']?)?\]|:root\[data-theme(=["']?(light|dark)["']?)?\]|html\[data-theme(=["']?(light|dark)["']?)?\])$/i;
  const visit = (rules) => {
    for (const rule of rules) {
      if (rule.cssRules && !rule.selectorText) {
        visit(rule.cssRules); // @media / @supports blocks
        continue;
      }
      if (!rule.selectorText || !rule.style) continue;
      const parts = rule.selectorText.split(",").map((s) => s.trim());
      const applies = parts.some((p) => {
        if (!rootish.test(p)) return false;
        if (/light/i.test(p)) return !dark;
        if (/dark/i.test(p)) return dark;
        return true;
      });
      if (!applies) continue;
      for (const name of rule.style) {
        if (name.startsWith("--")) vars[name] = rule.style.getPropertyValue(name).trim();
        else if (name === "font-family") font = rule.style.getPropertyValue(name).trim();
      }
    }
  };
  visit(sheet.cssRules);
  return { vars, font };
}
function resolveVars(value, vars, depth = 0) {
  if (!value || depth > 6) return value;
  return value.replace(/var\(\s*(--[\w-]+)\s*(?:,\s*([^()]*(?:\([^()]*\)[^()]*)*))?\)/g, (_, name, fallback) =>
    vars[name] != null ? resolveVars(vars[name], vars, depth + 1) : fallback != null ? resolveVars(fallback.trim(), vars, depth + 1) : "",
  );
}
function computeThemePalette() {
  const style = doc.getElementById("marinara-custom-theme");
  const cssText = style?.textContent || "";
  const palette = {};
  if (cssText) {
    const { vars, font } = readThemeVars(cssText);
    const pick = (...names) => {
      for (const n of names) {
        const c = toColor(resolveVars(vars[n], vars));
        if (c) return c;
      }
      return null;
    };
    palette.accent = pick("--marinara-app-accent-solid", "--marinara-app-accent-static", "--primary", "--marinara-chat-chrome-accent");
    palette.bg = pick("--background");
    palette.card = pick("--card", "--popover");
    palette.fg = pick("--foreground", "--card-foreground");
    palette.muted = pick("--muted-foreground");
    palette.sidebar = pick("--sidebar", "--card");
    // Decor: a background picture or gradient the theme paints behind the app.
    const paint = resolveVars(vars["--marinara-app-background-paint"] || "", vars);
    if (/url\(|gradient\(/i.test(paint)) palette.decor = paint;
    if (font) palette.font = resolveVars(font, vars).replace(/!important/g, "").trim() || null;
    palette.name = style.dataset.themeName || null;
  }
  // No custom theme (or it sets no accent): Marinara's own accent setting.
  palette.accent ||= toColor(html.style.getPropertyValue("--marinara-app-accent-static").trim()) || null;
  return palette;
}
function themeWallpaperCss() {
  const p = themePalette;
  if (p.decor) return p.decor;
  const accent = p.accent || "#0a84ff";
  const bg = p.bg || "#2b1242";
  const light = luminance(bg) > 0.5;
  return light
    ? `radial-gradient(100% 80% at 15% 10%, color-mix(in srgb, ${accent} 35%, white) 0%, transparent 60%), radial-gradient(90% 80% at 88% 22%, color-mix(in srgb, ${accent} 55%, white) 0%, transparent 62%), linear-gradient(180deg, ${bg}, color-mix(in srgb, ${bg} 85%, ${accent}))`
    : `radial-gradient(100% 80% at 15% 10%, color-mix(in srgb, ${accent} 70%, white) 0%, transparent 55%), radial-gradient(90% 80% at 88% 22%, ${accent} 0%, transparent 60%), linear-gradient(170deg, color-mix(in srgb, ${bg} 70%, ${accent}), ${bg})`;
}
const SYNC_VARS = ["--mdos-win-bg", "--mdos-card", "--mdos-fg", "--mdos-fg-2", "--mdos-panel-bg", "--mdos-sidebar-vib", "--mdos-ui-font"];
function applyThemeSync() {
  themePalette = computeThemePalette();
  const p = themePalette;
  const on = state.themeSync;
  const set = (name, value) => (on && value ? setVar(name, value) : html.style.removeProperty(name));
  // Surfaces follow the theme only when it defines them; text stays readable.
  set("--mdos-win-bg", p.bg);
  set("--mdos-card", p.card);
  set("--mdos-fg", p.bg && p.fg ? p.fg : null);
  set("--mdos-fg-2", p.bg && p.muted ? p.muted : null);
  set("--mdos-panel-bg", p.sidebar || p.bg);
  set("--mdos-sidebar-vib", p.sidebar ? `color-mix(in srgb, ${p.sidebar} 80%, transparent)` : null);
  set("--mdos-ui-font", p.font ? `${p.font}, -apple-system, "Segoe UI", Pretendard, "Malgun Gothic", system-ui, sans-serif` : null);
  toggleClass("mdos-theme-sync", on);
}
function refreshTheme() {
  const css = doc.getElementById("marinara-custom-theme")?.textContent || "";
  const key = `${css.length}:${css.slice(0, 200)}:${html.dataset.theme}:${html.style.getPropertyValue("--marinara-app-accent-static")}`;
  if (key === themeCssSeen) return;
  themeCssSeen = key;
  applyThemeSync();
  applyAccent();
  applyWallpaper();
  applyChatStyle();
}
// Theme switches replace the <style> in <head>; light/dark flips data-theme.
const themeObserver = new MutationObserver(() => refreshTheme());
themeObserver.observe(doc.head, { childList: true, subtree: true, characterData: true });
themeObserver.observe(html, { attributes: true, attributeFilter: ["data-theme"] });

function applyAccent() {
  const accent = ACCENTS.find((a) => a.id === state.accent) || ACCENTS[0];
  const color = accent.theme ? themePalette.accent || "#0a84ff" : accent.color;
  toggleClass("mdos-accent", !!color);
  setVar("--mdos-accent", color || "var(--primary)");
  cursorAccent = color || "#0a84ff";
  applyCursor();
}
// ── Mouse pointer ─────────────────────────────────────────────
// Drawn as small SVGs (or the user's own PNG) and set on <html>, so every
// element that doesn't ask for its own cursor (resize edges, grab handles,
// text fields) shows it. Links and buttons get --mdos-cur-ptr.
let cursorAccent = "#0a84ff";
const CURSOR_PX = { m: 24, l: 34, xl: 48 };
const ARROW_PATH = "M5 2.5v17.2l4.3-4.1 2.7 6.2 2.8-1.2-2.7-6.1h6z";
function cursorCss(svg, px, hx, hy, fallback) {
  const url = `data:image/svg+xml,${encodeURIComponent(svg.replace(/SIZE/g, px))}`;
  return `url("${url}") ${Math.round(hx * px / 24)} ${Math.round(hy * px / 24)}, ${fallback}`;
}
function arrowSvg(fill, stroke) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="SIZE" height="SIZE" viewBox="0 0 24 24"><path d="${ARROW_PATH}" fill="${fill}" stroke="${stroke}" stroke-width="1.4" stroke-linejoin="round"/></svg>`;
}
function dotSvg(fill, r) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="SIZE" height="SIZE" viewBox="0 0 24 24"><circle cx="12" cy="12" r="${r}" fill="${fill}" stroke="#fff" stroke-opacity="0.9" stroke-width="1.2"/></svg>`;
}
function applyCursor() {
  const kind = state.cursor || "system";
  const px = CURSOR_PX[state.cursorSize] || 24;
  const accent = /^#[0-9a-f]{3,8}$|^rgb/i.test(cursorAccent) ? cursorAccent : "#0a84ff";
  let cur = "";
  let ptr = "pointer";
  if (kind === "mac") cur = cursorCss(arrowSvg("#000", "#fff"), px, 5, 2.5, "default");
  else if (kind === "white") cur = cursorCss(arrowSvg("#fff", "#000"), px, 5, 2.5, "default");
  else if (kind === "accent") cur = ptr = cursorCss(arrowSvg(accent, "#fff"), px, 5, 2.5, "default");
  else if (kind === "dot") {
    cur = cursorCss(dotSvg("rgba(60,60,67,0.5)", 7), px, 12, 12, "default");
    ptr = cursorCss(dotSvg(accent, 9), px, 12, 12, "pointer");
  } else if (kind === "custom" && images.cursor) cur = ptr = `url(${JSON.stringify(images.cursor)}) 0 0, default`;
  toggleClass("mdos-cursor", !!cur && mode !== "off");
  if (cur) {
    setVar("--mdos-cur", cur);
    setVar("--mdos-cur-ptr", ptr);
  } else {
    html.style.removeProperty("--mdos-cur");
    html.style.removeProperty("--mdos-cur-ptr");
  }
}
// The user's own pointer: a PNG (keeps transparency) no larger than 64 px.
function pickCursorImage(onPicked) {
  const input = h("input", { type: "file", accept: "image/*", hidden: true });
  input.addEventListener("change", async () => {
    const file = input.files?.[0];
    input.remove();
    if (!file) return;
    try {
      const bitmap = await createImageBitmap(file);
      const scale = Math.min(1, 64 / Math.max(bitmap.width, bitmap.height));
      const canvas = doc.createElement("canvas");
      canvas.width = Math.max(1, Math.round(bitmap.width * scale));
      canvas.height = Math.max(1, Math.round(bitmap.height * scale));
      canvas.getContext("2d").drawImage(bitmap, 0, 0, canvas.width, canvas.height);
      bitmap.close?.();
      onPicked(canvas.toDataURL("image/png"));
    } catch (error) {
      marinara.log.warn("Pointer image failed", error);
      window.alert(L.tooLarge);
    }
  });
  doc.body.append(input);
  input.click();
}
function applyWallpaper() {
  const image = images.wallpaper;
  const wp = WALLPAPERS.find((w) => w.id === state.wallpaper) || WALLPAPERS[0];
  const css = image ? `center / cover no-repeat url(${JSON.stringify(image)}), #111` : wp.id === "theme" ? themeWallpaperCss() : wp.css;
  setVar("--mdos-wallpaper", css);
  const tone = image ? "dark" : wp.id === "theme" ? (luminance(themePalette.bg) > 0.5 && !themePalette.decor ? "light" : "dark") : wp.dark === false ? "light" : "dark";
  html.dataset.mdosWallpaperTone = tone;
}

// ── Chat design ───────────────────────────────────────────────

const FONT_STACKS = {
  system: "var(--mdos-ui-font)",
  serif: '"Iowan Old Style", "Palatino Linotype", Georgia, "Nanum Myeongjo", "Noto Serif KR", Batang, serif',
  rounded: '"SF Pro Rounded", Nunito, "NanumSquareRound", Jua, "Arial Rounded MT Bold", var(--mdos-ui-font)',
  hand: '"Nanum Pen Script", Gaegu, "Segoe Print", "Comic Sans MS", cursive',
  mono: 'ui-monospace, "SF Mono", D2Coding, Consolas, monospace',
};
const fontStack = (spec) => {
  if (!spec?.font) return null;
  if (spec.font === "theme") return themePalette.font || null;
  if (spec.font === "custom") return spec.customFont ? `${JSON.stringify(spec.customFont.replace(/["\\]/g, ""))}, var(--mdos-ui-font)` : null;
  return FONT_STACKS[spec.font] || null;
};
const CV_PRESETS = {
  base: {},
  yellow: { me: "#fee500", meFg: "#191919", them: "#ffffff", themFg: "#191919", bgMode: "color", bg: "#b2c7da", radius: 16 },
  green: { me: "#06c755", meFg: "#ffffff", them: "#ffffff", themFg: "#1d1d1f", bgMode: "color", bg: "#8fb3dd", radius: 20 },
  dark: { me: "", them: "#2c2c2e", themFg: "#f5f5f7", bgMode: "color", bg: "#000000" },
  pastel: { me: "#ffc8dd", meFg: "#5a2a3a", them: "#e2f0cb", themFg: "#2f4a1f", bgMode: "color", bg: "#fff7fb", radius: 22, font: "rounded" },
};
const RP_PRESETS = {
  book: { style: "book" },
  parchment: { style: "book", paper: "#efe0bf", ink: "#3b2a14", font: "serif", justify: true },
  night: { style: "night" },
  typewriter: { style: "book", paper: "#f6f5ef", ink: "#222222", font: "mono", size: 15, line: 1.7 },
  novel: { style: "book", paper: "#ffffff", ink: "#3a3a3c" },
};
// Fonts uploaded in Marinara (Settings → fonts) are registered through the
// FontFace API a moment after start-up, when the chat text is already laid
// out, and the browser doesn't always go back and use them: the chat font
// looked unset until it was typed in again. When the set of registered fonts
// changes, the font stack switches to an equivalent spelling, which makes the
// text pick the new faces up.
let fontBump = false;
let fontCount = doc.fonts?.size ?? 0;
const fontsFrom = performance.now();
let fontsAt = -1e9;
function refreshChatFonts() {
  const now = performance.now();
  if (now - fontsFrom > 60_000 && now - fontsAt < 5000) return;
  fontsAt = now;
  const n = doc.fonts?.size ?? 0;
  if (n === fontCount) return;
  fontCount = n;
  if (!state.chat.rp.font && !state.chat.convo.font) return;
  fontBump = !fontBump;
  applyChatStyle();
}
function applyChatStyle() {
  const cv = state.chat.convo;
  const rp = state.chat.rp;
  const v = (name, value) => (value ? setVar(name, value) : html.style.removeProperty(name));
  // fontBump flips an equivalent spelling of the stack (see refreshChatFonts).
  const bumped = (stack) => (stack && fontBump ? `${stack}, sans-serif` : stack);
  v("--mdos-cv-font", bumped(fontStack(cv)));
  v("--mdos-cv-size", cv.size ? `${cv.size}px` : null);
  v("--mdos-cv-me", cv.me);
  v("--mdos-cv-me-fg", cv.meFg);
  v("--mdos-cv-them", cv.them);
  v("--mdos-cv-them-fg", cv.themFg);
  v("--mdos-cv-radius", cv.radius != null && cv.radius !== "" ? `${cv.radius}px` : null);
  v("--mdos-cv-width", cv.width ? `${cv.width}px` : null);
  v("--mdos-cv-bg", cv.bgMode === "color" ? cv.bg : cv.bgMode === "image" && images.chatBg ? `center / cover no-repeat url(${JSON.stringify(images.chatBg)})` : null);
  html.dataset.mdosCvBg = cv.bgMode || "";
  html.dataset.mdosCvAvatar = cv.avatars || "circle";
  toggleClass("mdos-cv-no-names", cv.names === false);
  v("--mdos-rp-font", bumped(fontStack(rp)));
  v("--mdos-rp-size", rp.size ? `${rp.size}px` : null);
  v("--mdos-rp-line", rp.line ? String(rp.line) : null);
  v("--mdos-rp-paper", rp.paper);
  v("--mdos-rp-ink", rp.ink);
  v("--mdos-rp-width", rp.width ? `${rp.width}px` : null);
  v("--mdos-rp-dlg", rp.dlg);
  v("--mdos-rp-nar", rp.nar);
  v("--mdos-rp-act", rp.act);
  html.dataset.mdosRpJustify = rp.justify ? "on" : "";
  html.dataset.mdosRpWrap = rp.wrap === "words" ? "words" : "";
  v("--mdos-rp-gutter", rp.gutter != null && rp.gutter !== "" ? `${rp.gutter}px` : null);
  html.dataset.mdosRpActions = rp.actionsAlways ? "" : "hover";
  html.dataset.mdosRpActItalic = rp.actUpright ? "off" : "";
  html.dataset.mdosRpWeather = rp.weatherOff ? "off" : "";
  html.dataset.mdosRpTone = state.rpTone ? "on" : "";
  if (!state.rpTone) CSS.highlights?.delete("mdos-dlg");
  scanDialogue(true);
}

// ── Roleplay text tones ───────────────────────────────────────
// Dialogue in quotes is plain text in Marinara's roleplay messages, so it is
// coloured with the CSS Custom Highlight API: ranges over the existing text,
// no DOM changes (React keeps owning the message markup). Narration and
// *actions* (<em>) are coloured in apps.css.
const DLG_RE = /"[^"\n]{1,800}"|“[^”\n]{1,800}”|「[^」\n]{1,800}」|『[^』\n]{1,800}』/g;
const DLG_SKIP = 'code, pre, [class*="mrpc-"]';
const dlgCache = new WeakMap();
let dlgCount = -1;
let dlgScans = 0;
function dialogueRanges(el) {
  const nodes = [];
  let text = "";
  let lastBlock = null;
  const walker = doc.createTreeWalker(el, NodeFilter.SHOW_TEXT, {
    acceptNode: (n) => (n.parentElement?.closest(DLG_SKIP) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT),
  });
  for (let n = walker.nextNode(); n; n = walker.nextNode()) {
    // A paragraph break ends any open quote.
    const block = n.parentElement?.closest("p, li, blockquote, div, h1, h2, h3, h4");
    if (lastBlock && block !== lastBlock) text += "\n";
    lastBlock = block;
    nodes.push([n, text.length]);
    text += n.data;
  }
  const at = (pos, isEnd) => {
    let i = nodes.length - 1;
    while (i > 0 && (isEnd ? nodes[i][1] >= pos : nodes[i][1] > pos)) i--;
    return [nodes[i][0], pos - nodes[i][1]];
  };
  const ranges = [];
  for (const m of text.matchAll(DLG_RE)) {
    const r = new Range();
    r.setStart(...at(m.index, false));
    r.setEnd(...at(m.index + m[0].length, true));
    ranges.push(r);
  }
  return ranges;
}
function scanDialogue(force = false) {
  if (!state.rpTone || !CSS.highlights || typeof Highlight === "undefined" || mode === "off") return;
  const els = $$('[data-chat-mode="roleplay"] .mari-message-content');
  if (!els.length && !dlgCount) return;
  let changed = force || els.length !== dlgCount;
  // Finished messages don't change, so only the last two (the one streaming
  // in and the one before) are read each time; every tenth scan, or when the
  // message count changes, all of them are checked (an edit, a swipe).
  const full = changed || ++dlgScans % 10 === 0;
  const all = [];
  for (let i = 0; i < els.length; i++) {
    const el = els[i];
    let c = dlgCache.get(el);
    if (c && !full && i < els.length - 2 && (!c.ranges[0] || c.ranges[0].startContainer.isConnected)) {
      all.push(...c.ranges);
      continue;
    }
    const key = el.textContent;
    if (!c || c.key !== key || (c.ranges[0] && !c.ranges[0].startContainer.isConnected)) {
      c = { key, ranges: dialogueRanges(el) };
      dlgCache.set(el, c);
      changed = true;
    }
    all.push(...c.ranges);
  }
  dlgCount = els.length;
  if (changed) CSS.highlights.set("mdos-dlg", new Highlight(...all));
}
function applySettings() {
  applyThemeSync();
  applyAccent();
  applyWallpaper();
  applyChatStyle();
  html.dataset.mdosLayout = state.layoutMode;
  setVar("--mdos-dock-size", `${state.dockSize}px`);
  toggleClass("mdos-dock-autohide", !!state.dockAutohide);
  toggleClass("mdos-icon-view", !!state.iconView);
  toggleClass("mdos-main-min", !!state.mainMinimized);
  toggleClass("mdos-no-blur", !!state.reduceTransparency);
  toggleClass("mdos-real-glass", !!state.realGlass && !state.reduceTransparency);
  toggleClass("mdos-no-credits", !state.showCredits);
  toggleClass("mdos-no-feed", !state.showFeed);
  html.dataset.mdosBoard = state.board;
  toggleClass("mdos-calm", reducedMotion());
  html.dataset.mdosIconStyle = state.iconStyle;
  html.dataset.mdosIconShape = state.iconShape;
  applyCursor();
  html.dataset.mdosRp = state.rpStyle;
  html.dataset.mdosConvo = state.convoStyle;
  if (!state.dockAutohide) {
    dock.classList.remove("is-peek");
    menubar.classList.remove("is-peek");
  }
  dockSignature = "";
  if (mode !== "off") {
    renderDock();
    if (isDesktop()) applyAllRects();
  }
}

// Widgets show minutes at most, so they are rebuilt only when the minute
// turns, and not at all while the tab is hidden (caught up when it shows).
let tickMinute = "";
function tick() {
  if (doc.hidden) return;
  const now = new Date();
  // Two lines, like the Windows 11 tray: time over date.
  const clockText = `${timeFmt.format(now)}|${trayDateFmt.format(now)}`;
  if (mbClock.dataset.t !== clockText) {
    mbClock.dataset.t = clockText;
    mbClock.replaceChildren(h("span", { class: "mdos-mb-time", text: timeFmt.format(now) }), h("span", { class: "mdos-mb-date", text: trayDateFmt.format(now) }));
    mbClock.title = `${menubarDateFmt.format(now)} ${timeFmt.format(now)}`;
  }
  const minute = `${now.toDateString()} ${now.getHours()}:${now.getMinutes()}`;
  if (minute === tickMinute) return;
  tickMinute = minute;
  tickWidgets();
}
const clockTimer = marinara.setInterval(tick, 15_000);

// ── Activation ────────────────────────────────────────────────

const returnPill = h(
  "button",
  {
    type: "button",
    id: "mdos-return",
    title: `${L.desktop} (Ctrl Alt D)`,
    onclick: () => setEnabled(true),
  },
  h("span", { class: "mdos-return-icon", svg: LOGO }),
  h("span", { text: L.desktop }),
);
returnPill.setAttribute("data-exd", ""); // never tucked into a launcher drawer
doc.body.append(returnPill);

function refreshMode() {
  const next = computeMode();
  toggleClass("mdos-classic", !state.enabled && innerWidth >= MIN_VIEWPORT);
  toggleClass("mdos-tablet", next === "touch" && innerWidth >= 700);
  if (next === mode) return;
  const prev = mode;
  mode = next;
  toggleClass("mdos", next !== "off");
  applyCursor();
  if (next !== "desktop" && focusMode) setFocusMode(false);
  toggleClass("mdos-desktop", next === "desktop");
  toggleClass("mdos-touch", next === "touch");
  if (prev === "desktop") {
    removeChrome();
    setDesktopHome(false);
  }
  if (prev === "touch") removeSpringboard();
  closeOverlays();
  if (editMode) setEditMode(false);
  if (next === "desktop") {
    ensureChrome();
    applyAllRects();
  }
  dockSignature = "";
  if (next !== "off") {
    renderDock();
    renderWidgets();
    // Small-app windows come back where they were (their state is saved).
    renderAllApps();
    applyAllRects();
  } else {
    widgetLayer.replaceChildren();
    removeAllAppWins();
    appLayer.remove();
  }
}
function setEnabled(enabled) {
  if (EMBED) return;
  state.enabled = enabled;
  save();
  refreshMode();
  syncSoon();
}
// Leaving the home screen, the chat window takes its own size at once: the
// list joining it in the same moment must not animate it down from the
// full-screen desktop (it looked like the window grew, then shrank).
let homeChangedAt = -1e9;
function setDesktopHome(on) {
  if (desktopHome === on) return;
  desktopHome = on;
  homeChangedAt = performance.now();
  if (!on) html.classList.remove("mdos-animating");
  toggleClass("mdos-desktop-home", on);
  if (on) raf(fitBoard);
  if (on && state.mainMinimized) setMainMinimized(false);
  if (on) focusTopVisible();
  updateMenubar();
}

// ── Sync with Marinara's own state ────────────────────────────

const prevOpen = { chats: null, panel: null };
let lastPanel = null;
let syncTimer = 0;
let lastSync = 0;
let lastCreditScrape = -1e9;
// Set by cleanup: a queued sync must not re-attach chrome after disable.
let disposed = false;
// The main window's view (home, a chat, an editor) swaps two levels inside
// it. Syncing in the observer callback runs before the browser paints, so a
// chat opened from the desktop is never drawn at the desktop's full-screen
// size first (it used to wait for the next periodic sync, then shrink).
let viewBox = null;
const viewObserver = new MutationObserver(() => {
  if (!disposed) sync();
});
function watchViewBox() {
  const box = $once(SEL.main)?.querySelector(":scope > .mari-app-background-paint > .mari-app-background-paint") || null;
  if (box === viewBox) return;
  viewObserver.disconnect();
  viewBox = box;
  if (box) viewObserver.observe(box, { childList: true });
}
function syncSoon() {
  if (syncTimer || disposed) return;
  // At most ~10 syncs a second, even while a reply streams in.
  const wait = Math.max(0, 100 - (performance.now() - lastSync));
  syncTimer = marinara.setTimeout(() => {
    syncTimer = 0;
    raf(sync);
  }, wait);
}
function sync() {
  if (disposed) return;
  lastSync = performance.now();
  lookups = new Map();
  try {
    syncBody();
  } finally {
    lookups = null;
  }
}
function syncBody() {
  refreshMode();
  if (mode === "off") return;

  const onHome = homePageVisible();
  compactHelpers();
  refreshChatFonts();
  ensureAppLayer();
  // Tagged here (not CSS :has) for the "show wallpaper" chat background.
  toggleClass("mdos-in-convo", !!$('[data-chat-mode="conversation"]'));
  toggleClass("mdos-in-rp", !!$('[data-chat-mode="roleplay"]'));
  const appOpen = state.apps.some((a) => !a.min);
  // The home screen stays styled under open sheets: a sheet sliding away must
  // reveal our home, not Marinara's default one. Only the Dock and the home
  // indicator follow whether a sheet is open (mdos-touch-sheet).
  // On a tablet small apps float as cards over the home screen, so it stays
  // styled under them; on a phone they cover it. mdos-touch-app hides the
  // Dock and shows the home indicator either way.
  toggleClass("mdos-touch-home", isTouch() && onHome && (!appOpen || html.classList.contains("mdos-tablet")));
  toggleClass("mdos-touch-app", isTouch() && appOpen);
  toggleClass("mdos-touch-sheet", isTouch() && !!$(SEL.sheets));
  // Tablet messenger: a chat open with the chat list beside it, like iPad
  // Messages. Picking a chat from the list keeps the list open.
  const listOpen = !!$once('aside[data-component="ChatSidebarPanel"]');
  const split = isTouch() && html.classList.contains("mdos-tablet") && state.messengerPane !== false && innerWidth >= 1000 && !onHome;
  if (split && !listOpen && performance.now() - keepListAt < 1500) {
    keepListAt = 0;
    click($(SEL.chatsBtn));
  }
  toggleClass("mdos-split", split && (listOpen || performance.now() < splitHoldUntil));
  toggleClass("mdos-touch-panel", isTouch() && !!$once('[data-component="RightPanelMobile"], [data-component="MobileDetailSheet"]'));
  if (isTouch()) {
    placeTouchControls();
    // The open composer's height, so the folded one keeps its shape (apps.css).
    const open = $once("div.marinara-chat-input-shell");
    if (open) setVar("--mdos-composer-h", `${Math.round(Math.min(open.getBoundingClientRect().height, 160))}px`);
  }
  if (homeVisible()) readHomeApps();
  refreshBadges();
  refreshChatTools();
  cleanComposer();
  watchViewBox();
  lockerTick();
  refreshChatList();
  refreshChatApp();
  const hubApp = !!hubAppTab();
  toggleClass("mdos-hub-app", hubApp);
  refreshLocker();
  tintHubApp(hubApp);
  // Hide the credit extension's "null" text as soon as its board appears.
  const creditHome = $once("#mac-credit-home");
  if (creditHome && !nullWatched.has(creditHome)) watchCreditNulls(creditHome);
  if (onHome && performance.now() - lastCreditScrape > 2500) {
    lastCreditScrape = performance.now();
    scrapeCredits();
  }

  if (isTouch()) {
    ensureSpringboard();
    updateDockState();
    return;
  }

  ensureChrome();
  setDesktopHome(onHome);

  // The list joins / leaves the chat window as it opens and closes.
  const pane = paneOn();
  toggleClass("mdos-pane", pane);
  toggleClass("mdos-editing", paneReady() && editorShown() && chatsOpen());
  toggleClass("mdos-pane-ready", isDesktop() && state.messengerPane !== false && !desktopHome);
  if (pane !== lastPane) {
    if (lastPane !== null && performance.now() - homeChangedAt > 400) animateGeometry();
    lastPane = pane;
    applyRect("chats");
    applyRect("main");
  } else if (!pane && paneReady()) applyRect("chats"); // follow the chat while tucked
  // Bring a window forward when Marinara opens it.
  for (const id of ["chats", "panel"]) {
    const open = windowVisible(id);
    if (prevOpen[id] === false && open) focusWin(id);
    if (prevOpen[id] === true && !open && focused === id) focusTopVisible();
    prevOpen[id] = open;
  }
  const panel = activePanelId();
  if (panel !== lastPanel) {
    // Each panel has its own window size (Settings opens wide).
    if (lastPanel && panel) animateGeometry();
    applyRect("panel");
    if (panel && panelOpen()) focusWin("panel");
  }
  lastPanel = panel;

  const topbar = $(SEL.topbar);
  // Measured by a ResizeObserver, not offsetHeight here: reading layout right
  // after this sync's class changes forced a layout pass every run.
  if (topbar !== topbarSeen) {
    topbarRO?.disconnect();
    topbarSeen = topbar;
    if (topbar) {
      topbarRO ||= new ResizeObserver((entries) => {
        const last = entries[entries.length - 1];
        const hgt = last?.borderBoxSize?.[0]?.blockSize ?? last?.target.offsetHeight;
        if (hgt && !desktopHome) setVar("--mdos-topbar-h", `${Math.round(hgt)}px`);
      });
      topbarRO.observe(topbar);
    }
  }
  renderDock();
  updateDockState();
  updateMenubar();
}

// ── Notification badges ───────────────────────────────────────
// Red counts on app icons, like a phone: chats waiting in Conversation,
// Roleplay and Game (on the Chats app and the New chat widget's buttons) and
// Home tabs such as Noodle. Chat counts come from Marinara's own chat list
// when it is in the page (its red unread pills); otherwise (phones and tablets
// keep the list unmounted) from the chat list API every 45 s, which carries
// the unread count of messages characters sent on their own.
const MODE_KEYS = ["conversation", "roleplay", "game"];
const UNREAD_PILL = ".bg-red-500.text-white";
const unread = { modes: [0, 0, 0], tabs: {} };
let apiUnread = null;
let apiUnreadAt = -1e9;
let apiUnreadBusy = false;
let badgeSig = "";
const pillCount = (el) => {
  if (!el) return 0;
  const t = el.textContent.trim();
  return /\+$/.test(t) ? 100 : parseInt(t, 10) || 1;
};
function refreshApiUnread() {
  if (apiUnreadBusy || doc.hidden || performance.now() - apiUnreadAt < 45_000) return;
  apiUnreadBusy = true;
  apiUnreadAt = performance.now();
  window
    .fetch("/api/chats", { credentials: "same-origin" })
    .then((r) => (r.ok ? r.json() : null))
    .then((list) => {
      if (!Array.isArray(list)) return;
      const modes = [0, 0, 0];
      for (const c of list) {
        const n = Number(c?.metadata?.autonomousUnreadCount) || 0;
        const i = MODE_KEYS.indexOf(c?.mode);
        if (n > 0 && i >= 0) modes[i] += n;
      }
      apiUnread = modes;
      syncSoon();
    })
    .catch(() => {})
    .finally(() => (apiUnreadBusy = false));
}
function readUnread() {
  const modeTabs = $$("[data-chat-mode-tab]");
  if (modeTabs.length) {
    // The list shows one mode at a time: its rows carry the counts; the other
    // modes' tabs carry their totals.
    const modes = [0, 0, 0];
    for (const tab of modeTabs) {
      const i = MODE_KEYS.indexOf(tab.getAttribute("data-chat-mode-tab"));
      if (i < 0) continue;
      // One query for the red pills of the listed chats, not one per row.
      modes[i] =
        tab.getAttribute("aria-pressed") === "true"
          ? [...doc.querySelectorAll(`${SEL.chatRows} ${UNREAD_PILL}`)].reduce((sum, pill) => sum + pillCount(pill), 0)
          : pillCount(tab.querySelector(UNREAD_PILL));
    }
    unread.modes = modes;
  } else {
    refreshApiUnread();
    if (apiUnread) unread.modes = apiUnread;
  }
  // Home tab badges (Noodle's new timeline…) are only in the page while Home
  // is; the last ones seen are kept until then.
  const tabs = $$(SEL.homeTabs);
  if (tabs.length) {
    const next = {};
    for (const t of tabs) {
      const key = (t.id || "").replace(/^marinara-home-tab-/, "");
      const n = pillCount(t.querySelector('[data-component*="Badge"]'));
      if (key && key !== "home" && n) next[`tab:${key}`] = n;
    }
    unread.tabs = next;
  }
}
function badgeFor(el) {
  if (el.hasAttribute("data-mode")) return unread.modes[Number(el.getAttribute("data-mode"))] || 0;
  const id = el.getAttribute("data-app");
  if (id === "chats") return unread.modes[0] + unread.modes[1] + unread.modes[2];
  if (id?.startsWith("mode:")) return unread.modes[MODE_KEYS.indexOf(id.slice(5))] || 0;
  return unread.tabs[id] || 0;
}
function applyBadges(force = false) {
  const sig = JSON.stringify(unread);
  if (!force && sig === badgeSig) return;
  badgeSig = sig;
  for (const root of [ui, widgetLayer, appLayer, sbEl]) {
    if (!root) continue;
    for (const el of root.querySelectorAll("[data-app], .mdos-launch[data-mode]")) setBadge(el, badgeFor(el));
  }
}
function setBadge(el, n) {
  const text = n > 99 ? "99+" : n > 0 ? String(n) : "";
  if ((el.getAttribute("data-mdos-badge") || "") === text) return;
  if (text) el.setAttribute("data-mdos-badge", text);
  else el.removeAttribute("data-mdos-badge");
}
// Icons are rebuilt by many renderers; a cheap count of badge-able nodes
// tells sync when to label fresh ones.
let badgeNodes = -1;
function refreshBadges() {
  readUnread();
  let count = 0;
  for (const root of [ui, widgetLayer, appLayer, sbEl]) if (root) count += root.querySelectorAll("[data-app], .mdos-launch[data-mode]").length;
  const fresh = count !== badgeNodes;
  badgeNodes = count;
  applyBadges(fresh);
}

let topbarSeen = null;
let topbarRO = null;
let lastPane = null;
let keepListAt = 0;
let splitHoldUntil = 0;
// The main window comes back whenever Marinara shows something new in it.
let lastView = "";
const detailIds = new WeakMap();
let detailSeq = 0;
function mainViewKey() {
  if (homePageVisible()) return "home";
  if (homeVisible()) return `tab:${$(`${SEL.homeTabs}[aria-selected="true"]`)?.id || ""}`;
  const detail = $(SEL.detail);
  if (detail) {
    if (!detailIds.has(detail)) detailIds.set(detail, ++detailSeq);
    return `detail:${detailIds.get(detail)}`;
  }
  const active = $(`${SEL.chatRows}[class~="bg-[var(--marinara-chat-chrome-highlight-bg)]"]`);
  return `chat:${active?.getAttribute("data-chat-id") || location.pathname}`;
}
function watchMainView() {
  if (!isDesktop()) return;
  const key = mainViewKey();
  if (key === lastView) return;
  const changed = lastView !== "";
  lastView = key;
  if (changed && state.mainMinimized && key !== "home") setMainMinimized(false);
}

// Streaming replies rewrite the transcript many times a second; those
// mutations never change the shell, so they are skipped cheaply.
// Performance: we never watch the page's child nodes, so a streaming reply,
// which rewrites the transcript many times a second, costs nothing here.
// Navigation flips a few aria attributes on Marinara's buttons and panels;
// those wake a sync right away. Anything else (an editor or sheet mounting)
// is caught by a cheap check every 700 ms, skipped while the tab is hidden.
const observer = new MutationObserver(() => syncSoon());
observer.observe(hostRoot || doc.body, {
  subtree: true,
  attributes: true,
  attributeFilter: ["aria-pressed", "aria-hidden", "aria-selected", "data-shell-overlay-mode"],
});
let lastInputAt = performance.now();
for (const type of ["pointerdown", "keydown", "wheel", "touchstart"]) on(doc, type, () => (lastInputAt = performance.now()), { capture: true, passive: true });
let pollTicks = 0;
const pollTimer = marinara.setInterval(() => {
  if (doc.hidden || gesture) return;
  const idle = performance.now() - lastInputAt > 5000;
  if (!idle || ++pollTicks % 3 === 0) syncSoon();
}, 700);
const viewTimer = marinara.setInterval(() => {
  if (!doc.hidden) watchMainView();
}, 1500);
on(doc, "visibilitychange", () => {
  if (!doc.hidden) tick();
});
const dlgTimer = marinara.setInterval(() => {
  if (!doc.hidden && !gesture) scanDialogue();
}, 1200);

// ── Global listeners ──────────────────────────────────────────

on(doc, "pointerdown", onPointerDown, true);
on(window, "pointermove", onPointerMove, { passive: true });
on(window, "pointerup", onPointerUp);
on(window, "pointercancel", onPointerUp);
on(doc, "dblclick", onDoubleClick, true);
on(doc, "contextmenu", onContextMenu);
// Marinara's own Home button clears the chat but keeps an app agent's tab
// selected, so inside Otome Hearth or Story Writer it seemed to do nothing.
on(
  doc,
  "click",
  (event) => {
    if (mode === "off" || !(event.target instanceof Element) || !event.target.closest(SEL.homeBtn)) return;
    if (hubAppTab()) marinara.setTimeout(() => leaveHubApp() && syncSoon(), 0);
  },
  true,
);
// Tap an info icon to show its tip on touch screens (mouse users just hover).
on(doc, "click", (event) => {
  const tip = event.target instanceof Element ? event.target.closest("[data-mdos-tip]") : null;
  for (const open of $$("[data-mdos-tip-open]")) if (open !== tip) open.removeAttribute("data-mdos-tip-open");
  if (tip) tip.toggleAttribute("data-mdos-tip-open");
});
on(doc, "securitypolicyviolation", (event) => {
  if (!/^(frame|child)-src/.test(event.effectiveDirective || event.violatedDirective || "")) return;
  const origin = originOf(event.blockedURI);
  if (!origin || frameBlocked.has(origin)) return;
  frameBlocked.add(origin);
  for (const w of appWins.values()) if (w.rec.type === "browser") w.refresh?.();
});
let resizeTimer = 0;
on(window, "resize", () => {
  marinara.clearTimeout(resizeTimer);
  resizeTimer = marinara.setTimeout(() => {
    refreshMode();
    if (isDesktop()) {
      renderWidgets();
      applyAllRects();
    }
  }, 120);
});
on(window, "blur", onPointerUp);
on(
  window,
  "keydown",
  (event) => {
    if (event.ctrlKey && event.altKey && !event.shiftKey && !event.metaKey) {
      if (event.code === "KeyD") {
        event.preventDefault();
        setEnabled(!state.enabled);
        return;
      }
      if (mode === "off") return;
      if (event.code === "KeyL") {
        event.preventDefault();
        toggleLaunchpad();
      } else if (event.code === "KeyH") {
        event.preventDefault();
        showDesktop();
      } else if (/^Arrow(Left|Right|Up|Down)$/.test(event.code) && focused && isDesktop()) {
        // Windows' Win + arrows: halves, maximize, then restore / minimize.
        event.preventDefault();
        const cur = savedRect(focused === "chats" && paneOn() ? "main" : focused)?.snap || null;
        const k = event.code.slice(5);
        if (k === "Left") snapTo(focused, cur === "right" ? null : cur === "tr" ? "tl" : cur === "br" ? "bl" : "left");
        else if (k === "Right") snapTo(focused, cur === "left" ? null : cur === "tl" ? "tr" : cur === "bl" ? "br" : "right");
        else if (k === "Up") snapTo(focused, cur === "left" ? "tl" : cur === "right" ? "tr" : cur === "bl" ? "left" : cur === "br" ? "right" : "max");
        else if (cur === "max") snapTo(focused, null);
        else if (cur === "left") snapTo(focused, "bl");
        else if (cur === "right") snapTo(focused, "br");
        else if (cur === "tl") snapTo(focused, "left");
        else if (cur === "tr") snapTo(focused, "right");
        else minimizeWin(focused);
      } else if (event.code === "KeyM" && focused && isDesktop()) {
        event.preventDefault();
        minimizeWin(focused);
      } else if (/^Digit[123]$/.test(event.code)) {
        event.preventDefault();
        launch(`mode:${MODE_KEYS[Number(event.code.slice(5)) - 1]}`);
      } else if (event.code === "KeyN") {
        event.preventDefault();
        newChatHere();
      } else if (event.code === "KeyF" && isDesktop()) {
        event.preventDefault();
        setFocusMode(!focusMode);
      } else if (event.code === "Comma") {
        event.preventDefault();
        launch("settings");
      }
      return;
    }
    // Ctrl/⌘ + S saves the open character, persona, preset or lorebook editor.
    if ((event.ctrlKey || event.metaKey) && !event.altKey && !event.shiftKey && event.code === "KeyS" && mode !== "off") {
      const save = $(".mari-editor-shell .mari-editor-action--primary");
      if (save && !save.disabled) {
        event.preventDefault();
        save.click();
      }
      return;
    }
    if (event.ctrlKey && !event.altKey && event.code === "Backquote" && isDesktop()) {
      event.preventDefault();
      cycleWindows();
      return;
    }
    if (event.key === "Escape" && mode !== "off") {
      if (launchpadEl || openMenu || ccEl || calEl || snapFly || aboutEl || popEl || editMode) {
        event.stopPropagation();
        if (popEl) closePop();
        else if (editMode) setEditMode(false);
        else closeOverlays();
      }
    }
  },
  true,
);

// ── Chat tools: scene bar on top, quick palette ───────────────
// Features of two companion extensions, drawn in this theme and driven by
// sync() (the 0.7 s check and the attribute observer) instead of their own
// whole-page observers and per-frame positioning, which cost the chat its
// smoothness while replies streamed in.

function refreshChatTools() {
  renderSceneBar();
  mountQuickPalette();
}

// Toast: a small pill at the bottom of the screen.
const toastEl = h("div", { id: "mdos-toast", role: "status" });
ui.append(toastEl);
let toastTimer = 0;
function toast(text) {
  toastEl.textContent = text;
  toastEl.classList.add("is-on");
  marinara.clearTimeout(toastTimer);
  toastTimer = marinara.setTimeout(() => toastEl.classList.remove("is-on"), 2200);
}

// A macOS alert: title, message, Cancel and a default (or destructive) button.
function confirmAlert({ title, message, ok, danger }) {
  return new Promise((resolve) => {
    const okBtn = h("button", { type: "button", class: `mdos-btn ${danger ? "mdos-btn--danger" : "mdos-btn--primary"}`, text: ok });
    const cancelBtn = h("button", { type: "button", class: "mdos-btn", text: L.scene.cancel });
    const overlay = h(
      "div",
      { class: "mdos-alert-overlay", "data-exd": "" },
      h(
        "div",
        { class: "mdos-alert", role: "alertdialog", "aria-modal": "true", "aria-label": title },
        h("div", { class: "mdos-alert-icon", svg: LOGO }),
        h("h3", { text: title }),
        h("p", { text: message }),
        h("div", { class: "mdos-alert-actions" }, cancelBtn, okBtn),
      ),
    );
    const close = (result) => {
      overlay.remove();
      doc.removeEventListener("keydown", onKey, true);
      resolve(result);
    };
    const onKey = (e) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        close(false);
      } else if (e.key === "Enter") {
        e.stopPropagation();
        e.preventDefault();
        close(true);
      }
    };
    overlay.addEventListener("click", (e) => e.target === overlay && close(false));
    cancelBtn.onclick = () => close(false);
    okBtn.onclick = () => close(true);
    doc.addEventListener("keydown", onKey, true);
    doc.body.append(overlay);
    okBtn.focus();
  });
}
const waitFor = (find, timeout = 1500) =>
  new Promise((resolve) => {
    const start = Date.now();
    const step = () => {
      const found = find();
      if (found || Date.now() - start > timeout) return resolve(found || null);
      marinara.setTimeout(step, 50);
    };
    step();
  });

// Scene bar: Marinara's roleplay scene bar (back to conversation / end scene /
// discard / convert) sits under the transcript. It is hidden and its buttons
// become a small toolbar pill at the top of the chat; end and discard ask
// first, then press the original button and its inline "yes".
const SCENE_KINDS = {
  back: ["lucide-arrow-left"],
  end: ["lucide-film"],
  discard: ["lucide-trash2", "lucide-trash-2"],
  convert: ["lucide-arrow-right-left"],
};
let sceneBar = null;
let sceneDock = null;
let sceneSig = "";
const sceneKind = (button) => {
  const icon = button.querySelector("svg");
  return icon ? Object.keys(SCENE_KINDS).find((k) => SCENE_KINDS[k].some((c) => icon.classList.contains(c))) || null : null;
};
const sceneBusy = () => !!sceneBar?.querySelector('button[style*="--primary"], button[style*="--destructive"]');
function removeSceneBar() {
  sceneDock?.remove();
  sceneDock = null;
  sceneSig = "";
  if (sceneBar?.isConnected) sceneBar.removeAttribute("data-mdos-scenebar");
  sceneBar = null;
}
function renderSceneBar() {
  // The original extension, if still on, keeps the job.
  if (!state.sceneBarTop || mode === "off" || doc.querySelector(".sbt-dock")) return removeSceneBar();
  if (!sceneBar?.isConnected) {
    const film = doc.querySelector("div.flex-wrap.justify-center > button > svg.lucide-film");
    sceneBar = film ? film.closest("div.flex-wrap") : null;
    sceneBar?.setAttribute("data-mdos-scenebar", "");
  }
  if (!sceneBar) return removeSceneBar();
  const host = sceneBar.closest(".mari-chat-area, .rpg-chat-area") || sceneBar.offsetParent || doc.body;
  const buttons = [...sceneBar.querySelectorAll(":scope > button")]
    .map((b) => ({ kind: sceneKind(b), title: b.title || b.textContent.trim(), icon: b.querySelector("svg") }))
    .filter((b) => b.kind);
  const busy = sceneBusy();
  const sig = `${busy}|${buttons.map((b) => b.kind + b.title).join(",")}`;
  if (sceneDock?.isConnected && sceneDock.parentElement === host && sig === sceneSig) return;
  sceneSig = sig;
  sceneDock?.remove();
  sceneDock = h(
    "div",
    { class: "mdos-scenebar", role: "toolbar", "data-exd": "" },
    ...buttons.map(({ kind, title, icon }) => {
      const b = h("button", { type: "button", class: `mdos-scenebar-btn${kind === "discard" ? " is-danger" : ""}`, title, "aria-label": title, disabled: busy, onclick: () => runScene(kind) });
      b.append(icon.cloneNode(true));
      return b;
    }),
  );
  host.append(sceneDock);
}
async function runScene(kind) {
  const original = sceneBar && [...sceneBar.querySelectorAll(":scope > button")].find((b) => sceneKind(b) === kind);
  if (!original) return;
  // Converting already has Marinara's own confirmation.
  if (kind === "convert") return original.click();
  if (!(await confirmAlert(L.scene[kind]))) return;
  if (!sceneBar?.isConnected) return;
  original.click();
  if (kind !== "end" && kind !== "discard") return;
  const yes = await waitFor(() => sceneBar?.querySelector(kind === "end" ? 'button[style*="--primary"]' : 'button[style*="--destructive"]'));
  if (!yes) return;
  const no = yes.nextElementSibling;
  yes.click();
  if (kind !== "end") return;
  // If ending fails (a connection error), the hidden bar is left asking
  // "yes / no"; answer "no" so the toolbar comes back.
  await new Promise((r) => marinara.setTimeout(r, 300));
  await waitFor(() => !yes.isConnected || !yes.disabled, 10 * 60 * 1000);
  if (yes.isConnected && no?.isConnected) no.click();
  syncSoon();
}

// Quick palette: the composer's attach button becomes a + menu with quick
// dialogue quotes / narration asterisks, image attach, a snippet library and
// the turn-bookmark launcher. Any of them can also sit as small buttons on a
// row above the composer.
const QP_SHELL = ".marinara-chat-input-shell";
const QP_COMPOSER = 'textarea[data-chat-composer="true"], textarea.mari-chat-input-textarea';
const QP_BOOKMARK = ".tb-floating-launcher, .tb-topbar-launcher";
const QP_ITEMS = [
  { id: "quote", glyph: "“”", run: () => insertMarker('"') },
  { id: "narration", glyph: "✱", run: () => insertMarker("*") },
  { id: "image", icon: "image", run: () => qpAttach() },
  { id: "memo", icon: "note", run: (anchor) => openSnippets(anchor) },
  { id: "bookmark", icon: "bookmark", run: () => qpBookmarks(), when: () => !!doc.querySelector(QP_BOOKMARK) },
];
const QP_ICONS = {
  plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',
  image: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>',
  note: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6M9 13h6M9 17h4"/></svg>',
  bookmark: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z"/></svg>',
};
// Settings and snippets live in this extension's own state. On first run,
// whatever the Quick Palette extension mirrored to this browser is imported.
function qpState() {
  if (!state.qp || typeof state.qp !== "object") {
    let old = null;
    try {
      old = JSON.parse(localStorage.getItem("qp-state-v1") || "null");
    } catch {
      /* none */
    }
    const memos = Array.isArray(old?.memos)
      ? old.memos
          .filter((m) => m && (String(m.content || "").trim() || String(m.title || "").trim()))
          .map((m) => ({ id: String(m.id || newId()), title: String(m.title || "").slice(0, 200), content: String(m.content || ""), pinned: !!m.pinned, at: String(m.updatedAt || new Date().toISOString()) }))
      : [];
    const chips = old?.chips && typeof old.chips === "object" ? Object.keys(old.chips).filter((k) => old.chips[k] === true) : [];
    state.qp = { chips, memos };
    save();
  }
  return state.qp;
}
const qpShell = () => [...doc.querySelectorAll(QP_SHELL)].find((s) => s.offsetWidth > 0 && s.getClientRects().length) || null;
const qpComposer = () => qpShell()?.querySelector(QP_COMPOSER) || null;
function requireComposer() {
  const t = qpComposer();
  if (!t || t.disabled) {
    toast(L.qp.openChat);
    return null;
  }
  return t;
}
function setComposer(t, value, selStart, selEnd = selStart) {
  const setter = Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, "value")?.set;
  if (setter) setter.call(t, value);
  else t.value = value;
  t.focus();
  try {
    t.setSelectionRange(selStart, selEnd);
  } catch {
    /* ignore */
  }
  t.dispatchEvent(new Event("input", { bubbles: true }));
}
// Smart dialogue-quote / narration-asterisk insertion for the composer.
// Returns the new text and selection for pressing `m` ('"' or '*') with the
// text `v` and selection [start, end). `focused` is whether the composer had
// the caret (an unfocused composer is written to at its end).
function markerEdit(v, start, end, m, focused = true) {
  const other = m === '"' ? "*" : '"';
  const count = (str, c) => str.split(c).length - 1;
  // Selection: wrap the words (not the spaces around them) or, if already
  // wrapped, unwrap — a toggle.
  if (start !== end) {
    if (v[start - 1] === m && v[end] === m) return { v: v.slice(0, start - 1) + v.slice(start, end) + v.slice(end + 1), s: start - 1, e: end - 1 };
    const sel = v.slice(start, end);
    if (sel.length >= 2 && sel[0] === m && sel[sel.length - 1] === m) return { v: v.slice(0, start) + sel.slice(1, -1) + v.slice(end), s: start, e: end - 2 };
    const a = start + (sel.length - sel.trimStart().length);
    const b = end - (sel.length - sel.trimEnd().length);
    if (a >= b) return { v, s: start, e: end };
    return { v: v.slice(0, a) + m + v.slice(a, b) + m + v.slice(b), s: b + 2, e: b + 2 };
  }
  // No caret in the composer: write at the end of the text.
  let pos = focused ? start : v.replace(/\s+$/, "").length;
  const ps = v.lastIndexOf("\n", pos - 1) + 1;
  let pe = v.indexOf("\n", pos);
  if (pe === -1) pe = v.length;
  const para = () => v.slice(ps, pos);
  // Right before the closing marker of an open span: step over it.
  if (v[pos] === m && count(para(), m) % 2 === 1) return { v, s: pos + 1, e: pos + 1 };
  // An open span of this marker: close it here (without trailing spaces).
  if (count(para(), m) % 2 === 1) {
    const before = para();
    const cut = pos - (before.length - before.trimEnd().length);
    return { v: v.slice(0, cut) + m + v.slice(pos), s: cut + 1, e: cut + 1 };
  }
  // Inside the other marker's span: leave it first — past its closing
  // marker, or close it when it has none.
  if (count(para(), other) % 2 === 1) {
    const close = v.indexOf(other, pos);
    if (close !== -1 && close < pe) pos = close + 1;
    else {
      const before = para();
      const cut = pos - (before.length - before.trimEnd().length);
      v = v.slice(0, cut) + other + v.slice(pos);
      pos = cut + 1;
      pe = v.indexOf("\n", pos);
      if (pe === -1) pe = v.length;
    }
  }
  // A new pair, spaced from the words around it, caret inside.
  const prev = v[pos - 1];
  const next = v[pos];
  const lead = pos > ps && prev && !/\s/.test(prev) ? " " : "";
  const trail = next && !/\s/.test(next) ? " " : "";
  const ins = lead + m + m + trail;
  const caret = pos + lead.length + 1;
  return { v: v.slice(0, pos) + ins + v.slice(pos), s: caret, e: caret };
}
function insertMarker(marker) {
  const t = requireComposer();
  if (!t) return;
  const r = markerEdit(t.value, t.selectionStart ?? t.value.length, t.selectionEnd ?? t.value.length, marker, doc.activeElement === t);
  setComposer(t, r.v, r.s, r.e);
}
function insertText(text) {
  const t = requireComposer();
  if (!t) return false;
  const v = t.value;
  const start = t.selectionStart ?? v.length;
  const end = t.selectionEnd ?? start;
  setComposer(t, v.slice(0, start) + text + v.slice(end), start + text.length);
  return true;
}
function qpAttach() {
  const shell = qpShell();
  const input = shell?.querySelector('input[type="file"]');
  if (!input || shell.querySelector(QP_COMPOSER)?.disabled) return toast(L.qp.openChat);
  input.click();
}
function qpBookmarks() {
  const launcher = doc.querySelector(QP_BOOKMARK);
  if (launcher) launcher.click();
  else toast(L.qp.noBookmark);
}
const qpIcon = (item) => (item.icon ? h("span", { class: "mdos-qp-ico", svg: QP_ICONS[item.icon] }) : h("span", { class: "mdos-qp-ico mdos-qp-glyph", text: item.glyph }));
// Pressing a button would take the focus (and a phone's keyboard) away from
// the composer; keeping the pointerdown default off keeps both.
const keepFocus = (el) => (el.addEventListener("pointerdown", (e) => e.preventDefault()), el);
function mountQuickPalette() {
  const on = state.quickPalette && mode !== "off" && !doc.querySelector(".qp-plus-btn");
  for (const shell of doc.querySelectorAll(QP_SHELL)) {
    const mine = shell.querySelector(":scope > .mdos-qp-plus");
    if (!on) {
      if (mine) {
        mine.remove();
        shell.removeAttribute("data-mdos-qp");
      }
      continue;
    }
    if (mine || !shell.querySelector('input[type="file"]') || !shell.querySelector(QP_COMPOSER)) continue;
    shell.setAttribute("data-mdos-qp", "");
    const plus = keepFocus(
      h("button", {
        type: "button",
        class: "mdos-qp-plus",
        title: L.qp.menu,
        "aria-label": L.qp.menu,
        "aria-haspopup": "menu",
        svg: QP_ICONS.plus,
        onclick: (e) => {
          e.preventDefault();
          e.stopPropagation();
          openQpMenu(plus);
        },
      }),
    );
    shell.prepend(plus);
  }
  renderQpChips(on);
}
// The + menu, like the Claude app's: a rounded card above the + with grouped
// rows (icon + label), then the "show as buttons" switches, which keep it open.
let qpPop = null;
function closeQpMenu() {
  if (!qpPop) return;
  qpPop.scrim?.remove();
  qpPop.el.remove();
  qpPop.anchor.classList.remove("is-open");
  doc.removeEventListener("pointerdown", qpPop.outside, true);
  doc.removeEventListener("keydown", qpPop.key, true);
  qpPop = null;
}
function openQpMenu(anchor) {
  if (qpPop) {
    const same = qpPop.anchor === anchor;
    closeQpMenu();
    if (same) return;
  }
  const qp = qpState();
  const items = QP_ITEMS.filter((it) => !it.when || it.when());
  const actions = h(
    "div",
    { class: "mdos-qp-group" },
    ...items.map((it) =>
      keepFocus(
        h(
          "button",
          {
            type: "button",
            class: "mdos-qp-row",
            onclick: () => {
              closeQpMenu();
              it.run(anchor);
            },
          },
          qpIcon(it),
          h("span", { text: L.qp[it.id] }),
        ),
      ),
    ),
  );
  const pins = h(
    "div",
    { class: "mdos-qp-group" },
    h("div", { class: "mdos-qp-group-title", text: L.qp.pinTitle }),
    ...items.map((it) => {
      const sw = h("span", { class: `mdos-qp-switch${qp.chips.includes(it.id) ? " is-on" : ""}`, "aria-hidden": "true" });
      return keepFocus(
        h(
          "button",
          {
            type: "button",
            class: "mdos-qp-row",
            role: "switch",
            "aria-checked": String(qp.chips.includes(it.id)),
            onclick: (e) => {
              qp.chips = qp.chips.includes(it.id) ? qp.chips.filter((x) => x !== it.id) : [...qp.chips, it.id];
              save();
              renderQpChips(true);
              const on = qp.chips.includes(it.id);
              sw.classList.toggle("is-on", on);
              e.currentTarget.setAttribute("aria-checked", String(on));
            },
          },
          qpIcon(it),
          h("span", { text: L.qp[it.id] }),
          sw,
        ),
      );
    }),
  );
  const sheet = isPhone();
  const el = h("div", { class: `mdos-qp-pop${sheet ? " is-sheet" : ""}`, role: "dialog", "aria-label": L.qp.menu, "data-exd": "" }, actions, pins);
  const scrim = sheet ? h("div", { class: "mdos-sheet-scrim mdos-qp-scrim", "data-exd": "", onclick: () => closeQpMenu() }) : null;
  if (scrim) doc.body.append(scrim);
  doc.body.append(el);
  if (sheet) {
    anchor.classList.add("is-open");
    const outside = () => {};
    const key = (e) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        closeQpMenu();
      }
    };
    doc.addEventListener("keydown", key, true);
    qpPop = { el, anchor, outside, key, scrim };
    return;
  }
  const r = anchor.getBoundingClientRect();
  const w = el.offsetWidth;
  el.style.left = `${Math.max(8, Math.min(r.left - 10, innerWidth - w - 8))}px`;
  el.style.bottom = `${Math.max(8, innerHeight - r.top + 12)}px`;
  el.style.setProperty("--tip", `${Math.round(r.left + r.width / 2 - Math.max(8, Math.min(r.left - 10, innerWidth - w - 8)))}px`);
  anchor.classList.add("is-open");
  const outside = (e) => {
    if (!el.contains(e.target) && !anchor.contains(e.target)) closeQpMenu();
  };
  const key = (e) => {
    if (e.key === "Escape") {
      e.stopPropagation();
      closeQpMenu();
    }
  };
  doc.addEventListener("pointerdown", outside, true);
  doc.addEventListener("keydown", key, true);
  qpPop = { el, anchor, outside, key };
}
// The pinned buttons hang just above the composer: inside its shell (which is
// position: relative and doesn't clip), placed with CSS — no positioning loop,
// and no layout of the page around the composer to depend on.
function renderQpChips(on) {
  const qp = on ? qpState() : null;
  const items = qp ? QP_ITEMS.filter((it) => qp.chips.includes(it.id) && (!it.when || it.when())) : [];
  if (!items.length && !doc.querySelector(".mdos-qp-chips")) return;
  const shell = on && items.length ? qpShell() : null;
  for (const row of doc.querySelectorAll(".mdos-qp-chips")) if (!shell || row.parentElement !== shell || !items.length) row.remove();
  if (!shell || !items.length) return;
  const sig = items.map((it) => it.id).join(",");
  let row = shell.querySelector(":scope > .mdos-qp-chips");
  if (!row) {
    row = h("div", { class: "mdos-qp-chips", role: "toolbar", "data-exd": "" });
    // First child: it is absolutely placed, and the send button stays last.
    shell.prepend(row);
  }
  if (row.dataset.sig === sig) return;
  row.dataset.sig = sig;
  row.replaceChildren(
    ...items.map((it) =>
      keepFocus(
        h("button", {
          type: "button",
          class: "mdos-qp-chip",
          title: L.qp[it.id],
          "aria-label": L.qp[it.id],
          onclick: (e) => {
            e.preventDefault();
            e.stopPropagation();
            it.run(e.currentTarget);
          },
        }, qpIcon(it)),
      ),
    ),
  );
}

// Snippet library (the palette's memos): a popover with search, add/edit,
// pin, reorder, insert into the composer and copy.
const snip = { editing: null, query: "", confirm: null, open: new Set() };
let snipAnchor = null;
function openSnippets(anchor) {
  snipAnchor = anchor;
  snip.editing = null;
  snip.query = "";
  snip.confirm = null;
  renderSnippets(true);
}
function renderSnippets(first = false) {
  const qp = qpState();
  const list = h("div", { class: "mdos-snip-list" });
  const search = h("input", {
    type: "search",
    class: "mdos-input mdos-snip-search",
    placeholder: L.qp.search,
    value: snip.query,
    oninput: (e) => {
      snip.query = e.target.value;
      fillList();
    },
  });
  const fillList = () => {
    const q = snip.query.trim().toLowerCase();
    const memos = q ? qp.memos.filter((m) => m.title.toLowerCase().includes(q) || m.content.toLowerCase().includes(q)) : qp.memos;
    list.replaceChildren(...(memos.length ? memos.map((m) => snipRow(m, !q)) : [h("div", { class: "mdos-snip-empty", text: qp.memos.length ? L.qp.noResult : L.qp.empty })]));
  };
  fillList();
  const body = h(
    "div",
    { class: "mdos-pop-body mdos-snip" },
    h("div", { class: "mdos-snip-top" }, search, h("button", { type: "button", class: "mdos-btn mdos-btn--primary", text: `+ ${L.qp.add}`, onclick: () => ((snip.editing = { id: null, title: "", content: "" }), renderSnippets()) })),
    snip.editing ? snipEditor() : null,
    list,
  );
  const scroll = popEl?.querySelector(".mdos-snip-list")?.scrollTop || 0;
  openPop(body, first && !isPhone() ? snipAnchor : null, { title: L.qp.memo, wide: true, cls: isPhone() ? "mdos-pop--sheet" : "" });
  if (!first && !isPhone()) popEl.classList.add("is-centered");
  list.scrollTop = scroll;
}
function snipRow(m, canMove) {
  const qp = qpState();
  const open = snip.open.has(m.id);
  const act = (label, text, onclick, cls = "") => h("button", { type: "button", class: `mdos-snip-act ${cls}`, title: label, "aria-label": label, text, onclick: (e) => (e.stopPropagation(), onclick()) });
  const move = (d) => {
    const i = qp.memos.indexOf(m);
    const j = i + d;
    if (j < 0 || j >= qp.memos.length || qp.memos[j].pinned !== m.pinned) return;
    [qp.memos[i], qp.memos[j]] = [qp.memos[j], qp.memos[i]];
    save();
    renderSnippets();
  };
  const del = () => {
    if (snip.confirm !== m.id) {
      snip.confirm = m.id;
      return renderSnippets();
    }
    qp.memos = qp.memos.filter((x) => x !== m);
    snip.confirm = null;
    save();
    renderSnippets();
    toast(L.qp.deleted);
  };
  return h(
    "div",
    { class: `mdos-snip-row${m.pinned ? " is-pinned" : ""}${open ? " is-open" : ""}` },
    h(
      "button",
      {
        type: "button",
        class: "mdos-snip-head",
        onclick: () => {
          if (open) snip.open.delete(m.id);
          else snip.open.add(m.id);
          renderSnippets();
        },
      },
      h("b", { text: (m.pinned ? "★ " : "") + (m.title || L.qp.untitled) }),
      h("span", { text: open ? new Date(m.at).toLocaleString() : m.content.replace(/\s+/g, " ").slice(0, 80) }),
    ),
    open ? h("div", { class: "mdos-snip-body", text: m.content }) : null,
    h(
      "div",
      { class: "mdos-snip-acts" },
      h("button", {
        type: "button",
        class: "mdos-btn mdos-btn--primary mdos-snip-insert",
        text: L.qp.insert,
        onclick: () => {
          closePop();
          if (insertText(m.content)) toast(L.qp.inserted);
        },
      }),
      act(L.qp.copy, "⧉", () => {
        const done = () => toast(L.qp.copied);
        navigator.clipboard?.writeText(m.content).then(done, () => toast("✕"));
      }),
      act(m.pinned ? L.qp.unpin : L.qp.pin, m.pinned ? "★" : "☆", () => {
        m.pinned = !m.pinned;
        qp.memos = [...qp.memos.filter((x) => x.pinned), ...qp.memos.filter((x) => !x.pinned)];
        save();
        renderSnippets();
      }),
      act(L.qp.edit, "✎", () => {
        snip.editing = { id: m.id, title: m.title, content: m.content };
        renderSnippets();
      }),
      canMove ? act(L.qp.up, "↑", () => move(-1)) : null,
      canMove ? act(L.qp.down, "↓", () => move(1)) : null,
      act(snip.confirm === m.id ? L.qp.delConfirm : L.qp.del, snip.confirm === m.id ? L.qp.delConfirm : "🗑", del, `is-danger${snip.confirm === m.id ? " is-confirm" : ""}`),
    ),
  );
}
function snipEditor() {
  const ed = snip.editing;
  const title = h("input", { type: "text", class: "mdos-input", placeholder: L.qp.title, maxlength: "200", value: ed.title, oninput: (e) => (ed.title = e.target.value) });
  const content = h("textarea", { class: "mdos-input mdos-snip-text", placeholder: L.qp.content, oninput: (e) => (ed.content = e.target.value) });
  content.value = ed.content;
  marinara.setTimeout(() => title.focus(), 0);
  return h(
    "div",
    { class: "mdos-snip-editor" },
    title,
    content,
    h(
      "div",
      { class: "mdos-row mdos-snip-editor-acts" },
      h("button", { type: "button", class: "mdos-btn", text: L.qp.cancel, onclick: () => ((snip.editing = null), renderSnippets()) }),
      h("button", {
        type: "button",
        class: "mdos-btn mdos-btn--primary",
        text: L.qp.save,
        onclick: () => {
          const qp = qpState();
          const t = ed.title.trim();
          if (!t && !ed.content.trim()) return toast(L.qp.needText);
          const at = new Date().toISOString();
          const m = ed.id && qp.memos.find((x) => x.id === ed.id);
          if (m) Object.assign(m, { title: t || L.qp.untitled, content: ed.content, at });
          else {
            const i = qp.memos.findIndex((x) => !x.pinned);
            qp.memos.splice(i === -1 ? qp.memos.length : i, 0, { id: newId(), title: t || L.qp.untitled, content: ed.content, pinned: false, at });
          }
          snip.editing = null;
          save();
          renderSnippets();
          toast(L.qp.saved);
        },
      }),
    ),
  );
}

// ── Extension locker (built in) ───────────────────────────────
// Other extensions float launcher buttons over the page. The locker gathers
// them: each is hidden where it is (transparent, untouchable — never moved or
// removed), listed under the menu-bar box icon (on phones and tablets: the
// Locker app), and pressed for real (pointer + mouse + click at its centre)
// when picked. A button that unfolds in place shows while it is open.
// Reimplements the "확장 보관함" extension, lighter: it reads only the
// page's top-level floating elements, when something outside Marinara's own
// tree changes (lkWake), and the stored ones each sync.
const LK_INTERACTIVE = 'button, a[href], [role="button"], [onclick], input[type="button"], input[type="submit"], input[type="image"], summary, [data-drawer-launcher]';
const LK_SKIP = 'script, style, link, meta, template, noscript, iframe, object, embed, [data-sonner-toaster], [data-radix-popper-content-wrapper], [data-radix-portal], [data-exd], [data-mdos], .mdos-alert-overlay';
const LK_TW = /^(flex|grid|block|inline|hidden|fixed|absolute|relative|sticky|inset|top|left|right|bottom|z|w|h|min|max|p[xytrbl]?|m[xytrbl]?|gap|space|text|font|leading|tracking|bg|from|to|via|border|rounded|shadow|ring|opacity|transition|duration|ease|delay|animate|transform|translate|scale|rotate|cursor|select|pointer|items|justify|content|self|place|overflow|backdrop|blur|filter|outline|order|col|row|sr|aspect|object|shrink|grow|basis|drop|fill|stroke|dark|hover|focus|group|peer|sm|md|lg|xl)(-|:|$)/;
const lkPending = new Map();
let lkLastScan = -1e9;
let lkTicks = 0;

// Who gathers the buttons: the built-in engine, or the "확장 보관함"
// extension (state.lockerEngine). Built in, that extension stays installed but
// sleeps for the page: its own cleanup (window.__marinaraBogwanham) puts its
// buttons back and ours take over. With it in charge, ours only lists and
// presses the buttons it hid (data-bgh-stored). Both keep their settings in
// sync, matched by the button's label (bghPull / bghPush).
const BGH_HOOK = "__marinaraBogwanham";
const BGH_NAME = "확장 보관함";
const lkBuiltin = () => state.lockerEngine !== "bgh";
const bghRunning = () => typeof window[BGH_HOOK] === "function";
let bghSlept = false;
function bghSleep() {
  try {
    const stop = window[BGH_HOOK];
    void Promise.resolve(stop()).catch(() => {});
    bghSlept = true;
    lkLastScan = -1e9; // its buttons come back: gather them next tick
  } catch {
    /* already stopping */
  }
}
// Its id comes from the runtime list (enabled extensions only).
async function bghId() {
  await lkRefreshRuntime();
  for (const [id, x] of lkRuntime) if (x.name === BGH_NAME) return id;
  return null;
}
const bghUrl = (id) => `/api/personal-extensions/${encodeURIComponent(id)}/storage`;
async function bghRead(id) {
  const r = await window.fetch(bghUrl(id), { credentials: "same-origin", cache: "no-store" });
  if (!r.ok) return null;
  const j = await r.json();
  const v = (j && typeof j === "object" && "value" in j ? j.value : j)?.bogwanham;
  return v && typeof v === "object" && v.items && typeof v.items === "object" ? v : null;
}
// Its choices into ours when it saved after our last sync (or when asked).
async function bghPull(force = false) {
  try {
    const id = await bghId();
    const b = id ? await bghRead(id) : null;
    if (!b) return false;
    bghNames.clear();
    for (const it of Object.values(b.items)) {
      const label = lkClean(it?.label || "");
      if (label) bghNames.set(label, { name: String(it.name || "").slice(0, 40), owner: String(it.ownerName || ""), float: !!it.float, excluded: !!it.excluded });
    }
    const st = lkState();
    const at = Number(b.savedAt) || 0;
    if (!force && at <= (st.syncAt || 0)) return false;
    st.auto = b.autoCollect !== false;
    st.legacy = { ...(st.legacy || {}) };
    for (const [label, x] of bghNames) st.legacy[label] = { name: x.name, float: x.float, excluded: x.excluded };
    for (const item of Object.values(st.items)) {
      const x = bghNames.get(lkClean(item.label || ""));
      if (x) Object.assign(item, { name: x.name, float: x.float, excluded: x.excluded });
    }
    const rank = new Map((b.order || []).map((k, i) => [lkClean(b.items[k]?.label || ""), i]));
    const pos = (k) => rank.get(lkClean(st.items[k]?.label || "")) ?? 1e6;
    st.order = [...st.order].sort((a, c) => pos(a) - pos(c));
    st.syncAt = at;
    save();
    return true;
  } catch {
    return false;
  }
}
// Ours into its storage (built in, after an edit): the same fields, its order
// following ours. Only buttons it knows (a new one it learns by itself).
let bghPushTimer = 0;
function bghPushSoon() {
  marinara.clearTimeout(bghPushTimer);
  bghPushTimer = marinara.setTimeout(bghPush, 1500);
}
async function bghPush() {
  try {
    const id = await bghId();
    const b = id ? await bghRead(id) : null;
    if (!b) return;
    const st = lkState();
    const ours = new Map();
    for (const [k, it] of Object.entries(st.items)) ours.set(lkClean(it.label || ""), { k, it });
    let changed = b.autoCollect !== (st.auto !== false);
    b.autoCollect = st.auto !== false;
    for (const it of Object.values(b.items)) {
      const m = ours.get(lkClean(it?.label || ""));
      if (!m) continue;
      const next = { name: m.it.name || "", float: !!m.it.float, excluded: !!m.it.excluded };
      if ((it.name || "") !== next.name || !!it.float !== next.float || !!it.excluded !== next.excluded) {
        Object.assign(it, next);
        if (next.float) it.floatUserSet = true;
        changed = true;
      }
    }
    const pos = (k) => {
      const m = ours.get(lkClean(b.items[k]?.label || ""));
      const i = m ? st.order.indexOf(m.k) : -1;
      return i < 0 ? 1e6 : i;
    };
    const order = [...(b.order || [])].sort((a, c) => pos(a) - pos(c));
    if (order.join("|") !== (b.order || []).join("|")) {
      b.order = order;
      changed = true;
    }
    if (!changed) return;
    b.savedAt = Date.now();
    st.syncAt = b.savedAt;
    save();
    await window.fetch(bghUrl(id), {
      method: "PATCH",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json", "x-marinara-csrf": "1" },
      body: JSON.stringify({ bogwanham: b }),
    });
  } catch {
    /* offline: the next edit tries again */
  }
}
function setLockerEngine(engine) {
  if (state.lockerEngine === engine) return;
  if (engine === "bgh") {
    // Hand over: our hidden buttons come back, our choices go to it first.
    void bghPush();
    lkReleaseAll();
  }
  updateSetting("lockerEngine", engine);
  if (engine === "builtin") {
    void bghPull(true).then(() => {
      lkLastScan = -1e9;
      lockerTick();
    });
  }
  lockerTick();
}
function lkState() {
  if (!state.locker || typeof state.locker !== "object") {
    // First run: the old extension's choices (names, kept on screen, removed)
    // come along by button label.
    const legacy = {};
    try {
      const old = JSON.parse(localStorage.getItem("marinara.bogwanham.v1") || "null");
      for (const it of Object.values(old?.items || {})) {
        const label = lkClean(it?.label || "");
        if (label) legacy[label] = { name: String(it.name || "").slice(0, 40), float: !!it.float, excluded: !!it.excluded };
      }
      state.locker = { auto: old?.autoCollect !== false, items: {}, order: [], legacy };
    } catch {
      state.locker = { auto: true, items: {}, order: [], legacy };
    }
    save();
  }
  return state.locker;
}
function lkClean(text) {
  let t = String(text || "").replace(/\s+/g, " ").replace(/\([^)]*\)/g, "").replace(/\s·\s.*$/, "").trim();
  for (let i = 0; i < 2; i++) t = t.replace(/\s*(열기|닫기|열림|토글|켜기|끄기|보기|띄우기|펼치기|접기|open|close|toggle|launcher)$/i, "").trim();
  return t.slice(0, 40);
}
function lkLabel(el) {
  let t = el.getAttribute("aria-label") || el.title || el.querySelector("img[alt]")?.alt || "";
  if (!t && !el.matches(LK_INTERACTIVE)) {
    const inner = el.querySelector("[aria-label], [title]");
    t = inner?.getAttribute("aria-label") || inner?.title || "";
  }
  if (!t) {
    const text = (el.textContent || "").trim();
    if (text.length <= 24) t = text;
  }
  return lkClean(t);
}
function lkKeyOf(el, label) {
  if (el.id && /^[A-Za-z][\w-]{1,63}$/.test(el.id) && !/\d{5}/.test(el.id) && el.id !== "root") return `#${el.id}`;
  const cls = [...el.classList].find((c) => /[-_]/.test(c) && c.length < 48 && !/\d{4}/.test(c) && !/^(is|has|was|state)-|--|__|:/.test(c) && !/^(bgh|exd|mdos)-/.test(c) && !LK_TW.test(c));
  return `${el.tagName.toLowerCase()}${cls ? `.${cls}` : ""}@${label}`;
}
const lkPaints = (cs) => (cs.backgroundColor && !/rgba?\(.*,\s*0\)$|transparent/.test(cs.backgroundColor)) || cs.backgroundImage !== "none" || cs.boxShadow !== "none" || parseFloat(cs.borderTopWidth) > 0;
function lkVerdict(el, cs) {
  const r = el.getBoundingClientRect();
  if (r.width < 1 || r.height < 1) return "none";
  const stored = el.hasAttribute("data-bgh-stored");
  const role = el.getAttribute("role") || "";
  if (r.width > 180 || r.height > 180) {
    if (stored) return "launcher";
    if (cs.pointerEvents !== "none" && cs.visibility !== "hidden" && (/^(dialog|alertdialog|menu|listbox)$/.test(role) || el.getAttribute("aria-modal") === "true" || lkPaints(cs))) return "panel";
    return "none";
  }
  if (cs.visibility === "hidden" || (!stored && Number(cs.opacity) < 0.05)) return "none";
  if (r.width < 14 || r.height < 14) return "none";
  if (r.right < 0 || r.bottom < 0 || r.left > innerWidth || r.top > innerHeight) return "none";
  if (/^(dialog|alertdialog|tooltip|status|alert|menu|listbox|progressbar|log|marquee|timer)$/.test(role)) return "none";
  const inner = el.querySelectorAll(LK_INTERACTIVE).length;
  const marked = el.hasAttribute("data-drawer-launcher");
  const interactive = marked || el.matches(LK_INTERACTIVE) || inner > 0 || el.hasAttribute("tabindex") || typeof el.onclick === "function" || /pointer|grab/.test(cs.cursor) || (lkPaints(cs) && parseFloat(cs.borderTopLeftRadius) >= 6 && !!el.querySelector("svg, img"));
  if (!interactive) return "none";
  if (!stored && !marked && cs.pointerEvents === "none" && !inner) return "none";
  if (!marked && inner >= 3) return "none";
  if (!marked && /^(닫기|close|×|✕|✖|x)$/i.test(lkLabel(el))) return "none";
  return "launcher";
}
function lkCandidates() {
  const out = [];
  let budget = 0;
  const walk = (el, depth, floatingAbove) => {
    if (++budget > 1500 || el.matches(LK_SKIP)) return;
    const cs = getComputedStyle(el);
    if (cs.display === "none") return;
    const pos = cs.position;
    const floating = pos === "fixed" || (pos === "absolute" && (depth === 0 || floatingAbove)) || (pos === "sticky" && depth === 0);
    if (floating) {
      const v = lkVerdict(el, cs);
      if (v === "launcher") return out.push(el);
      if (v === "panel") return;
    }
    if (depth < 7) {
      if (el.shadowRoot) for (const c of el.shadowRoot.children) walk(c, depth + 1, floatingAbove || floating);
      for (const c of el.children) walk(c, depth + 1, floatingAbove || floating);
    }
  };
  for (const root of [...doc.body.children, ...[...html.children].filter((e) => e !== doc.body && e !== doc.head)]) {
    if (root.id === "root" || root === ui) continue;
    walk(root, 0, false);
  }
  for (const el of doc.querySelectorAll("[data-drawer-launcher]")) if (!el.closest("#root, [data-mdos]") && !out.includes(el)) out.push(el);
  return out;
}
function lkHide(rec) {
  const el = rec.el;
  if (!rec.saved) {
    rec.saved = {
      op: [el.style.getPropertyValue("opacity"), el.style.getPropertyPriority("opacity")],
      pe: [el.style.getPropertyValue("pointer-events"), el.style.getPropertyPriority("pointer-events")],
      inert: el.inert,
      exd: el.hasAttribute("data-exd-hidden"),
    };
  }
  el.style.setProperty("opacity", "0", "important");
  el.style.setProperty("pointer-events", "none", "important");
  el.inert = true;
  el.setAttribute("data-bgh-stored", "");
  el.setAttribute("data-exd-hidden", "");
  el.removeAttribute("data-bgh-revealed");
  rec.hidden = true;
  rec.revealed = false;
}
function lkShowStyles(rec) {
  const { el, saved } = rec;
  if (!saved) return;
  for (const [prop, [v, prio]] of [["opacity", saved.op], ["pointer-events", saved.pe]]) {
    if (v) el.style.setProperty(prop, v, prio);
    else el.style.removeProperty(prop);
  }
  el.inert = saved.inert;
}
function lkUnhide(rec) {
  if (!rec.saved) return;
  lkShowStyles(rec);
  rec.el.removeAttribute("data-bgh-stored");
  rec.el.removeAttribute("data-bgh-revealed");
  if (!rec.saved.exd) rec.el.removeAttribute("data-exd-hidden");
  rec.saved = null;
  rec.hidden = false;
  rec.revealed = false;
}
// Size of the button with what it unfolded (a few descendants).
function lkUnion(el) {
  const r = el.getBoundingClientRect();
  let [l, t, rr, b] = [r.left, r.top, r.right, r.bottom];
  let n = 0;
  const seen = typeof el.checkVisibility === "function";
  for (const d of el.querySelectorAll("*")) {
    if (++n > 80) break;
    const q = d.getBoundingClientRect();
    if (q.width < 1 || q.height < 1) continue;
    // display/visibility only: our own transparency on the launcher must not
    // hide what it unfolds; a large part that is itself transparent doesn't count.
    if (seen && !d.checkVisibility({ visibilityProperty: true })) continue;
    if ((q.width > 180 || q.height > 180) && Number(getComputedStyle(d).opacity) < 0.05) continue;
    l = Math.min(l, q.left);
    t = Math.min(t, q.top);
    rr = Math.max(rr, q.right);
    b = Math.max(b, q.bottom);
  }
  return { w: rr - l, h: b - t };
}
// Each sync: hidden buttons stay hidden (their extension may rewrite their
// style); one that unfolded shows until it folds again.
function lkEnforce(rec) {
  const item = lkState().items[rec.key];
  if (!rec.el.isConnected || !item) return;
  if (item.float || item.excluded) return lkUnhide(rec);
  if (!rec.hidden && !rec.living) lkHide(rec);
  const u = lkUnion(rec.el);
  if (!rec.base && u.w <= 180 && u.h <= 180) rec.base = u;
  const b = rec.base;
  const open = b ? u.w > Math.max(200, b.w * 1.6) || u.h > Math.max(200, b.h * 1.6) : u.w > 180 || u.h > 180;
  if (open && !rec.revealed) {
    lkShowStyles(rec);
    rec.el.setAttribute("data-bgh-revealed", "");
    rec.revealed = true;
  } else if (!open && (rec.revealed || rec.el.style.getPropertyValue("opacity") !== "0") && !rec.living) {
    lkHide(rec);
  }
}
function lkStore(el, { manual = false } = {}) {
  const st = lkState();
  const label = lkLabel(el);
  let key = lkKeyOf(el, label);
  for (let n = 2; [...lkRecs.values()].some((r) => r.key === key && r.el !== el); n++) key = `${lkKeyOf(el, label)}:${n}`;
  let item = st.items[key];
  if (!item) {
    const legacy = st.legacy?.[label];
    item = st.items[key] = { label, name: legacy?.name || "", float: !!legacy?.float, excluded: !!legacy?.excluded, manual };
    st.order.push(key);
    save();
  } else if (manual) {
    Object.assign(item, { excluded: false, float: false, manual: true });
    save();
  }
  if (item.label !== label && label) {
    item.label = label;
    save();
  }
  let rec = lkRecs.get(key);
  if (rec && rec.el !== el) {
    lkUnwatch(rec);
    lkUnhide(rec);
    rec = null;
  }
  if (!rec) {
    rec = { key, el, hidden: false, saved: null, base: null, revealed: false };
    lkRecs.set(key, rec);
    lkWatch(rec);
  }
  return rec;
}
function lkWatch(rec) {
  let frame = 0;
  const soon = () => {
    if (frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      if (lkRecs.get(rec.key) === rec) lkEnforce(rec);
    });
  };
  rec.ro = new ResizeObserver(soon);
  rec.ro.observe(rec.el);
  for (const c of rec.el.children) rec.ro.observe(c);
  rec.mo = new MutationObserver(soon);
  // "style" too: an extension rewriting its button's style would undo our hiding.
  rec.mo.observe(rec.el, { attributes: true, attributeFilter: ["class", "style", "hidden", "open", "aria-expanded", "data-state"], childList: true });
}
function lkUnwatch(rec) {
  rec.ro?.disconnect();
  rec.mo?.disconnect();
  rec.ro = rec.mo = null;
}
// Finds a manually added button again (it may not look like a launcher).
function lkResolve(key, item) {
  if (key.startsWith("#")) return doc.getElementById(key.slice(1).split(":")[0]);
  const [sel, label] = key.split("@");
  try {
    return [...doc.querySelectorAll(sel)].find((el) => !el.closest("#root") && lkLabel(el) === (label || "").split(":")[0]) || null;
  } catch {
    return null;
  }
  void item;
}
function lkReleaseAll() {
  for (const rec of lkRecs.values()) {
    lkUnwatch(rec);
    lkUnhide(rec);
  }
  lkRecs.clear();
  lkPending.clear();
  lkUnwatchHosts();
}
// On phones and tablets inside apps and chats (Marinara's top bar showing),
// the locker sits just before the ☰ button, styled like its neighbours.
let lkTopBtn = null;
function placeTopbarLocker(show) {
  const bar = show ? $('header[data-component="TopBar"]') : null;
  const more = bar?.querySelector("[data-topbar-more]");
  const nav = bar?.querySelector('nav[data-tour="panel-buttons"], .mari-topbar-panel-nav');
  const ref = more || nav?.lastElementChild;
  if (!ref) {
    lkTopBtn?.remove();
    return;
  }
  if (!lkTopBtn) {
    lkTopBtn = h("button", {
      type: "button",
      class: "mdos-topbar-locker",
      "data-exd": "",
      "aria-label": L.lk.title,
      title: L.lk.title,
      svg: svg("locker"),
      onclick: (e) => {
        e.preventDefault();
        e.stopPropagation();
        openLocker();
      },
    });
  }
  if (more) {
    if (lkTopBtn.nextElementSibling !== more) {
      lkTopBtn.className = `${more.className} mdos-topbar-locker`;
      more.before(lkTopBtn);
    }
  } else if (lkTopBtn.parentElement !== nav || nav.lastElementChild !== lkTopBtn) {
    lkTopBtn.className = `${ref.className} mdos-topbar-locker`;
    nav.append(lkTopBtn);
  }
}
let bghPulled = false;
function lockerTick() {
  const active = state.lockerOn && mode !== "off" && lkBuiltin();
  mbLocker.hidden = !(state.lockerOn && mode !== "off");
  placeTopbarLocker(false);
  if (!active) {
    if (lkRecs.size || lkTopWatched) lkReleaseAll();
    return;
  }
  // Built in: the other extension, if it runs on this page, sleeps.
  if (bghRunning()) bghSleep();
  if (!bghPulled) {
    bghPulled = true;
    void bghPull();
  }
  if (doc.hidden) return;
  lkWatchHosts();
  const now = performance.now();
  const sig = `${doc.body.childElementCount}|${html.childElementCount}`;
  if ((sig !== lkTopSig && now - lkLastScan > 1200) || now - lkLastScan > 15000) {
    lkTopSig = sig;
    lkLastScan = now;
    lkScan();
  }
  if (++lkTicks % 20 === 0) for (const rec of lkRecs.values()) lkEnforce(rec);
}
let lkTopSig = "";
const LK_STABLE_MS = 600;
const LK_HOST_WATCH = { childList: true, subtree: true, attributes: true, attributeFilter: ["hidden", "class", "style"] };
const lkHostObs = new Map();
let lkWakeTimer = 0;
const lkOurs = (n) => n.nodeType !== 1 || !!n.closest?.("[data-mdos], [data-exd], [data-bgh-stored], .mdos-alert-overlay");
function lkWake(added) {
  if (disposed || doc.hidden || !(state.lockerOn && mode !== "off" && lkBuiltin())) return;
  const gap = performance.now() - lkLastScan;
  const wait = added ? 120 : 700;
  if (gap >= wait) {
    marinara.clearTimeout(lkWakeTimer);
    lkWakeTimer = 0;
    lkLastScan = performance.now();
    const before = lkRecs.size;
    lkScan();
    if (lkRecs.size !== before) syncSoon();
    return;
  }
  if (!lkWakeTimer) {
    lkWakeTimer = marinara.setTimeout(() => {
      lkWakeTimer = 0;
      lkWake(true);
    }, wait - gap + 10);
  }
}
const lkHostWake = (list) => {
  let added = false;
  let hit = false;
  for (const m of list) {
    const t = m.target.nodeType === 1 ? m.target : m.target.host;
    if (t && lkOurs(t)) continue;
    hit = true;
    if (m.addedNodes?.length) added = true;
  }
  if (hit) lkWake(added);
};
const lkTopObs = new MutationObserver((list) => {
  let hit = false;
  for (const m of list) for (const n of [...m.addedNodes, ...m.removedNodes]) if (n.nodeType === 1 && !lkOurs(n) && n.id !== "root") hit = true;
  if (!hit) return;
  lkWatchHosts();
  lkWake(true);
});
let lkTopWatched = false;
function lkWatchHosts() {
  if (!lkTopWatched) {
    lkTopWatched = true;
    lkTopObs.observe(doc.body, { childList: true });
    lkTopObs.observe(html, { childList: true });
  }
  for (const host of doc.body.children) {
    if (lkHostObs.has(host) || host.id === "root" || host === ui || host.matches(LK_SKIP)) continue;
    const mo = new MutationObserver(lkHostWake);
    mo.observe(host, LK_HOST_WATCH);
    if (host.shadowRoot) mo.observe(host.shadowRoot, LK_HOST_WATCH);
    lkHostObs.set(host, mo);
  }
  for (const [host, mo] of lkHostObs) {
    if (host.isConnected) continue;
    mo.disconnect();
    lkHostObs.delete(host);
  }
}
function lkUnwatchHosts() {
  lkTopObs.disconnect();
  lkTopWatched = false;
  for (const mo of lkHostObs.values()) mo.disconnect();
  lkHostObs.clear();
  marinara.clearTimeout(lkWakeTimer);
  lkWakeTimer = 0;
}
function lkScan() {
  const st = lkState();
  const seen = new Set();
  for (const el of lkCandidates()) {
    const known = [...lkRecs.values()].find((r) => r.el === el);
    let key = known?.key;
    if (!key) {
      const label = lkLabel(el);
      key = lkKeyOf(el, label);
      if (!st.items[key]) {
        if (!st.auto && !el.hasAttribute("data-drawer-launcher")) continue;
        // New buttons must stay on screen a moment (not a passing popup).
        if (!lkPending.has(key)) {
          lkPending.set(key, performance.now());
          seen.add(`pending:${key}`);
          // Come back for it once it has stayed a moment.
          marinara.setTimeout(() => {
            lkLastScan = -1e9;
            lkWake(true);
          }, LK_STABLE_MS + 60);
          continue;
        }
        if (performance.now() - lkPending.get(key) < LK_STABLE_MS) {
          seen.add(`pending:${key}`);
          continue;
        }
      }
    }
    lkPending.delete(key);
    const rec = lkStore(el);
    seen.add(rec.key);
    lkEnforce(rec);
  }
  for (const k of lkPending.keys()) if (!seen.has(`pending:${k}`)) lkPending.delete(k);
  // Manually added buttons that don't look like launchers are found by key.
  for (const [key, item] of Object.entries(st.items)) {
    if (!item.manual || seen.has(key) || item.excluded) continue;
    const el = lkResolve(key, item);
    if (el) {
      const rec = lkStore(el);
      seen.add(rec.key);
      lkEnforce(rec);
    }
  }
  for (const [key, rec] of lkRecs) {
    if (!rec.el.isConnected) {
      lkUnwatch(rec);
      lkRecs.delete(key);
    }
  }
  lkDetectOwners();
}
// The name shown: the user's, else the owning extension's (when it is Korean),
// else the button's label, like the original locker.

const lkName = (key) => {
  const item = lkState().items[key];
  if (!item) return L.lk.unnamed;
  if (item.name) return item.name;
  const ext = lkRuntime.get(item.ownerId)?.name || item.ownerName || "";
  const label = item.label || "";
  if (hasHangul(ext)) return ext;
  if (hasHangul(label)) return label;
  return ext || label || L.lk.unnamed;
};

// Which extension a stored button belongs to: the runtime list names them;
// a button is matched by the extension stylesheet that styles its id/classes,
// by its label equalling an extension's name, or (rarely, at most once a
// minute) by finding its id/classes/label in the extensions' own code.
let lkRuntime = new Map();
let lkRuntimeAt = -1e9;
const lkOwnerMiss = new Map();
const lkSourceText = new Map();
let lkSourceAt = -1e9;
let lkSourceBusy = false;
async function lkRefreshRuntime() {
  if (performance.now() - lkRuntimeAt < 15_000) return;
  lkRuntimeAt = performance.now();
  try {
    const res = await window.fetch("/api/personal-extensions/runtime/client", { cache: "no-store", credentials: "same-origin" });
    if (!res.ok) return;
    const list = await res.json();
    const arr = Array.isArray(list) ? list : Array.isArray(list?.extensions) ? list.extensions : [];
    const next = new Map();
    for (const x of arr) if (x && typeof x.id === "string") next.set(x.id, { name: String(x.name || ""), url: String(x.runtimeUrl || ""), mode: String(x.executionMode || "") });
    lkRuntime = next;
  } catch {
    /* offline or older server */
  }
}
const LK_STATE_CLASS = /^(is|has|was|state)-|^(open|opened|closed|hidden|show|shown|active|visible|loading|expanded|collapsed|selected|disabled|on|off)$/;
function lkProbes(el) {
  const probes = [el];
  for (let n = el.parentElement, i = 0; n && i < 4 && n !== doc.body && n !== html; n = n.parentElement, i++) probes.push(n);
  let c = 0;
  for (const d of el.querySelectorAll("*")) {
    probes.push(d);
    if (++c >= 20) break;
  }
  return probes;
}
function lkTokens(probes) {
  const out = [];
  for (const p of probes) {
    if (p.id && /^[A-Za-z][\w-]{1,63}$/.test(p.id) && !/\d{5}/.test(p.id) && p.id !== "root") out.push({ t: `#${p.id}`, w: 5 });
    for (const c of p.classList || []) {
      if (c.length < 4 || LK_STATE_CLASS.test(c) || /^(bgh|mdos|exd)-/.test(c) || LK_TW.test(c)) continue;
      out.push({ t: `.${c}`, w: /[-_]/.test(c) ? 3 : 1 });
    }
  }
  return out;
}
const lkHasToken = (sel, token) => {
  for (let from = 0; ; ) {
    const i = sel.indexOf(token, from);
    if (i < 0) return false;
    const next = sel.charAt(i + token.length);
    if (next === "" || /[^\w-]/.test(next)) return true;
    from = i + 1;
  }
};
function lkBest(scores, minimum) {
  let best = "";
  let top = 0;
  let second = 0;
  for (const [id, score] of scores) {
    if (score > top) {
      second = top;
      top = score;
      best = id;
    } else if (score > second) second = score;
  }
  return top >= minimum && top > second ? best : "";
}
function lkCssOwner(el) {
  const probes = lkProbes(el);
  const tokens = lkTokens(probes);
  if (!tokens.length) return "";
  const scores = new Map();
  for (const sheet of doc.styleSheets) {
    const id = sheet.ownerNode?.dataset?.personalExtensionFullPageStyle;
    if (!id) continue;
    let rules;
    try {
      rules = sheet.cssRules;
    } catch {
      continue;
    }
    let score = 0;
    let seen = 0;
    let self = false;
    const walk = (list) => {
      for (const rule of list || []) {
        if (++seen > 5000 || self) return;
        const sel = rule.selectorText;
        if (!sel) {
          if (rule.cssRules) walk(rule.cssRules);
          continue;
        }
        // This extension's own sheets restyle other extensions' buttons; skip them.
        if (sel.includes("mdos-")) {
          self = true;
          return;
        }
        let weight = 0;
        for (const tk of tokens) if (lkHasToken(sel, tk.t)) weight = Math.max(weight, tk.w);
        if (!weight) continue;
        let matched = false;
        for (const p of probes) {
          try {
            if (p.matches(sel)) {
              matched = true;
              break;
            }
          } catch {
            /* selector this engine can't match */
          }
        }
        score += matched ? weight * 2 : weight >= 3 ? 1 : 0;
      }
    };
    walk(rules);
    if (!self && score > 0) scores.set(id, score);
  }
  return lkBest(scores, 4);
}
function lkLabelOwner(el, item) {
  const norm = (v) => String(v || "").replace(/\s+/g, "").toLowerCase();
  const label = norm(lkLabel(el) || item.label);
  if (label.length < 2) return "";
  const exact = [];
  const partial = [];
  for (const [id, ext] of lkRuntime) {
    if (ext.mode && ext.mode !== "full-page") continue;
    const name = norm(ext.name);
    if (!name || /marinaradesktop/.test(name)) continue;
    if (name === label) exact.push(id);
    else if (label.length >= 3 && name.length >= 3 && (name.includes(label) || label.includes(name))) partial.push(id);
  }
  if (exact.length === 1) return exact[0];
  if (!exact.length && partial.length === 1) return partial[0];
  return "";
}
async function lkDetectOwners() {
  await lkRefreshRuntime();
  if (!lkRuntime.size) return;
  const st = lkState();
  let changed = false;
  const pending = [];
  for (const rec of lkRecs.values()) {
    const item = st.items[rec.key];
    if (!item || !rec.el.isConnected) continue;
    if (item.ownerId && !lkRuntime.has(item.ownerId)) item.ownerId = "";
    if (item.ownerId) continue;
    if (performance.now() - (lkOwnerMiss.get(rec.key) || -1e9) < 30_000) continue;
    const id = lkCssOwner(rec.el) || lkLabelOwner(rec.el, item);
    if (id) {
      item.ownerId = id;
      item.ownerName = lkRuntime.get(id)?.name || "";
      changed = true;
      continue;
    }
    lkOwnerMiss.set(rec.key, performance.now());
    const tokens = lkTokens(lkProbes(rec.el))
      .filter((t) => t.w >= 3)
      .map((t) => ({ t: t.t.slice(1), w: t.w }));
    const label = rec.el.getAttribute("aria-label") || rec.el.title || "";
    if (label.length >= 4) tokens.push({ t: label, w: 4, label: true });
    if (tokens.length) pending.push({ item, tokens, scores: new Map() });
  }
  if (changed) {
    save();
    if (popEl?.querySelector(".mdos-lk")) renderLocker(null);
  }
  if (pending.length && !lkSourceBusy && performance.now() - lkSourceAt > 60_000) {
    lkSourceBusy = true;
    lkSourceAt = performance.now();
    try {
      await lkSearchSources(pending);
    } finally {
      lkSourceBusy = false;
    }
  }
}
async function lkSearchSources(pending) {
  const sources = [];
  for (const [id, ext] of lkRuntime) {
    if ((ext.mode && ext.mode !== "full-page") || !ext.url || /marinara\s*desktop/i.test(ext.name)) continue;
    let size = Infinity;
    try {
      size = performance.getEntriesByName(new URL(ext.url, location.href).href)[0]?.encodedBodySize || Infinity;
    } catch {
      /* ignore */
    }
    sources.push({ id, url: ext.url, size });
  }
  sources.sort((a, b) => a.size - b.size);
  for (const src of sources) {
    if (pending.every((p) => p.decided)) break;
    let text = lkSourceText.get(src.url);
    if (text == null) {
      try {
        const res = await window.fetch(src.url, { credentials: "same-origin" });
        text = res.ok ? await res.text() : "";
      } catch {
        text = "";
      }
      lkSourceText.set(src.url, text);
    }
    if (!text) continue;
    for (const p of pending) {
      if (p.decided) continue;
      let score = 0;
      let labelHit = false;
      for (const tk of p.tokens) {
        if (text.includes(tk.t)) {
          score += tk.w;
          if (tk.label) labelHit = true;
        }
      }
      if (score) p.scores.set(src.id, score);
      if ((labelHit && score >= 7) || score >= 12) p.decided = true;
    }
  }
  let changed = false;
  for (const p of pending) {
    const id = lkBest(p.scores, 3);
    if (!id) continue;
    p.item.ownerId = id;
    p.item.ownerName = lkRuntime.get(id)?.name || "";
    changed = true;
  }
  if (changed) {
    save();
    if (popEl?.querySelector(".mdos-lk")) renderLocker(null);
  }
}
// Press the real button: pointer, mouse and click events at its centre,
// with it briefly touchable.
function lkActivate(el) {
  if (!el?.isConnected) return;
  const rec = [...lkRecs.values()].find((r) => r.el === el);
  const savedPE = [el.style.getPropertyValue("pointer-events"), el.style.getPropertyPriority("pointer-events")];
  const wasInert = el.inert;
  if (rec) rec.living = true;
  el.style.setProperty("pointer-events", "auto", "important");
  el.inert = false;
  el.setAttribute("data-bgh-revealed", "");
  const r = el.getBoundingClientRect();
  const x = Math.min(innerWidth - 2, Math.max(1, r.left + r.width / 2));
  const y = Math.min(innerHeight - 2, Math.max(1, r.top + r.height / 2));
  let target = doc.elementFromPoint(x, y);
  for (let i = 0; target?.shadowRoot && i < 4; i++) {
    const inner = target.shadowRoot.elementFromPoint(x, y);
    if (!inner || inner === target) break;
    target = inner;
  }
  const inside = (t) => !!t && (el.contains(t) || el.shadowRoot?.contains(t) || t.getRootNode?.().host === el);
  if (!inside(target)) target = el.matches(LK_INTERACTIVE) ? el : el.querySelector(LK_INTERACTIVE) || el;
  const coarse = matchMedia("(pointer: coarse)").matches;
  const proto = Element.prototype;
  const capture = proto.setPointerCapture;
  const release = proto.releasePointerCapture;
  proto.setPointerCapture = function (id) {
    try {
      return capture.call(this, id);
    } catch {
      /* our pointer isn't a real one */
    }
  };
  proto.releasePointerCapture = function (id) {
    try {
      return release.call(this, id);
    } catch {
      /* our pointer isn't a real one */
    }
  };
  const base = { bubbles: true, cancelable: true, composed: true, view: window, clientX: x, clientY: y, screenX: x, screenY: y, button: 0, detail: 1 };
  const pointer = { ...base, pointerId: coarse ? 7 : 1, pointerType: coarse ? "touch" : "mouse", isPrimary: true, width: 1, height: 1 };
  const down = target.dispatchEvent(new PointerEvent("pointerdown", { ...pointer, buttons: 1, pressure: 0.5 }));
  if (down) target.dispatchEvent(new MouseEvent("mousedown", { ...base, buttons: 1 }));
  if (!target.isConnected) target = doc.elementFromPoint(x, y) || el;
  target.dispatchEvent(new PointerEvent("pointerup", { ...pointer, buttons: 0, pressure: 0 }));
  if (down) target.dispatchEvent(new MouseEvent("mouseup", { ...base, buttons: 0 }));
  try {
    if (target.isConnected && target !== doc.body) target.dispatchEvent(new MouseEvent("click", { ...base, buttons: 0 }));
  } finally {
    proto.setPointerCapture = capture;
    proto.releasePointerCapture = release;
  }
  if (rec) {
    for (let i = 1; i <= 30; i++) marinara.setTimeout(() => !rec.living && lkEnforce(rec), 100 * i + 460);
  }
  marinara.setTimeout(() => {
    if (rec) {
      rec.living = false;
      lkEnforce(rec);
    } else if (el.isConnected) {
      // Another locker's button: put its own hiding back.
      if (savedPE[0]) el.style.setProperty("pointer-events", savedPE[0], savedPE[1]);
      else el.style.removeProperty("pointer-events");
      el.inert = wasInert;
      el.removeAttribute("data-bgh-revealed");
    }
  }, 450);
}
// The list (and its editor) in a popover under the menu-bar icon, or centred.
let lkEditing = false;
function openLocker(anchor = mbLocker.isConnected && isDesktop() ? mbLocker : null) {
  lkEditing = false;
  if (lkBuiltin()) {
    lkOwnerMiss.clear();
    lkDetectOwners();
  } else {
    // Its names, then the list again with them.
    void bghPull().then(() => {
      if (qpPopOpenLocker()) renderLocker(anchor);
    });
  }
  renderLocker(anchor);
}
const qpPopOpenLocker = () => !!doc.querySelector(".mdos-pop .mdos-lk");
// Which side gathers (both modes, at the top of the editor).
function lkEngineChooser(anchor) {
  const seg = h(
    "div",
    { class: "mdos-seg mdos-lk-engine", role: "radiogroup", "aria-label": L.lk.engine },
    ...[
      ["builtin", L.lk.engineBuiltin],
      ["bgh", L.lk.engineBgh],
    ].map(([id, label]) =>
      h("button", {
        type: "button",
        role: "radio",
        "aria-checked": String((state.lockerEngine || "builtin") === id),
        class: `mdos-seg-btn${(state.lockerEngine || "builtin") === id ? " is-on" : ""}`,
        text: label,
        onclick: () => {
          setLockerEngine(id);
          renderLocker(anchor);
        },
      }),
    ),
  );
  const notes = [h("p", { class: "mdos-lk-hint", text: L.lk.engineHint })];
  if (!lkBuiltin() && !bghRunning()) {
    // It isn't running here: slept by us earlier on this page, or off.
    const known = [...lkRuntime.values()].some((x) => x.name === BGH_NAME);
    notes.push(
      known || bghSlept
        ? h("p", { class: "mdos-lk-note" }, L.lk.bghReload, " ", h("button", { type: "button", class: "mdos-btn", text: L.lk.reload, onclick: () => location.reload() }))
        : h("p", { class: "mdos-lk-note", text: L.lk.bghOff }),
    );
  }
  return h("div", { class: "mdos-lk-engine-box" }, h("h4", { text: L.lk.engine }), seg, ...notes);
}
function lkIcon(el) {
  const art = el.querySelector("svg, img");
  if (art) return art.cloneNode(true);
  const text = (el.textContent || "").trim();
  return /^\p{Extended_Pictographic}/u.test(text) ? text.slice(0, 2) : lkLabel(el).charAt(0) || "•";
}
function renderLocker(anchor) {
  const st = lkState();
  const live = st.order.filter((k) => lkRecs.get(k)?.el.isConnected && !st.items[k]?.excluded);
  const body = h("div", { class: "mdos-pop-body mdos-lk" });
  if (!lkEditing && !lkBuiltin()) {
    // The 확장 보관함 extension gathers: its buttons, by its names.
    const items = lockerItems();
    body.append(
      items.length
        ? h(
            "div",
            { class: `mdos-lk-list${isTouch() ? " is-grid" : ""}`, role: "list" },
            ...items.map((it) =>
              h(
                "button",
                {
                  type: "button",
                  role: "listitem",
                  class: "mdos-lk-row",
                  onclick: () => {
                    closePop();
                    marinara.setTimeout(() => lkActivate(it.el), 0);
                  },
                },
                h("span", { class: "mdos-lk-ico" }, lkIcon(it.el)),
                h("span", { class: "mdos-lk-name", text: it.label }),
              ),
            ),
          )
        : h("p", { class: "mdos-lk-empty", text: L.lk.empty }),
      h("div", { class: "mdos-row mdos-lk-foot" }, h("button", { type: "button", class: "mdos-btn", text: L.lk.edit, onclick: () => ((lkEditing = true), renderLocker(anchor)) })),
    );
  } else if (lkEditing && !lkBuiltin()) {
    body.append(
      lkEngineChooser(anchor),
      h("p", { class: "mdos-lk-hint", text: L.lk.bghEdit }),
      h(
        "div",
        { class: "mdos-row mdos-lk-foot" },
        h("button", {
          type: "button",
          class: "mdos-btn",
          text: L.lk.bghOpen,
          onclick: () => {
            const btn = doc.querySelector(".bgh-topbar-btn");
            closePop();
            if (btn) marinara.setTimeout(() => btn.click(), 0);
            else toast(L.lk.bghNoButton);
          },
        }),
        h("button", { type: "button", class: "mdos-btn mdos-btn--primary", text: L.lk.done, onclick: () => ((lkEditing = false), renderLocker(anchor)) }),
      ),
    );
  } else if (!lkEditing) {
    body.append(
      live.length
        ? h(
            "div",
            { class: `mdos-lk-list${isTouch() ? " is-grid" : ""}`, role: "list" },
            ...live.map((k) => {
              const rec = lkRecs.get(k);
              return h(
                "button",
                {
                  type: "button",
                  role: "listitem",
                  class: "mdos-lk-row",
                  onclick: () => {
                    closePop();
                    marinara.setTimeout(() => lkActivate(rec.el), 0);
                  },
                },
                h("span", { class: "mdos-lk-ico" }, lkIcon(rec.el)),
                h("span", { class: "mdos-lk-name", text: lkName(k) }),
                st.items[k].float ? h("small", { text: L.lk.onScreen }) : null,
              );
            }),
          )
        : h("p", { class: "mdos-lk-empty", text: L.lk.empty }),
      h("div", { class: "mdos-row mdos-lk-foot" }, h("button", { type: "button", class: "mdos-btn", text: L.lk.edit, onclick: () => ((lkEditing = true), renderLocker(anchor)) })),
    );
  } else {
    const rerender = () => {
      save();
      bghPushSoon();
      lockerTick();
      renderLocker(anchor);
    };
    const move = (k, d) => {
      const i = st.order.indexOf(k);
      const j = i + d;
      if (i < 0 || j < 0 || j >= st.order.length) return;
      [st.order[i], st.order[j]] = [st.order[j], st.order[i]];
      rerender();
    };
    const keys = st.order.filter((k) => st.items[k] && !st.items[k].excluded);
    const removed = st.order.filter((k) => st.items[k]?.excluded);
    body.append(
      ...[
      lkEngineChooser(anchor),
      h(
        "div",
        { class: "mdos-lk-edit" },
        ...keys.map((k) => {
          const item = st.items[k];
          const present = !!lkRecs.get(k)?.el.isConnected;
          return h(
            "div",
            { class: `mdos-lk-erow${present ? "" : " is-gone"}` },
            h("input", {
              type: "text",
              class: "mdos-input",
              maxlength: "40",
              value: item.name || "",
              placeholder: (() => {
                const keep = item.name;
                item.name = "";
                const auto = lkName(k);
                item.name = keep;
                return auto;
              })(),
              "aria-label": L.lk.rename,
              onchange: (e) => {
                item.name = e.target.value.trim().slice(0, 40);
                save();
                bghPushSoon();
              },
            }),
            h("button", { type: "button", class: "mdos-snip-act", title: L.lk.up, "aria-label": L.lk.up, text: "↑", onclick: () => move(k, -1) }),
            h("button", { type: "button", class: "mdos-snip-act", title: L.lk.down, "aria-label": L.lk.down, text: "↓", onclick: () => move(k, 1) }),
            h(
              "label",
              { class: "mdos-lk-keep", title: L.lk.keep },
              h("input", {
                type: "checkbox",
                checked: !!item.float,
                onchange: (e) => {
                  item.float = e.target.checked;
                  rerender();
                },
              }),
              h("span", { text: L.lk.keep }),
            ),
            h("button", {
              type: "button",
              class: "mdos-snip-act is-danger",
              text: present ? L.lk.remove : L.lk.forget,
              onclick: () => {
                if (present) item.excluded = true;
                else {
                  delete st.items[k];
                  st.order = st.order.filter((x) => x !== k);
                }
                rerender();
              },
            }),
          );
        }),
      ),
      removed.length
        ? h(
            "div",
            { class: "mdos-lk-removed" },
            h("h4", { text: L.lk.removed }),
            ...removed.map((k) =>
              h(
                "div",
                { class: "mdos-lk-erow" },
                h("span", { class: "mdos-lk-name", text: lkName(k) }),
                h("button", {
                  type: "button",
                  class: "mdos-btn",
                  text: L.lk.putBack,
                  onclick: () => {
                    Object.assign(st.items[k], { excluded: false, float: false });
                    rerender();
                  },
                }),
              ),
            ),
          )
        : null,
      h(
        "label",
        { class: "mdos-cc-toggle" },
        h("span", { text: L.lk.auto }),
        h("input", { type: "checkbox", role: "switch", checked: st.auto !== false, onchange: (e) => ((st.auto = e.target.checked), save(), bghPushSoon()) }),
      ),
      h(
        "label",
        { class: "mdos-cc-toggle" },
        h("span", { text: L.lk.on }),
        h("input", { type: "checkbox", role: "switch", checked: !!state.lockerOn, onchange: (e) => (updateSetting("lockerOn", e.target.checked), lockerTick()) }),
      ),
      h(
        "div",
        { class: "mdos-row mdos-lk-foot" },
        h("button", { type: "button", class: "mdos-btn", text: L.lk.pick, onclick: () => (closePop(), lkStartPick()) }),
        h("button", { type: "button", class: "mdos-btn mdos-btn--primary", text: L.lk.done, onclick: () => ((lkEditing = false), renderLocker(anchor)) }),
      ),
      ].filter(Boolean),
    );
  }
  // Phones and tablets: a sheet from the bottom edge, like iOS.
  for (const n of [...body.childNodes]) if (n.nodeType === 3 && n.data === "null") n.remove();
  openPop(body, isTouch() ? null : anchor, { title: L.lk.title, wide: lkEditing, cls: isTouch() ? "mdos-pop--sheet" : "" });
}
// "Add by tapping": the next tap picks a floating element (not Marinara's own).
let lkPick = null;
function lkStartPick() {
  lkStopPick();
  const banner = h(
    "div",
    { class: "mdos-lk-banner", "data-exd": "" },
    h("span", { text: L.lk.pickBanner }),
    h("button", { type: "button", class: "mdos-btn", text: L.qp.cancel, onclick: () => lkStopPick() }),
  );
  ui.append(banner);
  let swallowUntil = 0;
  const swallow = (e) => {
    if (performance.now() < swallowUntil) {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
    }
  };
  const onDown = (e) => {
    if (banner.contains(e.target)) return;
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    swallowUntil = performance.now() + 900;
    const path = e.composedPath().filter((n) => n instanceof Element);
    let el = path.find((n) => [...lkRecs.values()].some((r) => r.el === n));
    if (!el) {
      const floating = path.filter((n) => {
        if (n === doc.body || n === html) return false;
        const cs = getComputedStyle(n);
        const r = n.getBoundingClientRect();
        return /fixed|absolute/.test(cs.position) && r.width <= 300 && r.height <= 300;
      });
      el = floating[floating.length - 1] || path.find((n) => n.matches?.(LK_INTERACTIVE));
    }
    if (!el || el === doc.body || el.closest("[data-mdos], [data-exd]")) return;
    if (el.closest("#root")) {
      toast(L.lk.pickNo);
      return;
    }
    const rec = lkStore(el, { manual: true });
    lkEnforce(rec);
    toast(L.lk.picked);
    lkStopPick();
  };
  const onKey = (e) => e.key === "Escape" && lkStopPick();
  doc.addEventListener("pointerdown", onDown, true);
  for (const t of ["pointerup", "mouseup", "touchend", "click"]) doc.addEventListener(t, swallow, true);
  doc.addEventListener("keydown", onKey, true);
  const timer = marinara.setTimeout(() => lkStopPick(), 30_000);
  lkPick = () => {
    banner.remove();
    doc.removeEventListener("pointerdown", onDown, true);
    marinara.setTimeout(() => {
      for (const t of ["pointerup", "mouseup", "touchend", "click"]) doc.removeEventListener(t, swallow, true);
    }, 950);
    doc.removeEventListener("keydown", onKey, true);
    marinara.clearTimeout(timer);
  };
}
function lkStopPick() {
  lkPick?.();
  lkPick = null;
}

// Phones and tablets have no top bar (like the desktop): two small glass
// buttons at the top left take its place inside apps — the chat list
// (fold / unfold) and a menu sheet with the panels (characters, personas…,
// settings), the extension locker and Customize. Home is the home indicator.
const TOUCH_MENU = ["mode:conversation", "mode:roleplay", "mode:game", "home", "characters", "personas", "lorebooks", "presets", "connections", "agents", "settings", "locker", "customize"];
const tctlList = h("button", {
  type: "button",
  class: "mdos-tctl-btn",
  "aria-label": L.toggleList,
  title: L.toggleList,
  svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4.5" width="18" height="15" rx="3"/><path d="M9.5 4.5v15"/></svg>',
  onclick: () => {
    click($(SEL.chatsBtn));
    syncSoon();
  },
});
const tctlMenu = h("button", {
  type: "button",
  class: "mdos-tctl-btn",
  "aria-label": L.menu,
  title: L.menu,
  svg: '<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="5.5" cy="12" r="1.9"/><circle cx="12" cy="12" r="1.9"/><circle cx="18.5" cy="12" r="1.9"/></svg>',
  onclick: () => openTouchMenu(),
});
ui.append(h("div", { id: "mdos-tctl", "data-exd": "" }, tctlList, tctlMenu));
// The buttons keep to the top left, but step down below anything another
// extension floats in that corner (a relationship tracker…), so it stays
// visible. Only floating elements outside Marinara's app count (not its own
// chat header). Checked on each sync; it moves only when the corner changes.
let tctlTop = "";
// The composer's text field never shows a box of its own when tapped: some
// themes give every focused textarea a border and ring. Set inline (with
// !important), which outranks every stylesheet, once per field.
function cleanComposer() {
  const ta = $once("textarea[data-chat-composer]");
  if (!ta || ta.hasAttribute("data-mdos-clean")) return;
  ta.setAttribute("data-mdos-clean", "");
  ta.style.setProperty("border", "0", "important");
  ta.style.setProperty("outline", "none", "important");
  ta.style.setProperty("box-shadow", "none", "important");
}
// Marinara's own chat bubbles (the relationship tracker, chat settings) sit
// in that corner too: they count, though they live inside Marinara's app.
let tctlAt = -1e9;
function placeTouchControls() {
  // At most every 2 s (hit-testing the corner each sync was the costliest
  // part of an idle sync on phones).
  if (performance.now() - tctlAt < 2000) return;
  tctlAt = performance.now();
  const box = tctlList.parentElement;
  if (!box || getComputedStyle(box).display === "none") return;
  const r = box.getBoundingClientRect();
  let top = safeProbe.getBoundingClientRect().top + 10;
  const blockerAt = (x, y) => {
    for (const e of doc.elementsFromPoint(x, y)) {
      if (e === html || e === doc.body || e.closest("#mdos-ui, [data-mdos], [data-exd]")) continue;
      const bubble = e.closest(".mari-window-bubble");
      if (bubble) return bubble;
      // Small floating buttons only: a dialog or sheet covering the screen is not a corner button.
      if (!e.closest("#root") && getComputedStyle(e).position === "fixed") {
        const q = e.getBoundingClientRect();
        if (q.width <= 200 && q.height <= 200) return e;
      }
    }
    return null;
  };
  for (let i = 0; i < 4; i++) {
    const hit = [r.left + 19, r.left + 65, r.right - 6].map((x) => blockerAt(x, top + 19)).find(Boolean);
    if (!hit) break;
    top = Math.round(hit.getBoundingClientRect().bottom + 8);
  }
  // Never pushed far down the screen.
  top = Math.min(top, Math.round(innerHeight * 0.35));
  const next = `${Math.round(top)}px`;
  if (next !== tctlTop) {
    tctlTop = next;
    setVar("--mdos-tctl-top", next);
  }
}
// Where the status bar ends (env(safe-area-inset-top) in px).
const safeProbe = h("div", { "aria-hidden": "true", "data-exd": "", style: "position:fixed;top:env(safe-area-inset-top,0px);left:0;width:0;height:0;visibility:hidden;pointer-events:none" });
ui.append(safeProbe);
function openTouchMenu() {
  const grid = h(
    "div",
    { class: "mdos-tmenu", role: "list" },
    ...TOUCH_MENU.map((id) => appById(id))
      .filter(Boolean)
      .map((a, i) =>
        appTile(a, i, (picked) => {
          closePop();
          launch(picked.id);
        }),
      ),
  );
  openPop(h("div", { class: "mdos-pop-body" }, grid), null, { title: L.menu, cls: "mdos-pop--sheet" });
}

// Tablet split view: a chat picked from the list keeps the list open (Marinara
// closes its sheet on a pick); sync reopens it next to the chat.
on(
  doc,
  "click",
  (event) => {
    if (!isTouch() || !html.classList.contains("mdos-tablet") || state.messengerPane === false || innerWidth < 1000) return;
    if (event.target instanceof Element && event.target.closest('aside[data-component="ChatSidebarPanel"] [data-drag-kind="chat"]')) {
      keepListAt = performance.now();
      splitHoldUntil = keepListAt + 1500;
      let tries = 0;
      const reopen = () => {
        if (!$('aside[data-component="ChatSidebarPanel"]')) {
          keepListAt = 0;
          click($(SEL.chatsBtn));
          syncSoon();
          return;
        }
        if (++tries < 40) marinara.setTimeout(reopen, 25);
      };
      marinara.setTimeout(reopen, 25);
    }
  },
  true,
);

// Editor sections: Marinara highlights the section in view while scrolling, so
// a picked section lit every one it passed on the way. While it jumps, only
// the picked one is lit.
let jumpTimer = 0;
on(
  doc,
  "click",
  (event) => {
    const tab = event.target instanceof Element ? event.target.closest(".mari-editor-tab") : null;
    const nav = tab?.closest(".mari-editor-navigation-tabs");
    if (!nav) return;
    for (const t of nav.querySelectorAll("[data-mdos-picked]")) t.removeAttribute("data-mdos-picked");
    tab.setAttribute("data-mdos-picked", "");
    nav.classList.add("mdos-jumping");
    marinara.clearTimeout(jumpTimer);
    jumpTimer = marinara.setTimeout(() => {
      nav.classList.remove("mdos-jumping");
      tab.removeAttribute("data-mdos-picked");
    }, 1100);
  },
  true,
);

// ── Chat list per app: Messenger / Books / Arcade ─────────────
// The list takes the look of the app it belongs to (the mode tab shown):
// Conversation is a messenger — with each chat's last message under its
// name, which Marinara's list doesn't carry, so it is fetched (one message,
// only for chats on screen, two at a time, again only when the chat's time
// changes). Roleplay is a bookshelf, Game a game library (CSS).
// chatId -> { key, text }; kept in this browser across reloads (newest 300).
const previews = new Map();
try {
  for (const [id, p] of JSON.parse(localStorage.getItem("mdos.previews") || "[]")) if (p && typeof p.text === "string") previews.set(id, p);
} catch {
  /* private mode */
}
let pvSaveTimer = 0;
function pvSave() {
  marinara.clearTimeout(pvSaveTimer);
  pvSaveTimer = marinara.setTimeout(() => {
    try {
      localStorage.setItem("mdos.previews", JSON.stringify([...previews].slice(-300)));
    } catch {
      /* full or private */
    }
  }, 1500);
}
// Relative times ("2시간 전") change by themselves; only "just now" means a
// new message arrived, so only that sends for the preview again.
const FRESH_TIME = /방금|just now|^now$|^\d+\s*(초|분|sec|min|s|m)\b/i;
const pvQueue = [];
let pvBusy = 0;
const pvSeen = new WeakSet();
const pvIO = typeof IntersectionObserver === "function"
  ? new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) pvWant(e.target);
    })
  : null;
const rowTime = (row) => row.querySelector(":scope > .tabular-nums")?.textContent.trim() || "";
function pvWant(row) {
  const id = row.getAttribute("data-chat-id");
  if (!id || activeChatMode() !== "conversation") return;
  const p = previews.get(id);
  const t = rowTime(row);
  if ((p && (p.key === t || !FRESH_TIME.test(t))) || pvQueue.includes(id)) {
    if (p) paintPreview(row);
    return;
  }
  pvQueue.push(id);
  pvPump();
}
function pvText(m) {
  let t = typeof m?.content === "string" ? m.content : typeof m?.text === "string" ? m.text : "";
  t = t
    .replace(/<[^>]+>/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "🖼")
    .replace(/[*_`#>~]+/g, "")
    .replace(/\s+/g, " ")
    .trim();
  if (!t && (m?.attachments?.length || m?.images?.length)) t = "🖼";
  const mine = m?.role === "user";
  return t ? `${mine ? (KO ? "나: " : "You: ") : ""}${t.slice(0, 90)}` : "";
}
function pvPump() {
  while (pvBusy < 2 && pvQueue.length) {
    const id = pvQueue.shift();
    const row = doc.querySelector(`${SEL.chatRows}[data-chat-id="${CSS.escape(id)}"]`);
    if (!row) continue;
    const key = rowTime(row);
    pvBusy++;
    window
      .fetch(`/api/chats/${encodeURIComponent(id)}/messages?limit=1`, { credentials: "same-origin" })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        const list = Array.isArray(data) ? data : data?.messages || data?.items || [];
        const last = list.reduce((a, m) => (!a || String(m?.createdAt || "") >= String(a?.createdAt || "") ? m : a), null);
        previews.delete(id);
        previews.set(id, { key, text: last ? pvText(last) : "" });
        pvSave();
        paintPreview(doc.querySelector(`${SEL.chatRows}[data-chat-id="${CSS.escape(id)}"]`));
      })
      .catch(() => previews.set(id, { key, text: "" }))
      .finally(() => {
        pvBusy--;
        pvPump();
      });
  }
}
function paintPreview(row) {
  const block = row?.querySelector(":scope > .min-w-0.flex-1");
  if (!block) return;
  const text = previews.get(row.getAttribute("data-chat-id"))?.text || "";
  let el = block.querySelector(":scope > .mdos-preview");
  if (!text) return el?.remove();
  if (!el) {
    el = h("span", { class: "mdos-preview", "data-exd": "" });
    block.append(el);
  }
  if (el.textContent !== text) el.textContent = text;
}
// Roleplay / Game rows: "read / played 2 weeks ago" under the title.
const relFmt = typeof Intl.RelativeTimeFormat === "function" ? new Intl.RelativeTimeFormat(KO ? "ko" : "en", { numeric: "auto" }) : null;
function relTime(ms) {
  if (!ms || !relFmt) return "";
  const sec = (ms - Date.now()) / 1000;
  const a = Math.abs(sec);
  const [v, u] =
    a < 60 ? [sec, "second"] : a < 3600 ? [sec / 60, "minute"] : a < 86400 ? [sec / 3600, "hour"] : a < 604800 ? [sec / 86400, "day"] : a < 2629800 ? [sec / 604800, "week"] : a < 31557600 ? [sec / 2629800, "month"] : [sec / 31557600, "year"];
  return relFmt.format(Math.round(v), u);
}
let subSig = "";
function paintSubs(sidebar, mode) {
  loadChatInfo();
  const rows = sidebar.querySelectorAll(SEL.chatRows);
  const sig = `${mode}|${rows.length}|${rows[0]?.getAttribute("data-chat-id") || ""}|${chatInfo.size}|${chatInfoAt}|${Math.floor(Date.now() / 60000)}`;
  if (sig === subSig) return;
  subSig = sig;
  for (const row of rows) {
    const block = row.querySelector(":scope > .min-w-0.flex-1");
    if (!block) continue;
    const rel = relTime(chatInfo.get(row.getAttribute("data-chat-id"))?.at);
    let el = block.querySelector(":scope > .mdos-sub");
    if (!rel) {
      el?.remove();
      continue;
    }
    const text = mode === "game" ? (KO ? `${rel} 플레이` : `Played ${rel}`) : KO ? `${rel} 읽음` : `Read ${rel}`;
    if (!el) {
      el = h("span", { class: "mdos-sub", "data-exd": "" });
      block.append(el);
    }
    if (el.textContent !== text) el.textContent = text;
  }
}
let listSig = "";
function refreshChatList() {
  const sidebar = $once(".mari-chat-sidebar");
  if (!sidebar) return;
  const mode = activeChatMode() || "";
  if (sidebar.getAttribute("data-mdos-list") !== mode) sidebar.setAttribute("data-mdos-list", mode);
  // The list's big title names the app (Conversation / Roleplay / Game).
  const title = sidebar.querySelector(".mari-sidebar-header h2");
  const name = L.modes[MODE_KEYS.indexOf(mode)] || "";
  if (title && title.getAttribute("data-mdos-title") !== name) title.setAttribute("data-mdos-title", name);
  setAttr(sidebar, "data-mdos-big", name);
  if (mode === "roleplay" || mode === "game") return paintSubs(sidebar, mode);
  if (mode !== "conversation") return;
  // Only when the rows changed (count / first row) — not a walk every sync.
  const rows = sidebar.querySelectorAll(SEL.chatRows);
  const sig = `${rows.length}|${rows[0]?.getAttribute("data-chat-id") || ""}|${rowTime(rows[0] || doc.body)}`;
  const changed = sig !== listSig;
  listSig = sig;
  for (const row of rows) {
    if (!pvSeen.has(row)) {
      pvSeen.add(row);
      pvIO?.observe(row);
    }
    if (changed || !row.querySelector(":scope > .min-w-0.flex-1 > .mdos-preview")) {
      const p = previews.get(row.getAttribute("data-chat-id"));
      if (p && p.key !== rowTime(row) && FRESH_TIME.test(rowTime(row))) pvWant(row);
      else if (p) paintPreview(row);
    }
  }
}

// ── Convenience ───────────────────────────────────────────────

// New chat in whichever mode the chat list shows (Conversation if none yet).
function newChatHere() {
  const btn = () => $(".mari-chat-sidebar .mari-chat-mode-action");
  if (btn()) return btn().click();
  launch(`mode:${activeChatMode() || "conversation"}`);
  let tries = 0;
  const poll = () => {
    const b = btn();
    if (b) b.click();
    else if (++tries < 15) marinara.setTimeout(poll, 100);
  };
  marinara.setTimeout(poll, 150);
}

// Focus mode (desktop): only the chat window, filling the screen — no menu
// bar, Dock, widgets or other windows. A small pill at the top leaves it.
let focusMode = false;
const focusPill = h("button", {
  type: "button",
  id: "mdos-focus-exit",
  text: `✕ ${L.focusExit}`,
  onclick: () => setFocusMode(false),
});
ui.append(focusPill);
function setFocusMode(next) {
  focusMode = !!next && isDesktop();
  toggleClass("mdos-focus", focusMode);
  if (focusMode) {
    closeOverlays();
    if (state.mainMinimized) setMainMinimized(false);
    focusWin("main");
  }
  updateMenubar();
}

// Character count for the field being written in an editor, at its corner.
const countEl = h("div", { id: "mdos-count", "aria-hidden": "true" });
ui.append(countEl);
let countField = null;
let countFrame = 0;
function placeCount() {
  countFrame = 0;
  if (!countField?.isConnected) return hideCount();
  const r = countField.getBoundingClientRect();
  if (r.bottom < 0 || r.top > innerHeight) return countEl.classList.remove("is-on");
  countEl.textContent = `${countField.value.length.toLocaleString()}${L.chars}`;
  countEl.style.left = `${Math.round(r.right - 8)}px`;
  countEl.style.top = `${Math.round(r.bottom - 8)}px`;
  countEl.classList.add("is-on");
}
const queueCount = () => countField && !countFrame && (countFrame = raf(placeCount));
function hideCount() {
  countField = null;
  countEl.classList.remove("is-on");
}
on(doc, "focusin", (event) => {
  const t = event.target;
  if (mode !== "off" && t instanceof HTMLElement && t.matches("textarea, input[type=text], input:not([type])") && t.closest(".mari-editor-shell")) {
    countField = t;
    queueCount();
  }
});
on(doc, "focusout", (event) => {
  if (event.target === countField) hideCount();
});
let countMoved = 0;
on(doc, "input", (event) => {
  if (event.target !== countField) return;
  countEl.textContent = `${countField.value.length.toLocaleString()}${L.chars}`;
  if (performance.now() - countMoved > 500) {
    countMoved = performance.now();
    queueCount();
  }
});
on(doc, "scroll", queueCount, { capture: true, passive: true });

// ── Boot ──────────────────────────────────────────────────────

function bootSplash() {
  let shown = false;
  try {
    shown = sessionStorage.getItem("mdos-booted") === "1";
    sessionStorage.setItem("mdos-booted", "1");
  } catch {
    /* private mode: just show it */
  }
  if (shown || EMBED || !state.bootSplash || mode === "off") return;
  const splash = h(
    "div",
    { id: "mdos-boot", "aria-hidden": "true", "data-exd": "" },
    h("div", { class: "mdos-boot-logo", svg: LOGO }),
    h("div", { class: "mdos-boot-bar" }, h("span")),
  );
  doc.body.append(splash);
  const duration = reducedMotion() ? 200 : 1100;
  splash.style.setProperty("--boot-ms", `${duration}ms`);
  marinara.setTimeout(() => splash.classList.add("is-done"), duration);
  marinara.setTimeout(() => splash.remove(), duration + 600);
  disposers.push(() => splash.remove());
}

// ── Embed: one app filling a window's frame ───────────────────

function embedStart() {
  const kind = EMBED.startsWith("mode:") || EMBED.startsWith("chat:") ? "chat" : PANEL_IDS.includes(EMBED) ? "panel" : "main";
  html.dataset.mdosEmbedKind = kind;
  const fit = () => {
    const id = kind === "panel" ? "panel" : "main";
    writeRect(id, { ...rectOf(id), snap: "max" });
    applyAllRects();
    focusWin(id);
  };
  let tries = 0;
  const go = () => {
    if (disposed) return;
    tries++;
    let ready = mode !== "off";
    if (ready && EMBED.startsWith("chat:")) {
      ready = !!$(`${SEL.chatRows}[data-chat-id="${CSS.escape(EMBED.slice(5))}"]`);
      if (!ready && tries === 3 && !chatsOpen()) click($(SEL.chatsBtn));
    } else if (ready && PANEL_IDS.includes(EMBED)) ready = !!panelBtn(EMBED);
    else if (ready && EMBED.startsWith("tab:")) ready = !!$(SEL.homeTabs);
    if (!ready && tries < 40) return marinara.setTimeout(go, 250);
    launch(EMBED);
    fit();
    marinara.setTimeout(fit, 400);
  };
  go();
  // Tell the desktop around the frame when this window is clicked (to bring
  // it forward and close flyouts), and pass on window-management shortcuts.
  const tell = (data) => {
    try {
      window.parent.postMessage({ mdos: true, ...data }, location.origin);
    } catch {
      /* the page around us is gone */
    }
  };
  on(doc, "pointerdown", () => tell({ type: "focus" }), { capture: true, passive: true });
  on(
    window,
    "keydown",
    (event) => {
      if (!(event.ctrlKey && event.altKey) || !/^(Arrow|Digit[123]$|KeyM$|KeyL$|KeyH$|Comma$)/.test(event.code)) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      tell({ type: "key", code: event.code });
    },
    true,
  );
}
// The desktop side: messages from the app windows' frames.
on(window, "message", (event) => {
  if (EMBED || event.origin !== location.origin || !event.data?.mdos) return;
  const win = [...appWins.values()].find((w) => w.frame && w.frame.contentWindow === event.source);
  if (!win) return;
  if (event.data.type === "focus") {
    closeMenu();
    closeCC();
    closeCal();
    closeLaunchpad();
    closeSnapFly();
    if (focused !== win.id) focusWin(win.id);
  } else if (event.data.type === "key" && typeof event.data.code === "string") {
    focusWin(win.id);
    window.dispatchEvent(new KeyboardEvent("keydown", { code: event.data.code, ctrlKey: true, altKey: true, bubbles: true, cancelable: true }));
  }
});

applySettings();
sync();
tick();
bootSplash();
if (EMBED) embedStart();
marinara.log.info("Marinara Desktop ready");

// ── Cleanup (extension disabled or updated) ───────────────────

return () => {
  disposed = true;
  mode = "off";
  observer.disconnect();
  viewObserver.disconnect();
  themeObserver.disconnect();
  for (const mo of nullObservers) mo.disconnect();
  removeSceneBar();
  pvIO?.disconnect();
  for (const el of $$(".mdos-preview, .mdos-sub")) el.remove();
  html.removeAttribute("data-mdos-chatapp");
  chatTitleEl?.remove();
  chatOtherEl?.remove();
  lkStopPick();
  lkReleaseAll();
  lkTopBtn?.remove();
  closeQpMenu();
  for (const el of $$(".mdos-qp-plus, .mdos-qp-chips, .mdos-alert-overlay")) el.remove();
  for (const el of $$("[data-mdos-qp]")) el.toggleAttribute("data-mdos-qp", false);
  for (const el of $$("[data-mdos-null]")) el.toggleAttribute("data-mdos-null", false);
  marinara.clearInterval(clockTimer);
  marinara.clearInterval(viewTimer);
  marinara.clearInterval(pollTimer);
  marinara.clearInterval(dlgTimer);
  CSS.highlights?.delete("mdos-dlg");
  marinara.clearTimeout(syncTimer);
  marinara.clearTimeout(dockHideTimer);
  // Flush anything still waiting to be saved (a note typed a moment ago).
  for (const [timer, key, value] of [
    [saveTimer, "desktop", state],
    [imageTimer, "desktopImages", images],
    [notesTimer, "desktopNotes", notesStore],
  ]) {
    if (!timer) continue;
    marinara.clearTimeout(timer);
    marinara.storage.patch({ [key]: value }).catch(() => {});
  }
  disposers.forEach((dispose) => dispose());
  removeChrome();
  removeSpringboard();
  removeAllAppWins();
  appLayer.remove();
  for (const el of $$("[data-mdos-tip]")) {
    for (const a of ["data-mdos-tip", "data-mdos-tip-open", "tabindex", "role", "aria-label"]) el.removeAttribute(a);
  }
  for (const el of $$("[data-mdos-tip-row]")) el.removeAttribute("data-mdos-tip-row");
  for (const el of $$("[data-mdos-icon-tab]")) {
    el.removeAttribute("data-mdos-icon-tab");
    el.removeAttribute("aria-label");
    if (el.hasAttribute("data-mdos-set-title")) el.removeAttribute("title");
    el.removeAttribute("data-mdos-set-title");
  }
  ui.remove();
  wallpaper.remove();
  widgetLayer.remove();
  returnPill.remove();
  lateCss.remove();
  for (const ta of $$("textarea[data-mdos-clean]")) {
    for (const p of ["border", "outline", "box-shadow"]) ta.style.removeProperty(p);
    ta.removeAttribute("data-mdos-clean");
  }
  for (const cls of [...html.classList]) if (cls.startsWith("mdos")) html.classList.remove(cls);
  for (const key of Object.keys(html.dataset)) if (key.startsWith("mdos")) delete html.dataset[key];
  for (const name of [...html.style]) if (name.startsWith("--mdos-")) html.style.removeProperty(name);
};
