import { FC , ReactElement  } from 'react';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {Chip} from "@mui/material"
import { Button, CardActionArea, CardActions } from '@mui/material';
import { useRouter } from 'next/router'
import DeleteIcon from '@mui/icons-material/Delete';
//interface representing blog structure
interface blogInterface  {id:string , summary:string , title:string , publication_date:string , image:string , author:string,content:string}

//card component to individual blogs
const BlogCard : FC<{title:string , summary:string , id:string , setBlogs:(blogs:blogInterface[])=>void , blogs:blogInterface[],image:string , author:string , publication_date:string}>  = ({title , summary , id , setBlogs , blogs , image , author ,publication_date}) : ReactElement => {
  const router = useRouter()

  //function to handle delete functionality
  function deleteHandler(id:string):void{
      let filteredBlogs = blogs.filter((blog)=>blog.id!==id) //filtering out blogs that do not match the id
      setBlogs(filteredBlogs)
  }

  //constructing date string from string
  var parts:any[] =publication_date.split('-');
  var mydate = new Date(parts[0], parts[1] - 1, parts[2]); 
  console.log(mydate.toDateString())
  return (
    <Card sx={{ maxWidth: 345 , border:"1px solid black" , margin:1 ,  ':hover': {
      boxShadow: 10, // theme.shadows[20]
    }, }} >
      <CardActionArea onClick={() => router.push('/Blog/' + id)}>
        <CardMedia
          component="img"
          height="200"
          image={image}
          alt="green iguana"
        />
        <CardContent sx={{height:180 , overflow:"hidden"}}>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {summary}
          </Typography>
          <Chip sx={{marginTop:1}} label={`${author} , ${mydate.toDateString()}`}/>
        </CardContent>
        
      </CardActionArea>
      <CardActions>
        <Button size="small" color="error" onClick={()=>{deleteHandler(id)}}>
        <DeleteIcon/>
        </Button>
      </CardActions>
    </Card>
  );
}

export default BlogCard;