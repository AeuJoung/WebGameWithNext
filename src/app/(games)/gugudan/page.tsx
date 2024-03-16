import dynamic from "next/dynamic";

const GameBoard = dynamic(() => import('./GameBoard'), { ssr: false })
//nextjs는 기본적으로 하이브리드 랜더링을 한다.
//위는 ssr 끄는 방법.
//useEffect 미사용 시 서버의 계산값과 클라이언트에서의 계산값이 달라 생기는 오류가 발생했었따.
//이런 해결법도 있다는 사실을 알아둘 것~
//참고 : 
//https://nextjs.org/docs/app/building-your-application/optimizing/lazy-loading#skipping-ssr

export default function Page() {
  return (
    <GameBoard />
  );
}
