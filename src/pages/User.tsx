import Grid from '@material-ui/core/Grid';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { LayoutProps } from '../interfaces';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            marginTop: '1em'
        },
        item: {
            margin: '0 1em 0 1em'
        }
    }),
);

const Layout = () => {
    const classes = useStyles();

    return (
        <div>
            User page
        </div>
    );
};

export default Layout;
