import Link from "next/link"
import styles from "./common.module.css";


type Props = {
    value : {
        name : String,
        src : String,
        des : String
    },
}

export default function GameSelectButton({value} : Props) {
    return (
        <section className={styles.buttonBox}>
            <Link href={`/${value.src}`} className={styles.linkBox}>
                <div className={styles.gameName}>{value.name}</div>
                <span className={styles.gameDes}>{value.des}</span>
            </Link>
        </section>
    );
}