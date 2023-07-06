import React , {useState} from 'react'
import {blogs as fetchedBlogs} from '../../data/blogs'
import BlogCard from '@/components/card'
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Pagination from '@/components/pagination';
interface blogInterface  {id:string , summary:string , title:string , publication_date:string , image:string , author:string,content:string}
const Blogs = () => {
  const [blogs,setBlogs] = useState<blogInterface[]>(fetchedBlogs)
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [blogsPerPage, setBlogsPerPage] = useState<number>(4);
  const getIndexesForCurrentPage = (): [number, number] => {
    const lastIndex = currentPage * blogsPerPage;
    const firstIndex = lastIndex - blogsPerPage;
    return [firstIndex, lastIndex];
  };
  const [firstIndex, lastIndex] = getIndexesForCurrentPage();
const currentBlogs = blogs.slice(firstIndex, lastIndex);
  return (
    <div style={{display:"flex" , flexDirection:"column" ,justifyContent:"center" ,alignItems:"center"}}>
    <div><Typography variant="h1" gutterBottom>
        Blogs
      </Typography></div>
   <div style={{display:"flex",flexDirection:"column" , justifyContent:"center" , alignItems:"center"}}>
    <Grid container sx={{ flexGrow: 1 , display:"flex" , flexDirection:"row" , justifyContent:"center" , alignItems:"center"}}>
      
    {currentBlogs.map((blog)=><BlogCard key={blog.id} title={blog.title} id={blog.id} summary={blog.summary} setBlogs={setBlogs} blogs={blogs} image={blog.image} author={blog.author} publication_date={blog.publication_date}/>)}</Grid>
    <Pagination
        totalPages={Math.ceil(blogs.length / blogsPerPage)}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
    </div>
  )
}

export default Blogs