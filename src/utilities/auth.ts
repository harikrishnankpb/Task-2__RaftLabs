import jwt from "jsonwebtoken";

interface UserData {
    _id: string | null;
    role: number;
    email: string;
}

/*
In here minRole represent the minimum privilege of the user .
If 
    minRole == 0 => Any user can access (Including logged or not logged user (available for public ))
    minRole == 1 => Only logged user ()
    minRole == 2 => Admin only
*/

export default async function auth(token: string, minRole: number): Promise<UserData> {
    if (minRole == 0) return {
        _id: null,
        role: 0,
        email: ''
    }
    let secret = process.env.JWT_SECRET || '';
    let data: any;
    try {
        data = jwt.verify(token, secret);
    } catch (error) {
        throw new Error('Invalid Token')
    }
    if (data.role < minRole) throw new Error("You are not authorized to access this session");
    return data;
}