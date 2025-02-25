import axios from "axios";

export const getOrderAdmin = async(token)=>{


    return axios.get('https://testapi-roan.vercel.app/api/admin/orders',{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
}
export const changeOrderStatus = async(token,orderId, orderStatus)=>{


    return axios.put('https://testapi-roan.vercel.app/api/admin/order-status',{orderId,orderStatus},{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
}

export const getListAllUser = async(token)=>{


    return axios.get('https://testapi-roan.vercel.app/api/users',{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
}
export const changeUserStatus = async(token,value)=>{


    return axios.post('https://testapi-roan.vercel.app/api/change-status',value,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
}
export const changeUserRole = async(token,value)=>{


    return axios.post('https://testapi-roan.vercel.app/api/change-role',value,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
}

