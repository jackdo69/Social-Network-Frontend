import { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import { makeStyles, Theme, createStyles, styled } from "@material-ui/core/styles";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/index';
import { loadingActions } from '../store/loading';
import { userActions } from '../store/user';
import useHttpClient from "../hooks/http-hook";

const useStyles = makeStyles((theme: Theme) => createStyles({
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
    },
    info: {
        display: 'flex',
        justifyContent: 'start'
    }
}));

const CustomPaper = styled(Paper)({
    margin: '0.5em auto',
    width: '25em',
    padding: '0.5em'
});

interface Friend {
    id: string,
    username: string,
    image: string,
}

export default function FriendList() {
    const classes = useStyles();
    const [friendList, setFriendList] = useState<Friend[] | []>([]);
    const userFriendList = useSelector((state: RootState) => state.user.friends);
    const { makeRequest } = useHttpClient();

    const getFriendListWith = async () => {
        if (userFriendList && userFriendList.length) {
            const result = await Promise.all(userFriendList?.map(async (f: { id: string, username: string; }) => {
                const { id, username } = f;
                const image = await makeRequest({
                    url: `/user/${f.id}/getUserImage`,
                    method: "get",
                });
                return { id, username, image };
            }));
            setFriendList(result);
        }
    };

    useEffect(() => {
        getFriendListWith();
    }, [userFriendList]);

    return (
        <div className={classes.wrapper}>
            <Typography align="center" variant="h5" gutterBottom>Friends List</Typography>
            {friendList && friendList.map((f: Friend) => {
                return (
                    <CustomPaper key={f.id} variant="outlined">
                        <div className={classes.info}>
                            <Avatar src={f.image} />
                            <Typography variant="overline" display="block" gutterBottom>{f.username}</Typography>

                        </div>
                    </CustomPaper>
                )
                    ;
            })}
        </div>
    );
};
