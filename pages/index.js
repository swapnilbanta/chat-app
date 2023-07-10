
import Button from '@mui/material/Button';
import { useSession, signIn, signOut } from "next-auth/react"
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { useState } from 'react';

export default function Home() {
  const { data: session } = useSession()
  const [text, setText] = useState('');
  const handleSubmit =  async (e) => {
    e.preventDefault();
    const response = await fetch('/api/save-data', {
      method: 'POST',   
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });
    console.log(response);
  
  };
  
  return (
   <div>
    <h1>Home</h1>{
      session ? (
<>


<h2> Signed as {session.user.email}</h2>
<Button variant="contained" onClick={()=> signOut()}>Sign Out</Button>
<Box
  display="flex"
  justifyContent="center"
  alignItems="center"
>
<form onSubmit={handleSubmit}>
      <TextField 
     multiline
     rows={5}
     maxRows={10}
     value={text}
     onChange={(e) => setText(e.target.value)} 
      
      id="outlined-basic"  variant="outlined" />
      <br></br>
      <br></br>
<Button  type="submit" variant="contained" color="primary" >Submit</Button>
</form>
   
</Box>
</>
      ):(<>

<button onClick={()=> signIn()}>Sign In</button>


      </>

      )
    }
   </div>
  )
}
