# 모노레포 버전관리 배포 자동화

Lerna + Vercel CLI + Github Actions를 이용한 Monorepo 배포, 버전관리

## URL

- [Apps - KR](https://monorepo-version-control-apps.vercel.app/)
- [Apps - JP](https://monorepo-version-control-apps-jp.vercel.app/)
- [Landing - KR](https://monorepo-version-control-landing.vercel.app/)
- [Landing - JP](https://monorepo-version-control-landing-jp.vercel.app/)

## Projects

- apps : 기본 앱
- landing : 랜딩 페이지
- landing-jp : 일본 랜딩 페이지 (국제화)

### Details

- Landing 페이지는 한국, 일본 나라별로 다른 레포지토리로 관리한다.
- Apps는 공통 레포지토리로 관리한다.
  - 일본, 한국 앱을 구분하는 방법은 Vercel의 환경변수를 이용한다.

## 10/22 POC 요구사항

- 배포는 **Vercel-CLI**를 사용하고, **Github Actions**를 이용한다.
- 메인 배포는 **main(master)** 브랜치로 한다.
  - main(master)로 **PR**을 보내면 자동으로 배포한다.
  - PR시, 배포 여부는 **label**을 통해 결정한다.
    - PATCH, MINOR, MAJOR
    - app, app-jp, landing, landing-jp
  - 각각 label은 **git diff**를 통해 변경된 파일을 확인하여 자동으로 붙인다.
    - 이때, label은 수동으로 변경할 수 있다.
- 만일 PATCH, MINOR, MAJOR가 변경되었을 경우, 올린버전을 releases에 **publish**한다.
  - 이때, prod-drafter를 사용하여 **changelog**를 작성한다.
- 각각(app, app-jp, landing, landing-jp) 배포 후, slack과 연동하여 **알림**을 보낸다.
  - 이때, 알림에는 배포된 링크와 changelog(PR, commit)등을 포함한다. (optional)

## 추가 요구사항

- 메인 배포는 각각 화,목에 진행하고 hotfix들은 버전을 올리지 않고 뒤에 난수를 붙여 배포한다.
  - hotfix 배포 시 : ex. 1.0.0 -> 1.0.0-aweff -> 1.0.0-wefqd
- 개발(develop) 서버 브랜치는 develop/\* 로 관리한다.
  - develop 브랜치는 모든 브랜치마다 Preview로 배포한다.
- 상용(staging) 서버 브랜치는 release/\* 로 관리한다.
  - release 브랜치는 모든 브랜치마다 Preview로 배포한다.
- 티켓(Jira-1242) 브랜치는 feature/\*, fix/\*, refactor/\* ... 등으로 관리한다.
- 배포하여 생긴 changelog들을 모아서 release note를 작성한다.
  - 이때 release note는 수동으로 변경할 수 있다.
