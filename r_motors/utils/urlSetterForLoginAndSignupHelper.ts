
export const getBackendUrl = () => {
    if(process.env.NODE_ENV === "development")
    {
        return "http://localhost:3000";
    }
    
    return "https://rmotors-theta.vercel.app";
}