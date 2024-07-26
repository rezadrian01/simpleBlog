export default function Error({
  title = "An error occured",
  content = "Something went wrong please comeback again later.",
}) {
  return (
    <div className="text-center">
      <h3 className="text-xl">{title}</h3>
      <p>{content}</p>
    </div>
  );
}
