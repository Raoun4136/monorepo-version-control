# 모노레포 버전관리 배포 자동화

Lerna + Vercel CLI + Github Actions를 이용한 Monorepo 배포, 버전관리

## URL

### 개발 서버

- [Dev-Apps - KR](https://dev-monorepo-version-control-apps.vercel.app/)
- [Dev-Apps - JP](https://dev-monorepo-version-control-apps-jp.vercel.app/)
- [Dev-Landing - KR](https://dev-monorepo-version-control-landing.vercel.app/)
- [Dev-Landing - JP](https://dev-monorepo-version-control-landing-jp.vercel.app/)

### Staging 서버

- [Stg-Apps - KR](https://stg-monorepo-version-control-apps.vercel.app/)
- [Stg-Apps - JP](https://stg-monorepo-version-control-apps-jp.vercel.app/)

### 상용 서버

- [Apps - KR](https://monorepo-version-control-apps.vercel.app/)
- [Apps - JP](https://monorepo-version-control-apps-jp.vercel.app/)
- [Landing - KR](https://monorepo-version-control-landing.vercel.app/)
- [Landing - JP](https://monorepo-version-control-landing-jp.vercel.app/)

## All Github Deployments Environment

- [Github Deployments](https://github.com/Raoun4136/monorepo-version-control/deployments)

## Projects

`packages/`

- `apps` : 기본 앱
- `landing` : 랜딩 페이지
- `landing-jp` : 일본 랜딩 페이지 (국제화)

### Details

- Landing 페이지는 한국, 일본 나라별로 다른 레포지토리로 관리한다.
- Apps는 공통 레포지토리로 관리한다.
  - 일본, 한국 앱을 구분하는 방법은 Environment 변수를 사용한다.

## 10/22 POC 요구사항

- [x] **Gihub Actions**을 이용하여 **Vercel**로 배포한다.
- [x] 각 브랜치별로 배포를 구분한다.
  - [x] **main(master)** 브랜치는 상용 배포한다.
    - [x] main(master)로 PR을 보내면 [actions/labeler](https://github.com/actions/labeler)을 통해 배포 여부를 결정한다.
      - Labels: `app`, `app-jp`, `landing`, `landing-jp`
  - [x] **release** 브랜치는 Staging 배포한다.
    - [x] release 브랜치로 PR을 보내면 [actions/labeler](https://github.com/actions/labeler)을 통해 배포 여부를 결정한다.
      - Labels: `app`, `app-jp`, `landing`, `landing-jp`
  - [x] **develop** 브랜치는 개발 배포한다.
    - [x] develop 브랜치는 push시 `git diff`를 통해 변경된 파일을 확인하여 배포한다.
      - Diff Files: `apps`(app + app-jp), `landing`, `landing-jp`
- [ ] 각 배포 환경 별로 **환경변수**를 관리한다.
  - [ ] github deployments의 environment를 이용하여 환경변수를 설정한다.
    - **Production** - apps, apps-jp, landing, landing-jp
    - **Staging** - apps, apps-jp
    - **Development** - apps, apps-jp, landing, landing-jp
- [ ] main(master)에서의 **버전관리** (App Only)
  - [ ] `PATCH`, `MINOR`, `MAJOR` Label을 PR에 올릴 시 [Release Drafter](https://github.com/marketplace/actions/release-drafter)를 통해 버전을 관리한다.
- [ ] 각 배포 후 **Slack 알림**을 보낸다.
  - [ ] 배포된 링크와 changelog(PR, commit)등을 포함한다.

## 추가 요구사항

- 메인 배포는 각각 화,목에 진행하고 hotfix들은 버전을 올리지 않고 뒤에 난수를 붙여 배포한다.
  - hotfix 배포 시 : ex. 1.0.0 -> 1.0.0-aweff -> 1.0.0-wefqd
- 티켓(Jira-1242) 브랜치는 feature/\*, fix/\*, refactor/\* ... 등으로 관리한다.
- 배포하여 생긴 changelog들을 모아서 release note를 작성한다.
  - 이때 release note는 수동으로 변경할 수 있다.
  - Jira Release와 연동한다.
  - Zapier와 연동하여 ChatGPT를 통해 release note를 작성하고 Notion에 저장한다.
