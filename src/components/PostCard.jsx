export default function PostCard({ post, isMyPost, onEditing, onDelete }) {
  const date = new Date(post.createdAt);
  const formatedDate = date.toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <li className="bg-slate-900 p-4 rounded-lg shadow-lg w-5/6 sm:w-4/6 md:w-1/2 lg:w-1/3 mx-auto">
      <div className="flex flex-col">
        <div className="flex w-full justify-between items-center">
          <h1 className="font-bold text-xl mb-2">{post.creator.username}</h1>
          <h2 className="font-semibold text-sm text-slate-500">
            {formatedDate}
          </h2>
        </div>
        <h3 className="font-bold">{post.title}</h3>
        <p className="font-thin">{post.content}</p>
        <div className="flex justify-between mt-2 text-[.75rem]">
          <p>LIKE, COMENT</p>
          {isMyPost && (
            <div className="flex gap-4">
              <button onClick={() => onEditing(post._id.toString())}>
                Edit
              </button>
              <button onClick={() => onDelete(post._id.toString())}>
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </li>
  );
}
