import * as React from "react"
import Svg, { Path, G, Circle,Rect } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: title */

 function CheckmarkForList(props) {
    return (
      <Svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 20 20">
      <G id="checked" transform="translate(-20 -1150)">
        <Rect id="Rectangle_59" data-name="Rectangle 59" width="20" height="20" rx="4" transform="translate(20 1150)" fill="#ffffff"/>
        <G id="tick" transform="translate(25 1089.002)">
          <G id="Group_91" data-name="Group 91" transform="translate(0 67.997)">
            <Path id="Path_2265" data-name="Path 2265" d="M9.136,68.133a.464.464,0,0,0-.656,0L2.926,73.688.791,71.553a.464.464,0,0,0-.656.656L2.6,74.671a.464.464,0,0,0,.656,0l5.882-5.882A.464.464,0,0,0,9.136,68.133Z" transform="translate(0 -67.997)" fill="#D5D5D5" stroke="#D5D5D5" stroke-width="1"/>
          </G>
        </G>
      </G>
    </Svg>
    )
}

 export default CheckmarkForList

