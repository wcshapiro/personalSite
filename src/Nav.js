
import './App.css';
import { AppBar,Button,Toolbar,IconButton,Typography, withTheme } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: "#8B939C" ,
      flexGrow: 1,
      
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    
  }));

function Nav() {
    const classes = useStyles();
  return (
    <div className={classes.root} >
    <AppBar position="static" className={classes.root}>
      <Toolbar>
        {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          <MenuIcon /> 
        </IconButton>*/}
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" href="/">
          Home
        </IconButton>
        {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          Resume
        </IconButton> */}
        
      </Toolbar>
    </AppBar>
  </div>
  );
}

export default Nav;
