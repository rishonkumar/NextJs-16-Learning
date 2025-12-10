"use client"
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import Image from "next/image";
import Link from "next/link";

export default function BlogPage() {

    // we will use useQuery to get the data not mutation
    const data = useQuery(api.post.getPosts)
    return (
        <div className="py-12">
            {/* {JSON.stringify(data)} */}
            {/* <p>{data?.[0].title}</p> */}
            <div className="text-center pb-12">
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Our blog</h1>
                <p className="pt-4 max-w-2xl mx-auto text-xl text-muted-foreground">Insights, thoughts and trends from our team</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {data?.map((post) => (
                    <Card key={post._id} className="pt-0 ">
                        <div className="relative h-48 w-full overflow-hidden">
                            <Image className="rounded-t-lg" src="https://images.unsplash.com/photo-1759979702262-71e15fa210d4?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzfHx8ZW58MHx8fHx8" alt={post.title} fill />
                        </div>

                        <CardContent>
                            <Link href={`/blog/${post._id}`}>
                                <h1 className="text-2xl font-bold hover:text-primary">{post.title}</h1>
                            </Link>
                            <p className="text-muted-foreground line-clamp-3">{post.body}</p>
                        </CardContent>
                        <CardFooter>
                            <Link className={buttonVariants({ className: "w-full" })} href={`/blog/${post._id}`}>Read more</Link>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}