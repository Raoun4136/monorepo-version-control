import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        이번엔 apps만 할겁니다~ ㄴㅇㄹwfewfwefwfwefeewfㅠㅠㅠ 이거를
        <div className={styles.description}>
          ㅈㅈ qeqweqwe ewfwefw 이건 되겠지?wefwefefwfwefewfwfeqwdqwewefwefwdsfewf
          <p>
            I want to Deploy to apps&nbsp; I want to echo Label
            <code className={styles.code}>src/pages/index.tsx</code>
          </p>
          이번엔 APPS, APPS_JP 둘다 배포해보자 develop에선 요기가 ㅋㅋsfdsf
          <div>CHANGE ALL I WANT TO PR</div>
          wfewfewfewf
        </div>
        wfwefe
        <div className={styles.center}>
          <Image
            className={styles.logo}
            src="/next.svg"
            alt="Next.js Logo"
            width={180}
            height={37}
            priority
          />
        </div>
        <div className={styles.grid}>
          <a
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2>
              Docs <span>-&gt;</span>
            </h2>
            <p>Find in-depth information about Next.js features and&nbsp;API.</p>
          </a>

          <a
            href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2>
              Learn <span>-&gt;</span>
            </h2>
            <p>Learn about Next.js in an interactive course with&nbsp;quizzes!</p>
          </a>

          <a
            href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2>
              Templates <span>-&gt;</span>
            </h2>
            <p>Discover and deploy boilerplate example Next.js&nbsp;projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2>
              Deploy <span>-&gt;</span>
            </h2>
            <p>Instantly deploy your Next.js site to a shareable URL with&nbsp;Vercel.</p>
          </a>
        </div>
      </main>
    </>
  );
}
