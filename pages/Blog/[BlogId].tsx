import React, { FC } from 'react'
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType, } from 'next'
import Image from 'next/image';
import { useRouter } from 'next/router';

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
    //console.log("inside post" , post)
    const data = `<html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        /* Responsive styles */
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 20px;
        }
    
        h1 {
          font-size: 24px;
          text-align: center;
          margin-bottom: 20px;
        }
    
        p {
          font-size: 16px;
          line-height: 1.5;
        }
    
        img {
          max-width: 100%;
          height: auto;
          margin: 20px 0;
        }
    
        @media (min-width: 768px) {
          /* Adjustments for larger screens */
          h1 {
            font-size: 32px;
          }
    
          p {
            font-size: 18px;
          }
        }
      </style>
    </head>
    <body>
     
    
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce tincidunt augue id eros tincidunt, sit amet fermentum ligula venenatis. Duis scelerisque risus at eros tristique, eu gravida nisl tempor. Sed elementum finibus est, at tincidunt nulla condimentum at. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nulla id vestibulum nisl. Etiam ut semper odio. Nam et lectus arcu. Vivamus egestas nunc eu augue commodo volutpat. Mauris facilisis urna odio, vel auctor sem auctor at. In in dignissim risus, eu sollicitudin risus. Sed in feugiat tellus. Morbi congue, orci eu ullamcorper vulputate, nisl ex tincidunt tortor, eget malesuada urna turpis non turpis.
      </p>
    
      
    
      <p>
        Donec ullamcorper faucibus convallis. Proin non lacinia arcu. Nunc consequat sapien at sapien dignissim lacinia. Quisque vitae tempor dolor, eget tempus neque. Sed finibus turpis a leo consequat, sit amet mattis urna placerat. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Ut ac nisi non libero pellentesque luctus. Nullam nec nisl a orci accumsan finibus.
      </p>
    </body>
    </html>
    `
  return <div style={{display:"flex", flexDirection:"column" , justifyContent:"center",alignItems:"center" , padding:"1em" }}>
     <Typography variant="h2" gutterBottom>
     
  {post[0].title}
</Typography>
<Typography variant="body1" gutterBottom>
     
  {post[0].content}
</Typography>
<div  dangerouslySetInnerHTML={{__html:data}} ></div>
</div>;
};

export default Blog;