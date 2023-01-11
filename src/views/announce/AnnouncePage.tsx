import { Container, Paper, Typography } from "@mui/material";
import { GrAnnounce } from "react-icons/gr";
import Update from "../../components/announce/Update";
import Data from "../../components/announce/Data.json";

export default function AnnouncePage() {
  const items = Data;
  {/*Announce Page */}
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
          {/*Announce Component*/}
          {items.map((item) => {
            return <Update announce={item} key={item.key} />;
          })}
        </Paper>
      </Container>
    </>
  );
}
