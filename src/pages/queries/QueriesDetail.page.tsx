import { useParams } from "react-router-dom";

import {
  useGetQueryRecordsByIdQuery,
  useUpdateQueryRecordMutation,
} from "../../services/master.service";
import {
  Button,
  CircularProgress,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";

const QueriesDetail = () => {
  let { id } = useParams();

  const {
    data: queryRecordData,
    isSuccess,
    isFetching,
    refetch,
  } = useGetQueryRecordsByIdQuery(id);

  const [statusUpdateMutation] = useUpdateQueryRecordMutation();

  let resultData;

  if (isFetching) {
    return (
      <div style={{ textAlign: "center" }}>
        <CircularProgress size={100} />
      </div>
    );
  }
  if (isSuccess) {
    resultData = queryRecordData.data || [];
  }

  const handleToggleClosed = async (id: number) => {
    await statusUpdateMutation(id);
    refetch();
  };

  return (
    <div>
      <h2>Query Details..</h2>

      {isSuccess && (
        <Paper elevation={3} style={{ padding: 20, margin: 20 }}>
          <Grid container spacing={2}>
            <Grid item xs={9}>
              <Typography variant="body1">Type: {resultData!.type}</Typography>
            </Grid>
            <Grid item xs={3}>
              {resultData && !resultData.closed && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleToggleClosed(resultData!._id)}
                >
                  Close Query
                </Button>
              )}
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">
                Query: {resultData!.query}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">
                Closed: {resultData!.closed.toString()}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">ID: {resultData!._id}</Typography>
            </Grid>

            {resultData!.user && (
              <Grid item xs={12}>
                <Paper elevation={2} style={{ padding: 10 }}>
                  <Typography variant="h6">User Details</Typography>
                  <List>
                    <ListItem>
                      <ListItemText
                        primary={`Name: ${resultData!.user.username}`}
                      />
                    </ListItem>
                  </List>
                </Paper>
              </Grid>
            )}

            {resultData!.callRecord && (
              <Grid item xs={12}>
                <Paper elevation={2} style={{ padding: 10 }}>
                  <Typography variant="h6">Call Details</Typography>
                  <List>
                    <ListItem>
                      <ListItemText
                        primary={`Astrologer Id: ${
                          resultData!.callRecord.astrologer
                        }`}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary={`Date: ${resultData!.callRecord.createdAt}`}
                      />
                    </ListItem>
                  </List>
                </Paper>
              </Grid>
            )}
          </Grid>
        </Paper>
      )}
    </div>
  );
  id;
};

export default QueriesDetail;
