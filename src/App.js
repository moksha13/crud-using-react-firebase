import SignInWithFB from "./components/SignInWithFB";

function App() {
  // const [marksList, setMarksList] = useState([]);

  // const marksCollectionRef = collection(db, "subjects");

  // const getMarksList = async () => {
  //   try {
  //     const data = await getDocs(marksCollectionRef);
  //     const filteredData = data.docs.map((doc) => ({
  //       ...doc.data(),
  //       id: doc.id,
  //     }));
  //     setMarksList(filteredData);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  // useEffect(()=>{
  //   getMarksList();
  //  },[]);

  return (
    <div>
      <SignInWithFB/>
    </div>
  );
}

export default App;


// const Auth = ()=>{
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")

//   const signIn = async() =>{
//     await createUserWithEmailAndPassword(auth,email, password)
//   }
//   return(
//     <div>
//       <input type='email' placeholder="enter email" onChange={(e)=>setEmail(e.target.value)}/>
//       <input type='password' placeholder="enter password" onChange={(e)=>setPassword(e.target.value)}/>
//       <button onClick={signIn}>Sign In</button>
//     </div>
//   )
// }