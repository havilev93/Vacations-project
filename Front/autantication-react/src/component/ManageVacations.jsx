import React, { useContext, useState, useEffect } from "react";

// components

//Services
import vacationsSer from "../services/vacations.service.js";

//Context
import { AdminContext } from "./AdminContext";

// bootstrap
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

// Material UI
import { DataGrid } from "@mui/x-data-grid";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// toastofy
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const theme = createTheme();
const ManageVacations = () => {
  const { getAllVacations, vacations, setVacations } = useContext(AdminContext);

  // toast style
  const toastStyle = {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  };
  // Modal - functionaly
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    cleanCommentsAndFields();
  };
  const handleShow = () => setShow(true);

  // Modal - Form validations
  const [destination, setDestination] = useState("");
  // Name alert display style, Name valid correct status
  const [commentValidDestination, setCommentValidDestination] = useState([
    "none",
    false,
  ]);
  //check if destination is empty&show alert
  const isDestination = (destination) => {
    setDestination(destination);
    !destination
      ? setCommentValidDestination(["", false])
      : setCommentValidDestination(["none", true]);
  };

  const [description, setDescription] = useState("");
  const [commentValidDescription, setCommentValidDescription] = useState([
    "none",
    false,
  ]);
  //check if description is empty&show alert
  const isDescription = (description) => {
    setDescription(description);
    !description
      ? setCommentValidDescription(["", false])
      : setCommentValidDescription(["none", true]);
  };

  const [image, setImage] = useState("");
  const [commentValidImage, setCommentValidImage] = useState(["none", false]);
  //check if image is empty&show alert
  const isImage = (image) => {
    setImage(image);
    !image
      ? setCommentValidImage(["", false])
      : setCommentValidImage(["none", true]);
  };

  // cloudinary - new vacation
  const uploadWidget = () => {
    window.cloudinary.openUploadWidget(
      { cloud_name: "himages", upload_preset: "ml_default", tags: ["xmas"] },
      function (error, result) {
        result ? isImage(result[0].url) : isImage("");
      }
    );
  };

  const [startDate, setStartDate] = useState("");
  const [commentValidStartDate, setCommentValidStartDate] = useState([
    "none",
    false,
  ]);
  //check if startDate is empty&show alert
  const isStartDate = (startDate) => {
    setStartDate(startDate);
    !startDate
      ? setCommentValidStartDate(["", false])
      : setCommentValidStartDate(["none", true]);
  };

  const [endDate, setEndDate] = useState("");
  const [commentValidEndDate, setCommentValidEndDate] = useState([
    "none",
    false,
  ]);
  //check if endDate is empty&show alert
  const isEndDate = (endDate) => {
    setEndDate(endDate);
    !endDate
      ? setCommentValidEndDate(["", false])
      : setCommentValidEndDate(["none", true]);
  };

  const [price, setPrice] = useState("");
  const [commentValidPrice, setCommentValidPrice] = useState(["none", false]);
  //check if price is empty&show alert
  const isPrice = (price) => {
    setPrice(price);
    !price
      ? setCommentValidPrice(["", false])
      : setCommentValidPrice(["none", true]);
  };

  // alert display style, alert content
  const [commentServerErorr, setCommentServerErorr] = useState(["none", ""]);

  // clean the modal fileds & server error comments validation after upload vacation
  const cleanCommentsAndFields = () => {
    setDestination("");
    setDescription("");
    setImage("");
    setEndDate("");
    setStartDate("");
    setPrice("");
    setCommentValidDestination(["none", false]);
    setCommentValidDescription(["none", false]);
    setCommentValidImage(["none", false]); //
    setCommentValidStartDate(["none", false]);
    setCommentValidEndDate(["none", false]);
    setCommentValidPrice(["none", false]);
    setCommentServerErorr(["none", ""]);
  };

  const addNewVacation = () => {
    !commentValidDestination[1] ||
    !commentValidDescription[1] ||
    !commentValidImage[1] ||
    !commentValidStartDate[1] ||
    !commentValidEndDate[1] ||
    !commentValidPrice[1]
      ? setCommentServerErorr(["", "Every field must have value"])
      : vacationsSer
          .addNewVacation(
            destination,
            description,
            image,
            startDate,
            endDate,
            price
          )
          .then((res) => {
            handleClose();
            getAllVacations();
            toast.success("New Vacation has added!", { toastStyle });
          })
          .catch((err) => {
            setCommentServerErorr(["", err.response.data.message]);
          });
  };

  // cloudinary - update vacation
  const uploadWidgetEdit = (params) => {
    window.cloudinary.openUploadWidget(
      { cloud_name: "himages", upload_preset: "ml_default", tags: ["xmas"] },
      function (error, result) {
        if (result) {
          params.field = "image";
          params.value = result[0].url;
          // console.log(params);
          handleEditRowsModelChange(params);
        } else {
          params.field = "image";
          params.value = "";
          // console.log(params);
          handleEditRowsModelChange(params);
        }
      }
    );
  };

  const updateNewImg = (params) => {
    uploadWidgetEdit(params);
  };

  const deleteVacation = (vacationId) => {
    vacationsSer
      .deleteVacation(vacationId)
      .then((res) => {
        getAllVacations();
        toast.success(`${vacationId} ${res.data.message}`, {
          toastStyle,
        });
      })
      .catch((err) => {
        toast.error(err.response.data.message, { toastStyle });
      });
  };

  useEffect(() => {
    cleanCommentsAndFields();
  }, [vacations]);

  //Data grid
  const columns = [
    { field: "id", headerName: "id", flex: 0.1 },
    {
      field: "destination",
      headerName: "Destination",
      flex: 0.8,
      editable: true,
    },
    {
      field: "description",
      headerName: "Description",
      flex: 1,
      editable: true,
    },
    {
      field: "image",
      headerName: "Image path",
      flex: 1,
    },
    {
      field: "Update Image",
      headerName: "Update Image",
      flex: 0.8,
      editable: false,
      renderCell: (params) => (
        <Button variant="info" onClick={() => updateNewImg(params)}>
          New Image
        </Button>
      ),
    },
    {
      field: "startDate",
      headerName: "Start Date",
      flex: 0.6,
      editable: true,
    },
    {
      field: "endDate",
      headerName: "End Date",
      flex: 0.6,
      editable: true,
    },
    {
      field: "price",
      headerName: "Price",
      flex: 0.2,
      editable: true,
    },
    {
      field: "followersList",
      headerName: "FollowersList",
      flex: 1,
    },
    {
      field: "delete",
      headerName: "Delete",
      flex: 0.5,
      editable: false,
      renderCell: (params) => (
        <Button variant="danger" onClick={() => deleteVacation(params.id)}>
          Delete
        </Button>
      ),
    },
  ];

  const rows = vacations.map((vacation) => ({
    id: vacation._id,
    destination: vacation.destination,
    description: vacation.description,
    image: vacation.image,
    startDate: vacation.startDate,
    endDate: vacation.endDate,
    price: vacation.price,
    followersList: vacation.followersList,
  }));

  const handleEditRowsModelChange = (model) => {
    // console.log(model);
    // console.log(model.id);
    // console.log(model.field);
    // console.log(model.value);
    vacationsSer
      .updataAnyParamOfVacation(model.id, model.field, model.value)
      .then((res) => {
        getAllVacations();
        toast.success(
          `The ${model.field} of Vacation "${model.id}" has changed to ${model.value}!`,
          { toastStyle }
        );
      })
      .catch((err) => {
        getAllVacations();
        toast.error(
          `The ${model.field} of Vacation "${model.id}" hasn't changed, ${err.response.data.message}`,
          { toastStyle }
        );
      });
  };

  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {vacations && <h1>Vacations Management</h1>}
      <Button
        onClick={handleShow}
        style={{
          marginBottom: "1rem",
          marginTop: "0.5rem",
          backgroundColor: "#06bebf",
          border: "1px solid #06bebf",
        }}
      >
        Add New Vacation
      </Button>
      <div>
        {rows.length > 0 && (
          <DataGrid
            autoHeight
            rows={rows}
            columns={columns}
            onCellEditCommit={handleEditRowsModelChange}
            pageSize={13}
          />
        )}
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "#fb9100" }}>
            Add New Vacation
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ThemeProvider theme={theme}>
            <CssBaseline />

            <Grid item elevation={6}>
              <Container component="main">
                <Box
                  sx={{
                    my: 1,
                    mx: 5.5,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        required
                        fullWidth
                        id="destination"
                        label="Destination"
                        name="destination"
                        autoComplete="destination"
                        color="info"
                        onChange={(e) => isDestination(e.target.value)}
                      />
                      <Alert
                        severity="error"
                        style={{ display: commentValidDestination[0] }}
                      >
                        Destination is empty!{" "}
                      </Alert>
                    </Grid>

                    <Grid item xs={12} sm={4}>
                      <TextField
                        required
                        fullWidth
                        id="description"
                        label="Description"
                        name="description"
                        autoComplete="description"
                        color="info"
                        onChange={(e) => isDescription(e.target.value)}
                      />
                      <Alert
                        severity="error"
                        style={{ display: commentValidDescription[0] }}
                      >
                        Description is empty!{" "}
                      </Alert>
                    </Grid>

                    <Grid item xs={12} sm={4}>
                      <TextField
                        required
                        fullWidth
                        type="number"
                        id="price"
                        label="Price"
                        name="price"
                        autoComplete="price"
                        color="info"
                        onChange={(e) => isPrice(Number(e.target.value))}
                      />
                      <Alert
                        severity="error"
                        style={{ display: commentValidPrice[0] }}
                      >
                        Price is empty!{" "}
                      </Alert>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        InputLabelProps={{
                          shrink: true,
                        }}
                        type="date"
                        id="startDate"
                        label="Start Date"
                        name="startDate"
                        autoComplete="startDate"
                        color="info"
                        onChange={(e) => isStartDate(e.target.value)}
                      />
                      <Alert
                        severity="error"
                        style={{ display: commentValidStartDate[0] }}
                      >
                        Start Date is empty!{" "}
                      </Alert>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        InputLabelProps={{
                          shrink: true,
                        }}
                        type="date"
                        id="endDate"
                        label="End Date"
                        name="endDate"
                        autoComplete="endDate"
                        color="info"
                        onChange={(e) => isEndDate(e.target.value)}
                      />
                      <Alert
                        severity="error"
                        style={{ display: commentValidEndDate[0] }}
                      >
                        End Date is empty!{" "}
                      </Alert>
                    </Grid>

                    <Grid item xs={12}>
                      <button
                        onClick={uploadWidget.bind(this)}
                        className="upload-button"
                      >
                        Add Image
                      </button>
                      <Alert
                        severity="error"
                        style={{ display: commentValidImage[0] }}
                      >
                        Image is empty!{" "}
                      </Alert>
                    </Grid>

                    <Grid item xs={12}>
                      <Alert
                        severity="error"
                        style={{ display: commentServerErorr[0] }}
                      >
                        {commentServerErorr[1]}
                      </Alert>
                    </Grid>
                  </Grid>
                </Box>
              </Container>
            </Grid>
          </ThemeProvider>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close and Don't save
          </Button>
          <Button variant="success" onClick={addNewVacation}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ManageVacations;
