const BASE_URL="`http://localhost:8081";

export const login =async (email,password)=>{
    const response=await fetch("http://localhost:8081/api/auth/login",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({email,password})
    });
    if(!response.ok){
        const errorData=await response.json().catch(()=>({}));
        throw new Error(errorData.error||"Login Failed");
    }
    return await response.json();
}

export const register=async (name,email,password)=>{
    const response=await fetch("http://localhost:8081/api/auth/register",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({name,email,password})
    });
    if(!response.ok){
        const errorData=await response.json().catch(()=>({}));
        throw new Error(errorData.error||"Registration Failed");
    }

    return await response.json();
}

