import { ReactNode } from "react";
import styles from "./layout.module.css"
import BackButton from "@/app/_component/BackButton"
import GameTitle from "@/app/_component/GameTitle"

type Props = {
    children : ReactNode,
}

export default function GameLayout({children} : Props) {
  return (
    <>
      <BackButton />
      <main className={styles.main}>
        <GameTitle />
        <section className={styles.container}>
          {children}
        </section>
      </main>
    </>
  );
}
