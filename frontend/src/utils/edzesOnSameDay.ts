import dateParse from "./dateParse";

export default function EdzesOnSameDay(edzesek: any){
    const currentDate = new Date()
    let edzesContrariety:boolean = false;
    edzesek?.map((edzes: any)=>{
        
        if(dateParse(edzes.datum).includes(dateParse(currentDate))){
            edzesContrariety = true;
        }
    })


    return(
        edzesContrariety
    )
}