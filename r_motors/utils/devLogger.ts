

export const devLogger = (...args: unknown[]) => {
    if(process.env.NODE_ENV === "development")
    {
        console.log("[DEV LOG]:", args);
    }
}
