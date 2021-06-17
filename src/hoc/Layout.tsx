import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { LayoutProps } from '../interfaces';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            marginTop: '1em',
            background: '#dfe7f5'
        },
        item: {
            margin: '0 1em 0 1em',
            alignItems: 'center',
        },
        sideWrapperLeft: {
            height: '80vh',
            overflow: 'hidden',
            marginTop: '2.4em',
            top: theme.spacing(10),
            left: theme.spacing(10),
            position: 'fixed',
            padding: '1em'
        },
        sideWrapperRight: {
            height: '80vh',
            overflow: 'hidden',
            marginTop: '2.4em',
            top: theme.spacing(10),
            right: theme.spacing(10),
            position: 'fixed',
        }
    }),
);

const Layout = (props: LayoutProps) => {
    const classes = useStyles();

    return (
        <div>
            <Grid
                className={classes.root}
                container
                justify="space-between"
                spacing={8}>
                <Grid
                    className={classes.item}
                    xs={3}
                    item>
                    <Paper className={classes.sideWrapperLeft}>
                        {props.leftSideBar}
                    </Paper>
                </Grid>
                <Grid
                    className={classes.item}
                    xs={4}
                    item>
                    {props.main}
                </Grid>
                <Grid
                    className={classes.item}
                    xs={3}
                    item>
                    <Paper className={classes.sideWrapperRight}>
                        {props.rightSideBar}
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
};

export default Layout;
