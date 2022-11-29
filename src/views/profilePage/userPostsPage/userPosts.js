import Navbar from "../../../components/navbar/navbar";
import { Link } from 'react-router-dom';
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useEffect, useState } from "react";
import axios from "../../../components/axios/axios";
import Post from "../../../components/post/post";
import { useUserPostsContext } from "../../../hooks/useUserPostsContext";
import NormalDialog from "../../../components/Dialog/normalDialog";
import { useDialogContext } from "../../../hooks/useDialogContext";
import { FaLongArrowAltRight } from "react-icons/fa";

const entities = require("entities");

const UserPosts = () => {
    // const [postList, setPostList] = useState(null)
    const [ error, setError ] = useState("")
    const [ postId, setPostId ] = useState("")

    const { user } = useAuthContext();
    const { postLists, dispatch } = useUserPostsContext()
    const { userPost, userPostProfile } = useDialogContext()


    useEffect(() => {
        const fetchPosts = async () => {
            try{
                const response = await axios("api/post/getUserPosts", {
                    headers: {
                    Authorization: `Bearer ${user}`,
                    },
                });
                const json = await response.data;
            
                if (response.status === 200) {
                    const objKeyArr = Object.keys(json["postsObj"]).map(
                    (objKey) => json["postsObj"][objKey]
                    );
                    // setPostList(objKeyArr);
                    dispatch({ type: "SET_POSTS", payload: objKeyArr })
                }
            } catch (error) {
                setError(error.response.data.error)
            }
            
        };

        if (user && postLists === null) {
            fetchPosts();
        }

      }, [dispatch, user]);

      const onCustomClick = (_postId) => {
        setPostId(_postId)
      }

      let dayOpt = { weekday: 'long' }
  let yearOpt = { year: 'numeric', month: 'numeric', day: 'numeric' }
  let timeOpt = { hour: 'numeric', minute: 'numeric' }

    return ( 
            <div className="post-col">
                <h1>My Forum Post</h1>
                <div>
                    <div className="post-cont">
                {postLists && postLists.map((post) => <Post onCustomClick={onCustomClick} key={post["postId"]} post={post}/>)}
                {error && <h2>{error}</h2>}

                {userPostProfile ?
                    <NormalDialog 
                    type="USER_POST_PROFILE"
                    dialogTitle={(
                        <div className='wrap-outer-column'>
                        <div className= 'top-cont-view'>
                            <p>Post Details</p>
                            <p>{new Date(postLists.filter((post) => post["postid"] === postId)[0]["postdatetime"]).toLocaleDateString("en-MY", timeOpt).toString().substring(12)}  
                                {new Date(postLists.filter((post) => post["postid"] === postId)[0]["postdatetime"]).toLocaleDateString("en-MY", yearOpt).toString()}</p>
                        </div>
                            <h1>{postLists.filter((post) => post["postid"] === postId)[0]["post"]}</h1>
                            <p>Replies</p>
                        </div>
                    )} 
                    dialogMessage={
                        postLists && postId && postLists.filter((post) => post["postid"] === postId)[0]["replies"].map(
                            (reply) => 
                            <div className='wrap-outer-column reply-color'>
                                <div className='wrap-outer-in'>
                                
                                <p><FaLongArrowAltRight className='fa-arrow' /> {reply.email} </p>
                                <p> {new Date(reply.subpostdatetime).toLocaleDateString("en-MY", timeOpt).toString().substring(12)} 
                                {new Date(reply.subpostdatetime).toLocaleDateString("en-MY", yearOpt).toString()}</p>
                               </div>
                                <p>{ entities.decodeHTML(reply.subpost)}</p>
                            </div>
                        )
                    }
                    /> : null
                }

                { userPost ?
                  <NormalDialog 
                  type="USER_POST"
                  dialogTitle="Delete Post" 
                  dialogMessage="Delete Successful"
                  /> : null
                }
                </div>
                </div>
            </div>
     );
}
 
export default UserPosts;