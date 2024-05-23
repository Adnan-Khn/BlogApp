import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import appwriteService from "../appwrite/config"
import Container from "../components/container/Container.jsx"
import PostForm from "../components/post-form/PostForm.jsx"

function EditPost() {
  const [post,setPost] = useState(null)
  const navigate = useNavigate()
  const slug = useParams()

  useEffect(()=>{
    appwriteService.getPost(slug).then((post)=>{
      if(post){
        setPost(post)
      }else{
        navigate("/")
      }
    })
  },[slug,navigate])
  return (
    <div className="py-6">
      <Container>
        <PostForm post={post}/>
      </Container>
    </div>
  )
}
export default EditPost