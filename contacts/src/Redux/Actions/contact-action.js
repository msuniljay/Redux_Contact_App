export const addContact=(contact)=>{
    return  {type:'Add_Contact',payload:contact}
}
export const deleteContact=(id)=>{
    return {type:"Delete_Contact",id}
}
export const getSingleContact=(index)=>{
    return {type:"Get_Single_Contact",index};
}
export const deleteSingleContact=()=>{
    return {type:'Delete_singlecontact'}
}
export const editContact=(contact,index)=>{
    return {type:'Edit_Contact',payload:contact,id:index}
}
export const filterContact=(contact)=>{
    console.log("filter_action");
    return {type:'Search_Contact',contact}
}
export const get_All_Contacts=()=>{
    return {type:'Get_All_Contacts'}
}