import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import RelayUsers from "./components/RelayUsers";
import UserCard from "./components/UserCard";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div
        style={{
          background: "rgb(255, 255, 255, 0.3)",
          padding: "20px",
          width: "90vw",
          height: "auto",
          margin: "auto",
          marginTop: "30px",
          borderRadius: "10px",
        }}
      >
        <UserCard />
        <RelayUsers />
      </div>
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  );
}

export default App;
