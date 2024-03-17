
interface Props {
    num : number,
}

export default function Ul ({num} : Props) {
    return (
        <li>{num}</li>
    );
}