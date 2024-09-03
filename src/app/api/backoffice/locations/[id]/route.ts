import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";


interface Props{
    params : {
        id: string
    }
}
export async function GET(request: Request, {params}: Props){
    const {id} = params;
    const location = await prisma.locations.findFirst({where: {id: Number(id)}})
    return NextResponse.json({location}, {status: 200});
}
export async function DELETE(request: Request, {params}: Props){
    const {id} = params;
    await prisma.locations.delete({where: {id: Number(id)}})
    return NextResponse.json(null, {status: 200});
}