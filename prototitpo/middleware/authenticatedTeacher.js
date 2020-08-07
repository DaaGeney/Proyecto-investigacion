
import { getRole } from "../helpers/apiCalls/auth";

export default async function ({ app, store, redirect }) {
    // If the user is not authenticated
   
    const cookiesRes = app.$cookies.get('auth')
    const id = app.$cookies.get('id')
   
    await getRole(id).then(response => {
        let role = response.data.role;
        if (!cookiesRes) {
            return redirect('/login')
        } else if (role == "teacher") {
            return redirect('/newComponent')
        } else if (role != "admin") {
            app.$cookies.removeAll()
            return redirect('/login')
        }
        
    }).catch(error=>{
        console.log("error")
        app.$cookies.removeAll()
        return redirect('/login')
    })


} 