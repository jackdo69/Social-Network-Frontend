import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import useHttpClient from "../hooks/http-hook";

//Redux area
import { useDispatch, useSelector } from 'react-redux';
import { postActions } from '../store/post';
import { loadingActions } from '../store/loading';
import useForm from "../hooks/form-hook";
import { RootState } from '../store';

//Interface
import { Post } from '../interfaces';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    maxWidth: "70vw",
    margin: '2em auto'
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));



const RecipeReviewCard = (props: Post) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { makeRequest } = useHttpClient();
  const dispatch = useDispatch();
  const { openForm, Form } = useForm();

  const usersByPostsInfo = useSelector((state: RootState) => state.user.usersByPosts);
  const postOwner = usersByPostsInfo?.find((item) => item.username === props.user.username);

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
        image: props.image
      }
    });
    setAnchorEl(null);
  };

  const handleDelete = async () => {
    dispatch(loadingActions.setLoading({ status: true }));
    await makeRequest({
      url: `/post/${props.id}`,
      method: "delete",
      toastMessage: 'Post deleted successfully!'
    });

    dispatch(postActions.removePost({ id: props.id }));
    dispatch(loadingActions.setLoading({ status: false }));

    setAnchorEl(null);
  };

  return (
    <Card className={classes.root}>
      {Form}
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar} src={postOwner.image} />
        }
        action={
          <IconButton onClick={handleMenu} aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={props.user.username}
        subheader={new Date(props.createdAt).toLocaleDateString()}
      />
      <CardMedia
        className={classes.media}
        image={props.image}
        title="Paella dish"
      />
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
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
};

export default RecipeReviewCard;
