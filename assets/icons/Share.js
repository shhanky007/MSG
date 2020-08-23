import * as React from "react"
import Svg, { Path, G, Circle,Rect } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: title */

 function ShareIcon(props) {
    return (
      <Svg xmlns="http://www.w3.org/2000/svg" width="15.278" height="17.46" viewBox="0 0 15.278 17.46">
      <Path id="share" d="M12,10.913a3.26,3.26,0,0,0-2.039.713L6.47,9.441a3.293,3.293,0,0,0,0-1.421l3.5-2.184a3.268,3.268,0,1,0-1.157-1.85l-3.5,2.184a3.274,3.274,0,1,0,0,5.123l3.5,2.184A3.274,3.274,0,1,0,12,10.913Z" fill="#2b2b2b"/>
    </Svg>
    
    )
}

 export default ShareIcon

