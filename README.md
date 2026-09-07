# qt-daily

매일의 QT(묵상) 콘텐츠를 [Quartz](https://quartz.jzhao.xyz/)로 빌드해 GitHub Pages로 배포하는 정적 사이트입니다.

- 콘텐츠: `content/` 폴더의 마크다운 노트 (Obsidian 볼트와 동일한 형식)
- 배포: `master` 브랜치에 push되면 GitHub Actions가 자동으로 빌드 후 GitHub Pages에 배포
- 사이트: https://latenews.github.io/qt-daily/

## 콘텐츠 추가 방법

`content/qt/` 아래에 새 마크다운 파일을 추가하고 push하면 자동으로 사이트에 반영됩니다.
Obsidian Git 플러그인을 이 저장소에 연결해두면 Obsidian에서 커밋 버튼만 눌러도 배포됩니다.
