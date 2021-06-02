import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { LayoutProps } from '../interfaces';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            marginTop: '1em'
        },
        item: {
            margin: '0 1em 0 1em',
            alignItems: 'center',
        },
        sideWrapper: {
            height: '70vh'
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
                    <Paper className={classes.sideWrapper}>
                        {props.leftSideBar}
                    </Paper>
                </Grid>
                <Grid
                    className={classes.item}
                    xs={5}
                    item>
                    {props.main}
                </Grid>
                <Grid
                    className={classes.item}
                    xs={3}
                    item>
                    <Paper className={classes.sideWrapper}>
                        {props.rightSideBar}
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
};

export default Layout;
