import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Logo from './logo192.png';

//Search App Bar

  //Search form style
  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));

  //Search Icon style
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

  //Search Input style
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '28ch',
        '&:focus': {
          width: '40ch',
        },
      },
    },
  }));

  export function SearchAppBar(props) {
    //Search Keyword Set
    const searchKeywordchange = (e) => 
    props.setKeyword(e.target.value);
    return (
      <Box sx={{ flexGrow: 1}}>
        <AppBar position="static" sx={{background : '#222222'}}>
          <Toolbar>
            {/* Logo */}
            <Box sx={{mr : 1.6}}>
            <img src={ Logo } className="App-logo" alt="logo" width="24" height="24"/>
            </Box>
            {/* Title */}
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block'} }}
              fontFamily = '"Black Ops One"'
            >
              Customer Data Management
            </Typography>
            {/* Search Form */}
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Name"
                inputProps={{ 'aria-label': 'search' }}
                name="searchKeyword"
                value={props.searchKeyword}
                onChange={searchKeywordchange}
              />
            </Search>
          </Toolbar>
        </AppBar>
      </Box>
    );
  }