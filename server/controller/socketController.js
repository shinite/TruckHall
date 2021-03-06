const firebase = require('firebase');

module.exports = (io) =>{

  //firebase configurations, replace these with original configurations
  // const config = {
  //    apiKey: "FIREBASE_API_KEY",
  //    authDomain: "FIREBASE_AUTH_DOMAIN",
  //    databaseURL: "FIREBASE_DATABASE_URL",
  //    projectId: "FIREBASE_PROJECT_ID",
  //    storageBucket: "FIREBASE_STORAGE_BUCKET",
  //    messagingSenderId: "FIREBASE_MESSAGING_SENDER_ID"
  //  };

   const config = {
     apiKey: "AIzaSyAcDHFS66ra6ObdSKT-1YoesmIfWJx_uPA",
     authDomain: "cricket-app-2105d.firebaseapp.com",
     databaseURL: "https://cricket-app-2105d.firebaseio.com",
     projectId: "cricket-app-2105d",
     storageBucket: "cricket-app-2105d.appspot.com",
     messagingSenderId: "270403501403"
   };

  firebase.initializeApp(config);

  //socket.io connection
  io.on('connection', function(socket) {

  //array storing names of live matches
  var matches = ['IndVsPak','BanVsSL','CAVsHol','EngVsNZ','NabVsPng','NepVsHong','SAVsAus','ScoVsIre','UaeVsUsa','AfgVsKen']

  //fetching value from firebase database it will be triggered everytime data changes in the specific collection. Manual changes have to be made in db.
  matches.forEach((match)=>{
    firebase.database().ref(match).on('value',(snapshot)=>{
       socket.emit(match, snapshot.val());
    }, (e)=>{
      console.log("error with fetching",e);
    })
  })

  //Uncomment this code to see automated database upgrading for IndVsPak
  // var iterator1 = 0;
  // for(let i= 0 ; i<5;i++)
  // {
  //   setTimeout(()=>{
  //     firebase.database().ref('IndVsPak/score').set(120+i)
  //     firebase.database().ref('IndVsPak').on('value',(snapshot)=>{
  //        socket.emit('IndVsPak', snapshot.val());
  //     }, (e)=>{
  //       console.log("error with fetching",e);
  //     })
  //     //console.log(i,"i");
  //   },3000+iterator1)
  //   iterator1+=2000;
  // }
  //
  // setTimeout(()=>{
  //   firebase.database().ref().update({'IndVsPak/lastRun':6,'IndVsPak/score':130})
  //   firebase.database().ref('IndVsPak').on('value',(snapshot)=>{
  //      socket.emit('IndVsPak', snapshot.val());
  //   }, (e)=>{
  //     console.log("error with fetching",e);
  //   })
  // },15000)

  //Uncomment this code to see automated database upgrading for SAVsAus
    // var iterator2 = 0;
    // for(let i= 0 ; i<5;i++)
    // {
    //   setTimeout(()=>{
    //     firebase.database().ref('SAVsAus/score').set(150+i)
    //     firebase.database().ref('SAVsAus').on('value',(snapshot)=>{
    //        socket.emit('SAVsAus', snapshot.val());
    //     }, (e)=>{
    //       console.log("error with fetching",e);
    //     })
    //     //console.log(i,"i");
    //   },5000+iterator2)
    //   iterator2+=2000;
    // }
    //
    // setTimeout(()=>{
    //   firebase.database().ref().update({'SAVsAus/wickets':1,'IndVsPak/score':130})
    //   firebase.database().ref('SAVsAus').on('value',(snapshot)=>{
    //      socket.emit('SAVsAus', snapshot.val());
    //   }, (e)=>{
    //     console.log("error with fetching",e);
    //   })
    // },15000)


  });
}
