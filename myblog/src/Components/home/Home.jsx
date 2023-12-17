

import Banner from "../Banner/Banner";
import Categories from "./Categories";
import {Box,Grid,Typography,styled} from "@mui/material";




const Home=()=>{
    return(
        <>
         
       <Banner />
       <Grid container>
           <Grid item lg={2} sm={2} xs={12} > 
              <Categories />
           </Grid>
           <Grid container item xs={12} sm={10} lg={10} >
               Posts
           </Grid>
       </Grid>
       
        </>
    )
}
export default Home;