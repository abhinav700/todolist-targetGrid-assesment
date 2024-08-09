import { connect } from "@/dbConfig/connect";
import { verifyJwtToken } from "@/lib/jwt";
import Todo from "@/models/todoModel";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

connect();
export async function DELETE(request: NextRequest) {
  try {
    const token =  cookies().get("token")!.value;
    const { id } = await request.json();
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

    if (todo.user == userData.email) {
      await Todo.findByIdAndDelete(id);
      return NextResponse.json({
        status: 200,
        success: true,
        message: "Todo deleted succesfully",
      });
    }

    return NextResponse.json({
        status:500,
        success:false,
        message:"Operation failed"
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error,
      error_message: "Was not able to delete the todo",
    });
  }
}
