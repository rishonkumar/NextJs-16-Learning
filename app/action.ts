"use server"
import { postSchema } from "@/app/schemas/blog";
import {fetchMutation} from "convex/nextjs"
import z from "zod";
import { api } from "@/convex/_generated/api";
import { redirect } from "next/navigation";
import { getToken } from "@/lib/auth-server";
// this is server side using convex in server side 
export async function createBlogAction(values: z.infer<typeof postSchema>) {
    
    const parsed = postSchema.safeParse(values)

    if(parsed.error) {
        throw new Error("Something went wrong")
    }

    const token = await getToken()

    await fetchMutation(api.post.createPost, {
            body: parsed.data.content,
            title: parsed.data.content,
    },{token})

    //whenever we in server side we will not use useRouter we will use Redirect
    return redirect("/")
}