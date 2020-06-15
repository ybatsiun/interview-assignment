import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';

import { postsActions } from '../../actions';

export default ({ fetchedPost,
    updatePost,
    deletePost,
    isModalMode,
    setModalData,
    index,
    closeModal,
    editMode,
    createMode,
    uploadFile,
    savePost }) => {
    const containerSizes = { maxWidth: isModalMode ? 500 : 345, height: isModalMode ? 500 : 140 }

    const useStyles = makeStyles({
        root: {
            maxWidth: containerSizes.maxWidth,
        },
        media: {
            height: containerSizes.height,
        },
        loaderContainer: {
            display: 'flex',
            justifyContent: 'center'
        }
    });
    const classes = useStyles();
    const [state, setState] = useState({
        isLoading: true,
        imageUrl: ''
    });
    const [isEditMode, setEditMode] = useState(editMode || false);
    const [post, setPost] = useState(fetchedPost);

    useEffect(() => {
        setPost(fetchedPost);
        fetchImage(fetchedPost);
    }, [fetchedPost]);

    function getSizesObj(imageUrl) {
        return imageUrl.includes('picsum.photos')
            ? !isModalMode ? { height: 300, width: 300 } : {}
            : {}
    };

    async function fetchImage(post) {
        const getImageFromPost = () => post.data && post.data.media[0].image;

        setState({
            isLoading: true
        });

        const image = getImageFromPost();
        const imageUrl = image && await postsActions.getImage(post.data.media[0].image, getSizesObj(image));

        setState({
            isLoading: false,
            imageUrl
        });
    };

    function setNewMediaDescrition(e) {
        post.data.media[0].description = e.target.value;
        setPost({ ...post });
    };

    function setNewDescription(e) {
        post.description = e.target.value;
        setPost({ ...post });
    };

    function onSaveClick() {
        setEditMode(false);
        createMode
            ? savePost(post)
            : updatePost(post);
        closeModal();
    }

    async function onFileUploaded(event) {
        const res = await uploadFile(event.target.files[0]);
        post.data.media[0].image = res.url;
        setPost({ ...post });
    }

    return <Grid item xs={isModalMode ? 12 : 3} >
        {post.data && <Card className={classes.root}>
            <CardActionArea onClick={() => !isModalMode && !isEditMode && setModalData({ open: true, post, index })}>
                {state.isLoading
                    ? <div className={classes.loaderContainer}>
                        <CircularProgress />
                    </div>
                    : state.imageUrl ? <CardMedia
                        className={classes.media}
                        image={state.imageUrl}
                    />
                        : <>
                            <Typography gutterBottom variant="h5" component="h2">
                                Upload single image file
                            </Typography>
                            <input type="file" name="file" onChange={onFileUploaded} />
                        </>
                }
                <CardContent>
                    {isEditMode
                        ? <Grid container spacing={3}>
                            <Grid item xs={12} >
                                <TextField
                                    fullWidth
                                    value={post.data.media[0].description}
                                    onChange={setNewMediaDescrition} />
                            </Grid>
                            <Grid item xs={12} >
                                <TextField
                                    fullWidth
                                    multiline
                                    value={post.description}
                                    onChange={setNewDescription} />
                            </Grid>
                        </Grid>
                        : <>
                            <Typography gutterBottom variant="h5" component="h2">
                                {post.data.media[0].description}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {post.description}
                            </Typography>
                        </>}

                </CardContent>
            </CardActionArea>
            <CardActions>
                {isEditMode
                    ? <Button size="small" color="secondary" onClick={onSaveClick}>
                        Save
                    </Button>
                    : <Button size="small" color="primary" onClick={() => setEditMode(true)}>
                        Edit
                    </Button>}
                <Button size="small" color="primary" onClick={() => {
                    deletePost(post.id);
                    isModalMode && closeModal();
                }}>
                    Delete
                    </Button>
            </CardActions>
        </Card>
        }
    </Grid >
}
