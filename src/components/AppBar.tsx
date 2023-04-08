import * as React from 'react';
import { useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Dispatch, SetStateAction } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
const pages = ['Products', 'Pricing', 'Blog'];


interface props {
    setUserSelected: Dispatch<SetStateAction<Record<string, any>>>;
    userSelected: Record<string, any> | null;
}

function ResponsiveAppBar(props: props) {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const [gettingUserList, setGettingUserList] = React.useState(true);
    const [userList, setUserList] = React.useState<Record<string, any>[]>([]);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = (user: Record<string, any>) => {
        setAnchorElUser(null);
        props.setUserSelected(user)
    };


    useEffect(() => {
        //Call backend and get users for appbar dropdown
        const getUserList = async () => {

            const response = await fetch("http://localhost:5000/users");
            const jsonData = await response.json();
            setUserList(jsonData)
            props.setUserSelected(jsonData[0])
            setGettingUserList(false)


        }
        getUserList();
        return () => {

        }
    }, []);

    return (
        <AppBar sx={{
            backgroundColor: '#373737'
        }} position='sticky'>
            <Container maxWidth="lg">

                <Toolbar disableGutters>
                    <AdbIcon sx={{ display: { xs: 'none', md: 'flex', color: '#06A77D' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem', color: '#06A77D',
                            textDecoration: 'none',
                        }}
                    >
                        VENDEE
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

                        </Menu>
                    </Box>
                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
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
                        LOGO
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

                    </Box>

                    {gettingUserList ? <CircularProgress /> : <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open users">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar sx={{ marginRight: '10px', backgroundColor: '#06A77D' }} alt={props?.userSelected?.name} src="/static/images/avatar/2.jpg" />
                                <Typography sx={{ color: 'white', fontSize: '20px' }} textAlign="center">₩{props?.userSelected?.balance}</Typography>
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
                            onClose={(event, reason) => {
                                props.userSelected && handleCloseUserMenu(props.userSelected)
                            }}
                        >
                            {userList.map((user) => (
                                <MenuItem key={user.name} onClick={() => handleCloseUserMenu(user)}>
                                    <Typography textAlign="center">{user.name}</Typography>

                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>}
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default ResponsiveAppBar;


