"use server"
import { revalidatePath } from "next/cache";
import { connectToDB } from "./constants";
import { Product, User } from "./models";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import { signIn, signOut } from "../auth";

export const addUser = async (formData) => {

    const { username, email, password, phone, address, isAdmin, isActive } = 
        Object.fromEntries(formData);

    try{
        connectToDB();

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            username, 
            email, 
            password:hashedPassword, 
            phone, 
            address, 
            isAdmin, 
            isActive
        })
    
        await newUser.save();

    }catch(err){
        console.log(err);
        throw new Error("Failled to create user !")
    }

    revalidatePath("/dashboard/users/")
    redirect("/dashboard/users/")
}


export const updateUser = async (formData) => {

    const { id, username, email, password, phone, address, isAdmin, isActive } = 
        Object.fromEntries(formData);

    try{
        connectToDB();
        
        const updateFields = {
            username, email, password, phone, address, isAdmin, isActive
        }

        Object.keys(updateFields).forEach(
                (key)=>
                    (updateFields[key]==="" || undefined) && delete updateFields[key] )

        await User.findByIdAndUpdate(id, updateFields)
    
    }catch(err){
        console.log(err);
        throw new Error("Failled to update user !")
    }

    revalidatePath("/dashboard/users/")
    redirect("/dashboard/users/")
}





export const addProduct = async (formData) => {

    const { title, desc, cat, stock, color, price, size } = 
        Object.fromEntries(formData);

    try{
        connectToDB();
        const newProduct = new Product({
            title, 
            desc, 
            cat, 
            stock, 
            color, 
            price, 
            size
        })
    
        await newProduct.save();

    }catch(err){
        console.log(err);
        throw new Error("Failled to create Product !")
    }

    revalidatePath("/dashboard/products/")
    redirect("/dashboard/products/")
}

export const updateProduct = async (formData) => {

    const { id, 
        title, 
        desc, 
        cat, 
        stock, 
        color, 
        price, 
        size } = 
        Object.fromEntries(formData);

    try{
        connectToDB();
        const updateFields = {
            title, 
            desc, 
            cat, 
            stock, 
            color, 
            price, 
            size
        }


        Object.keys(updateFields).forEach(
                (key)=>
                    (updateFields[key]==="" || undefined) && delete updateFields[key] )

        
        await Product.findByIdAndUpdate(id, updateFields)

        console.log("Product update")
    
    }catch(err){
        console.log(err);
        throw new Error("Failled to update Product !")
    }

    revalidatePath("/dashboard/products/")
    redirect("/dashboard/products/")
}




export const deleteProduct = async (formData) => {

    const { id } = Object.fromEntries(formData);
    try{
        connectToDB();    
        await Product.findByIdAndDelete(id)

    }catch(err){
        console.log(err);
        throw new Error("Failled to delete Product !")
    }

    revalidatePath("/dashboard/products/")
}

export const deleteUser = async (formData) => {

    const { id } = Object.fromEntries(formData);
    try{
        connectToDB();    
        await User.findByIdAndDelete(id)
    }catch(err){
        console.log(err);
        throw new Error("Failled to delete Product !")
    }
    revalidatePath("/dashboard/products/")
}

export const authenticate = async (formData) => {
    const { username, password } = 
        Object.fromEntries(formData);
    
    console.log({username, password})

    try{

        await signIn("credentials", {username, password})

    }catch(error){
        return {error:"wrong credentials"}
    }
}

export const signOutSide = async () => {
    try{    
        await signOut()
    }    
    catch(err){
        console.log(err)
        throw err;
    }
}