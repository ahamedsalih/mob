import React from 'react';
import {View,Text,ScrollView} from "react-native";


class ContactList  extends React.Component {

state={
    contactList:[]
}
    componentDidMount(){
        this.listContacts();
    }

    render(){
        const {contact}=this.props.route.params;

        console.log("----contactsparam____",contact)

        
      

        this.listContacts=()=>{
            const con=JSON.parse(contact)
            console.log("type",typeof con)
           this.setState({contactList:con})
           

        }
      
        
 
    return (
    //    <View>
    //   <Text></Text>
    //    </View>
    <ScrollView showsVerticalScrollIndicator={false}>
    <View style={{flex:1,flexDirection:"column",padding:10}}>
          

             {this.state.contactList.map((data,index)=>{
                
                return <View  key={index}  style={{width:"100%",height:"auto",backgroundColor:"lightgrey",elevation:10,padding:10,borderBottomColor:"blue"}}>
                 <View style={{bottom:9}}><Text style={{textAlign:"center",fontSize:23,letterSpacing:1}}>{data.givenName}</Text></View>

                 {data.phoneNumbers.map((data1,index1)=>{
                     return <View key={index1} style={{width:"100%",borderBottomWidth:3,borderBottomColor:"#fff",padding:5,opacity:.8}}>
                         <View style={{bottom:9}}>
                         <Text style={{textAlign:"center",fontSize:18,opacity:.9}}>{data1.number}</Text>
                         </View>
                     </View>
                 })}
             </View>
             })}
         </View>
         </ScrollView>
    )
};
};


export default  ContactList;
