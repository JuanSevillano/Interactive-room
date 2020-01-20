import React, { useEffect, useState } from 'react';
import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';

const CameraController = props => {

    const [stream, setStream ] = useState('')

    useEffect(() => {
        //console.log('this camera component is re-rendering...')
      
    }, [props])

    const handleTakePhoto = (dataUri) => {
        // Do stuff with the photo...
        //console.log('takePhoto');
    }

    const handleTakePhotoAnimationDone = (dataUri) => {
        // Do stuff with the photo...
        //console.log('takePhoto');
    }

    const handleCameraError = (error) => {
        //console.log('handleCameraError');
    }

    const handleCameraStart = (stream) => {
        // Send this stream by props to the parent Chat container 
        setStream(stream);
        //console.log('handleCameraStart');
    }

    const handleCameraStop = () => {
        //console.log('handleCameraStop');
    }

    return (
        <Camera
            onTakePhoto={handleTakePhoto}
            onTakePhotoAnimationDone={handleTakePhotoAnimationDone}
            onCameraError={handleCameraError}
            idealFacingMode={FACING_MODES.ENVIRONMENT}
            imageType={IMAGE_TYPES.JPG}
            imageCompression={0.97}
            isMaxResolution={true}
            isImageMirror={false}
            isSilentMode={true}
            isDisplayStartCameraError={true}
            isFullscreen={false}
            sizeFactor={1}
            onCameraStart={props.stream}
            onCameraStop={handleCameraStop}
        />
    );
}

export default CameraController;