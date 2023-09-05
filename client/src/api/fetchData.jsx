import axios from 'axios'
import { BACKEND_PROXY } from '../proxy';

const setUpProxy =  process.env.NODE_ENV === 'development' ? '' : `${BACKEND_PROXY}/v1`

export const getDataAPI = async(url, token) => {
    const res = await axios.get(`${setUpProxy}/api/${url}`, {
        headers: {Authorization: token}
    })
    return res;
}

export const postDataAPI = async(url, post, token) => {
    const res = await axios.post(`${setUpProxy}/api/${url}`, post, {
        headers: {Authorization: token}
    })
    return res;
}

export const putDataAPI = async(url, post, token) => {
    const res = await axios.put(`${setUpProxy}/api/${url}`, post, {
        headers: {Authorization: token}
    })
    return res;
}

export const patchDataAPI = async(url, post, token) => {
    const res = await axios.patch(`${setUpProxy}/api/${url}`, post, {
        headers: {Authorization: token}
    })
    return res;
}

export const deleteDataAPI = async(url, token) => {
    const res = await axios.delete(`${setUpProxy}/api/${url}`, {
        headers: {Authorization: token}
    })
    return res;
}