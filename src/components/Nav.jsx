export default function Nav({ isLoggedIn, onAddPost, onSignin, onLogout }) {
  return (
    <nav className="bg-slate-700 px-4 py-6 rounded mb-24">
      <ul className="flex justify-between">
        <li>
          <button href="#">Menu 1</button>
        </li>
        <li className="flex gap-8">
          <button onClick={onAddPost}>Create Post</button>
          <button onClick={onAddPost}>My Posts</button>
        </li>
        <li className="flex gap-4">
          {!isLoggedIn && <button onClick={onSignin}>Sign In</button>}
          {isLoggedIn && <button onClick={onLogout}>Logout</button>}
        </li>
      </ul>
    </nav>
  );
}
