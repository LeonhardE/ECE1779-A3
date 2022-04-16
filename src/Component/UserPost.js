import * as React from 'react';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';
import Backdrop from '@mui/material/Backdrop';
import CommentIcon from '@mui/icons-material/Comment';
import SendIcon from '@mui/icons-material/Send';
import { blue } from '@mui/material/colors';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import { ThemeProvider } from '@mui/material/styles';
import { darkTheme, ondate, fixtime, checkliked, countlike, getcomments } from './Util'
import { Storage, Amplify, API, graphqlOperation } from 'aws-amplify';
import { createPostlike, deletePostlike, createPostcomment, deletePostcomment, deletePostdata } from '../graphql/mutations';
import { listPostdata, listPostlikes, listPostcomments} from '../graphql/queries';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import awsExports from '../aws-exports';
Amplify.configure(awsExports);

function UserPost({ user }) {

    const [userPosts, setUserPosts] = useState([]);
    const [alllikes, setAlllikes] = useState([]);
    const [open, setOpen] = useState([]);
    const [map, setMap] = useState({});
    const [liked, setLiked] = useState([]);
    const [comment, setComment] = useState("");
    const [commentlist, setCommentlist] = useState([]);
    const [commentdeleted, setCommentdeleted] = useState({});
    const [change, setChange] = useState(0);

    const handleClose = () => {
        let map = [];
        for (let i = 0; i < open.length; i++) {
            map[i] = false;
        }
        setOpen(map);
        setComment("");
    };

    const handleToggle = (key) => {
        let map = [];
        for (let i = 0; i < open.length; i++) {
            if (i === key) map[i] = true;
            else map[i] = false;
        }
        setOpen(map);
    };

    const handleLike = async (key) => {
        let newliked = [];
        for (let i = 0; i < liked.length; i++) {
            newliked[i] = liked[i];
        }
        if (liked[map[key]] === false) {
            newliked[map[key]] = true;
            userPosts[map[key]].like += 1;
            const likedata = { 
                key: key, 
                sender: user.username
            }
            const likeresult = await API.graphql(graphqlOperation(createPostlike, {input: likedata}));
            console.log(likeresult)
        }
        else {
            newliked[map[key]] = false;
            userPosts[map[key]].like -= 1;
            let id = "";
            let version = "";
            for (let i = 0; i < alllikes.length; i++) {
                if (alllikes[i].key === key && alllikes[i].sender === user.username) {
                    id = alllikes[i].id;
                    version = alllikes[i]._version;
                }
            }
            const likedata = { 
                id: id, 
                _version: version
            }
            const likeresult = await API.graphql(graphqlOperation(deletePostlike, {input: likedata}));
            console.log(likeresult)
        }
        setLiked(newliked);
    }

    const handleSubmit = async (key) => {
        if (comment === "") {
            alert("Field required. Please check your input.")
        }
        else {
            const commentdata = { 
                key: key,
                content: comment,
                sender: user.username
            }
            const commentresult = await API.graphql(graphqlOperation(createPostcomment, {input: commentdata}));
            console.log(commentresult);
            alert("Success!")
            setComment("");
            commentlist[map[key]].unshift(commentdata);
            setChange(change + 1);
        }
    }

    const handleDelete = async (id, version) => {
        const commentdata = { 
            id: id, 
            _version: version
        }
        const commentresult = await API.graphql(graphqlOperation(deletePostcomment, {input: commentdata}));
        console.log(commentresult);
        alert("Comment deleted")
        let newdeleted = {};
        for (let i = 0; i < commentlist.length; i++) {
            for (let j = 0; j < commentlist[i].length; j++) {
                if (commentlist[i][j].id) {
                    newdeleted[commentlist[i][j].id] = commentdeleted[commentlist[i][j].id];
                }
            }
        }
        newdeleted[id] = true;
        setCommentdeleted(newdeleted);
        setChange(change + 1);
    }

    useEffect(() => {
        const listposts = async() => {
            let filter = {
                creator: {
                    eq: user.username
                }
            }
            const result = await API.graphql(graphqlOperation(listPostdata, {filter: filter}));
            let returnposts = result.data.listPostdata.items;
            const likeresult = await API.graphql(graphqlOperation(listPostlikes));
            let returnlikes = likeresult.data.listPostlikes.items;
            let likedetails = [];
            for (let i = 0; i < returnlikes.length; i++) {
                if (returnlikes[i]._deleted) {
                    continue;
                }
                likedetails.push(returnlikes[i]);
            }
            const commentresult = await API.graphql(graphqlOperation(listPostcomments));
            let returncomments = commentresult.data.listPostcomments.items;
            let commentdetails = [];
            for (let i = 0; i < returncomments.length; i++) {
                if (returncomments[i]._deleted) {
                    continue;
                }
                commentdetails.push(returncomments[i]);
            }
            let posts = [];
            let openlist = [];
            let likelist = [];
            let comments = [];
            let mapcount = {};
            let mapdeleted = {};
            let image = null;
            for (let i = 0; i < returnposts.length; i++) {
                if (returnposts[i]._deleted) {
                    continue;
                }
                image = await Storage.get("images/" + returnposts[i].key)
                returnposts[i].image = image;
                returnposts[i].createdAt = fixtime(returnposts[i].createdAt);
                openlist.push(false);
                posts.push(returnposts[i])
            }
            posts.sort(ondate);
            posts.reverse();
            for (let i = 0; i < posts.length; i++) {
                mapcount[posts[i].key] = i;
                posts[i].like = countlike(likedetails, posts[i].key);
                likelist.push(checkliked(likedetails, posts[i].key, user.username));
                comments.push(getcomments(commentdetails, posts[i].key));
                for (let j = 0; j < comments[i].length; j++) {
                    mapdeleted[comments[i][j].id] = false;
                }
            }
            setAlllikes(likedetails);
            setUserPosts(posts);
            setOpen(openlist);
            setMap(mapcount);
            setLiked(likelist);
            setCommentlist(comments);
            setCommentdeleted(mapdeleted);
        }
        
        listposts().catch(console.error);

    }, [user.username, change]);

    const handleDeletePost = async (id, version, key) => {
        // delete postdata
        console.log(id)
        console.log(version)
        console.log(key)
        const dataresult = await API.graphql(graphqlOperation(deletePostdata, { input: { id: id, _version: version } }));
        console.log(dataresult);
        // delete image data
        const imageresult = await Storage.remove("images/" + key);
        console.log(imageresult);
        // delete like
        for (let i = 0; i < alllikes.length; i++) {
            if (alllikes[i].key === key) {
                let likeresult = await API.graphql(graphqlOperation(deletePostlike, { input: { id: alllikes[i].id, _version: alllikes[i]._version} }));
                console.log(likeresult);
            }
        }
        // delete comment
        for (let i = 0; i < commentlist[map[key]].length; i++) {
            let commentresult = await API.graphql(graphqlOperation(deletePostcomment, { input: { id: commentlist[map[key]][i].id, _version: commentlist[map[key]][i]._version } }));
            console.log(commentresult);
        }
        alert("Delete Success");
        setChange(change + 1)
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
                variant="h3"
                align="center"
                color="text.primary"
                gutterBottom
                >
                Manage Your Post
                </Typography>
                
            </Container>
            </Box>
            <Container sx={{ py: 8 }} maxWidth="md">
            
            <Grid container spacing={4}>
                {userPosts.map((post) => (
                <Grid item key={post.key} xs={12} sm={6} md={6}>
                    <Card
                    sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                    >
                    <CardHeader
                        avatar={
                        <Avatar sx={{ bgcolor: blue[300] }} aria-label="recipe">
                            {post.creator[0].toUpperCase()}
                        </Avatar>
                        }
                        title={post.creator}
                        subheader={post.createdAt.substring(0, 10) + " " + post.createdAt.substring(11, 19)}
                    />
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
                        <Typography>
                        {post.description}
                        </Typography>
                        <Stack direction="row" spacing={1}>
                            <Chip label="Bird" size="small" variant="outlined" />
                            <Chip label="Nature" size="small" variant="outlined" />
                            <Chip label="Outdoors" size="small" variant="outlined" />
                        </Stack>
                        <Typography color="text.secondary">
                            {post.like} likes
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <IconButton aria-label="add to favorites" onClick={ () => handleLike(post.key) } color={liked[map[post.key]] === true ? "error" : "default"}>
                            <FavoriteIcon />
                        </IconButton>
                        <IconButton aria-label="comment" onClick={ () => handleToggle(map[post.key]) }>
                            <CommentIcon />
                        </IconButton>
                        <Backdrop
                            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                            open={open[map[post.key]]}
                        >
                            <List sx={{ width: '100%', maxWidth: 550, bgcolor: 'background.paper' }}>
                                <ListItem alignItems="flex-start">
                                    <Button onClick={ () => handleClose() }>Return</Button>
                                </ListItem>
                                <Divider variant="inset" component="li" />
                                <ListItem 
                                    alignItems="flex-start"
                                    secondaryAction={
                                        <IconButton onClick={ () => handleSubmit(post.key) }>
                                            <SendIcon />
                                        </IconButton>
                                    }
                                >
                                    <TextField id="comment" label="Add a comment" fullWidth variant="standard" size="small" value={comment} onChange={(e) => setComment(e.target.value)} />   
                                </ListItem>
                                <Divider variant="inset" component="li" />
                                {commentlist[map[post.key]].map((comment) => (
                                    <ListItem 
                                        alignItems="flex-start"
                                        secondaryAction={
                                            comment.sender === user.username && comment.id ? 
                                                <IconButton 
                                                    onClick={ () => handleDelete(comment.id, comment._version) } 
                                                    disabled={commentdeleted[comment.id]}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            : 
                                                <Typography></Typography>
                                        }
                                    >
                                        <ListItemAvatar>
                                        <Avatar sx={{ bgcolor: blue[300] }} aria-label="recipe">
                                            {comment.sender[0].toUpperCase()}
                                        </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                        primary={comment.sender}
                                        secondary={
                                            <React.Fragment>
                                            <Typography
                                                sx={{ display: 'inline' }}
                                                component="span"
                                                variant="body2"
                                                color="text.primary"
                                            >
                                                {comment.content}
                                            </Typography>
                                            <br/>
                                            {comment.createdAt ? fixtime(comment.createdAt).substring(0, 10) + " " + fixtime(comment.createdAt).substring(11, 19) : ""}
                                            </React.Fragment>
                                        }
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        </Backdrop>
                        <Button size="small" onClick={ () => handleDeletePost(post.id, post._version, post.key) }>Delete</Button>
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