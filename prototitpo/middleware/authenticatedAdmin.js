  
export default function ({app,  store, redirect }) {
    // If the user is not authenticated
 
    const cookiesRes = app.$cookies.get('auth')
    const role = app.$cookies.get('role')

    if (!cookiesRes ) {
       return redirect('/login')
    }else if(role=="admin"){

        return redirect('/manageUser')
    }else if (role!="teacher") {
        app.$cookies.removeAll()
        return redirect('/login')

    }

  } 