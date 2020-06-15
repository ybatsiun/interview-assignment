import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';

import InfiniteScroll from "react-infinite-scroll-component";
import SinglePost from '../singlePost';
import Modal from '../modal';
import Header from '../header';

let offset = 0;
let limit = 20;

export default ({ posts, fetchPosts }) => {

    const fetchMore = () => fetchPosts(limit, offset += limit)
    useEffect(() => {
        fetchPosts(limit, offset);
    }, []);

    const [modalData, setModalData] = useState({
        open: false,
        index: 0,
        post: {}
    });

    const closeModal = () => {
        setModalData({ open: false, post: {} })
    };

    // hardcoded impacter_id,type,width,height,version to pass validation
    const emptyPost = {
        "type": "IMAGES",
        "description": "",
        "impacter_id": "822d919d-0076-4d7d-a7ca-c5404a025614",
        "data": {
            "media": [
                {
                    "width": 500,
                    "height": 500,
                    "description": "",
                    "image": "",
                    "version": "0.0.1"
                }
            ]
        }
    }

    const openCreateNewPostModal = () => {
        setModalData({ open: true, post: emptyPost, editMode: true, createMode: true })
    }

    return <>
        <Header openModal={openCreateNewPostModal} />
        <InfiniteScroll
            dataLength={posts.length}
            next={fetchMore}
            style={{overflow: 'hidden'}}
            // TODO handle hasmore
            hasMore={true}>
            <Grid container spacing={3}>
                {posts.map((fetchedPost, index) =>
                    React.cloneElement(<SinglePost />, {
                        fetchedPost,
                        key: fetchedPost.id,
                        isModalMode: false,
                        setModalData,
                        index
                    })
                )}
            </Grid>
        </InfiniteScroll>
        <Modal open={modalData.open}
            post={modalData.post}
            index={modalData.index}
            setModalData={setModalData}
            closeModal={closeModal}
            editMode={modalData.editMode}
            createMode={modalData.createMode}
        />
    </>
};