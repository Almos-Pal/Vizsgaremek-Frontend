
interface FlagValidatorProps {
    value: string;
    color: string;
    background:string;
}
interface MuscleGroups {
    type:FlagValidatorProps,
    muscleIds: number[]
}

const legMuscles:MuscleGroups = {type:{value:"láb",color:"var(--color-grey-400)",background:"var(--color-primary-10)"} , muscleIds:[1, 5, 10, 13, 15, 16]};
const chestMuscles:MuscleGroups = {type:{value:"mell",color:"var(--color-light)",background:"var(--color-primary-75"},muscleIds:[4]};
const backMuscles:MuscleGroups = {type:{value:"hát",color:"var(--color-light)",background:"var(--color-info)"},muscleIds:[8, 9, 11, 14, 17 ]};
const shoulderMuscles:MuscleGroups = {type:{value:"váll",color:"var(--color-light)",background:"var(--color-primary-50)"},muscleIds:[2]};
const armMuscles:MuscleGroups = {type:{value:"kar",color:"var(--color-light)",background:"var(--color-primary)"},muscleIds:[6, 7, 12]};
const coreMuscles:MuscleGroups = {type:{value:"has",color:"var(--color-light)",background:"var(--color-primary-90)"},muscleIds:[3]};

export default function FlagValidator(muscleIds: number[]){


let flagObject : FlagValidatorProps[] = [];
muscleIds.map((muscleId) => {
if(legMuscles.muscleIds.includes(muscleId)&&(flagObject.includes(legMuscles.type)===false)){
    flagObject.push(legMuscles.type);
}
else if(chestMuscles.muscleIds.includes(muscleId)&&(flagObject.includes(chestMuscles.type)===false)){
    flagObject.push(chestMuscles.type);
}
else if(backMuscles.muscleIds.includes(muscleId)&&(flagObject.includes(backMuscles.type)===false)){
    flagObject.push(backMuscles.type);
}
else if(shoulderMuscles.muscleIds.includes(muscleId)&&(flagObject.includes(shoulderMuscles.type)===false)){
    flagObject.push(shoulderMuscles.type);
}
else if(armMuscles.muscleIds.includes(muscleId)&&(flagObject.includes(armMuscles.type)===false)){
    flagObject.push(armMuscles.type);
}
else if(coreMuscles.muscleIds.includes(muscleId)&&(flagObject.includes(coreMuscles.type)===false)){
    flagObject.push(coreMuscles.type);
}
})

return flagObject;
}
