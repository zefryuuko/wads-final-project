import firebase from '../firebase';

class FileService {
    uploadFile(bucketName, fileName, file, callback) {
        const uploadTask = firebase.storage().ref(`${bucketName}/${fileName}`).put(file);
        uploadTask.on('state_changed', null, null, () => {
            // Get file URL
            firebase.storage().ref().child(`${bucketName}/${fileName}`).getDownloadURL()
            .then(downloadURL => callback(downloadURL))
        })
    }

    deleteFile(url, callback) {
        firebase.storage().refFromURL(url).delete();
        callback();
    }

}

export default new FileService();