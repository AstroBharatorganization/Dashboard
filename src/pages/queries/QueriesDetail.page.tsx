import { useParams } from "react-router-dom";

import {
  useGetQueryRecordsByIdQuery,
  useUpdateQueryRecordMutation,
  useUserQueryreplyMutation,
} from "../../services/master.service";
import {
  Button,
  CircularProgress,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

import { formatTime } from "../../utils/helpers";

const QueriesDetail = () => {
  let { id } = useParams();

  const [replyMessage, setReplyMessage] = useState("");

  const {
    data: queryRecordData,
    isSuccess,
    isFetching,
    refetch,
  } = useGetQueryRecordsByIdQuery(id);

  const [statusUpdateMutation] = useUpdateQueryRecordMutation();

  const [userQueryreplyMutation] = useUserQueryreplyMutation();

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

  const handleReplySubmit = async (id: any, reply: string) => {
    await statusUpdateMutation(id);
    await userQueryreplyMutation({ id, reply });
    setReplyMessage("");
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
            <Grid item xs={12} style={{ width: 500 }}>
              <Typography
                variant="body1"
                style={{ overflowWrap: "break-word", wordWrap: "break-word" }}
              >
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
            <Grid item xs={12} style={{ width: 500 }}>
              <Typography
                variant="body1"
                style={{ overflowWrap: "break-word", wordWrap: "break-word" }}
              >
                Reply: {resultData!.reply}
              </Typography>
            </Grid>

            {resultData!.user && (
              <Grid item xs={12}>
                <Typography variant="body1">
                  User name:{resultData!.user.username}{" "}
                </Typography>
              </Grid>
            )}

            {resultData!.walletRecord && (
              <Grid item xs={12}>
                <Paper elevation={2} style={{ padding: 10 }}>
                  <Typography variant="h6">Recharge Details</Typography>
                  <List>
                    <ListItem>
                      <ListItemText
                        primary={` Recharge Date: ${new Date(
                          resultData!.walletRecord.createdAt
                        ).toLocaleDateString()}`}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary={`Recharge Status: ${
                          resultData!.walletRecord.status
                        }`}
                      />
                    </ListItem>

                    <ListItem>
                      <ListItemText
                        primary={`Recharge Amount: ${
                          resultData!.walletRecord.totalPayment
                        }`}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary={`Description: ${
                          resultData!.walletRecord.description
                        }`}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary={`Coupon Used: ${
                          resultData!.walletRecord.couponUsed ? "YES" : "NO"
                        }`}
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
                        primary={` Call Date: ${new Date(
                          resultData!.callRecord.createdAt
                        ).toLocaleDateString()}`}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary={`Call Status: ${
                          resultData!.callRecord.callStatus.user.status
                        }`}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary={`Call Duration: ${formatTime(
                          resultData!.callRecord.callStatus.user.onCallDuration
                        )}`}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary={`Astrologer Id: ${
                          resultData!.callRecord.astrologer
                        }`}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary={`Astrologer Mobile No: ${
                          resultData!.callRecord.phoneNumbers.astrologer
                        }`}
                      />
                    </ListItem>
                  </List>
                </Paper>
              </Grid>
            )}
          </Grid>

          {resultData?.reply ? (
            <Grid item xs={12}>
              <Paper elevation={2} style={{ padding: 20, marginTop: 20 }}>
                <Typography
                  variant="body1"
                  style={{ overflowWrap: "break-word", wordWrap: "break-word" }}
                >
                  Reply: {resultData!.reply}
                </Typography>
              </Paper>
            </Grid>
          ) : (
            <Grid item xs={12}>
              <Paper elevation={2} style={{ padding: 20, marginTop: 20 }}>
                <TextField
                  label="Your Reply"
                  variant="outlined"
                  fullWidth
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                />
                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginTop: 10 }}
                  onClick={() => handleReplySubmit(id, replyMessage)}
                >
                  Add Reply
                </Button>
              </Paper>
            </Grid>
          )}
        </Paper>
      )}
    </div>
  );
  id;
};

export default QueriesDetail;
