import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Skeleton from "@mui/material/Skeleton";
import "./PostsLoader.scss";
function Media() {
  return (
    <Card className="!min-w-full !p-4" sx={{ maxWidth: 345, mt: 2 }}>
      <CardHeader
        avatar={
          <Skeleton
            sx={{ bgcolor: "var(--hover-overlay)" }}
            animation="wave"
            variant="circular"
            width={40}
            height={40}
          />
        }
        action={null}
        title={
          <Skeleton
            sx={{ bgcolor: "var(--hover-overlay)" }}
            animation="wave"
            height={10}
            width="80%"
            style={{ marginBottom: 6 }}
          />
        }
        subheader={
          <Skeleton
            sx={{ bgcolor: "var(--hover-overlay)" }}
            animation="wave"
            height={10}
            width="40%"
          />
        }
      />
      <CardContent>
        <Skeleton
          sx={{ bgcolor: "var(--hover-overlay)" }}
          animation="wave"
          height={10}
          style={{ marginBottom: 6 }}
        />
        <Skeleton
          sx={{ bgcolor: "var(--hover-overlay)" }}
          animation="wave"
          height={10}
          width="80%"
        />
      </CardContent>
      <Skeleton
        sx={{ height: 190, bgcolor: "var(--hover-overlay)" }}
        animation="wave"
        variant="rectangular"
      />
    </Card>
  );
}

export default Media;
