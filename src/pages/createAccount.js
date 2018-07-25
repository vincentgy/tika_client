// import React from 'react';

// class CreateAccount extends React.Component {
//   render() {
//     return (
//       <KeyboardDetector>
//         {(isShow, height, getViewContainerRef) => (
//           <ScrollView
//             contentContainerStyle={{
//               backgroundColor: '#2D59D9',
//               height: '100%',
//             }}>
//             <Animatable.View ref={getViewContainerRef}>
//               <View style={{height: '50%'}} />
//               <View style={{height: '50%', backgroundColor: 'white'}}>
//                 <Form
//                   onSumit={obj => {
//                     Alert.alert('title', JSON.stringify(obj));
//                   }}>
//                   {(onChange, onSumit) => (
//                     <React.Fragment>
//                       <Input
//                         placeholder="Name"
//                         onChangeText={t => onChange({key: 'Name', value: t})}
//                       />
//                       <Input
//                         placeholder="Email"
//                         onChangeText={t => onChange({key: 'Email', value: t})}
//                       />
//                       <Input
//                         placeholder="Password"
//                         onChangeText={t =>
//                           onChange({key: 'Password', value: t})
//                         }
//                       />
//                       <Button
//                         buttonStyle={{height: 48, marginTop: 16}}
//                         backgroundColor="#0077FF"
//                         borderRadius={4}
//                         onPress={onSumit}
//                         title="Sign up"
//                       />
//                     </React.Fragment>
//                   )}
//                 </Form>
//               </View>
//             </Animatable.View>
//           </ScrollView>
//         )}
//       </KeyboardDetector>
//     );
//   }
// }
