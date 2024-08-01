import { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";

import { uiActions } from "../store/ui-slice";
import { getUserPosts, deletePost } from "../store/post-slice";
import PostCard from "./PostCard";

//context
import { PostContext } from "../store/Post-Context";
import { MenuContext } from "../store/Menu-Context";

import Loading from "./Loading";
import Error from "./Error";

export default function MyPost() {
  const dispatch = useDispatch();
  const { hasError, isLoading } = useSelector((state) => state.ui);

  const [data, setData] = useState({
    posts: [],
    totalPosts: 0,
  });

  async function handleDeletePost(postId) {
    setData((prevData) => ({
      posts: prevData.posts.filter((post) => post._id !== postId),
      totalPosts: prevData.totalPosts - 1,
    }));
    const result = dispatch(deletePost(postId));
    if (!result) {
      setData((prevData) => ({ ...prevData }));
      return;
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const resData = await dispatch(getUserPosts());
      if (resData) {
        setData((prevState) => ({
          ...prevState,
          posts: resData.posts,
          totalPosts: resData.totalPosts,
        }));
      }
    };
    fetchData();
  }, [dispatch]);
  return (
    <section>
      {hasError && <Error />}
      {isLoading && <Loading />}
      {!hasError && !isLoading && data.posts?.length > 0 && (
        <ol className="flex flex-col gap-4">
          {data.posts?.map((post) => {
            return (
              <PostCard
                key={post._id.toString()}
                post={post}
                isMyPost={true}
                onDelete={handleDeletePost}
              />
            );
          })}
        </ol>
      )}
      {!hasError && !isLoading && data.posts?.length === 0 && (
        <p className="text-center">You dont have any post yet.</p>
      )}
    </section>
  );
}
