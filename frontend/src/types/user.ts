export interface User {
    user_id: number;
    username: string;
    email: string;
    suly?: number;
    isAdmin: boolean;
    magassag?: number;
}


interface UpdateUserParams {
    suly?: number;
    magassag?: number;
}

export type Bmi = UpdateUserParams;

