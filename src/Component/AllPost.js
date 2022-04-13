import * as React from 'react';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import { darkTheme, ondate } from './Util'
import { Storage, API, graphqlOperation } from 'aws-amplify';
import { listPostdata } from '../graphql/queries';

Storage.configure({
    customPrefix: {
        public: 'images/'
    }
})

export default function AllPost() {

    const [allposts, setAllposts] = useState([]);

    useEffect(() => {
        const listposts = async() => {
            const result = await API.graphql(graphqlOperation(listPostdata));
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
            setAllposts(posts);
        }
        
        listposts().catch(console.error);

    }, []);


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
                Post Your Life!
                </Typography>
                <Typography variant="h5" align="center" color="text.secondary" paragraph>
                This is an online image posting and interaction platform. You can post a photo
                with some description. Other users can like your post and comment them as well.
                Share your life now!
                </Typography>
                <Stack
                sx={{ pt: 4 }}
                direction="row"
                spacing={2}
                justifyContent="center"
                >
                <Button variant="contained" href="/create">Create new post</Button>
                <Button variant="outlined" href="/manage">Manage your post</Button>
                </Stack>
            </Container>
            </Box>
            <Container sx={{ py: 8 }} maxWidth="md">
            
            <Grid container spacing={4}>
                {allposts.map((post) => (
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
                    </CardActions>
                    </Card>
                </Grid>
                ))}
            </Grid>
            </Container>
        </ThemeProvider>
    )
}