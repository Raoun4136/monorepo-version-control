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
- [x] 각 배포 환경 별로 **환경변수**를 관리한다.
  - [x] github deployments의 environment를 이용하여 환경변수를 설정한다.
    - **Production** - apps, apps-jp, landing, landing-jp
    - **Staging** - apps, apps-jp
    - **Development** - apps, apps-jp, landing, landing-jp
- [ ] **버전관리** (App Only)
  - [x] `PATCH`, `MINOR`, `MAJOR` Label을 PR에 올릴 시 [Release Drafter](https://github.com/marketplace/actions/release-drafter)를 통해 버전을 관리한다.
  - [x] Release Note에 지라티켓이 붙어있다면, 해당 티켓을 링크한다.
  - [x] 모든 PR에 기능 Label을 붙인다. (Release Note 반영을 위해)
    - [ ] main 브랜치에 PR을 올릴 때는 `skip-changelog` Label을 붙인다. (Release Note에 반영하지 않음)
  - [ ] Release에 PR을 올릴 시,
    - [ ] 변경된 커밋의 Title을 PR의 body에 자동으로 추가한다. (slack 배포알림을 위함)
    - [x] drafter 초안을 작성한다.
  - [ ] Main(Master)에 PR을 올릴 시,
    - [ ] 변경된 커밋의 Title을 PR의 body에 자동으로 추가한다. (slack 배포알림을 위함)
    - [x] drafter를 최종 publish한다.
- [ ] **Slack 알림**을 보낸다.
  - [ ] 각 배포 후, 배포된 링크와 changelog(PR, commit)등을 포함한다.

## 추가 요구사항

- 티켓(Jira-1242) 브랜치는 feature/\*, fix/\*, refactor/\* ... 등으로 관리한다.
- 배포하여 생긴 changelog들을 모아서 release note를 작성한다.
  - Jira Release와 연동한다.
  - Zapier와 연동하여 ChatGPT를 통해 release note를 작성하고 Notion에 저장한다.

## 트러블 슈팅 및 문제 해결 방식

### `Vercel CLI` Deploy + Github Deployments Environment

커스텀한 버전관리를 위해 Github와 Vercel의 연동을 끊어버리니, Vercel이 자동으로 Github Deployments Environment를 생성되던 것이 사라졌다. 또한 각 환경마다 환경변수를 설정해주어야하는데, 이를 자동화하는 방법을 찾아야했다.

vercel-action이나 deploy-to-vercel에서 Github Deployments Environment를 생성해주는 명령어가 있었지만, build 타임을 기다려야하는 문제가 있었기 때문에(비용문제) Github Deployments Environment를 생성해주는 방법을 찾아야했다.

> jobs안에서 environment를 설정해주었더니, 자동으로 Github Deployments Environment를 생성해주었다.

하지만, 배포 완료시점을 알 수 없어서, Vercel에서 배포완료가 되었을 때 Github Deployments Environment를 success로 바꿔줄 방법을 찾아야했다.

> vercel에 웹훅을 연결하면 되긴하는데...

딱 여기서, 그냥 github actions를 사용하기로 바뀌었다.

> 따라서 각 환경변수를 github deployments에 설정해주고, github actions를 통해 vercel build를 기다리는 방식으로 해결하였다.

### 각 브랜치의 사용성

**MAIN BRANCH**

상용 서버의 브랜치이다.

모노레포 특성상 각 패키지별로 배포를 구분해야하는데, 기존에는 Branch로 구분했으나, 코드 통합이 어려워졌다.

따라서 main branch에 PR을 올리면, label을 통해 배포를 구분하였다.

**RELEASE BRANCH**

새로 만들 Staging 서버의 브랜치이다.

상용 서버의 브랜치와 같은 방식으로 PR을 올리면, label을 통해 배포를 구분하였다.

Develop 브랜치가 너무 뒤죽박죽이라서, release 브랜치를 배포전 테스트용으로 사용하였다.

**DEVELOP BRANCH**

개발 단계에서는 develop 브랜치를 완전히 틀에 맞춰 사용하지 않았다.

예를 들어 develop에 PR을 올리는 것이 아닌, 그냥 push하기도 하고 다른 개발자들의 코드가 뒤죽박죽 섞여있는 사용성이였다.

그래서 develop은 PR의 라벨링으로 배포하는 것이 아닌, git diff를 통해 변경된 파일을 확인하여 배포하는 방식으로 변경하였다.

### `Release Drafter` 의 사용성

Commit 단위가 아닌 PR로 Release Note를 작성해야겠다고 생각했다.
PR단위는 기능단위로 작성될것이기 때문이라는 생각이였다.

모든 PR의 title을 보고 label을 붙일 수 있게 하고, 그 label이 붙은 것들을 Release Note로 작성하게 하였다.
물론, 붙지 않은 label도 Release Note에 포함되긴 하지만 그 부분은 작업자들이 직접 skip-changelog를 붙이도록 하였다.

Release 브랜치에 merge가 되었을 때는 Release Draft를 작성하고, Main 브랜치에 merge가 되었을 때는 Release Draft를 publish하도록 설정하였다.

따라서, 상용배포 전 배포될 Release Draft를 미리 볼 수 있게 되었다.

추가로, Release Draft에 Jira 티켓이 붙어있다면, 해당 티켓을 링크하도록 설정하였다.

### `Release Drafter` Default 설정

자꾸 develop 브랜치에 release-drafter.yml를 업데이트해놓고 왜 안되지..? 라는 생각을 했는데, release-drafter는 default branch 기준으로 release-drafter.yml를 찾는 것이였다.

> 따라서, main(master) 브랜치에 release-drafter.yml을 최신화 해야한다.

### `deploy-to-vercel` BUILD_ENV

각 환경의 환경변수를 json파일로 관리해서 불러와 jq로 파싱하는 방법을 시도해봤지만, 문자열로 인식하여 사용할 수 없었다.

[참고 링크](https://github.com/Raoun4136/monorepo-version-control/actions/runs/11531539772/job/32102352795)

> env를 설정하려면 직접 ${{ secrets.ENV }}로 설정해야한다.

### AutoLabel Annotation for `Release Drafter`

drafter의 일은 크게 3가지이다

- Label을 붙이는 것.
- Release 브랜치에 머지시, Release Draft를 작성하는 것.
- Main 브랜치에 머지시, Release Draft를 publish하는 것.

이 3개의 작업을 같은 release-drafter.yml을 사용하려고 했더니, 아래와 같이 두가지 Annotation이 발생하였다.

```yml
label_release_draft
Validation Failed: {"resource":"Release","code":"invalid","field":"target_commitish"}

label_release_draft
HttpError: Validation Failed: {"resource":"Release","code":"invalid","field":"target_commitish"}
        at /home/runner/work/_actions/release-drafter/release-drafter/v6/dist/index.js:8462:21
        at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
        at async Job.doExecute (/home/runner/work/_actions/release-drafter/release-drafter/v6/dist/index.js:30793:18)
```

[참고 링크](https://github.com/Raoun4136/monorepo-version-control/actions/runs/11532188236)

왜냐면, release-drafter.yml에는 Release를 작성하는 것까지 포함되어있기 때문이다.

해결방법은 commitish를 main으로 고정하거나, release-drafter.yml을 분리하는 방법이 있다.

- main으로 고정하기

  - 고정하면, Release 브랜치에 머지 시, Release Draft가 작성되지 않는다.

- release-drafter 분리하기
  - 분리하게 되면 관리포인트가 늘어나므로, 관리하기 어려워진다.

> 현재는 Annotations만 나오므로 무시하고 진행하기로 결정하였다.
