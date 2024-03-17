import Li from "./Li";

interface Props {
    value : number[],
}

export default function Ul ({value} : Props) {
    return (value.map((v, i)=><Li num={v} key={i}/>) )
}