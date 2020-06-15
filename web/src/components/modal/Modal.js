import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import SinglePost from '../singlePost';

const useStyles = makeStyles({
    postContainer: {
        padding: '50px',
        minHeight: '600px',
        minWidth: '200px'
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'center'
    }
});

export default ({ open, setModalData, getPostByIndex, postsLength, closeModal, editMode, createMode, ...props }) => {
    const classes = useStyles();
    const [post, setPost] = useState(props.post);
    const [index, setIndex] = useState(props.index)
    useEffect(() => {
        setPost(props.post)
        setIndex(props.index);
    }, [props.post, props.index]);

    function onPreviousClick() {
        setIndex(index - 1);
        setPost(getPostByIndex(index - 1))
    };

    function onNextClick() {
        setIndex(index + 1);
        setPost(getPostByIndex(index + 1))
    };

    return <Dialog onClose={closeModal} aria-labelledby="simple-dialog-title" open={open}>
        <div className={classes.postContainer}>
            <SinglePost
                isModalMode={true}
                fetchedPost={post}
                closeModal={closeModal}
                editMode={editMode}
                createMode={createMode}
            />
        </div>
        {!createMode && <div className={classes.buttonContainer}>
            <Button disabled={index === 0} size="small" color="primary" onClick={onPreviousClick}>
                Previous
            </Button>
            <Button disabled={index === postsLength - 1} size="small" color="primary" onClick={onNextClick}>
                Next
            </Button>
        </div>}
    </Dialog>
};