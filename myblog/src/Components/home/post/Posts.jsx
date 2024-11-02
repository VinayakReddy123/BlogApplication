import { useEffect, useState } from "react";
import {API} from '../../../Service/api';
import {Box,Grid} from '@mui/material';
import {useSearchParams,Link} from "react-router-dom";
import Post from "./Post";

const Posts=()=>{
     const [posts,setPosts]=useState([]);
     const [searchParams]=useSearchParams();
     const category=searchParams.get('category');
    useEffect(() => {
        const fetchData = async () => {
            try {
                let response = await API.getAllPosts({category:category || ''});
                if (response.isSuccess) {
                    setPosts(response.data);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                // Handle the error accordingly, e.g., set an error state
            }
        };
        fetchData();
    }, [category]);
    
    return(
        <>
        
          {
             posts && posts.length>0 ? posts.map(post=>(
                <Grid item lg={3} sm={4} xs={12}>
                    <Link to={`/details/${post._id}`} style={{textDecoration:'none',color:'inherit'}}>
                     <Post post={post} />
                     </Link>
                </Grid>
               
            )):<Box style={{color:'#878787',
                  margin:'30px 80px',
                  fontSize:18
                }}>
                   No posts till now
                </Box>
          }

        </>
    )
}
export default Posts;