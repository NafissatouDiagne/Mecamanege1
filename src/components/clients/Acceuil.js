import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import { CssBaseline, createTheme } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MovieIcon from '@mui/icons-material/Movie';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import ChatIcon from '@mui/icons-material/Chat';
import Listes from './Listes';
import Formulaire from '../pagesClient/Formulaire';
import MonProfiles from './MonProfiles';


function StyledTab(props) {
  const { label, icon, ...other } = props;

  return (
    <Tab
      label={
        <div style={{ display: 'flex', alignItems: 'center' ,marginTop:'7px'}}>
          {icon && <span style={{ marginRight: '8px' }}>{icon}</span>}
          {label}
        </div>
      }
      {...other}
    />
  );
}

StyledTab.propTypes = {
  label: PropTypes.node,
  icon: PropTypes.node,
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function Acceuil() {
  
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

 

  return (
    <>
        <Box
      sx={{ marginTop: 1, flexGrow: 1, bgcolor: 'background.paper', display: 'flex' }}
    >
     

      <Tabs
        orientation="vertical"
        variant="scrollable"
        
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{
          borderRight: 1,
          borderColor: 'divider',
          flex: '0 0 auto', // Adjusted to prevent Tabs from growing
          '@media (max-width: 600px)': {
            display: 'none', // Hide Tabs on smaller screens
          },
        }}
      >
        <StyledTab icon={<AccountCircleIcon />} label="Profiles" {...a11yProps(0)} />
        <StyledTab icon={<MovieIcon />} label="Formulaires" {...a11yProps(1)} />
        <StyledTab icon={<LocalMoviesIcon />} label="Bandes Annonces" {...a11yProps(2)} />
        <StyledTab icon={<NewReleasesIcon />} label="Nouveautes" {...a11yProps(3)} />
        <StyledTab icon={<PlaylistAddCheckIcon />} label="Ma liste d'anime" {...a11yProps(4)} />
        <StyledTab icon={<ChatIcon />} label="Commentaires" {...a11yProps(5)} />
        <Tab label="Item Seven" {...a11yProps(6)} />
      </Tabs>
      <Box sx={{ flexGrow: 1 }}>
        <TabPanel value={value} index={0}>
          <Listes/>
        </TabPanel>
        <TabPanel value={value} index={1}>
           <Formulaire/>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <MonProfiles/>
        </TabPanel>
        <TabPanel value={value} index={3}>
         
        </TabPanel>
        <TabPanel value={value} index={4}>
         
        </TabPanel>
        <TabPanel value={value} index={5}>
         
        </TabPanel>
        <TabPanel value={value} index={6}>
          Item Seven
        </TabPanel>
      </Box>

    </Box>
    <CssBaseline/>
    </>

  );
}
