import React from 'react'
import {  connect } from 'react-redux'
import {useEffect, useState} from 'react';
import './Addcontact.css'
import {addContact} from '../Redux/Actions/contact-action';
import { editContact } from '../Redux/Actions/contact-action';

const Addcontact = ({Addtocontact,handleclick,singlecontact,
   Editcontact}) => {

    const [searchdata,setsearchdata]=useState('');
    const [values,setvalues]=useState({
           Name:'',
           Mobile:'',
           Email:'',
    })
    
    useEffect(()=>{
         setvalues(singlecontact)
         console.log('useEffect--Singlecontact:',singlecontact);
    },[singlecontact])

     
    const handleChange=(event)=>{
      const oldvalues = {...values}
      oldvalues[event.target.name] =event.target.value;
      console.log('oldvalues:',oldvalues);
      setvalues(oldvalues);
    //  setvalues({...values,[event.target.name]:event.target.value})
    //  console.log("New values:",values);
    }
    const validate=(obj)=>{
        for(let key in obj){
          if(values[key] === ''){
            return false;
          }
        }
       return true;      
     }
    const handleSubmit=()=>{
      console.log("Submit:singlecontact:",singlecontact);
      if(singlecontact.id !== null && singlecontact.id !== undefined){
        Editcontact(values,values.id);
        let oldContact = {...values};
        oldContact.id = null;
        console.log("OldContact:",oldContact);
        setvalues(oldContact);
      }else{
        const data =  validate(values)
        if(data){
          Addtocontact(values)
         }
      }
       
      
      setvalues({
        Name:'',
        Mobile:'',
        Email:''
      })
      handleclick(false);
    }

    
  
    
  return (
    <>
    <div className='form-data'>
         <p>Add/Edit contact</p>
        
      
    <div className='form-section'>
        <form>
            <div className='form-input'> 
            <label>Name</label>
           <input  
             name='Name'
             type='text'
             value={values.Name}
             placeholder='Enter text'
             onChange={handleChange}
           />
            <label>Mobile</label>
           <input 
             name='Mobile'
             type='number'
             value={values.Mobile}
             placeholder='Enter Number'
             onChange={handleChange}
           />
           <label>Email</label>
           <input 
             name='Email'
             type='text'
             value={values.Email}
             placeholder='Enter email'
             onChange={handleChange}
           />
           </div>
        </form>
    </div>
       <div className='form-Buttons'>
         <button className='Button' 
          onClick={()=>handleclick(false)}>Cancel</button>
         <button className='Button' 
         onClick={handleSubmit}>Submit</button>
       </div>
      </div>
    </>
    
  )
}

const mapStateToProps=(state)=>{
  return{
    contacts:state.contacts,
  }
}
const mapDispatchToProps=(dispatch)=>{
  return{
    
    Addtocontact:(values)=>dispatch(addContact(values)),
    Editcontact:(contact,id)=>dispatch(editContact(contact,id)),
    
  } 
}

export default connect(mapStateToProps,mapDispatchToProps)(Addcontact)