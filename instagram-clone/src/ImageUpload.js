import React , {useState} from 'react';
import {Button} from '@material-ui/core';
import firebase from 'firebase';
import { storage, db,auth } from './firebase';
import './ImageUpload.css';

function ImageUpload({username } ) {

       const [caption,setCaption] = useState('');
       const [image,setImage] = useState(null);
       const [progress,setProgress] = useState(0);
       

       const handleChange = (e) => {
           if(e.target.files[0]){
               setImage(e.target.files[0]);
           }
       };

       const handleUpload = () => {
           const UploadTask = storage.ref(`images/${image.name}`).put(image);
        UploadTask.on(
            "state_changed",
            (snapshot) => {
               
               const progress = Math.round((
                  snapshot.bytesTransferred/snapshot.totalBytes)*100 
               );

               setProgress(progress);

                //progress function
            },
            (error) => {
                //Error function
                console.log(error);
                alert(error.message);

            },
            () => {
               storage.ref("images")
               .child(image.name)
               .getDownloadURL()
               .then(url => {
                   //post image inside db
                   db.collection("posts").add({
                       timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                       caption: caption,
                       imageUrl: url,
                       username: username
                   });
                   setProgress(0);
                   setCaption("");
                   setImage(null);
               });
                //complete function....

            }
        )
       }


    return (
        <div className = "imageupload">
           
          <progress className = "imageupload_progress" value = {progress} max ="100" /> 
          <input type = "text" placeholder = "Enter a caption.."
           onChange = {event => setCaption(event.target.value)}
           vlaue={caption} />
          <input type = "file" onChange = {handleChange} />
          <Button className = "upload_btn" onClick = {handleUpload}>
              Upload
          </Button>
              

        </div>
    )
}

export default ImageUpload;