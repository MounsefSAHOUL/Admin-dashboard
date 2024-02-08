import NextAuth from "next-auth"
import credentials from "next-auth/providers/credentials"
import CredentialsProvider from "next-auth/providers/credentials"
import { authConfig } from "../authconfig"
import { connectToDB } from "./utils/constants"
import { User } from "./utils/models"
import bcrypt from "bcrypt"


const login = async (credentials) => {
    try{
        connectToDB()
        const user = await User.findOne({username:credentials.username})

        if(!user) throw new Error("Wrong credentials!")

        const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password)

        if(!isPasswordCorrect) throw new Error("Wrong credentials!")

        return user;

    }catch(err){
        console.log(err)
        throw new Error("failed to login!")
    }
}

export const {signIn, signOut, auth} = NextAuth({
    ...authConfig,
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        try{
            const user = await login(credentials);
            return user;
        }catch(err){
            return null;
        }
      },
    }),
  ],
  callbacks:{
    async jwt({token, user}){
        if(user){
            token.username = user.username
            token.img = user.img
            token.isAdmin = user.isAdmin
        }
        return token
    },
    async session({ session, token }){
        if(token){
            session.username = token.username
            session.img = token.img
            session.isAdmin = token.isAdmin
        }
        return session
    }
  }
})