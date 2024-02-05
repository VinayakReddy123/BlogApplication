
import { useState,useEffect ,useContext} from 'react';
import {Box,Typography,styled} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {useParams,useNavigate} from"react-router-dom";
import { Link } from 'react-router-dom';
import {API} from '../../Service/api.js';
import {DataContext} from '../../context/DataProvider.jsx';
import Comments from './comments/Comments.jsx';
const Container = styled(Box)(({ theme }) => ({
  margin: '50px 100px',
  [theme.breakpoints.down('md')]: {
    margin: 0
  }
}));

const Image=styled('img')({
  width:'100%',
  height:'50vh',
  objectFit:'cover'
})
const Heading=styled(Typography)`
   font-size:38px;
   font-weight:600;
   text-align:center;
   margin:50px 0px 10px 0px ;
   word-break:break-word;
`;
const Edit=styled(EditIcon)`
   margin:5px;
   padding:5px;
   border:1px solid #878787;
   border-radius:10px;
`
const Delete=styled(DeleteIcon)`
   margin:5px;
   padding:5px;
   border:1px solid #878787;
   border-radius:10px;
`
const Author=styled(Box)`
   color:#878787;
   margin:20px 0px ;
`
const Description=styled(Typography)`
   word-break:break-word;
`





const DetailView=()=>{
  const {account}=useContext(DataContext);
  const [post,setPost]=useState({});
  const {id}=useParams();
  const navigate=useNavigate();
  useEffect(()=>{
    const fetchData=async ()=>{
        let res=await API.getPostById(id);
        if(res.isSuccess){
          setPost(res.data);
        }
    }
    fetchData();
  },[]);

  const deleteBlog=async ()=>{
    let res=await API.deletePost(post._id);
    if(res.isSuccess){
      navigate('/');
    }
  }
   




  const url=post.picture ?  post.picture : "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=752&q=80";
    return(
      <>
     
       <Container>
          <Image src={url} />
          <Box style={{float:'right'}}>
            {
              account.username === post.username && 
              <>
              <Link to={`/update/${post._id}`}>
                <Edit color='primary' />
              </Link>
                <Delete color='error' onClick={()=>deleteBlog()} />
              </>
            }
            
          </Box>
          <Heading>{post.title}</Heading>
          <Author>
            <Typography>Author: <Box component="span" style={{fontWeight:600}}>{post.username}</Box></Typography>
          <Typography style={{marginLeft:'auto'}}>{new Date(post.createdAt).toString()}</Typography>
          </Author>
          <Typography>{post.description}</Typography>
          <Comments post={post} />
       </Container>
      </>
    )
}
export default DetailView;