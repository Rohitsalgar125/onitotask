import { useDispatch, useSelector } from "react-redux";
import { RootState } from './redux/store'
import { addSubmitUser } from "./redux/userSlice";



function App() {
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.user.userList);
  console.log(users, 'user')
  return (
    <>

      <h1>Vite + React</h1>
      <button onClick={() => {
        dispatch(addSubmitUser({
          name: 'rohit',
          address: 'mallewadi',
          mobile: 0,
          dob: "11",
          sex: "male",
          govId: "11",
          idType: "554",
          pincode: 0,
          country: "55",
          city: "dkd"
        }))
      }}>Add user</button>
    </>

  )
}

export default App
