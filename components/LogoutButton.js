import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {HeaderButton} from 'react-navigation-header-buttons';

const LogoutButton = props => {
  return (
    <HeaderButton IconComponent={Icon} {...props} iconSize={23} color="white" />
  );
};

export default LogoutButton;
