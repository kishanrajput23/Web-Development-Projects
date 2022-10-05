import React from 'react';
import './App.css';
import Post from './Post.js';
import  { useEffect, useState } from "react";
import { auth, db } from './firebase';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import {Button,Input} from '@material-ui/core';
import ImageUpload from './ImageUpload';
import InstagramEmbed from 'react-instagram-embed';


function getModalStyle() {
  const top = 50 ;
  const left = 50 ; 
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [posts,setPosts] =  useState([]);
  const [open, setOpen] = useState(false);
  const [openSignIn,setOpenSignIn] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user,setUser] = useState(null);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if(authUser){
        console.log(authUser);
        setUser(authUser);//user has logged in
        if (authUser.displayName){
          //don't update username
        } else {
          //if we just created username
          return authUser.updateProfile({
            diaplayName: username,
          });
        }
      }  
      else {
        setUser(null); //user has logged out
      }
      
    }) 

    return () => { //perform some clean up action
      unsubscribe();
    }

  },[user,username]);
// UseEffect runs a piece of code based on a specific condition

useEffect(() => {
  db.collection('posts').orderBy('timestamp','desc').onSnapshot(snapshot => {
    setPosts(snapshot.docs.map(doc => ({
      id: doc.id,
      post:doc.data()})))
  })
},
[] );

const signUp = (event) => {
  event.preventDefault();
  auth.createUserWithEmailAndPassword(email,password)
  .then((authUser) => {
     return authUser.user.updateProfile({
      displayName: username
    })
  })
  .catch((error) => alert(error.message));

   setOpen(false);
} 

const signIn = (event) => {
  event.preventDefault();
  auth
   .signInWithEmailAndPassword(email,password)
     .catch((error) => alert(error.message))

   setOpenSignIn(false);
}

  return (
     <div className="app">
    
    
    <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
         <div style={modalStyle} className={classes.paper}>
        <form className = "app_signup">
        <center>
        <img
        className = "app_headerImage"
        src = "https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt = ""
        />
        <br/> <br/>
        </center>
        <center>
        <Input
          placeholder = "username"
          type = "text"
          value = {username}
          onChange = {(e) => setUsername(e.target.value)}

        /> <br/>
        
         <Input
          placeholder = "email"
          type = "text"
          value = {email}
          onChange = {(e) => setEmail(e.target.value)}

        /><br/>
         <Input
          placeholder = "password"
          type = "password"
          value = {password}
          onChange = {(e) => setPassword(e.target.value)}

        />
        </center>
        <br/><br/> 
        <center>
         <Button type = {'submit'} onClick={signUp} >Sign up</Button>
         </center>
         </form>
         </div>
         
      </Modal>

      <Modal
        open={openSignIn}
        onClose={() => setOpenSignIn(false)}
      >
         <div style={modalStyle} className={classes.paper}>
        <form className = "app_signup">
        <center>
        <img
        className = "app_headerImage"
        src = "https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt = ""
        />
        <br/> <br/>
        </center>
        <center>
        
         <Input
          placeholder = "email"
          type = "text"
          value = {email}
          onChange = {(e) => setEmail(e.target.value)}

        /><br/>
         <Input
          placeholder = "password"
          type = "password"
          value = {password}
          onChange = {(e) => setPassword(e.target.value)}

        />
        </center>
        <br/><br/> 
        <center>
         <Button type = {'submit'} onClick={signIn} >Sign in</Button>
         </center>
         </form>
         </div>
         
      </Modal>

     <div className = "app_header">
    <img
      className = "app_headerImage"
      src = "https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt = ""
    />
     {user ?(
      <Button onClick={() => auth.signOut()} >Log out</Button>
    ) :
      
     (
      <div className = "app_loginContaianer">
      <Button onClick={() => setOpenSignIn(true)} >Sign In</Button>
      <Button onClick={() => setOpen(true)} >Sign Up</Button>
         
      </div>
     )}
    </div>
   
    {/* <Button onClick={() => setOpen(true)} >Sign Up</Button> */}
    <div className = "app_posts">
     {
       posts.map(({id,post}) => (
         <Post key = {id} postId = {id} user = {user} username = {post.username} caption = {post.caption} imageUrl = {post.imageUrl} />
       ) )
     }
     </div>
     <InstagramEmbed
       url='https://www.instagram.com/p/BR3EpYUgeJr_i4q4R9sSPHY_nXI0HGiVgZMHVE0/'
      //  clientAccessToken='123|456'
       maxWidth={320}
       hideCaption={false}
       containerTagName='div'
       protocol=''
       injectScript
       onLoading={() => {}}
       onSuccess={() => {}}
       onAfterRender={() => {}}
       onFailure={() => {}}
/>
     {user?.displayName ? (
      <ImageUpload username = {user.displayName}/>
     ): (
       <h3>Sorry you need to log in to upload</h3>
     )
     }
    
    </div>
  );
}

export default App;
