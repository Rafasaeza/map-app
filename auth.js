import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    async signIn({user,account}){
        console.log("User:",user);
        console.log("Account:", account);

        if(account.provider === "google"){
          try {
            await fetch("http://localhost:3000/api/user", {
              method: "POST",
              body: JSON.stringify({email: user.email}),
              headers: {
                "Content-Type": "application/json"
              }
            })
          } catch (error) {
            
          }
        }
        return user;
    }
  } 
})