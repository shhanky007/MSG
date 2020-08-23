import React from 'react';
import { ActivityIndicator } from 'react-native';
const LoadingIcon = ({ isIconAnimating }) => <ActivityIndicator
style={
    {
        position: 'absolute',
        backgroundColor : 'rgba(0,0,0,0.7)',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        pointerEvents :'none',
        justifyContent: 'center',
        alignItems: 'center'
    }
}

size="large" color="#e78200" animating={isIconAnimating} />;
export default LoadingIcon;