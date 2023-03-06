import { width } from "@mui/system";
import React from "react";

import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

function PostLoading(Component) {
    return function PostLoadingComponent({ isLoading, ...props }) {
        if (!isLoading) return <Component {...props} />;    
        return (
            <div> 
                <p style={{ fontSize: '25px' }}>
                    Loading posts.../Please Login or Register
                </p>
                <Box sx={{ width: '50%', display: 'flexbox', marginTop: '150px', marginLeft: '25%'}}>
                    <LinearProgress />
                </Box>
            </div>
        );

    };
}

export default PostLoading;