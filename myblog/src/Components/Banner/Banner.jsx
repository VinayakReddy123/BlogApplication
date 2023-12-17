
import { Typography,Box,styled} from "@mui/material";

const Image=styled(Box)`
    background:url(https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg);
    width:100%;
    height:50vh;
    background-size:cover;
    display:flex;
    justify-content:center;
    align-items:center;  
`;
const Heading=styled(Typography)`
 font-size:70px;
 color:#FFFFFF;
`
const SubHeading=styled(Typography)`
    font-size:20px;
    background:#FFFFFF;
`

const Banner=()=>{
    return(
        <>
          <Image>
            <Heading>BLOG</Heading>
            <SubHeading>Code for interview</SubHeading>
          </Image>
        </>
    )
}
export default Banner;