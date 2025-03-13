import RNFS from 'react-native-fs';

export const getAudio = async ({ uri }) => {
  const segments = uri.split('/');
  const filename = segments[segments.length - 1];
  const destinationPath = `${RNFS.DocumentDirectoryPath}/${filename}`;

  if (await RNFS.exists(destinationPath)) {
    return destinationPath;
  }

  try {
    const response = RNFS.downloadFile({
      fromUrl: uri,
      toFile: destinationPath,
      progress: progress => {
        console.log('Download progress:', progress);
      },
    });
    await response.promise;
    return destinationPath;
  } catch (error) {
    console.error('FILE DOWNLOAD FAILED:', error);
    return null;
  }
};
