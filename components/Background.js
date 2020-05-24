import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';


function Background() {


    return (
        <LinearGradient
            colors={['rgba(1,60,255,0.15)', 'transparent']}
            start={[0.1, 0.2]}
            style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                height: 700
            }}
        />
    )
}

export default Background