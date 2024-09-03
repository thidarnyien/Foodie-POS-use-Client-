import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";
  
export async function GET(request: Request){
    const locations = await prisma.locations.findMany();
    return NextResponse.json({locations}, {status: 200});
}

export async function POST(request: Request){
    const newLocation = await request.json();
    const {name,address, phoneNumber,companyId} = newLocation;
    const coltdId = Number(companyId)+ 1;
    if(!newLocation){
        return NextResponse.json({error: "Bad Request"}, {status: 400})
    }
    const location =  await prisma.locations.create({
        data: {
            name,
            address,
            phoneNumber,
            companyId : coltdId,
          },
    });

    return NextResponse.json({location}, {status: 200});
}

export async function PUT(request: Request){
    const updatedLocation = await request.json();
    const {id,name, address, phoneNumber,companyId} = updatedLocation;
    await prisma.locations.update({data: {
        name,
        address,
        phoneNumber,
        companyId
    }, where: {id: Number(id)}});
    return NextResponse.json(null, {status: 200});
}