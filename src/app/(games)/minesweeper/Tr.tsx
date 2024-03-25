import Td from "./Td";

export default function Tr({rowData, rowIndex} : {rowData : number[], rowIndex : number}) {
    return (
        <tr>
            {rowData.map((v, i)=><Td colData={v} cellIndex={[rowIndex, i]} key={i}/>)}
        </tr>
    );
}