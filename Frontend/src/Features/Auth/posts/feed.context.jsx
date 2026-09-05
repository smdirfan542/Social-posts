import { createContext, useState } from "react";

export const FeedContext = createContext();

export function FeedContextProvider({children}){

  
    const [loading,setLoading]=useState(false);
    const [feed,setFeed]=useState(null)
    const [post,setPost]=useState(null)

    return (
        <FeedContext.Provider value={{loading,setLoading,feed,setFeed,post,setPost}}>
            {children}
        </FeedContext.Provider>
    )
}