// ~/server/api/posts.ts
import { z } from 'zod';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

import { createTRPCRouter, publicProcedure } from '~/server/api/root';
import env from '~/env';

export const imageRouter = createTRPCRouter({
    getS3UploadUrl: publicProcedure
        .input(
            z.object({
                fileName: z.string(),
                contentType: z.string(),
            })
        )
        .mutation(async ({ input }) => {
            const s3Client = new S3Client({
                region: 'us-east-1',
                credentials: { accessKeyId: env.AWS_KEY_ID, secretAccessKey: env.AWS_SECRET_ACCESS_KEY },
            });
            const command = new PutObjectCommand({
                Bucket: env.AWS_S3_BUCKET_NAME,
                Key: input.fileName,
                ContentType: input.contentType,
            });
            return getSignedUrl(s3Client, command, { expiresIn: 3600 });
        }),
});
