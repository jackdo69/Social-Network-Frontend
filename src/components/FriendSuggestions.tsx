import { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import { makeStyles, Theme, createStyles, styled } from "@material-ui/core/styles";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/index';
import { loadingActions } from '../store/loading';
import { friendActions } from '../store/friend';
import useHttpClient from "../hooks/http-hook";

const useStyles = makeStyles((theme: Theme) => createStyles({
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
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
});

interface FriendSuggestion {
    id: string,
    username: string,
    image: string,
    isSent: boolean;
}

const FriendSuggestions = () => {
    const [suggestions, setSuggestions] = useState<FriendSuggestion[] | []>([]);
    const classes = useStyles();
    const { makeRequest } = useHttpClient();
    const dispatch = useDispatch();

    let friendSuggestions = useSelector((state: RootState) => state.friend.friendSuggestions);
    friendSuggestions = friendSuggestions.map(s => ({ ...s, isSent: false }));
    const requestSent = useSelector((state: RootState) => state.user.requestSent);
    const requestSentIds = requestSent?.map(r => r.id);
    for (let f of friendSuggestions) {
        if (requestSentIds?.indexOf(f.id) !== -1) {
            f.isSent = true;
        } else {
            f.isSent = false;
        }
    }
    // setSuggestions(friendSuggestions);
    const userId = useSelector((state: RootState) => state.user.id);

    const addFriend = async (id: string) => {
        dispatch(loadingActions.setLoading({ status: true }));
        await makeRequest({
            url: `/user/${userId}/sendFriendRequest`,
            method: "post",
            data: {
                recipientId: id
            },
            toastMessage: 'Friend request sent successfully!'
        });
        const remainFriendSuggestions = friendSuggestions.filter(i => i.id !== id);
        dispatch(friendActions.setFriendSuggestions({ list: remainFriendSuggestions }));
        dispatch(loadingActions.setLoading({ status: false }));
    };

    return (
        <div className={classes.wrapper}>
            <Typography align="center" variant="h5" gutterBottom>Friends Suggestions</Typography>
            {friendSuggestions && friendSuggestions.map(f => {
                return (
                    <CustomPaper variant="outlined">
                        <div className={classes.info}>
                            <Avatar src={f.image} />
                            <Typography variant="overline" display="block" gutterBottom>{f.username}</Typography>
                            {f.isSent ? <Button variant="contained" disabled>Pending</Button> : <Button color="primary" onClick={() => addFriend(f.id)}>Add Friend</Button>}

                        </div>
                    </CustomPaper>
                )
                    ;
            })}
        </div>
    );
};

export default FriendSuggestions;