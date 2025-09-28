import Swal from "sweetalert2";


export const confirmAction = async(title: string,text: string,confirmText: string = "Confirm",cancleText: string = "Cancle") => {
    const result = await Swal.fire({
        title,
        text,
        icon: "warning",
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonColor: "blue",
        cancelButtonColor: "red",
        confirmButtonText: confirmText,
        cancelButtonText: cancleText,
        
    });

    return result.isConfirmed;

}


export const serverAlert = async(title: string, text: string, showCancleBtn: boolean) => {
    const result = await Swal.fire({
        title,
        text,
        icon: "info",
        showCloseButton: showCancleBtn
    })
    return result;
}