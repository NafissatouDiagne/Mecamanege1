import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';

import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import EmojiNatureIcon from '@mui/icons-material/EmojiNature';


import { CssBaseline } from '@mui/material';

import {
  useColorScheme as useMaterialColorScheme,
  Experimental_CssVarsProvider as MaterialCssVarsProvider,
  experimental_extendTheme as extendMaterialTheme,
  THEME_ID
} from "@mui/material/styles";
import ToggleMode from './ToggleMode'

import {
  CssVarsProvider as JoyCssVarsProvider,
  useColorScheme as useJoyColorScheme
} from "@mui/joy/styles";
import Acceuil from './Acceuil';
import { AuthContext } from '../context/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { Link, useNavigate } from 'react-router-dom';

const pages = [{id:1,text:'Ouvriers',link:'/Ouvriers'}, {id:2,text:'Mon Profile',link:'/MonProfile'}];

const materialTheme = extendMaterialTheme();
function ResponsiveAppBar() {
    const navigate=useNavigate()
    const handleProfileClick = (e) => {
      e.preventDefault()
      // Handle profile click logic here
    };
    
    const handleAccountClick = (e) => {
      e.preventDefault()
  
      // Handle account click logic here
    };
    const handleLogoutClick = async () => {
      try {
        await signOut(auth);  // Assuming 'auth' is your authentication instance
        navigate('/signInC')
      } catch (error) {
        console.error('Error signing out:', error);
      }
    };
    const settings = [
      { text: 'Profile', link: '', handler: handleProfileClick },
      { text: 'Account', link: '', handler: handleAccountClick },
      { text: 'Logout', link: '', handler: handleLogoutClick }
    ];
    
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);


 
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
 
const {currentUser}=React.useContext(AuthContext)
  const [datas,setDatas]=React.useState([])
  const [profile_picture,setProfile_picture]=React.useState('')
 
  return (
    
    <MaterialCssVarsProvider theme={{ [THEME_ID]: materialTheme }}>
    <JoyCssVarsProvider>
      <CssBaseline enableColorScheme />
  
    <AppBar position="fixed" >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <EmojiNatureIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
     
          CELESTINE   <ToggleMode />
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.id} onClick={handleCloseNavMenu}>
              <Link to={page.link}>    <Typography textAlign="center">{page.text}</Typography></Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <EmojiNatureIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            CELESTINE <ToggleMode />
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
           
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt='' src={profile_picture} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
             {settings.map((setting) => (
  <MenuItem key={setting.text} onClick={() => setting.handler()}>
    <Typography textAlign="center">{setting.text}</Typography>
  </MenuItem>
))}

            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    <div className='page1' style={{marginTop:60}}>

    <Acceuil/>
    </div>
    <CssBaseline/>
    
    </JoyCssVarsProvider>
    </MaterialCssVarsProvider>
  );
}
export default ResponsiveAppBar;
    