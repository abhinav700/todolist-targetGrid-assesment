import { connect } from "@/dbConfig/connect";
import { verifyJwtToken } from "@/lib/jwt";
import Todo from "@/models/todoModel";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

connect();
export async function PUT(request: NextRequest) {
  try {
    const { id,title,body,labels, isCompleted } = await request.json();
    const token =  cookies().get("token")!.value;
    if (!token) {
      return NextResponse.json({
        status: 401,
        success: false,
        message: "Invalid auth-token",
      });
    }
    const userData: any = verifyJwtToken(token);

    const todo = await Todo.findById(id);
    if (!todo) {
      return NextResponse.json({
        status: 500,
        success: false,
        message: "Todo does not exist",
      });
    }
    
    if (todo.user != userData.email) {
      return NextResponse.json({
        status: 500,
        success: false,
        message: "Invalid User",
      });
    }

   const updatedTodo = await Todo.findByIdAndUpdate(id,{
      title,
      body,
      labels,
      isCompleted
    });
    return NextResponse.json({
        todo:updatedTodo,
        status:200,
        success:true,
        message:"Todo successfully updated"
    })

  } catch (error) {
    return NextResponse.json({
      success: false,
      error,
      error_message: "Was not able to delete the todo",
    });
  }
}
