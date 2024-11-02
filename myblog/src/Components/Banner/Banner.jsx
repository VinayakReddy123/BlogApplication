
import { Typography,Box,styled} from "@mui/material";
import bannerImage from './bannerimage.jpg';

const Image = styled(Box)`
  background: url(${bannerImage}) no-repeat center center;
  background-size: cover;
  width: 100%;
  height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (min-width: 768px) {
    height: 70vh; /* Adjust height for larger screens if necessary */
  }

  @media (min-width: 1200px) {
    height: 100vh; /* Adjust height for even larger screens if necessary */
  }
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
            <Heading></Heading>
            <SubHeading></SubHeading>
          </Image>
        </>
    )
}
export default Banner;