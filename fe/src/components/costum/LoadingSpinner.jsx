import { Spin } from 'antd'
import React from 'react'

const LoadingSpinner = ({children, loading}) => {
  return (
   <Spin spinning={loading} size='large'>
    {children}
   </Spin>
  )
}

export default LoadingSpinner
