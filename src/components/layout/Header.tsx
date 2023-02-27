import { AppBar, Toolbar, Typography } from "@mui/material";

export default function Header() {

    return (
        <AppBar position='static'>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6">
                    Stock Exchange Demo App
                </Typography>
            </Toolbar>
        </AppBar>
    )
}