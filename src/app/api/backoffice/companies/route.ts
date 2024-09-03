import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request){
    const companies = await prisma.companies.findMany();
    return NextResponse.json({companies}, {status: 200});
}

export async function POST(req: Request){
    const newCompany = await req.json();
    const {name, phoneNumber,address} = newCompany;
    await prisma.companies.create({data:{
        name,
        phoneNumber,
        address
    }});
    return NextResponse.json(null, {status:200})
}

export async function PUT(req: Request){
    const updatedCompany = await req.json();
    const {id, name, address, phoneNumber} = updatedCompany;
    await prisma.companies.update({data:{
        name,
        phoneNumber,
        address
    }, where: {id: Number(id)}});

    return NextResponse.json(null, {status: 200})

}