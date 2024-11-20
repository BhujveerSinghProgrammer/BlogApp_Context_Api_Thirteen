import { Card, CardBody, Input, Form, Label, Container, Button } from "reactstrap";
import { loadAllCategories } from "../services/category-service";
import { useEffect, useState, useRef } from "react";
import JoditEditor from "jodit-react";
import {CurrentUser} from '../auth';
import { createPost as doCreatePost } from "../services/post-service";
import { toast } from "react-toastify";

const AddPost = () => {
  const editor = useRef(null);
 
  const [post, setPost] = useState({
    title: "",
    content: "",
    categoryid: ""
  });

const [categories, setCategories] = useState([]);

const[user,setUser]=  useState(undefined);


  useEffect(() => {
    setUser(CurrentUser());
    loadAllCategories()
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const fieldChanged = (event) => {
    setPost({
      ...post,
      [event.target.name]: event.target.value,
    });
  };

  //resetting the form
const resetData=()=>{
setPost({   
    title: "",
    content: "",
    categoryid: ""})
}

  const contentFieldChanged = (newContent) => {
    setPost({ ...post, content: newContent });
  };


//Create Post function
const createPost=(event)=>{
event.preventDefault();
console.log(post);
if(post.title.trim()==='')
{
  alert('title is required!!');
  return;
}
if(post.content.trim()==='')
{
  alert('content is required!!');
  return;
}
if(post.categoryid==='')
{
  alert('select  some category!!');
  return;
}
//submit the form on server
post['userId']=user.Id;  //adding a field to the post object
doCreatePost(post).then(data=>{
toast.success(data.mgs);
setPost({
    title: "",
    content: "",
    categoryid: ""
})
}).catch((error)=>{
  toast.error(error);

})
}

// // ////
  return (
    <div className="wrapper my-3">
      <Card className="shadow mt-3">
        <CardBody>
          <h3>What's going on in your mind?</h3>
          <Form onSubmit={createPost} >
            <div className="my-3">
              <Label for="title">Post Title</Label>
              <Input
                type="text"
                id="title"
                placeholder="Enter Here"
                className="rounded-0"
                name="title"
                onChange={fieldChanged}
                value={post.title}
              />
            </div>

            <div className="my-3">
              <Label for="content">Post Content</Label>
              <JoditEditor
                ref={editor}
                value={post.content}
                tabIndex={1}
                onChange={contentFieldChanged} // Use onBlur for better compatibility
                
              />
            </div>

            <div className="my-3">
              <Label for="category">Post Category</Label>
              <Input
                type="select"
                id="category"
                className="rounded-0"
                name="categoryid"
                onChange={fieldChanged}
                 value={post.categoryid}
                >
                <option value="">Select a category</option> {/* Placeholder option */}
                {categories.map((category) => (
                  <option value={category.Id} key={category.Id}>
                    {category.CategoryName}
                  </option>
                ))}
              </Input>
            </div>

            <Container className="text-center">
              <Button onClick={createPost}  className="rounded-0" color="primary">
                Create Post
              </Button>
              <Button onClick={resetData}  className="rounded-0 ms-2" color="danger">
                Reset
              </Button>
            </Container>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
};

export default AddPost;
