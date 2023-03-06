import './App.css';
import React, { useEffect, useState, useContext } from 'react';
import Posts from './components/Posts/Posts';
import PostLoadingComponent from './components/Posts/PostsLoading';
import axiosInstance from './axios';
import Link from '@material-ui/core/Link';
import { NavLink } from 'react-router-dom';
import {  makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import AddIcon from '@mui/icons-material/Add';
import Button from '@material-ui/core/Button';

import { colors } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import jwtDecode from 'jwt-decode';

const useStyles = makeStyles((theme) => ({
	
	link: {
		display: 'flexbox',
		flexDirection: 'center',
		margin: theme.spacing(1, 5),

	},

	createButton: {
		display: 'flexbox',
		flexDirection: 'center',
		marginTop: '5px',
		marginBottom: '5px',

	} ,

}));

function App() {
	const [a, b] = React.useState();
	

	useEffect(() => {
		if(localStorage.getItem('access_token') === null || localStorage.getItem('access_token') === undefined) {
			console.log("No token available!");
		} else {
			b(jwtDecode(localStorage.getItem('access_token')).username);
		}
	});

	const classes = useStyles();
	
	const PostLoading = PostLoadingComponent(Posts);
	const [appState, setAppState] = useState({
		loading: true,
		posts: null,
	});

	useEffect(() => {
		axiosInstance.get().then((res) => {
			const allPosts = res.data;
			setAppState({ loading: false, posts: allPosts });
			// console.log(res.data);
		});
	}, [setAppState]);

	return (
		<div className="App">
			<React.Fragment>
				<CssBaseline />

				{localStorage.getItem('access_token') !== null &&
					<Link 
					component={NavLink}
					className={classes.link}
					underline="hover"
					to="/admin">
						Admin
					</Link>
				}

				{localStorage.getItem('access_token') !== null &&
					<Button
						className={classes.createButton}
						href={'/admin/create'}
						variant="contained"
						color="secondary"
					>	<AddIcon></AddIcon>NEW POST
					</Button>
				}

			</React.Fragment>

			<h1>Latest Posts:</h1>
		
			{localStorage.getItem('access_token') !== null &&
				<p about='User_ID'>Hi {a}!</p>
			}
			
			<PostLoading isLoading={appState.loading} posts={appState.posts} />

		</div>
	
	);

}
export default App;