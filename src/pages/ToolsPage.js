import { useNavigate } from "react-router-dom";

function ToolsPage() {
  const navigate = useNavigate();

  const btnStyle = "p-3 w-36 mt-5 text-white text-1xl rounded";

  return 1 ? (
    <div className="container mx-auto flex flex-col items-center">
      <h1 className="text-white text-2xl my-5 font-bold">Tools</h1>
    </div>
  ) : (
    <div className="container mx-auto flex flex-col items-center">
      <h1 className="text-white text-2xl my-5 font-bold">
        You need to sign in!
      </h1>
      <button
        className={btnStyle + " bg-green-500"}
        onClick={() => {
          navigate("../login");
        }}
      >
        Log in here
      </button>
    </div>
  );
}

export default ToolsPage;
