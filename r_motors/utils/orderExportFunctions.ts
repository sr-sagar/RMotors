import { getCookies } from "./getCookies";
import { postRequestWithAuth } from "./postRequestWithAuth";
import { serverAlert } from "./sweetAleart";

export const createOrderFunction = async(productId: string) => {
    const userEmail = await getCookies("userEmail");
    if(userEmail && userEmail !== undefined)
    {
      const res = await postRequestWithAuth("order", {userEmail,productId})
      if(res.success)
      {
        await serverAlert(
          "Success",
          "order placed successfully. It will be added to your order's list shortly.",
          true,
        )
      }
      else{
        await serverAlert(
          "Failed",
          "unable to place order.",
          true,
        )
        
      }
  
    }else{
      await serverAlert(
        "Info!",
        "Please login to place this order.",
        true
      )
    }
    
  } 