import instance from ".";
import { Category, Product } from "../interfaces/product";

export const addProduct = async (product:Product) => {
    try {
        const {data} = await instance.post(`/products`,product)
        return data
    } catch (error) {
        console.log(error)
    }
}

export const editProduct = async (product:Product) => {
    try {
        const {data} = await instance.put(`/products/${product.id}`,product)
        return data
    } catch (error) {
        console.log(error)
    }
}

export const getIdProduct = async (id:string) => {
    try {
        const {data} = await instance.get(`/products/${id}`)
        return data
    } catch (error) {
        console.log(error)
    }
}

export const getAllProduct = async () => {
    try {
        const {data} = await instance.get(`/products`)
        return data
    } catch (error) {
        console.log(error)
    }
}

export const deleteProduct = async (id: number) => {
    try {
        const {data} = await instance.delete(`/products/${id}`)
        return data
    } catch (error) {
        console.log(error)
    }
}

export const CategoryAdd = async (category:Category) => {
    try {
        const {data} = await instance.post(`/categorys`,category)
        return data
    } catch (error) {
        console.log(error)
    }
}

export const CategoryList = async () => {
    try {
        const {data} = await instance.get(`/categorys`)
        return data
    } catch (error) {
        console.log(error)
    }
}

export const editCategory = async (category:Category) => {
    try {
        const {data} = await instance.put(`/categorys/${category.id}`,category)
        return data
    } catch (error) {
        console.log(error)
    }
}

export const deleteCategory = async (id: number) => {
    try {
        const {data} = await instance.delete(`/categorys/${id}`)
        return data
    } catch (error) {
        console.log(error)
    }
}

export const getIdCategory = async (id:string) => {
    try {
        const {data} = await instance.get(`/categorys/${id}`)
        return data
    } catch (error) {
        console.log(error)
    }
}