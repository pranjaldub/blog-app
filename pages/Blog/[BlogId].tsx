import React, { FC } from 'react'
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType, } from 'next'
import { useRouter } from 'next/router';
import Image from 'next/image';
import { blogs ,  getSinglePost} from '../../data/blogs'
import { ParsedUrlQuery } from 'querystring'
import Typography from '@mui/material/Typography';
interface blogInterface  {id:string , summary:string , title:string , publication_date:string , image:string , author:string,content:string}

interface IParams extends ParsedUrlQuery {
    BlogId: string
}
 

export const getStaticPaths : GetStaticPaths = async () => {
    const paths = blogs.map(( blog:blogInterface ) => ({ params: { BlogId:blog.id.toString()} }));
 
    return {
      paths,
      fallback: false,
    };
  };
 
export const getStaticProps : GetStaticProps= async (context) => {
    const {BlogId} = context.params as IParams
    
  const post = await getSinglePost(BlogId);
 
  return {
    props: { post },
  };
};
const Blog :FC<{post:blogInterface}> = ({ post }) => {
    console.log("inside post" , post)
  return <div><Image src={post[0].image} width="0"
  height="0"
  sizes="100vh"
  style={{ width: '100%', height: 'auto' , position:"relative"}} />
     <Typography variant="h3" gutterBottom>
  {post[0].title}
</Typography></div>;
};

export default Blog;