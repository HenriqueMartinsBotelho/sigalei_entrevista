import React, { useEffect, useState } from "react";
import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { request, gql } from "graphql-request";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Typography from "@mui/material/Typography";
import buscaUser from "./buscaUser";

const endpoint = "http://localhost:4000/";

const queryClient = new QueryClient();

interface IUser {
  id?: String | any;
  name?: String;
  email?: String;
  phone?: String;
  password?: String;
  avatar?: String;
}

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

function useUsers() {
  return useQuery(["users"], async () => {
    const { users: data } = await request(
      endpoint,
      gql`
        query {
          users {
            id
            name
            email
            phone
            avatar
          }
        }
      `
    );
    return data;
  });
}

function UserCard() {
  const { status, data, error, isFetching }: any = useUsers();
  return (
    <div>
      {status === "loading" ? (
        "Loading..."
      ) : status === "error" ? (
        <span>Error: {error.message}</span>
      ) : (
        <>
          <div
            style={{
              display: "flex",
              gap: "40px",
              flexWrap: "wrap",
            }}
          >
            {data.map((user: IUser) => (
              <div key={user.id}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardHeader
                    avatar={
                      <Avatar aria-label="recipe" src={user.avatar}></Avatar>
                    }
                    action={
                      <IconButton aria-label="settings">
                        <MoreVertIcon />
                      </IconButton>
                    }
                    title={user.name}
                    subheader="September 14, 2016"
                  />
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      Email: {user.email} <br />
                      Phone: {user.phone}
                    </Typography>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
          <div>{isFetching ? "Background Updating..." : " "}</div>
        </>
      )}
    </div>
  );
}

function RelayUsers() {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    let isMounted = true;
    buscaUser(`
      query {
        users {
          id
          name
          email
          phone
          avatar
      }
    }
    `)
      .then((response) => {
        if (!isMounted) {
          return;
        }
        const data = response.data;
        setUserList(data.users);
      })
      .catch((error) => {
        console.error(error);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="App">
      <div
        style={{
          display: "flex",
          gap: "40px",
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              margin: "40px",
              display: "flex",
              justifyContent: "center",
              fontSize: "20px",
            }}
          >
            Com Relay
          </div>
          <div style={{ display: "flex", gap: "40px" }}>
            {userList.map((user: IUser) => (
              <div key={user.id}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardHeader
                    avatar={
                      <Avatar aria-label="recipe" src={user.avatar}></Avatar>
                    }
                    action={
                      <IconButton aria-label="settings">
                        <MoreVertIcon />
                      </IconButton>
                    }
                    title={user.name}
                    subheader="September 14, 2016"
                  />
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      Email: {user.email} <br />
                      Phone: {user.phone}
                    </Typography>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
