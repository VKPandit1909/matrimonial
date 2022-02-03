import React from 'react'
import { Component } from 'react'

const UserContext = React.createContext()

// export class UserProvider extends Component{
//     state={
//         about:'',
//         basic:''
//     }
//     componentDidMount(){
//         ()=>{
//             this.getData()
//         }
//     }

//     getData=()=>{
//         fetch("http://localhost:3000/user-details", {
//           method: "POST",
//           crossDomain: true,
//           headers: {
//             "Content-Type": "application/json",
//             Accept: "application/json",
//             "Access-Control-Allow-Origin": "*",
//           },
//           body: JSON.stringify({
//             token: window.localStorage.getItem("token"),
//           }),
//         })
//           .then((res) => res.json())
//           .then((results) => {
//           console.log(results,'results')
//             // global.userData = results.data;
//             this.setState({
//                 about: results.data,
//                 basic: results.data.basic

//             })
//             // setDetails(results.data.basic)
//             // setAbout(results.data)
            
//           });
//       }
//       render(){
//           const {about,basic}=this.state;
//           return(
//               <UserContext.Provider value={{about,basic}}>
//                   {this.props.children}
//                   </UserContext.Provider>
//           )
//       }

// }

export default UserContext