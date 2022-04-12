import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

function Copyright() {
    return (
      <Typography variant="body2" color="text.secondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://github.com/LeonhardE">
          Xianxin Zeng
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
}

export default function Footer() {
    return (
        <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
            <Typography
            variant="subtitle1"
            align="center"
            color="text.secondary"
            component="p"
            >
                2022 ECE1779 Assignment 3
            </Typography>
        <Copyright />
        </Box>
    )
}