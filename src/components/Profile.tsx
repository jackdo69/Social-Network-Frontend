
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';
import { Theme, makeStyles, withStyles, createStyles } from '@material-ui/core/styles';

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

    const handleClick = () => {
        console.log('I was clicked');

    };

    const imageSource = 'https://images.unsplash.com/photo-1585831818026-c75edc266a10?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80';

    return (
        <div className={classes.root}>
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
                    src={imageSource} />
            </StyledBadge>
        </div>
    );
}