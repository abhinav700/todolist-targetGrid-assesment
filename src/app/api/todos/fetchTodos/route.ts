import { connect } from "@/dbConfig/connect";
import { verifyJwtToken} from '@/lib/jwt'
import Todo from "@/models/todoModel";
import { NextRequest, NextResponse } from "next/server";
import {cookies} from "next/headers";

connect()
export async function GET(request : NextRequest, response: NextResponse) {

    const token =  cookies().get("token")!.value;
    try {
        if(!token){
            return NextResponse.json({status:401, success:false, message:"Invalid auth-token"});
        }
        const userData:any = verifyJwtToken(token);
        const todos = await Todo.find({user:userData.email});
        return  NextResponse.json({todos, success:true, status: 200});
    } catch (error) {
        
        return NextResponse.json({success:false, error, error_message:"Was not able to fetch the todos"});
    }
}