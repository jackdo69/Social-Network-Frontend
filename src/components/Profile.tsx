
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';
import Typography from "@material-ui/core/Typography";
import { Theme, makeStyles, withStyles, createStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import useForm from "../hooks/form-hook";
const StyledBadge = withStyles((theme: Theme) =>
    createStyles({
        badge: {
            backgroundColor: '#e0f2f1',
            width: '2.5em',
            height: '2.5em',
            boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
            borderRadius: '50%',
            cursor: 'pointer'
        }
    }),
)(Badge);

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            justifyContent: 'center',
            marginTop: '2em',
        },
        avatar: {
            width: '8em',
            height: '8em',
            boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        },
        badge: {
            margin: '10px auto'
        }
    }),
);

export default function BadgeAvatars() {
    const classes = useStyles();
    const image = useSelector((state: RootState) => state.user.image);
    const username = useSelector((state: RootState) => state.user.username);
    const email = useSelector((state: RootState) => state.user.email);
    const { openForm, Form } = useForm();

    const handleClick = () => {
        openForm({ action: 'updatePicture' });
    };


    return (
        <div className={classes.root}>
            <div>
                {Form}
                <StyledBadge
                    onClick={handleClick}
                    className={classes.badge}
                    overlap="circle"
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    badgeContent={<EditRoundedIcon />}
                >
                    <Avatar
                        className={classes.avatar}
                        alt="Remy Sharp"
                        src={image} />
                </StyledBadge>
                <Typography variant="h6" color="primary" component="p">
                    {username}
                </Typography>
                <Typography variant="h6" color="secondary" component="p">
                    {email}
                </Typography>
            </div>
        </div>
    );
}