import React, { useEffect, useState } from 'react';
import PostsClient from '../../clients/posts/PostsClient'
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Actions from './ActionsButton'
import { useSnackbar } from 'notistack';
import sleep from '../../utils/Sleep';
import tokenChecker from '../../utils/TokenChecker';
import createHistory from 'history/createBrowserHistory'
import PostView from './PostView'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '200ch',
  },
  inline: {
    display: 'inline',
  },
}));

export const history = createHistory()

export default function AlignItemsList(){
  const [postsData, setPostsData] = useState([])
  const [post, setPost] = useState({})
  const [showPost, setShowPost] = useState(false)
  const [updatePost, setUpdatePost] = useState(false)
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const handleAlertStatus = (message, status) => {
    enqueueSnackbar(message, {variant: status})
  }
  
  const handleLogout = () => {
    history.push("/")
    handleAlertStatus('Caduco la sesión, inicie sesión nuevamente', 'info' )
    sleep(1500).then(() => {
      window.location.reload();
    })
  }
  
  const handleError = (error) =>  {
    console.error("There was an error!", error)
    handleAlertStatus(error, 'error' )
    history.push("/home");
  }
  
  const handlePostsResponse = (response) => {
    console.log(response)
    if (response.status !== "ok") {
      handleError(response.error)
    } 
    else {
      console.log(response.posts)
      setPostsData(response.posts) 
    }
  }

  const handlePostResponse = (response) => {
    if (response.error) {
      handleError(response.error)
    } 
    else {
      console.log('PostData:', response)
      setPost(response)
    }
  }

  const handlePostUpdateResponse = (response) => {
    console.log(response.status)
    if (response.status !== 200 && response.status !== 201) {
      handleError("error")
    }
    else {
      getPosts()
      setUpdatePost(true)
    } 
  }
  
  const getPosts = () => {
    if (tokenChecker()) {
      PostsClient.getPosts().then(handlePostsResponse)
    } 
    else { handleLogout() }
  }

  const getPost = (id) => {
    if (tokenChecker()) {
      console.log('post_id:', id)
      PostsClient.getPost(id).then(handlePostResponse)
    } 
    else { handleLogout() }
  }

  const handleBlock = (id, newState) => {
    if (tokenChecker()) {
      PostsClient.updatePostStatus(id, newState).then(handlePostUpdateResponse);
    }
    else { handleLogout() }
  }

  const handleOpenPostView = (id, newState) => {
      setShowPost(newState)
      getPost(id)
  }

  const handleClosePostView = (event) => {
    setShowPost(event)
  }

  useEffect(() => {
      getPosts()
  },[setUpdatePost]);

  return (
    <List className={classes.root}>
      {(postsData != null && postsData.length > 0) ?
      postsData.map(row => (
        <div key={row.id}>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary={row.title}
              secondary={
                <React.Fragment>
                  {'Fecha de publicación:' } {row.date} 
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color={(row.isBlock) ? "secondary" : "primary"}
                  >
                    {' — Estado: '} {row.state}
                  </Typography>
                </React.Fragment>
              }
            />
            <Actions showPostView={handleOpenPostView} postId={row.id} block={handleBlock} isBlock={row.isBlock}/>
          </ListItem>
          <div>
            <Divider variant="inset" component="li" /> 
          </div>
        </div>
      )):""}
       {showPost && <PostView post={post} showPost={handleClosePostView}/>}
    </List>
  );
}
