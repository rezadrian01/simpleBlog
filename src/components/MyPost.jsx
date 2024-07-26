import { useEffect, useState, useContext } from "react";
import { deletePost } from "../http";
import PostCard from "./PostCard";

//context
import { PostContext } from "../store/Post-Context";
import { MenuContext } from "../store/Menu-Context";

import Loading from "./Loading";
import Error from "./Error";

export default function MyPost() {
  const { fetchingUserPosts, postContextState } = useContext(PostContext);
  const { handleEditPostMenu } = useContext(MenuContext);
  const [error, setError] = useState(false);
  async function handleDeletePost(postId) {
    try {
      const resData = await deletePost(postId);
      console.log(resData);
    } catch (err) {
      setData((prevData) => {
        return {
          ...prevData,
          userPosts: [...prevData.userPosts],
          error: err.message || "Failed to delete post.",
        };
      });
      console.log(err);
    }
    setData((prevData) => {
      return {
        ...prevData,
        userPosts: [
          ...prevData.userPosts.filter((post) => post._id !== postId),
        ],
      };
    });
  }
  useEffect(() => {
    async function fetchUserPost() {
      const result = await fetchingUserPosts();
      if (!postContextState.isLoading && postContextState.hasError) {
        setError(true);
      } else {
        setError(false);
      }
      return;
    }
    fetchUserPost();
  }, [fetchingUserPosts]);
  return (
    <section>
      {postContextState.hasError && <Error />}
      {postContextState.isLoading && <Loading />}
      {!postContextState.hasError &&
        !postContextState.isLoading &&
        postContextState.posts?.length > 0 && (
          <ol className="flex flex-col gap-4">
            {postContextState.posts?.map((post) => {
              return (
                <PostCard
                  key={post._id.toString()}
                  post={post}
                  isMyPost={true}
                  handleEditPostMenu={handleEditPostMenu}
                  onDelete={handleDeletePost}
                />
              );
            })}
          </ol>
        )}
      {!postContextState.hasError &&
        !postContextState.isLoading &&
        postContextState.posts?.length === 0 && (
          <p className="text-center">You dont have any post yet.</p>
        )}
    </section>
  );
}
