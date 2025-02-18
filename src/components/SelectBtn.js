import { color } from '@mui/system'
import React from 'react'

const SelectBtn = ({children,selected,onClick}) => {
  return (
    <span onClick={onClick} className='btn'
      style={{
          border:'1px solid gold',borderRadius:5,padding:10,paddingLeft:20,
          paddingRight:20,fontFamily:'Montserrat',cursor:'pointer',backgroundColor:selected ? 'gold':"",
          color:selected ? 'black':"",fontWeight:selected ? 700:500,
          width:'22%',

    }}>{children}</span>
  )
}

export default SelectBtn