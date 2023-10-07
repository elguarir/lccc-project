import useAuthSession from "@/hooks/useAuthSession";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { ArticleByIdType } from "@/types/article";
import { GetArticleDataById } from "@/lib/helpers/GetArticleData";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const session = await useAuthSession();
  if (!session) return new Response(null, { status: 401 });
  const { json } = await request.json();

  try {
    await prisma.article.update({
      where: {
        authorId: session.user?.userId,
        id: params.id,
      },
      data: {
        json: json,
      },
      select: {
        id: true,
      },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: error },
      { status: 500 },
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const session = await useAuthSession();
  if (!session) return new Response(null, { status: 401 });
  const article: ArticleByIdType = await request.json();
  console.log(article);
  if (!article) return new Response(null, { status: 400 });
  try {
    await prisma.article.update({
      where: {
        authorId: session.user?.userId,
        id: params.id,
      },
      data: {
        title: article.title,
        description: article.description,
        coverImage: article.coverImage,
        publishedAt: article.publishedAt,
        status: article.status,
      },
      select: {
        id: true,
        title: true,
        slug: true,
        description: true,
        coverImage: true,
        status: true,
        publishedAt: true,
      },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: error },
      { status: 500 },
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const session = await useAuthSession();
  if (!session?.user) return new Response(null, { status: 401 });

  try {
    const res = await GetArticleDataById(params.id, session.user.userId);

    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: error },
      { status: 500 },
    );
  }
}
