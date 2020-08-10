export default function ({app,  store, redirect }) {
    // If the user is authenticated redirect to home page
    const cookiesRes = app.$cookies.get('auth')
    
    if ( cookiesRes ) {
         redirect('/newComponent')
    }
}