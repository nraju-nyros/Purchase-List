import React from 'react'
import { ErrorMessage } from 'formik'
export const CustomError = ({name}) => {
  return (
    <div style={{ color: 'red'}}>
        <br/>
        <ErrorMessage name={name}/>
    </div>
  )
}
