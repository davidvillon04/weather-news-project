import React from "react";
import { Box, Card, CardMedia, CardContent, Typography, CardActions, Button } from "@mui/material";

export default function NewsList({ articles }) {
   if (!articles.length) return null;

   return (
      <Box
         sx={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            overflowX: "auto",
            gap: 4,
            px: 2,
         }}
      >
         {articles.map((article, idx) => {
            // Get the last image from the media array
            const media = article.media?.[0]?.["media-metadata"] || [];
            const imgUrl = media.length
               ? media[media.length - 1].url
               : "https://via.placeholder.com/240";

            return (
               <Card
                  key={idx}
                  sx={{
                     minWidth: 240,
                     maxWidth: 240,
                     flexShrink: 0,
                     display: "flex",
                     flexDirection: "column",
                  }}
               >
                  <CardMedia
                     component="div"
                     sx={{
                        // 1:1 aspect ratio
                        pt: "100%",
                        // background image
                        backgroundImage: `url(${imgUrl})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                     }}
                  />
                  <CardContent
                     sx={{
                        display: "flex",
                        flexDirection: "column",
                        flexGrow: 1,
                        overflow: "hidden",
                     }}
                  >
                     <Typography variant="h6" noWrap title={article.title} gutterBottom>
                        {article.title}
                     </Typography>

                     {/* 3-line Abstract */}
                     <Typography
                        variant="body2"
                        color="text.primary"
                        sx={{
                           display: "-webkit-box",
                           WebkitLineClamp: 3, // limit to 3 lines
                           WebkitBoxOrient: "vertical",
                           overflow: "hidden",
                           mb: 1, // small gap after the abstract
                        }}
                        title={article.abstract} // show full text on hover
                     >
                        {article.abstract}
                     </Typography>

                     {/* New story byline */}
                     <Typography
                        variant="subtitle2"
                        color="text.secondary"
                        noWrap
                        title={article.byline}
                        sx={{ mt: "auto" }}
                     >
                        {article.byline}
                     </Typography>
                  </CardContent>

                  <CardActions>
                     <Button size="small" href={article.url} target="_blank" rel="noopener">
                        Read More
                     </Button>
                  </CardActions>
               </Card>
            );
         })}
      </Box>
   );
}
