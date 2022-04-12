import { useState, useEffect } from 'react'
import { Storage, Amplify } from 'aws-amplify';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

import awsExports from '../aws-exports';
Amplify.configure(awsExports);
Storage.configure({
    customPrefix: {
        public: 'images/'
    }
})

const theme = createTheme()
const Input = styled('input')({
    display: 'none',
  });

function UploadPost({ user }) {
    const [postdata, setPostdata] = useState({"username": user.username, "title": "", "description": ""});
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [uploaded, setUploaded] = useState(false);

    useEffect(() => {
        if (selectedImage) {
          setImageUrl(URL.createObjectURL(selectedImage));
        }
      }, [selectedImage]);

    const handleSubmit = async () => {
        console.log(selectedImage);
        if (postdata.title === "" || postdata.description === "" || selectedImage === null) {
            alert("All fields required. Please check your input.")
        }
        else {
            const storageResult = await Storage.put(selectedImage.name, selectedImage, {
                level: 'public',
                type: 'image/*'
            })
            console.log(storageResult)
            setUploaded(true)
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <Box
            sx={{
                bgcolor: 'background.paper',
                pt: 8,
                pb: 6,
            }}
            >
            <Container maxWidth="sm">
                <Typography
                variant="h3"
                color="text.primary"
                align="center"
                gutterBottom
                >
                Create a New Post
                </Typography>
                {uploaded && (
                    <Typography variant="h5" color="red" align="center" gutterBottom>Upload Success</Typography>
                )}
                <TextField id="title" label="Title" variant="outlined" value={postdata.title} onChange={(e) => setPostdata({...postdata, title: e.target.value})} />
                <br />
                <TextField id="description" label="Description" fullWidth variant="outlined" value={postdata.description} onChange={(e) => setPostdata({...postdata, description: e.target.value})} />
                <br />
                {imageUrl && selectedImage && (
                    <Box mt={2} textAlign="center">
                        <div>Upload Preview</div>
                        <img src={imageUrl} alt={selectedImage.name} height="100px" />
                    </Box>
                )}
                
                <Stack
                sx={{ pt: 4 }}
                direction="row"
                spacing={2}
                justifyContent="center"
                >
                    <Input 
                        accept="image/*" 
                        type="file" 
                        id="select-image" 
                        onChange={e => setSelectedImage(e.target.files[0])}
                        />
                    <label htmlFor="select-image">
                        <Button variant="contained" color="primary" component="span">
                            Select Image
                        </Button>
                    </label>
                    <Button variant="contained" onClick={handleSubmit}>Upload</Button>
                </Stack>
            </Container>
            </Box>
            <Container sx={{ py: 8 }} maxWidth="md">
            
            </Container>
        </ThemeProvider>
    )
}

export default withAuthenticator(UploadPost);