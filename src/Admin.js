import React, {useEffect, useState} from "react";

import Link from '@material-ui/core/Link';
import { NavLink } from 'react-router-dom';
import {  makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import './App.css';
import Posts from './components/Admin/Posts';
import PostLoadingComponent from './components/Posts/PostsLoading';
import axiosInstance from "./axios";

function Admin () {
    const PostsLoading = PostLoadingComponent(Posts);
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
                    {/* <Link    
                    underline="hover"
                    to="/admin">
                        Admin
                    </Link> */}
		    </React.Fragment>
            <h1>Latest Posts:</h1>
            <PostsLoading isLoading={appState.loading} posts={appState.posts} />
        </div>
    );
}

export default Admin;