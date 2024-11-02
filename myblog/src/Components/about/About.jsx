import { Box, styled, Typography, Link } from '@mui/material';
import { GitHub, Instagram, Email } from '@mui/icons-material';

const Banner = styled(Box)`
    background-image: url(https://www.wallpapertip.com/wmimgs/23-236943_us-wallpaper-for-website.jpg);
    width: 100%;
    height: 50vh;
    background-position: left 0px bottom 0px;
    background-size: cover;
`;

const Wrapper = styled(Box)`
    padding: 20px;
    & > h3, & > h5 {
        margin-top: 50px;
    }
`;

const Text = styled(Typography)`
    && {
        color: #878787;
        
        & b {
            font-weight: bold;
            color: black; /* You can remove this line if you want default black color */
        }
    }
`;

const About = () => {
    return (
        <Box>
            <Banner />
            <Wrapper>
                <Typography variant="h3">GRIET BLOG APPLICATION</Typography>
                <Text variant="h5">
                    Griet College, also known as Gokaraju Rangaraju Institute of Engineering and Technology (GRIET), is a prominent engineering college located in Hyderabad, India. Here are some key points about GRIET: <br /><br />

                    <b>Establishment:</b> GRIET was established in 1997 by the Gokaraju Rangaraju Educational Society. It is affiliated with the Jawaharlal Nehru Technological University (JNTU), Hyderabad. <br /><br />

                    <b>Accreditation:</b> The college is accredited by the National Board of Accreditation (NBA) and has been granted autonomous status by the University Grants Commission (UGC) and AICTE. <br /><br />

                    <b>Courses Offered:</b> GRIET offers undergraduate (B.Tech) and postgraduate (M.Tech) programs in various disciplines of engineering and technology. It also offers Master of Business Administration (MBA) programs. <br /><br />

                    <b>Campus and Facilities:</b> The campus is spread over a large area and includes modern infrastructure, well-equipped laboratories, libraries, sports facilities, and hostels for students. <br /><br />

                    <b>Placements:</b> GRIET has a dedicated placement cell that facilitates campus placements for its students. Many reputed companies visit the campus for recruitment, offering competitive job opportunities. <br /><br />

                    <b>Research and Development:</b> The college encourages research activities through its R&D cell and promotes collaboration with industries and research organizations. <br /><br />

                    <b>Student Life:</b> Beyond academics, GRIET encourages students to participate in co-curricular and extracurricular activities. There are student clubs, cultural events, and technical festivals that contribute to overall development. <br /><br />

                    GRIET is recognized for its quality education, strong industry connections, and focus on holistic development, making it a preferred choice for engineering aspirants in Hyderabad and beyond. <br /><br />

                    <Box component="span" style={{ marginLeft: 5 }}>
                        <Link href="https://github.com/VinayakReddy123/BlogApplication" color="inherit" target="_blank"><GitHub /></Link>
                    </Box>
                </Text>
                <Text variant="h5">
                    Need something built or simply want to have chat? Reach out to me on
                    <Box component="span" style={{ marginLeft: 5 }}>
                        <Link href="https://www.instagram.com/vinayak_reddy11/" color="inherit" target="_blank">
                            <Instagram />
                        </Link>
                    </Box>
                    or send me an Email
                    <Link href="mailto:codeforinterview@gmail.com?Subject=This is a subject" target="_blank" color="inherit">
                        <Email />
                    </Link>.
                </Text>
            </Wrapper>
        </Box>
    )
}

export default About;
