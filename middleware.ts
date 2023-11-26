import { NextRequest, NextResponse } from 'next/server';

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const session = !!req.cookies.get("next-auth.session-token")

  if (!session) {
    return NextResponse.redirect(new URL(`/api/auth/signin?callbackUrl=${path}`, req.url));
  }
  return NextResponse.next();
}

export const config = {
    matcher : [ '/', 'https://my-workspace-six.vercel.app/teams', 'https://my-workspace-six.vercel.app/chats', 'https://my-workspace-six.vercel.app/discoverTeams', 'https://my-workspace-six.vercel.app/materials', 'https://my-workspace-six.vercel.app/projects', 'https://my-workspace-six.vercel.app/tasks', ],
}