import Svg, {
    Circle,
    Ellipse,
    G,
    Text,
    TSpan,
    TextPath,
    Path,
    Polygon,
    Polyline,
    Line,
    Rect,
    Use,
    Image,
    Symbol,
    Defs,
    LinearGradient,
    RadialGradient,
    Stop,
    ClipPath,
    Pattern,
    Mask,
  } from 'react-native-svg';
  import React from 'react';
  import { View, StyleSheet } from 'react-native';
  
  export default class WhiteArrow extends React.Component {
    render() {
      return (
        <View>
            <Svg xmlns="http://www.w3.org/2000/svg" width="12.001" height="9.999" viewBox="0 0 12.001 9.999">
                <G id="white-arrow" transform="translate(195 63.23) rotate(180)">
                    <Path id="union" d="M4.681,9.837.277,5.491A.556.556,0,0,1,.1,4.7a.559.559,0,0,1,.078-.1.565.565,0,0,1,.058-.05L4.681.163a.568.568,0,0,1,.8,0,.55.55,0,0,1,0,.785L1.922,4.455h9.523a.555.555,0,0,1,0,1.111h-9.5L5.477,9.052a.55.55,0,0,1,0,.785.568.568,0,0,1-.8,0Z" transform="translate(183 53.231)" fill="#000"/>
                </G>
            </Svg>

        </View>
      );
    }
  }










