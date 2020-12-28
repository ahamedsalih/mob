/**
 * @format
 */

 import "react-native";
import React from 'react';
// import App from '../App';

import {act, create} from "react-test-renderer";
import NewPassword from "../src/components/newPassword";




// Note: test renderer must be required after react-native.
const main=create(<NewPassword/>)

test("snapshot",()=>{
  expect(main).toMatchSnapshot();
})


// test("button press",()=>{
//   const button=main.root.findByProps({testID:"otp"}).props;
//   act(()=>button.onPress())

//   expect(button).toBeTruthy(true)
// })
