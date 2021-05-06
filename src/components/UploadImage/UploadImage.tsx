import React from "react";
import useImageService from "../../hooks/image-hook";
import LinearProgress from '@material-ui/core/LinearProgress';
import { Box, Typography, Button, withStyles, Theme, createStyles } from '@material-ui/core';

const BorderLinearProgress = withStyles((theme: Theme) => createStyles({
  root: {
    height: 15,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: "#EEEEEE",
  },
  bar: {
    borderRadius: 5,
    backgroundColor: '#1a90ff',
  },
}))(LinearProgress);

interface PropsFunction {
  setImage: (value: string | ((prevImg: string) => string)) => void;
}

const UploadImage: React.FC<PropsFunction> = (props: PropsFunction) => {
  const [image, setImage] = React.useState<File>();
  const [progress, setProgress] = React.useState(0);
  const [previewImage, setPreviewImage] = React.useState('');
  const { uploadImage } = useImageService();

  const selectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.files instanceof FileList && setImage(event.target.files[0]);
    event.target.files instanceof FileList && setPreviewImage(URL.createObjectURL(event.target.files[0]));
  };

  const upload = () => {
    image && uploadImage(image, (event: ProgressEvent) => {
      setProgress(Math.round((100 * event.loaded) / event.total));
      props.setImage(`http://localhost:4000/images/${image.name}`)
    });
  };

  return (
    <div className="mg20">
      <label htmlFor="btn-upload">
        <input
          id="btn-upload"
          name="btn-upload"
          style={{ display: 'none' }}
          type="file"
          accept="image/*"
          onChange={selectFile} />
        <Button
          className="btn-choose"
          variant="outlined"
          component="span" >
          Choose Image
        </Button>
      </label>
      <div className="file-name">
        {image ? image.name : null}
      </div>
      <Button
        className="btn-upload"
        color="primary"
        variant="contained"
        component="span"
        disabled={!image}
        onClick={upload}>
        Upload
      </Button>

      {image && (
        <Box className="my20" display="flex" alignItems="center">
          <Box width="100%" mr={1}>
            <BorderLinearProgress variant="determinate" value={progress} />
          </Box>
          <Box minWidth={35}>
            <Typography variant="body2" color="textSecondary">{`${progress}%`}</Typography>
          </Box>
        </Box>)
      }

      {previewImage && (
        <div>
          <img className="preview my10" width="200px" height="200px" src={previewImage} alt="" />
        </div>
      )}

    </div >
  );
}

export default UploadImage;
