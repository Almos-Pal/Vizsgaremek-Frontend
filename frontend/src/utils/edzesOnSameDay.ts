import dateParse from "./dateParse";

export default function EdzesOnSameDay(edzesek: any){
    const currentDate = new Date()
    let edzesContrariety:boolean = false;
    edzesek?.items.map((edzes: any)=>{
      let help:Date = new Date(edzes.datum);
        
        if(dateParse(edzes.datum).includes(dateParse(currentDate))){
            edzesContrariety = true;
        }
    })


    return(
        edzesContrariety
    )
}