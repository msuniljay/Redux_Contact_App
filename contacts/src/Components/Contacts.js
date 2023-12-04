import React, { useEffect } from 'react'
import { useState } from 'react';
import {connect} from 'react-redux';
import Addcontact from './Addcontact';
import { deleteContact, filterContact } from '../Redux/Actions/contact-action';
import { getSingleContact,deleteSingleContact } from '../Redux/Actions/contact-action';
import './Contacts.css'
const Contacts = ({contactsdata,deleteSingleContact,filter_Contact,
     searchcontact,getSingleContact,singlecontact,deleteContact}) => {
    
    const [show,setshow]=useState(false);
    const [searchdata,setsearchdata]=useState('');
    const [result,setresult] = useState([]);
   
    
    const handleDelete=(id)=>{
        let confirm =  window.confirm("Are you sure want to delete?");
        if(confirm)
        deleteContact(id);
    }
    const handleclick=(value)=>{
        setshow(value);
    }
    const enableshow=(index)=>{
        getSingleContact(index);
        setshow(true);
    }
    const Addcontacts=()=>{
        if(Object.keys(singlecontact).length !==0){
            deleteSingleContact()
            setshow(!show);
        }else{
            setshow(!show);
        }
    }
    const handleSearch=()=>{
        // if(searchdata !==''){
        // filter_Contact(searchdata);
        // }
        // else{
        //     console.log("contactdata:",contactsdata);
        //     setresult(contactsdata);
        //  }
    }
    useEffect(()=>{
        console.log("Search",searchcontact);
         
        if(Object.keys(searchcontact).length !==0){
            setresult(searchcontact)
        }
        // if(searchdata  && searchcontact.length == 0){
        //    window.alert('No Contacts Found!')
        //    setsearchdata('');
        //    setresult(searchcontact)
        // }
    },[searchcontact]);
    useEffect(()=>{
        if(Object.keys(contactsdata.length!==0))
         setresult(contactsdata);
    },[contactsdata])
    useEffect(()=>{
        if(searchdata === ''){
            setresult(contactsdata)
        }else{
            filter_Contact(searchdata);
        }
    },[searchdata])
    
    
  return (
    <>
     <div className='table-title'>
        All Contacts
        <section>
           <input type='text' name='search' value={searchdata} placeholder='search' 
           onChange={(e)=>{setsearchdata(e.target.value)}}/>
           {/* <button className='Button' onClick={handleSearch}>Search</button> */}
        </section>
        <button className='Button' onClick={Addcontacts}> Add Contact +</button>
     </div>
        <section >{(searchdata && searchcontact.length === 0) && <p>No Contacts Founds!</p>}</section>
        <section className='table-section'>
        
            <table>
                <thead>
                    <tr>
                        <th>S.No:</th>
                        <th>Name:</th>
                        <th>Phone Number:</th>
                        <th>Email:</th>
                         <th>Actions:</th>
                    </tr>
                </thead>
                <tbody>
                    {result.map((obj,index)=>{
                        
                        return(
                            <tr key={index}>
                                 <th>{index+1}</th>
                                 <td>{obj.Name}</td>
                                 <td>{obj.Mobile}</td>
                                 <td>{obj.Email}</td>
                                 <td>
                                    <button onClick={()=>{
                                       
                                        enableshow(index);
                                    }}>Edit</button> &nbsp;
                                    <button onClick={()=>handleDelete(index)}>Del</button>
                                 </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </section>
        <div>
            {show && <Addcontact handleclick={handleclick}  singlecontact={singlecontact}/>}
            
        </div>
       
    </>
  )
}
const mapStateToProps=(state)=>{
    return{
       contactsdata:state.contacts,
       singlecontact:state.contact,
       searchcontact:state.searchcontact
    }
}
const mapDispatchToProps=(dispatch)=>{
    return{
      
        getSingleContact:(index)=>dispatch(getSingleContact(index)),
        
        deleteContact:(index)=>dispatch(deleteContact(index)),
        deleteSingleContact:()=>dispatch(deleteSingleContact()),
        filter_Contact:(contact)=>dispatch(filterContact(contact)),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Contacts)