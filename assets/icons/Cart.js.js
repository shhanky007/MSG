import * as React from "react"
import Svg, { Path, G, Circle, Line } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: title */

export function Cart(props) {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 17.361 17.094">
      <Path id="cart" d="M8.45,17.222a1.736,1.736,0,1,0,1.736,1.736A1.741,1.741,0,0,0,8.45,17.222ZM3.375,3.6V5.336H5.111l3.125,6.33L6.93,13.793a1.728,1.728,0,0,0,1.654,2.561H18.733V14.684H8.8a.205.205,0,0,1-.217-.217,1.083,1.083,0,0,1,.092-.217l.867-1.369H16a1.7,1.7,0,0,0,1.519-.911l3.125-5.375a1.015,1.015,0,0,0,.087-.434.835.835,0,0,0-.868-.825H7.021L6.2,3.6ZM17,17.222a1.736,1.736,0,1,0,1.736,1.736A1.741,1.741,0,0,0,17,17.222Z" transform="translate(-3.375 -3.6)" fill="#2b2b2b" />
    </Svg>
  )
}

export default Cart

