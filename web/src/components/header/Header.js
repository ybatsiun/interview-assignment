import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export default ({openModal }) => {
    const classes = useStyles();

    return <div className={classes.root}>
        <AppBar position="sticky">
            <Toolbar>
                <Button color="inherit" onClick={openModal}>Create new post</Button>
            </Toolbar>
        </AppBar>
    </div>
}