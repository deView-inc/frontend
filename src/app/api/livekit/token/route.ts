import { AccessToken } from 'livekit-server-sdk';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const roomId = searchParams.get('roomId');

    if (!roomId) {
        return NextResponse.json({ error: 'roomId is required' }, { status: 400 });
    }

    const at = new AccessToken(process.env.LIVEKIT_API_KEY!, process.env.LIVEKIT_API_SECRET!, {
        identity: `user-${crypto.randomUUID()}`,
        name: 'Тестовый юзер',
    });
    at.addGrant({ room: roomId, roomJoin: true, canPublish: true, canSubscribe: true });

    return NextResponse.json({
        token: await at.toJwt(),
        wsUrl: process.env.NEXT_PUBLIC_LIVEKIT_URL,
    });
}
