import * as React from 'react';
import "./Navbar.css";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import { makeStyles } from '@mui/styles';
import insta from "../assests/instagram.png"
import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import { Avatar } from '@mui/material';
export default function Navbar({userData}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const history=useNavigate();
  const {logout}=React.useContext(AuthContext)
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const useStyles=makeStyles({
    appb:{
      background:'white'
    }
  })
  const classes=useStyles();
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleProfile=()=>{
     history(`/profile/${userData.uid}`);
  }
  const handleBannerClick=async()=>{
    history('/');
  }
  const handleExplore=()=>{
    let win=window.open('https://github.com/garv9852','blank');
    win.focus();
  }
  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleProfile}><AccountCircleIcon/>&nbsp;Profile</MenuItem>
      <MenuItem onClick={logout}><ExitToAppIcon/>&nbsp;logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfile}><AccountCircleIcon/>&nbsp;Profile</MenuItem>
      <MenuItem onClick={logout}><ExitToAppIcon/>&nbsp;logout</MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{background:"white"}}>
        <Toolbar>
          <div className='logo' onClick={handleBannerClick}>
            <img src={insta}/>
          </div>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' },color:'black',alignItems:"center",marginRight:"9rem"}}>
            <IconButton color="inherit">
              <HomeIcon onClick={handleBannerClick}/>
            </IconButton>
            <IconButton color="inherit">
              <ExploreIcon onClick={handleExplore}/>
            </IconButton>
            <IconButton
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit">
              <Avatar src={userData.profilePic}/>
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' },color:'black' }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
