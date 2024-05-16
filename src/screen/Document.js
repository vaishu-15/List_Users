import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import Pdf from 'react-native-pdf';
import ResponsiveSize from '../utils/responsiveSize'; 

const SelectedFilesScreen = ({route}) => {
  const {selectedFiles} = route.params;

  const renderFileContent = () => {
    return selectedFiles.map((file, index) => {
      if (file.type === 'text/plain') {
        return (
          <View key={index} style={styles.fileContainer}>
            <Text style={styles.fileName}>{file.name}</Text>
            <Text>{file.content}</Text>{' '}
          </View>
        );
      } else if (file.type.startsWith('image/')) {
        return (
          <View key={index} style={styles.fileContainer}>
            <Text style={styles.fileName}>{file.name}</Text>
            <Image source={{uri: file.uri}} style={styles.image} />
          </View>
        );
      } else if (file.type === 'application/pdf') {
        return (
          <View key={index} style={styles.fileContainer}>
            <Text style={styles.fileName}>{file.name}</Text>
            <Pdf source={{uri: file.uri}} style={styles.pdf} />
          </View>
        );
      } else {
        return (
          <View key={index} style={styles.fileContainer}>
            <Text style={styles.fileName}>{file.name}</Text>
            <Text>This file type is not supported for preview.</Text>
          </View>
        );
      }
    });
  };

  return <View style={styles.container}>{renderFileContent()}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', 
    padding: ResponsiveSize(20),
  },
  fileContainer: {
    marginBottom: ResponsiveSize(20),
  },
  fileName: {
    fontSize: ResponsiveSize(18),
    fontWeight: 'bold',
    marginBottom: ResponsiveSize(10),
  },
  image: {
    width: '100%',
    height: ResponsiveSize(200),
    resizeMode: 'contain',
  },
  pdf: {
    flex: 1,
    width: '100%',
    height: ResponsiveSize(200),
  },
});

export default SelectedFilesScreen;
