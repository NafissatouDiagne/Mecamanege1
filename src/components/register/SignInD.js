import { Alert, Button, IconButton, Snackbar } from '@mui/material';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase';
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
		navigate('/Home')
		
	  }
	  catch (error) {
		setError(true)
		setOpen(true)
		setColor('error')
		setMessage("Email ou mot de passe incorrecte")
		console.log('setError:', error)
	  }
	  
	}
	const handleClose = (event, reason) => {
	  if (reason === 'clickaway') {
		return;
	  }
  
  
	  setError(false)
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
    <div>
      <main class="d-flex w-100">
		<div class="container d-flex flex-column">
			<div class="row vh-100">
				<div class="col-sm-10 col-md-8 col-lg-6 col-xl-5 mx-auto d-table h-100">
					<div class="d-table-cell align-middle">

						<div class="text-center mt-4">
							<h1 class="h2">Welcome back!</h1>
							<p class="lead">
								Sign in to your account to continue
							</p>
						</div>

						<div class="card">
							<div class="card-body">
								<div class="m-sm-3">
									<form onSubmit={handleSubmit}>
										<div class="mb-3">
											<label class="form-label">Email</label>
											<input class="form-control form-control-lg" type="email" name="email" placeholder="Enter your email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
										</div>
										<div class="mb-3">
											<label class="form-label">Password</label>
											<input class="form-control form-control-lg" type="password" name="password" placeholder="Enter your password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
										</div>
										<div>
											<div class="form-check align-items-center">
												<input id="customControlInline" type="checkbox" class="form-check-input" value="remember-me" name="remember-me" checked/>
												<label class="form-check-label text-small" for="customControlInline">Remember me</label>
											</div>
										</div>
										<div class="d-grid gap-2 mt-3">
											<button href="index.html" class="btn btn-lg btn-primary" type='submit'>Sign in</button>
										</div>
									</form>
								</div>

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
						<div class="text-center mb-3">
							Don't have an account? <Link to='/signUp' >Sign up</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	</main>

    </div>
  )
}

export default SignIn
