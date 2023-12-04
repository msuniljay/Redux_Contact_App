const initialContacts = {
  contacts: [
    { Name: "Sunilkumar", Mobile: "1235555", Email: "abc@gmail.com" },
    { Name: "RavindraRam", Mobile: "3432422", Email: "rrr@gmail.com" },
    { Name: "Pavan", Mobile: "552422", Email: "prv@gmail.com" },
    { Name: "John", Mobile: "444422", Email: "johnr@gmail.com" },
  ],
  contact: {},
  searchcontact:{}
};
export const contactsReducer = (state = initialContacts, action) => {
  console.log("Action:", action.type);
  console.log("Reducer....");
  switch (action.type) {

    case "Get_All_Contacts":
      return { ...state };

    case "Search_Contact": {
      console.log("Search_Contact...!");
      let data = state.contacts.filter((obj)=>{
        return  obj.Name.toLowerCase().indexOf(action.contact.toLowerCase()) !== -1;
      })
      console.log("Data:",data);
      return {...state,searchcontact:data}
    }

    case "Add_Contact": {
      console.log("Adding....");
      let contacts = [...state.contacts];
      contacts.push(action.payload);
      return { ...state, contacts };
    }

    case "Delete_Contact": {
      console.log("Deleting...");
      let contacts = [...state.contacts];
      contacts.splice(action.id, 1);
      return { ...state, contacts };
    }

    case "Delete_singlecontact": {
      console.log("Reducer_contact:");
      let contact = {};
      return { ...state, contact };
    }

    case "Get_Single_Contact": {
      return {
        ...state,
        contact: { ...state.contacts[action.index], id: action.index },
      };
    }

    case "Edit_Contact": {
      console.log("Editing...");
      let contacts = [...state.contacts];
      console.log("Reducer:contacts", contacts, "payload:", action.payload);
      contacts[action.id] = action.payload;
      return { ...state, contacts };
    }

    default:
      return state;
  }
};
