import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Typography from "@mui/material/Typography";

interface IUser {
  id?: String | any;
  name?: String;
  email?: String;
  phone?: String;
  password?: String;
  avatar?: String;
}

async function fetchGraphQL(text: any, variables?: any) {
  const response = await fetch("http://localhost:4000/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: text,
      variables,
    }),
  });

  return await response.json();
}

const RelayUsers = () => {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    let isMounted = true;
    fetchGraphQL(`
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
};

export default RelayUsers;
