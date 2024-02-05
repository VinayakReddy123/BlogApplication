import { Box,Typography,styled } from "@mui/material";
import { addElipsis } from "../../../utils/common-utils";
const Container=styled(Box)`
    border:1px solid #d3c3de;
    border-radius:10px;
    margin:10px;
    height:250px;
    display:flex;
    flex-direction:column;
    align-items:center;
    & > p{
        padding: 0px 5x 5px 5px;
    }
`
const Heading=styled(Typography)`
     font-size:18px;
     font-weight:600
`
const Image=styled('img')({
    width:"100%",
    borderRadius:'10px 10px 0px 0px',
    objectFit:'cover',
    height:150
})
const Details=styled(Typography)`
    font-size:14px;
    word-break:break-word;
`



const Post=({post})=>{
    const url=post.picture ? post.picture : "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=752&q=80";
    console.log(post.categories);
    return(
        <>
          <Container>
            <Image src={url} alt="blog" />
            <Typography>{post.categories}</Typography>
            <Heading>{addElipsis(post.title,20)}</Heading>
            <Typography>{post.username}</Typography>
            <Details>{addElipsis(post.description,100)}</Details>
          </Container>
        </>
    )
}
export default Post;