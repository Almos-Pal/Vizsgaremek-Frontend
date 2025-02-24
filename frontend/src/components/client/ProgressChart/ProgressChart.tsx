
export default function ProgressChart(){

    interface SzettekProps{
        edzes_id:number;
gyakorlat_id
: 
5
id
: 
16
reps
: 
10
set_szam
: 
4
weight
: 
20
    }
    interface GyakorlatokProps{
        edzes_id: number;
        gyakorlat:any;
        gyakorlat_id: number; 
        szettek: SzettekProps[];
        total_sets: number;
    }
interface EdzesProps {
    datum: string;
    edzes_id: number;
    edzes_neve: string;
    gyakorlatok: GyakorlatokProps[];
    ido: number; 
}



    let asd:EdzesProps[] = []
    fetch('http://localhost:8000/edzes/intervallum?user_id=1&startDate=1111-11-11&endDate=2025-11-11').then(response => response.json()).then(data => console.log(data))

    return (
        <div>
            
        </div>
    )
}