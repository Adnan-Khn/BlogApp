import { Client, ID , Account} from "appwrite";
import conf from "../conf/conf";

export class AuthService{
    client = new Client();
    account
    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId)
        this.account = new Account(this.client)
    }
    async signUp({email, password,name}){
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name)
            if(userAccount){
                return this.login({email, password})
            }
            else{
                console.log("Error:"+ userAccount )
            }
        } catch (error) {
            console.log("AuthService service :: signUp() " + error.message)
            throw error
        }
    }
    async login({email,password}){
        try {
            //const account = this.account
            //console.log(typeof(email))
            // await this.account.createEmailSession("adnan@gmail.com", "adnankhan").then((res)=>(
            //     console.log(res)
            // ))
            return await this.account.createEmailPasswordSession(email,password)            
        } catch (error) {
            console.log("AuthService service :: login() :: " + error.message)
            throw error
        }
    }
    async getCurrentUser(){
        try {
            return await this.account.get()
        } catch (error) {
            console.log("AuthService service :: getCurrentUser() :: ", error.message);
        }
        return null
    }
    async logout(){
        try {
            await this.account.deleteSessions()
        } catch (error) {
            console.log("AuthService service :: logout() :: ", error.message);
        }
    }
}
const authService = new AuthService()

export default authService