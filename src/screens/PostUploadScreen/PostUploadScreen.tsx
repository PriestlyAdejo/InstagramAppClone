import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Camera } from 'expo-camera';
import { useEffect, useRef, useState } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  FlashMode,
  CameraType,
  CameraPictureOptions,
  CameraRecordingptions,
} from 'expo-camera/build/Camera.types';
import styles from './styles';
import colors from '../../theme/colors';

const flashModes = [
  FlashMode.off,
  FlashMode.on,
  FlashMode.auto,
  FlashMode.torch,
];

const flashModeToIcon = {
  [FlashMode.off]: 'flash-off',
  [FlashMode.on]: 'flash-on',
  [FlashMode.auto]: 'flash-auto',
  [FlashMode.torch]: 'highlight',
};

const PostUploadScreen = (props: Props) => {
  const [hasPermissions, setHasPermissions] = useState<boolean | null>(null);
  const [cameraType, setCameraType] = useState(CameraType.back);
  const [flash, setFlash] = useState(FlashMode.off);
  const [isCameraReady, setIsCameraReady] = useState(true);
  const [isRecording, setIsRecording] = useState(false);

  const camera = useRef<Camera>(null);

  useEffect(() => {
    const getPermission = async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const microphonePermission =
        await Camera.requestMicrophonePermissionsAsync();
      setHasPermissions(
        cameraPermission.status === 'granted' &&
          microphonePermission.status === 'granted'
      );
    };
    getPermission();
  }, []);

  const flipCamera = () => {
    setCameraType((currentCameraType) =>
      currentCameraType === CameraType.back ? CameraType.front : CameraType.back
    );
  };

  const flipFlash = () => {
    const currentIndex = flashModes.indexOf(flash);
    const nextIndex =
      currentIndex === flashModes.length - 1 ? 0 : currentIndex + 1;
    setFlash(flashModes[nextIndex]);
  };

  const takePicture = async () => {
    try {
      if (!isCameraReady || !camera.current || isRecording) {
        return;
      }
      const options: CameraPictureOptions = {
        quality: 0.5,
        base64: false,
        skipProcessing: true,
      };

      const result = await camera.current?.takePictureAsync();
      console.log(result);
    } catch (error) {
      console.log('ERROR TAKING PHOTO', error);
    }
  };

  const startRecording = async () => {
    try {
      if (!isCameraReady || !camera.current || isRecording) {
        return;
      }

      const options: CameraRecordingptions = {
        quality: Camera.Constants.VideoQuality['640:480'],
        maxDuration: 60,
        maxFileSize: 10 * 1024 * 1024,
        mute: false,
      };

      setIsRecording(true);
      const result = await camera.current.recordAsync(options);
      console.log(result);
    } catch (error) {
      console.log('ERROR RECORDING VIDEO', error);
    } finally {
      setIsRecording(true);
    }
  };

  const stopRecording = () => {
    if (isRecording) {
      camera.current?.stopRecording();
      setIsRecording(false);
    }
  };

  if (hasPermissions === null) {
    return <Text>Loading...</Text>;
  }
  if (hasPermissions === false) {
    return <Text>No access to the camera.</Text>;
  }

  console.warn(flash);

  return (
    <View style={styles.page}>
      <Camera
        ref={camera}
        style={styles.camera}
        type={cameraType}
        ratio="4:3"
        flashMode={flash}
        onCameraReady={() => setIsCameraReady(true)}
      />

      <View style={[styles.buttonsContainer, { top: 25 }]}>
        <MaterialIcons name="close" size={30} color={colors.white} />

        <Pressable onPress={flipFlash}>
          <MaterialIcons
            name={flashModeToIcon[flash]}
            size={30}
            color={colors.white}
          />
        </Pressable>

        <MaterialIcons name="settings" size={30} color={colors.white} />
      </View>

      <View style={[styles.buttonsContainer, { bottom: 25 }]}>
        <MaterialIcons name="photo-library" size={30} color={colors.white} />

        {isCameraReady && (
          <Pressable
            onPress={takePicture}
            onLongPress={startRecording}
            onPressOut={stopRecording}
          >
            <View
              style={[
                styles.circle,
                { backgroundColor: isRecording ? colors.accent : colors.white },
              ]}
            />
          </Pressable>
        )}

        <Pressable onPress={flipCamera}>
          <MaterialIcons
            name="flip-camera-ios"
            size={30}
            color={colors.white}
          />
        </Pressable>
      </View>
    </View>
  );
};

export default PostUploadScreen;
