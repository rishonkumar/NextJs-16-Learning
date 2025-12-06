import React from 'react'


interface BlogIdPageProps {
    params : Promise<{
        blogId : string
    }>
}

const  BlogIdPage = async ({params} : BlogIdPageProps) => {

  const {blogId}  =  await params
  return (
    <div>Hello from BlogIdPage
        {blogId}
    </div>
  )
}

export default BlogIdPage