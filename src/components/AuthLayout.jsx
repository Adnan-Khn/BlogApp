/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// this file is for those page which are protected i.e. that's need authentication and that is why we are using children those

import { useEffect,useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

//pages will go as a prop
function Protected({children,authentication = true}) {
  const authStatus = useSelector((state)=>state.auth.status)
  const navigate =  useNavigate()
  const [loader,setLoader] = useState(true)
  useEffect(() => {
    if (authentication && authStatus !== authentication) {
      //means user is not authenticated thats is why we have to navigate user to login page
      navigate("/login")
    } else if (!authentication && authStatus !== authentication ){
      //it means user is authenticated and user is not required to go to login page and user can visit home page 
      navigate("/")
    }
    setLoader(false)
  }, [authStatus, authentication, navigate])
  return loader ? 
  <>
   </>
  : 
  <>{children}</>
}
export default Protected