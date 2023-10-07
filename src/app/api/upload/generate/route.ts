import { env } from "@/lib/env/server";
import S3 from "aws-sdk/clients/s3";
import { randomUUID } from "crypto";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const s3 = new S3({
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
    region: env.AWS_S3_REGION,
    signatureVersion: "v4",
  });

  const {
    filename,
    filetype,
  }: {
    filename: string;
    filetype: string;
  } = await request.json();

  const fileId = randomUUID();
  const fileext = filename.split(".").pop();
  
  const key = `${fileId}.${fileext}`;

  const params = {
    Bucket: env.AWS_S3_BUCKET,
    Key: key,
    Expires: 120,
    ContentType: filetype,
  };

  const url = await s3.getSignedUrl("putObject", params);

  return NextResponse.json({ url, key: key }, { status: 200 });
}
