export default function ({app,  store, redirect }) {
    // If the user is authenticated redirect to home page
    const cookiesRes = app.$cookies.get('auth')
    const role = app.$cookies.get('role')
    
    if ( cookiesRes ) {
        role == "admin" ?   redirect('/manageUser') :  redirect('/newComponent')
    }
}