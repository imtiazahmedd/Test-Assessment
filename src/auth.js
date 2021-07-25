export default function Auth(){
    const id = localStorage.getItem("userId");
    if (id && id !== null) {
        return true
    }
    else {
        return false
    }
}