1.  Create a .env file under root directory:
    Create PORT AND DATABASE_URL FOR CONNECTION
    PORT = 5000
    DATABASE_URL = postgresql://neondb_owner:npg_cJbj6k0qOhGA@ep-twilight-silence-az0qr3em-pooler.c-3.ap-southeast-1.aws.neon.tech/neondb?sslmode=false&channel_binding=require
2.  Create a folder in the name of db ybder src folder
3.  create a file in the name of index.ts under db folder
4.

## 8-6: Creating User Profiles

1.  Create a folder : Pprofile
2.  create a file : profile.route.ts
3.  Declare a router :
    import Router from "express"
    const router = Router()
    export const profileRoute = router
4.  Go to app.ts file
    create a route:
    app.use("/api/vi/profiles", profileRoute)
5.  Go to profile.route.ts file
    import Router from "express"
    const router = Router()
    router.post("/", profileController.createProfile)
    export const profileRoute = router
6.  Create a contorller : profile.controller.ts
    create a function:
    const createProfile =async(req:Request, res:Response)=>{
    try(){}catch(){}
    }

    export const profileController {
    createProfile,
    }
