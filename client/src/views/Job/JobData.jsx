
export default function Data({title,value}){
    return(
        <div className=" flex w-full">
            <div className=" w-64 flex justify-start">{title}</div>
            <div className={`${title==="Foglalkozás típusa"&&" capitalize"}`}>{value}</div>
        </div>
    )
}