export interface User {
    user_id: number;
    username: string;
    email: string;
    suly?: number;
    magassag?: number;
}


interface UpdateUserParams {
    suly?: number;
    magassag?: number;
}

export type Bmi = UpdateUserParams;

