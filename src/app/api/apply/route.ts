// app/api/apply/route.ts
import clientPromise from '@/lib/mongodb';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const client = await clientPromise;
        const db = client.db(); // default: jobPortal
        const collection = db.collection('appliedJobs');
        await collection.insertOne({
            ...body,
            appliedAt: new Date(),
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('DB Error:', error);
        return NextResponse.json({ error: 'Failed to apply' }, { status: 500 });
    }
}
