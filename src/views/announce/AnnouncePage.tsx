import { Container, Paper, Typography } from "@mui/material";
import { GrAnnounce } from "react-icons/gr";
import Update from "./Update";
import Data from "./Data.json";
import { useState } from "react";

export default function AnnouncePage() {
  //const [items, setItems] = useState(Data);
  const items = Data;

  return (
    <>
      <Container className="py-7">
        <Typography className="mb-5 flex items-center text-2xl sm:text-3xl font-light">
          <GrAnnounce className="mr-2 inline" />
          Announcement
        </Typography>

        <Paper
          className="p-5 mb-5 grid gap-0"
          variant="outlined"
          sx={{ gridTemplateColumns: "repeat( auto-fit )" }}
        >
          {Data.map((item) => {
            return <Update announce={item} key={item.key} />;
          })}
        </Paper>
      </Container>
    </>
  );
}
