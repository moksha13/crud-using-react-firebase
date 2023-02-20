import React,{useState, useEffect} from "react";
import { TextField, Button } from "@mui/material";
import { db,  auth} from "../config/firebase";
import {addDoc, getDocs, collection, doc, updateDoc, deleteDoc, query} from "firebase/firestore"
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Checkbox from '@mui/material/Checkbox';

function HomeScreen() {
    const [marksList, setMarksList] = useState([]);
    const marksCollectionRef = collection(db, "subjects");
    const [selectedId, setSelectedId] = useState("");
    const [marksArray, setMarksArray] = useState([])


   // New Movie States
   const [name, setName] = useState("");
   const [maths, setMaths] = useState(0);
   const [science, setScience] = useState('');
   const [social, setSocial] = useState('')


    const [show, setShow] = useState(false)

   

  const getMarksList = async () => {
    try {
      const data = await getDocs(marksCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMarksList(filteredData);
    } catch (err) {
      console.error(err);
    }
  };

  const onSubmitMarks = async () => {
    try {
      await addDoc(marksCollectionRef, {
        name: name,
        Maths: maths,
        Science: science,
        social:social,
        userId: auth?.currentUser?.uid,
      });
      getMarksList();
    } catch (err) {
      console.error(err);
    }
  };

  const updateStudent = async (id) => {
        setSelectedId(id)
        // const marksDoc = doc(db, "subjects", id);
        // await updateDoc(marksDoc, { name:name, Maths:maths, Science:science, social:social});
        // getMarksList();
        
  };
  const updatedUserValue = async(id) =>{
    setShow(!show)
    const marksDoc = doc(db, "subjects", id);
    await updateDoc(marksDoc, { name:name, Maths:maths, Science:science, social:social});
    setSelectedId('')
    getMarksList();
  }
  const updateUserCancelled = ()=>{
    setShow(!show)
    console.log(show)
    setSelectedId('')
  }
  const deleteMovie = async (id) => {
    const marksDoc = doc(db, "subjects", id);
    await deleteDoc(marksDoc);
    alert(`Item with ID ${id} deleted`)
    getMarksList();
  };

  const deleteSelectedItems = async(e) =>{
    e.preventDefault();
    const checked = e.target.checked
    marksList.map(item=>{
      marksArray.map(i=>{
        if((item.id).includes(i)){
          console.log(i)
          const marksDoc = doc(db, "subjects", i);
          deleteDoc(marksDoc);
          console.log(`Item with ID ${i} deleted`)
        }
      })
    })
    
    getMarksList();
  }
  const handleClicked = (e)=>{
    // const value = e.target.value;
    const id = e.target.id;
    console.log(id)
    const checked = e.target.checked;
    console.log(id, checked)
    if(checked){
      setMarksArray([
        ...marksArray, id
      ])
    }else{
      setMarksArray([
        marksArray.filter((e)=>(e!==id))
      ])
    }
  }

  useEffect(()=>{
    getMarksList();
   },[]);


  return (
    <div style={{display:'flex', flexDirection:'column',}}>
    <div style={{flex:1, display:'flex', alignItems:'center', justifyContent:'center'}}>
        <TextField id="outlined-basic" label="Name" variant="outlined" color="success" margin="normal" style={{marginLeft:"10px", marginRight:"10px"}} onChange={(e)=>setName(e.target.value)}/>
        <TextField id="outlined-basic" label="Maths" variant="outlined" margin="normal" style={{marginLeft:"10px", marginRight:"10px"}} onChange={(e)=>setMaths(e.target.value)}/>
        <TextField id="outlined-basic" label="Science" variant="outlined" margin="normal" style={{marginLeft:"10px", marginRight:"10px"}} onChange={(e)=>setScience(e.target.value)}/>
        <TextField id="outlined-basic" label="Social" variant="outlined" margin="normal" style={{marginLeft:"10px", marginRight:"10px"}} onChange={(e)=>setSocial(e.target.value)}/>
        {/* <TextField id="outlined-basic" label="total" variant="outlined" margin="normal"style={{marginLeft:"10px", marginRight:"10px"}} onChange={(e)=>setName(e.target.value)}/> */}
        <Button variant="outlined" color="success" size="large" sx={{padding:"12px", marginTop:"5px",paddingLeft:"10px", paddingRight:"10px", width:"150px"}} onClick={onSubmitMarks} >Submit</Button>
    </div>
    <div style={{flex:1, display:'flex', alignItems:'center', justifyContent:'center'}}>
        <div style={{width:'76%', backgroundColor:"#86A3B8", padding:'20px'}}>
        <div style={{display:'flex', flexDirection:'row', width:'100%', alignItems:'center', justifyContent:'center',borderColor:'#579BB1',borderWidth:'solid', borderRadius:'2px'}}>
                {/* <Checkbox  /> */}
                <p style={{width:"20%", paddingLeft:'85px'}}>Name</p>
                <p style={{width:"20%"}}>Maths</p>
                <p style={{width:"20%"}}>science</p>
                <p style={{width:"20%"}}>social</p>
                <p style={{width:'20%'}}>Total</p>
                <p style={{width:"10%"}}>Update</p>
                <p style={{width:"10%"}}>Delete</p>
            </div>
            {marksList.map((marks) => (
            <div>
                <div style={{display:'flex', flexDirection:'row', width:'100%' , alignItems:'center', justifyContent:'center'}} key={marks.id}>
                    {/* <Checkbox name="select" checked={marks?.id || false} onChange={handleChange}/> */}
                    <Checkbox type='checkbox' name="marks" value={marks.id} id={marks.id} onChange={handleClicked}/>
                    <p style={{width:"20%",paddingLeft:'50px'}} htmlFor={marks.id}>{marks.name} </p>
                    <p style={{width:"20%"}}>{marks.Maths}</p>
                    <p style={{width:"20%"}}>{marks.Science} </p>
                    <p style={{width:"20%"}}>{marks.social} </p>
                    <p style={{width:"20%"}}>{`${parseInt(marks.Science) + parseInt(marks.Maths) + parseInt(marks.social)}`}</p>
                    <p style={{width:"10%"}} onClick={()=>updateStudent(marks.id)}><ModeEditOutlinedIcon/></p>
                    <p style={{width:"10%"}} onClick={() => deleteMovie(marks.id)}><DeleteOutlineOutlinedIcon/></p>
                </div>
                {selectedId===marks.id ? <div>
                    <TextField id="outlined-basic" label="Name" variant="outlined" color="success" margin="normal" style={{marginLeft:"10px", marginRight:"10px"}} onChange={(e)=>setName(e.target.value)}/>
                    <TextField id="outlined-basic" label="Maths" variant="outlined" margin="normal" style={{marginLeft:"10px", marginRight:"10px"}} onChange={(e)=>setMaths(e.target.value)}/>
                    <TextField id="outlined-basic" label="Science" variant="outlined" margin="normal" style={{marginLeft:"10px", marginRight:"10px"}} onChange={(e)=>setScience(e.target.value)}/>
                    <TextField id="outlined-basic" label="Social" variant="outlined" margin="normal" style={{marginLeft:"10px", marginRight:"10px"}} onChange={(e)=>setSocial(e.target.value)}/>
                    <Button variant="outlined" color="success" size="large" sx={{padding:"12px", marginTop:"18px",paddingLeft:"10px", paddingRight:"10px", width:"150px", marginRight:"10px"}} onClick={updateUserCancelled}>cancel</Button>
                    <Button variant="outlined" color="success" size="large" sx={{padding:"12px", marginTop:"18px",paddingLeft:"10px", paddingRight:"10px", width:"150px"}} onClick={()=>updatedUserValue(marks.id)}>update</Button>
                    </div>:null}
                </div>
                ))}            
                <Button variant="contained" color="primary" size="large"  sx={{padding:"12px", marginTop:"5px",paddingLeft:"10px", paddingRight:"10px", width:"250px"}} onClick={deleteSelectedItems} >Delete Selected Items</Button>

        </div>
    </div>
    </div>
  )
}

export default HomeScreen