"use server"
import { postSchema } from "@/app/schemas/blog";
import { fetchMutation } from "convex/nextjs"
import z from "zod";
import { api } from "@/convex/_generated/api";
import { redirect } from "next/navigation";
import { getToken } from "@/lib/auth-server";
import { revalidatePath } from "next/cache";
// this is server side using convex in server side 
export async function createBlogAction(values: z.infer<typeof postSchema>) {

    try {
        const parsed = postSchema.safeParse(values)

        if (parsed.error) {
            throw new Error("Something went wrong")
        }

        const token = await getToken()
        // this is what is defined in convex/post.ts 
        const imageUrl = await fetchMutation(api.post.generateImageUploadUrl, {}, { token })
        console.log(imageUrl)

        const uploadResult = await fetch(imageUrl, {
            method: "POST",
            headers: {
                "Content-Type": parsed.data.image.type
            },
            body: parsed.data.image
        })

        if (!uploadResult.ok) {
            return {
                error: "Failed to upload image"
            }
        }

        const { storageId } = await uploadResult.json()

        await fetchMutation(api.post.createPost, {
            body: parsed.data.content,
            title: parsed.data.title,
            imageStorageId: storageId,
        }, { token })

    } catch (error) {
        return {
            error: "Failed to create post"
        }
    }

    //This function allows you to purge cached data on-demand for a specific path.
    // this will be updated instantly as we used reValidatePath function
    revalidatePath('/blog')
    //whenever we in server side we will not use useRouter we will use Redirect
    return redirect("/")
}