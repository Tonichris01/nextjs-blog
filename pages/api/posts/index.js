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
        // creating a new blog
    }else if(req.method == 'POST'){
        const {title, content} = req.body;

        try {
            const newPost = await prisma.post.create({
                data: {
                    title,
                    content
                }
            });

            res.status(201).json(newPost);
        } catch(error){
            console.error("Error creating the post:", error);
            res.status(500).json({message: "Error creating the post"});
        }
    }
    else{
        res.setHeader('Aallow', ['GET', 'POST']);
        res.status(405).end('Method not allowed');
    }
}

