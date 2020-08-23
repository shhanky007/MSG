import * as React from "react"
import Svg, { Path, G, Circle, Line } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: title */

function Contact(props) {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width="16.007" height="19.614" viewBox="0 0 16.007 19.614">
      <Path id="contact" d="M18.728,3.461h-.889V1.5H16.06V3.461H8.946V1.5H7.168V3.461H6.279A1.876,1.876,0,0,0,4.5,5.423v13.73a1.876,1.876,0,0,0,1.779,1.961h12.45a1.882,1.882,0,0,0,1.779-1.961V5.423A1.882,1.882,0,0,0,18.728,3.461ZM12.5,6.4a2.811,2.811,0,0,1,2.668,2.942A2.811,2.811,0,0,1,12.5,12.288,2.811,2.811,0,0,1,9.836,9.346,2.811,2.811,0,0,1,12.5,6.4Zm5.336,11.768H7.168v-.981c0-1.961,3.557-3.04,5.336-3.04s5.336,1.079,5.336,3.04Z" transform="translate(-4.5 -1.5)" fill="#2b2b2b" />
    </Svg>


  )
}

export default Contact

