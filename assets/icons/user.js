import * as React from "react"
import Svg, { Path, G, Circle } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: title */

 function User(props) {
    return (
        <Svg xmlns="http://www.w3.org/2000/svg" width="27" height="30" viewBox="0 0 27 30">
  <G id="user" transform="translate(-4.5 -3)">
    <Path id="Path_313" data-name="Path 313" d="M30,31.5v-3a6,6,0,0,0-6-6H12a6,6,0,0,0-6,6v3" fill="none" stroke="#4d4d4d" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/>
    <Path id="Path_314" data-name="Path 314" d="M24,10.5a6,6,0,1,1-6-6A6,6,0,0,1,24,10.5Z" fill="none" stroke="#4d4d4d" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/>
  </G>
</Svg>)
}

 export default User

