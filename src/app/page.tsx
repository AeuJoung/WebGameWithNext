import styles from "./main.module.css";
import { Alkatra } from "next/font/google";

import GameSelectButton from "./_component/GameSelectButton";

const alkatra = Alkatra({
  subsets: ["latin"]
})

const titleClass = `${alkatra.className} ${styles.title}`;

export default function Home() {
  return (
    <main className={styles.main}>
      <h1 className={titleClass}>WBB GAME</h1>
      <section className={styles.container_up}>
        <GameSelectButton value={{name : '구구단', src:'gugudan', des : '재밌고 쉬운\n구구단 게임'}}/>
        <GameSelectButton value={{name : '끝말잇기', src:'wordchain', des : '한글로 하는 끝음절\n기차놀이'}}/>
        <GameSelectButton value={{name : '숫자야구', src:'numbaseball', des : '컴퓨터의 숫자를\n맞춰보세요'}}/>
      </section>
      <section className={styles.container_down}>
        <GameSelectButton value={{name : '가위바위보', src:'rsp', des : '가위, 바위 보\n당신의 선택은?'}}/>
        <GameSelectButton value={{name : '로또번호 추첨기', src:'lotto', des : "TODAY'S\n행운의 번호 뽑기"}}/>
        <GameSelectButton value={{name : 'Tic-Tac-Toe', src:'tictactoe', des : '먼저 이어진\n세 칸을 만들면 승리'}}/>
        <GameSelectButton value={{name : '지뢰찾기', src:'minesweeper', des : '지뢰를 어디에\n심었을까요?'}}/>
      </section>
    </main>
  );
}
