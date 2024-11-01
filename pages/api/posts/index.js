// API to retrieve the post
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if(req.method === "GET"){
        try{
            const posts = await prisma.post.findMany();
            res.status(200).json(posts);
        }catch(err){
            res.status(500).json({error: 'Failed to find posts'});
        }finally{
            await prisma.$disconnect();
        }
    }else{
        res.setHeader('Aallow', ['GET']);
        res.status(405).end('Method not allowed');
    }
}