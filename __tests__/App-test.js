/**
 * @format
 */

import 'react-native';
import React from 'react';
// import App from '../App';

import {act, create} from 'react-test-renderer';
import NewPassword from '../src/components/newPassword';

test('button press', () => {
  const button = main.root.findByProps({testID: 'otp'}).props;
  act(() => button.onPress());

  expect(button).toBeTruthy(true);
});
