import {Button, Card, theme}from 'antd'


const {defaultAlgorithm, darkAlgorithm}= theme

export const defaultTheme={
    algorithm: defaultAlgorithm,
    token:{
        colorPrimary:'#a88163',
        colorBgContainer:'#ffffff',
        colorText:'#4b2400',
        colorBorder:'#d9d9d9',
        borderRadius:12
    },
    components:{
        Button:{colorPrimary:'#8e694d',colorBgContainer:'#361a00'},
        Card:{colorBgContainer:'#ffffff'}
    }
}

export const darkTheme= {
    algorithm:darkAlgorithm,
    token:{
        colorPrimary:'#ecc09e',
        colorBgContainer:'#361a00',
        colorText:'#a88163',
        colorBorder:'#00000'
    },
    components:{
        Button:{colorPrimary:'#a88163'},
        Card:{colorBgContainer:'#361a0000'}
    }
}

export default defaultTheme