import React from 'react';
import useImageService from '../../hooks/image-hook';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Box, withStyles, createStyles } from '@material-ui/core';
import { Button, Typography } from '../../components/Wrappers/Wrappers';
import useStyles from './styles';
import { UploadImagePropsFunction } from '../../interfaces';

const BorderLinearProgress = withStyles(() =>
  createStyles({
    root: {
      height: 15,
      borderRadius: 5,
    },
    colorPrimary: {
      backgroundColor: '#EEEEEE',
    },
    bar: {
      borderRadius: 5,
      backgroundColor: '#1a90ff',
    },
  }),
)(LinearProgress);

export default function UploadImage(props: UploadImagePropsFunction) {
  const [image, setImage] = React.useState<File>();
  const [progress, setProgress] = React.useState(0);
  const [previewImage, setPreviewImage] = React.useState('');
  const { uploadImage } = useImageService();
  const classes = useStyles();

  const selectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.files instanceof FileList && setImage(event.target.files[0]);
    event.target.files instanceof FileList && setPreviewImage(URL.createObjectURL(event.target.files[0]));
  };

  const upload = () => {
    image &&
      uploadImage(image, (event: ProgressEvent) => {
        setProgress(Math.round((100 * event.loaded) / event.total));
        props.setImage(`http://localhost:4000/images/${image.name}`);
      });
  };

  return (
    <div className="mg20">
      <div className={classes.pictureButtons}>
        <label htmlFor="btn-upload">
          <input
            id="btn-upload"
            name="btn-upload"
            style={{ display: 'none' }}
            type="file"
            accept="image/*"
            onChange={selectFile}
          />
          <Button className={classes.imageButton} color="primary" variant="contained" component="span">
            Choose Image
          </Button>
        </label>
        <Button
          className={classes.imageButton}
          color="success"
          variant="contained"
          component="span"
          disabled={!image}
          onClick={upload}
        >
          Upload Image
        </Button>
      </div>
      <Typography color="secondary" colorBrightness="light" weight="medium" constiant="h3">
        {image ? image.name : null}
      </Typography>

      {image && (
        <Box className="my20" display="flex" alignItems="center">
          <Box width="100%" mr={1}>
            <BorderLinearProgress variant="determinate" value={progress} />
          </Box>
          <Box minWidth={35}>
            <Typography variant="body2" color="success">{`${progress}%`}</Typography>
          </Box>
        </Box>
      )}

      {previewImage && (
        <div className={classes.previewImage}>
          <img className="preview my10" width="150px" height="150px" src={previewImage} alt="" />
        </div>
      )}
    </div>
  );
}
