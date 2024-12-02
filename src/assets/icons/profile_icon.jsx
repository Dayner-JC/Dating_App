import React from 'react';
import Svg, { Path } from 'react-native-svg';

const ProfileIcon = ({ focused }) => {
  return (
    <Svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M20.16 21.04C20.0666 21.0266 19.9466 21.0266 19.84 21.04C17.4933 20.96 15.6266 19.04 15.6266 16.68C15.6266 14.2666 17.5733 12.3066 20 12.3066C22.4133 12.3066 24.3733 14.2666 24.3733 16.68C24.36 19.04 22.5066 20.96 20.16 21.04Z"
        stroke={focused ? '#17261F' : 'white'}
        fill={focused ? '#D9D2B0' : 'transparent'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M28.9866 29.84C26.6133 32.0133 23.4666 33.3333 20 33.3333C16.5333 33.3333 13.3866 32.0133 11.0133 29.84C11.1466 28.5866 11.9466 27.36 13.3733 26.4C17.0266 23.9733 23 23.9733 26.6266 26.4C28.0533 27.36 28.8533 28.5866 28.9866 29.84Z"
        stroke={focused ? '#17261F' : 'white'}
        fill={focused ? '#D9D2B0' : 'transparent'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M20 33.3333C27.3638 33.3333 33.3334 27.3638 33.3334 20C33.3334 12.6362 27.3638 6.66663 20 6.66663C12.6362 6.66663 6.66669 12.6362 6.66669 20C6.66669 27.3638 12.6362 33.3333 20 33.3333Z"
        stroke={focused ? '#D9D2B0' : 'white'}
        fill={focused ? 'transparent' : 'transparent'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default ProfileIcon;
