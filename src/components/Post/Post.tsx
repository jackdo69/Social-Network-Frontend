import React, { useEffect, useState } from 'react';
import useStyles from './styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import useHttpClient from '../../hooks/http-hook';

//Redux area
import { useDispatch } from 'react-redux';
import { postActions } from '../../store/post';
import { loadingActions } from '../../store/loading';
import useForm from '../../hooks/form-hook';

//Interface
import { IPost } from '../../interfaces';

export default function RecipeReviewCard(props: IPost) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [image, setImage] = useState('');
  const open = Boolean(anchorEl);
  const { makeRequest } = useHttpClient();
  const dispatch = useDispatch();
  const { openForm, Form } = useForm();

  const getUserImage = async () => {
    const result = await makeRequest({
      url: `/user/${props.user.id}/getUserImage`,
      method: 'get',
    });
    setImage(result);
  };

  useEffect(() => {
    getUserImage();
  }, []);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    openForm({
      action: 'updatePost',
      payload: {
        id: props.id,
        title: props.title,
        content: props.content,
        image: props.image,
      },
    });
    setAnchorEl(null);
  };

  const handleDelete = async () => {
    dispatch(loadingActions.setLoading({ status: true }));
    await makeRequest({
      url: `/post/${props.id}`,
      method: 'delete',
      toastMessage: 'Post deleted successfully!',
    });

    dispatch(postActions.removePost({ id: props.id }));
    dispatch(loadingActions.setLoading({ status: false }));

    setAnchorEl(null);
  };

  return (
    <Card className={classes.root}>
      {Form}
      <CardHeader
        avatar={<Avatar aria-label="recipe" className={classes.avatar} src={image} />}
        action={
          <IconButton onClick={handleMenu} aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={props.user.username}
        subheader={new Date(props.createdAt).toLocaleDateString()}
      />
      <CardMedia className={classes.media} image={props.image} title="post picture" />
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {props.title}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {props.content}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
