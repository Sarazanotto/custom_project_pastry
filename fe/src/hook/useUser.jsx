
const useUser = () => {
const createUser= async(newUser)=>{
    try {
        const res= await fetch ("http://localhost:4545/user",{
            method:'POST',
            headers:{
                "Content-type": "application/json"
            },
            body:JSON.stringify(newUser)
        })
          if (!res.ok) {
        const errorResponse = await res.json()
        throw new Error(errorResponse.message)
      }
      const data= await res.json()
      return data
    } catch (error) {
        console.log(error)
    }
}

  return {
    createUser
  }
   
 
}

export default useUser
