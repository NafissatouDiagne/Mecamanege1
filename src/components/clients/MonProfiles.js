import React, { useState, useEffect } from 'react';
import { Avatar, List, ListItem, IconButton } from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';


import { green, pink } from '@mui/material/colors';
import Page1 from './Page1';


export default function MonProfiles() {
const [userMessage,setUserMessage]=useState([])
 
  
  return (
    <>
      <div className='page2'>
      
      </div>

      <div className='page2_1'>
        <List style={{ marginTop: '-120px' }}>
          <ListItem>
            <Avatar style={{ position: 'relative', width: '180px', height: '180px', margin: '0 auto', borderRadius: '50%' }}>
              <img src=''alt="Avatar" style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
              <input
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                id="avatar-upload"
                
                
              />
              {/* Icon button to trigger the file input */}
              <label htmlFor="avatar-upload" style={{ position: 'absolute', bottom: '18px', right: '10px' }}>
              <Avatar sx={{ bgcolor: pink[500] }}>
                  <PhotoCameraIcon />
                </Avatar>
              </label>
              
            </Avatar>
          </ListItem>
        </List>
       
      </div>
      <div style={{paddingTop:'60px'}}> 
        <Page1/>
      </div>
    </>
  );
}