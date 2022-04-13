import * as React from 'react';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import { darkTheme, ondate } from './Util'
import { Storage, Amplify, API, graphqlOperation } from 'aws-amplify';
import { listPostdata } from '../graphql/queries';
import { deletePostdata } from '../graphql/mutations'
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import awsExports from '../aws-exports';
Amplify.configure(awsExports);


Storage.configure({
    customPrefix: {
        public: 'images/'
    }
})

function UserPost({ user }) {

    const [userPosts, setUserPosts] = useState([]);
    const [deleted, setDeleted] = useState(0);

    useEffect(() => {
        const listposts = async() => {
            let filter = {
                creator: {
                    eq: user.username
                }
            }
            const result = await API.graphql(graphqlOperation(listPostdata, {filter: filter}));
            let returnposts = result.data.listPostdata.items;
            let posts = [];
            let image = null;
            for (let i = 0; i < returnposts.length; i++) {
                if (returnposts[i]._deleted) {
                    continue;
                }
                image = await Storage.get(returnposts[i].key)
                returnposts[i].image = image;
                posts.push(returnposts[i])
            }
            posts.sort(ondate);
            posts.reverse();
            console.log(posts)
            setUserPosts(posts);
        }
        
        listposts().catch(console.error);

    }, [user.username, deleted]);

    const handleDelete = async (id, version, key) => {
        // delete postdata
        console.log(id)
        console.log(version)
        console.log(key)
        const dataresult = await API.graphql(graphqlOperation(deletePostdata, { input: { id: id, _version: version } }));
        console.log(dataresult);
        // delete image data
        const imageresult = await Storage.remove(key);
        console.log(imageresult);
        alert("Delete Success");
        setDeleted(deleted + 1)
    }

    return (
        <ThemeProvider theme={darkTheme}>
            <Box
            sx={{
                bgcolor: 'background.paper',
                pt: 8,
                pb: 6,
            }}
            >
            <Container maxWidth="sm">
                <Typography
                component="h1"
                variant="h2"
                align="center"
                color="text.primary"
                gutterBottom
                >
                Manage Your Post
                </Typography>
                
            </Container>
            </Box>
            <Container sx={{ py: 8 }} maxWidth="md">
            {/* End hero unit */}
            <Grid container spacing={4}>
                {userPosts.map((post) => (
                <Grid item key={post.key} xs={12} sm={6} md={6}>
                    <Card
                    sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                    >
                    <CardMedia
                        component="img"
                        height="300"
                        image={post.image}
                        alt="random"
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                        <Typography gutterBottom variant="h5" component="h2">
                        {post.title}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            By {post.creator}
                        </Typography>
                        <Typography>
                        {post.description}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">View</Button>
                        <Button size="small" onClick={ () => handleDelete(post.id, post._version, post.key) }>Delete</Button>
                    </CardActions>
                    </Card>
                </Grid>
                ))}
            </Grid>
            </Container>
        </ThemeProvider>
    )
}

export default withAuthenticator(UserPost);