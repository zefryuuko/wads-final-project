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
        try {
            firebase.storage().refFromURL(url).delete()
            .then(() => {
                if (callback) callback();
            }).err(() => {
                if(callback) callback();
            });
        } catch (err) {
            if (callback) callback();
        }
    }
}

export default new FileService();