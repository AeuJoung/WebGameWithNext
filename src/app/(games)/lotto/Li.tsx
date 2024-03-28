export default function Li({listData} : {listData : number[]}) {
    return (<>
    {listData.map((v, i)=><li key={i}>{v}</li>)}
    </>    
    )  
}