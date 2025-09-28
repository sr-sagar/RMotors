

export const devLogger = (...args: any[]) => {
    if(process.env.NODE_ENV === "development")
    {
        console.log("[DEV LOG]:", args);
    }
}
