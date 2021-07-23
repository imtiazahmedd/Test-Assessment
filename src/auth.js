export default function Auth(){
    const id = localStorage.getItem("userId");
    console.log(id,"iii")
    if (id && id !== null) {
        return true
    }
    else {
        return false
    }
}