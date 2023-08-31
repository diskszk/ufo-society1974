import { useSignIn } from "../hooks/useSignIn";

export const MockSignIn: React.FC = () => {
  const pw = process.env.VITE_MOCK_SIN_IN_PW;
  const { handleSignIn } = useSignIn();

  const handleClick = async (email: string) => {
    await handleSignIn(email, pw);
  };

  return (
    <div>
      <ul>
        <li>
          editor
          <button onClick={() => handleClick("editor@example.com")}>
            signIn
          </button>
        </li>
        <li>
          master
          <button onClick={() => handleClick("master@example.com")}>
            signIn
          </button>
        </li>
        <li>
          watcher
          <button onClick={() => handleClick("watcher@example.com")}>
            signIn
          </button>
        </li>
      </ul>
    </div>
  );
};
