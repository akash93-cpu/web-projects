import React from "react";
import axiosInstance from "../../axios";
import { useHistory, useParams } from "react-router-dom";

import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Alert from '@mui/material/Alert';

import jwtDecode from "jwt-decode";

export default function Create() {
    const history = useHistory();
    const { id } = useParams();

    const [ee, f] = React.useState();

	React.useEffect(() => {
		if(localStorage.getItem('access_token') === null || localStorage.getItem('access_token') === undefined) {
			console.log("No token available!");
		} else {
			f(jwtDecode(localStorage.getItem('access_token')).user_id);
		}
	});

    

    const handleSubmit = (e) => {
        
        e.preventDefault();
        axiosInstance
            .delete('admin/delete/' + id)
            .catch(function (error){
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                }

            })
            .then(function () {
                history.push({
                    pathname: '/admin/',
                });
                window.location.reload();
            });
    };

    return (
        
		<Container component="main" maxWidth="sm">
			<Box
				display="flex"
				justifyContent="center"
				m={1}
				p={1}
				bgcolor="background.paper"
			>
                { ee == 1 &&
				<Button
					variant="contained"
					color="secondary"
					type="submit"
					onClick={handleSubmit}
				>
					Press here to confirm delete
				</Button> 
                || ee != 1 &&
                <Alert severity="error">Only the admin is allowed to DELETE posts!</Alert>
                }

			</Box>
		</Container>
	);
}
