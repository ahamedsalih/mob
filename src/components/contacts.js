// import React from 'react';
// import {View,Text,PermissionsAndroid,ScrollView} from "react-native";
// import Contacts from 'react-native-contacts';

// class MyContacts extends React.Component {
  
//         state = {
//             contact:[]
//         }
    

//     componentDidMount() {
      
      
//             PermissionsAndroid.request(
//                 PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
//                 {
//                     title: 'Contacts',
//                     message: ' This app would like to see your contacts'
//                 }
//             ).then(() => {
//                 this.getList();
//             })
       
//     }

      
        
    
//     getList = () => {
//         Contacts.getAll((err, contacts) => {
//             if (err === 'denied') {
//                 console.log("cannot access");
//             } else {
//                 // console.log(contacts);
//                 this.setState({ contact:contacts });
               
//             }
//         })
//     }

//     // renderItem = ({item}) => (
//     //     <View style={styles.itemContainer} key={item.id}>
//     //         <Text style={styles.contactName}>
//     //             Name: {`${item.givenName} `} {item.familyName}
//     //         </Text>
//     //         {item.phoneNumbers.map(phone => (
//     //             <Text key={phone.id} style={styles.phones}>{phone.label} : {phone.number}</Text>
//     //         ))}
//     //     </View>
//     // )


//     render(){
        
    
//     return (
//       <ScrollView showsVerticalScrollIndicator={false}>
//        <View style={{flex:1,flexDirection:"column",padding:10}}>
             

//                 {this.state.contact.map((data,index)=>{
                   
//                    return <View  key={index}  style={{width:"100%",height:"auto",backgroundColor:"lightgrey",elevation:10,padding:10,borderBottomColor:"blue"}}>
//                     <View style={{bottom:9}}><Text style={{textAlign:"center",fontSize:23,letterSpacing:1}}>{data.givenName}</Text></View>
   
//                     {data.phoneNumbers.map((data1,index1)=>{
//                         return <View key={index1} style={{width:"100%",borderBottomWidth:3,borderBottomColor:"#fff",padding:5,opacity:.8}}>
//                             <View style={{bottom:9}}>
//                             <Text style={{textAlign:"center",fontSize:18,opacity:.9}}>{data1.number}</Text>
//                             </View>
//                         </View>
//                     })}
//                 </View>
//                 })}
//             </View>
//             </ScrollView>
    
//     )
// };
// };

// export default MyContacts;