"use client"

import { usePathname } from "next/navigation";
import styles from "@/app/(games)/layout.module.css"

export default function Page() {
    const pathname = usePathname();
    let titleName = null;

    switch(pathname) {
        case '/gugudan' : titleName= "구구단"; break;
        case '/wordchain' : titleName= "끝말잇기"; break;
        case '/numbaseball' : titleName= "숫자야구"; break;
        case '/rsp' : titleName= "가위바위보"; break;
        case '/lotto' : titleName= "로또번호 추첨기"; break;
        case '/tictactoe' : titleName= "Tic-Tac-Toe"; break;
        case '/minesweeper' : titleName= "지뢰찾기"; break;
        default : titleName=null;
    }

    return (
        <h3 className={styles.gameName}>{titleName}</h3>
    );
  }
  