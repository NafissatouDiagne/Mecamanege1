import { Alert, Button, IconButton, Snackbar } from '@mui/material';
import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../../firebase';

function SignIn() {
    const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState(false);
    const [message, setMessage] = useState("");
	const [color, setColor] = useState("");
	const [open, setOpen] = useState(false);
	const navigate= useNavigate()
	const handleSubmit = async (e) => {
  
	  e.preventDefault()
	
	  try {
		await signInWithEmailAndPassword(auth, email, password)
		navigate('/')
		
	  }
	  catch (error) {
		setError(true)
        setOpen(true)
        setColor('error')
		setMessage("Email ou mot de passe incorrecte")
		console.log('setError:', error)
	  }
	  
	}
	const handleClose = () => {
	 setOpen(false)
	  }
  
  
	 
	const action = (
		<React.Fragment>
		  <Button color="secondary" size="small" onClick={handleClose}>
			UNDO
		  </Button>
		  <IconButton
			size="small"
			aria-label="close"
			color="inherit"
			onClick={handleClose}
		  >
		x
		  </IconButton>
		</React.Fragment>
	  );
  
  return (
    <div className="background-radial-gradient overflow-hidden">

 

  <div className="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
    <div className="row gx-lg-5 align-items-center mb-5">
      <div className="col-lg-6 mb-5 mb-lg-0" style={{zindex: 10}}>
        <h1 className="my-5 display-5 fw-bold ls-tight" style={{color: "hsl(218, 81%, 95%)"}}>
          The best offer <br />
          <span style={{color: "hsl(218, 81%, 75%)"}}>for your business</span>
        </h1>
        <p className="mb-4 opacity-70" style={{color: 'hsl(218, 81%, 85%)'}}>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit.
          Temporibus, expedita iusto veniam atque, magni tempora mollitia
          dolorum consequatur nulla, neque debitis eos reprehenderit quasi
          ab ipsum nisi dolorem modi. Quos?
        </p>
      </div>

      <div className="col-lg-6 mb-5 mb-lg-0 position-relative">
        <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
        <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>

        <div className="card bg-glass">
          <div className="card-body px-4 py-5 px-md-5">
            <form onSubmit={handleSubmit}>
           
         
             

            
              <div className="form-outline mb-4">
                <input type="email" id="form3Example3" className="form-control"  value={email} onChange={(e)=>setEmail(e.target.value)}/>
                <label className="form-label" for="form3Example3">Address Email</label>
              </div>

              
              <div className="form-outline mb-4">
                <input type="password" id="form3Example4" className="form-control" value={password} onChange={(e)=>setPassword(e.target.value)} />
                <label className="form-label" for="form3Example4">Mot de passe</label>
              </div>

                     <div className="form-check d-flex justify-content-center mb-4">
                <input className="form-check-input me-2" type="checkbox" value="" id="form2Example33" checked />
                <label className="form-check-label" for="form2Example33">
                Se souvenir de moi
                </label>
              </div>

                          <button type="submit" className="btn btn-primary btn-block mb-4" >
                Sign in
              </button>

              
              <div className="text-center">
               <p>si vous n'avez pas de compte:</p>
                <Link to='/signupC' className="btn btn-link btn-floating mx-1">
                  Sign Up
                </Link>

               
              </div>
            </form>
          </div>
          {open   &&   <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                
              >
                <Alert
                  onClose={handleClose}
                  severity={color}
                  sx={{ width: "100%" }}
                >
                  {message}
                </Alert>
              </Snackbar>}
        </div>
      </div>
    </div>
  </div>


    </div>
  )
}

export default SignIn
