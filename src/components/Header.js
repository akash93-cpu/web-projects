import React, { useState, useContext, createContext, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import { fade, makeStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import SearchBar from 'material-ui-search-bar';
import { useHistory } from 'react-router-dom';
import { LoginContext } from './LoginContext';
import jwtDecode from 'jwt-decode';


const useStyles = makeStyles((theme) => ({
	appBar: {
		borderBottom: `1px solid ${theme.palette.divider}`,
	},
	link: {
		margin: theme.spacing(1, 1.5),
	},
	toolbarTitle: {
		flexGrow: 1,
	},

	userText: {
		flexDirection: 'center',
		margin: theme.spacing(0, 45),
	},
}));

function Header() {
	
	const [a1, b1] = React.useState();

	// useEffect(() => {
		
	// 	if(localStorage.getItem('access_token') === null || localStorage.getItem('access_token') === undefined) {
	// 		console.log("No token available!");
	// 	} else {
	// 		b1(jwtDecode(localStorage.getItem('access_token')).username);
	// 	}
	
	// } );

	const classes = useStyles();
	let history = useHistory();
	const [data, setData] = useState({ search: '' });

	const goSearch = (e) => {
		history.push({
			pathname: '/search/',
			search: '?search=' + data.search,
		});
		window.location.reload();
	};

	return (
		<React.Fragment>
			<CssBaseline />
			<AppBar
				position="static"
				color="default"
				elevation={0}
				className={classes.appBar}
			>
				<Toolbar className={classes.toolbar}>
					<Typography
						variant="h6"
						color="inherit"
						noWrap
						className={classes.toolbarTitle}
						
					>
						<Link
							component={NavLink}
							underline="hover"
							color="textPrimary"
							to={"/"}
						>
							BlogApp
						</Link>
					</Typography>

					{/* {localStorage.getItem('access_token') !== null &&
						<Typography className={classes.userText}>
							Hi! {a1}
						</Typography> || localStorage.getItem('access_token') === null &&
						<Typography className={classes.userText}>
							Please login!
						</Typography>
					} */}

					<SearchBar
						value={data.search}
						onChange={(newValue) => setData({ search: newValue })}
						onRequestSearch={() => goSearch(data.search)}
					/>

					<nav>
						<Link
							id='Register-link'
							color="textPrimary"
							href="#"
							className={classes.link}
							component={NavLink}
							to="/register"
						>
							Register
						</Link>
					</nav>
					
					<Button
						id='Login-button'
						href="#"
						color="primary"
						variant="outlined"
						className={classes.link}
						component={NavLink}
						
						to="/login"
					>
						Login
					</Button>

					{localStorage.getItem('access_token') !== null &&
						<Button
							id='Logout-button'
							href="#"
							color="primary"
							variant="outlined"
							className={classes.link}
							component={NavLink}
							
							
							to="/logout"
						>
							Logout
						</Button>
					}

				</Toolbar>
			</AppBar>
		</React.Fragment>
	);

}

export default Header;