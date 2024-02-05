import styled from "@emotion/styled";
import { API } from "../../Service/api";

import { Box ,TextField,Button} from "@mui/material";
import { useState,useContext } from "react";
import { DataContext } from "../../context/DataProvider";
import { useNavigate } from 'react-router-dom';

// const Error=styled(Typography)`
//      font-size:10px;
//     color:#ff6161;
//     line-height:10px;
//     margin-top:10px;
//     font-weight:600;
// `

const Component=styled(Box)`
    width:350px;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    margin: 20px auto;
    box-shadow:5px 2px 5px 2px rgba(0,0,0,0.6);
`
const Image=styled('img')({
    width:100,
    marginTop:30
})

const Wrapper=styled(Box)`
    display:flex;
    flex-direction:column;
    flex:1;
    padding:25px;
    & > div, & > button,& >p{
        margin-bottom:20px;
        width:100%
    }
`
const Para=styled('p')`
  text-align:center;
`
const LoginButton=styled(Button)`
   text-transform:none;
   background:#fb641B;
   color:red;
`
const SignupButton=styled(Button)`
   background:transparent;
   box-shadow:1px 1px 1px 1px rgba(0,0,0,0.2);
`
const signUpInitialValues={ //initial object(state) for signup credentals
    name:"",
    username:"",
    password:""
}

const loginInitialValues={
  username:"",
  password:""
}

const Login=({isUserAuthenticated})=>{
    const imageURL = 'https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png';
    const [state,setState]=useState('login'); // state for toggling login and signup page
    const [signup,setSignup]=useState(signUpInitialValues); // initial values for usercredentials(setting state for signup)
    const [login,setLogin]=useState(loginInitialValues); // setting state for login
    // const [error,setError]=useState('');
    const {setAccount} =useContext(DataContext);
    const navigate=useNavigate(); //using as custom hook
   const toggleButton=()=>{
       if(state === 'login'){
          setState('signup');
       }else{
        setState('login');
       }
   }
   const onInputChange=(e)=>{ // handling signup details
       setSignup({...signup,
          [e.target.name]:e.target.value
       })
   }
   const onValueChange=(e)=>{ // handling login details
      setLogin({...login,
        [e.target.name]:e.target.value
      })
   }
   const signupUser=async ()=>{
      let response=await API.userSignup(signup);
      if(response.isSuccess){
        // setError('');
        setSignup(signUpInitialValues);
        toggleButton('login');
      }else{
        // setError('something went wrong ');
        console.log("Something is wrong in signing up");
      }
   }
   const loginUser=async ()=>{
      let response=await API.userLogin(login);
      console.log(response);
      if(response.isSuccess){
         sessionStorage.setItem('accessToken',`Bearer ${response.data.accessToken}`);
         sessionStorage.setItem('refreshToken',`Bearer ${response.data.refreshToken}`);
         setAccount({username:response.data.username,name:response.data.name});
         isUserAuthenticated(true);
         navigate('/') ;
      }else{
        console.log("Something is wrong in signing up");
      }
   }
    return(
        <>    
         <Component>      
          <Image src={imageURL} alt="image" />
          {state==='login' ? 
          <Wrapper>
            <TextField id="standard-basic" label="Username" onChange={(e)=>onValueChange(e)} name="username" variant="standard" />
            <TextField id="standard-basic" label="password"  onChange={(e)=>onValueChange(e)} name="password" variant="standard" />
            {/* {error && <Error>{error}</Error>} */}

            <LoginButton variant="contained" onClick={(e)=>loginUser()}>Login</LoginButton>
            <Para >OR </Para>
            <SignupButton onClick={()=>toggleButton()}>Create  Account</SignupButton>
          </Wrapper> 
          :
          <Wrapper>
            <TextField id="standard-basic" label="Enter name" name="name" onChange={(e)=>onInputChange(e)} variant="standard" />
            <TextField id="standard-basic" label="Enter username" name="username" onChange={(e)=>onInputChange(e)} variant="standard" />
            <TextField id="standard-basic" label="Enterpassword" name="password" onChange={(e)=>onInputChange(e)} variant="standard" />
            
            {/* {error && <Error>{error}</Error>} */}

            <SignupButton onClick={(e)=>signupUser()}>Signup</SignupButton>
            <Para >OR </Para>
            <LoginButton onClick={()=>toggleButton()}>Already have an Account</LoginButton>
          </Wrapper>
        }
        </Component>        
        </>
    )
}
 export default Login;