import React, {useEffect,useState} from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet,Button} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {fetchUserDetails} from '../store/userSlice';
import ResponsiveSize from '../utils/responsiveSize';
import {COLORS} from '../utils/constants';
import DocumentPicker from 'react-native-document-picker';

const UserListingDetails = ({route, navigation}) => {
  const {userId} = route.params;
  const dispatch = useDispatch();
  const userDetails = useSelector(state =>
    state?.user?.find(user => user.id === userId),
  );
   const [selectedFiles, setSelectedFiles] = useState(null);

  useEffect(() => {
    dispatch(fetchUserDetails(userId));
  }, [dispatch, userId]);

   const handleDocumentPick = async () => {
     try {
       const res = await DocumentPicker.pick({
         type: [DocumentPicker.types.allFiles],
       });
       setSelectedFiles(res.uri);
       navigation.navigate('Document', {selectedFiles: res});
     } catch (err) {
       if (DocumentPicker.isCancel(err)) {
         console.log('Document picker cancelled.');
       } else {
         console.error('Error picking document: ', err);
       }
     }
   };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack('')}
        style={styles.backButtonContainer}>
        <Text style={styles.backButton}>Back</Text>
      </TouchableOpacity>
      {userDetails && (
        <View style={styles.userContainer}>
          <View style={styles.detailsContainer}>
            <Text style={styles.nameText}>
              {userDetails.first_name} {userDetails.last_name}
            </Text>
            <Text style={styles.emailText}>{userDetails.email}</Text>
            <TouchableOpacity>
              <Image source={{uri: userDetails.avatar}} style={styles.avatar} />
            </TouchableOpacity>
          </View>
        </View>
      )}

      {selectedFiles && (
        <View style={styles.selectedFilesContainer}>
          <Text style={styles.selectedFilesText}>Selected Files:</Text>
          {selectedFiles.map((file, index) => (
            <Text key={index} style={styles.selectedFile}>
              {file.name}
            </Text>
          ))}
        </View>
      )}
      <Button title="Choose Document" onPress={handleDocumentPick} style={styles.documentButton}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: ResponsiveSize(20),
    justifyContent: 'center',
  },
  userContainer: {
    backgroundColor: COLORS.contain,
    padding: ResponsiveSize(50),
    borderRadius: ResponsiveSize(10),
    width: '100%',
    marginBottom:ResponsiveSize(10)
  },
  backButtonContainer: {
    alignSelf: 'flex-start',
  },
  backButton: {
    fontSize: ResponsiveSize(18),
    marginBottom: ResponsiveSize(10),
    fontWeight: 'bold',
  },
  detailsContainer: {
    alignItems: 'center',
  },
  nameText: {
    fontSize: ResponsiveSize(24),
    fontWeight: 'bold',
    marginBottom: ResponsiveSize(10),
  },
  emailText: {
    fontSize: ResponsiveSize(18),
    marginBottom: ResponsiveSize(10),
  },
  avatar: {
    width: ResponsiveSize(120),
    height: ResponsiveSize(120),
    borderRadius: ResponsiveSize(60),
  },
  selectedFilesContainer: {
    marginVertical: ResponsiveSize(20),
  },
  selectedFilesText: {
    fontSize: ResponsiveSize(18),
    fontWeight: 'bold',
    marginBottom: ResponsiveSize(10),
  },
  selectedFile: {
    fontSize: ResponsiveSize(16),
  },
});

export default UserListingDetails;