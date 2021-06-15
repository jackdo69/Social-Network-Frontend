import Paper from '@material-ui/core/Paper';
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import { makeStyles, Theme, createStyles, styled } from "@material-ui/core/styles";
import { useSelector } from 'react-redux';
import { RootState } from '../store/index';

const useStyles = makeStyles((theme: Theme) => createStyles({
    wrapper: {
        display: 'flex',
        flexDirection: 'column'
    },
    info: {
        display: 'flex',
        justifyContent: 'space-between'
    }
}));

const CustomPaper = styled(Paper)({
    margin: '0.5em auto',
    width: '25em',
    padding: '0.5em'
})

const FriendSuggestions = () => {
    const classes = useStyles();
    const friendSuggestions = useSelector((state: RootState) => state.friend.friendSuggestions);
    return (
        <div className={classes.wrapper}>
            {friendSuggestions && friendSuggestions.map(f => {
                return (
                    <CustomPaper>
                        <div className={classes.info}>
                            <Avatar src={f.image} />
                            <Typography variant="overline" display="block" gutterBottom>{f.username}</Typography>
                            <Button color="primary">Add Friend</Button>
                        </div>
                    </CustomPaper>
                )
                    ;
            })}
        </div>
    );
};

export default FriendSuggestions;