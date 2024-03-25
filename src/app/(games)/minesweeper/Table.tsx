import Tr from "./Tr";

export default function Table({tableData} : {tableData : number[][]}) {
    return (
        <table>
            <tbody>
                {tableData.map((v, i)=><Tr rowData={v} rowIndex={i} key={i}/>)}
            </tbody>
        </table>
    );
}