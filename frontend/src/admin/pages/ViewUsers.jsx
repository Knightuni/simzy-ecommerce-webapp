import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import NavbarAd from "../components/NavbarAd";
import Controls from "./../components/controls/Controls";
import UseTable from "../components/UseTable";
import { toast } from "react-toastify";
import {
  makeStyles,
  Paper,
  TableBody,
  TableRow,
  TableCell,
} from "@material-ui/core";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteIcon from "@material-ui/icons/Delete";
import SearchIcon from '@material-ui/icons/Search';
import PopUp from "../components/PopUp";
import UserForm from "../components/UserForm";
import Confirmation from "../components/Confirmation";

// style the input form container
const useStylesPaper = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
}));

const Container = styled.div`
  max-width: 100%;
  overflow-x: hidden;
  background-color: #fff8f9;
`;
const Wrapper = styled.div``;

const Top = styled.div`
  display: flex;
  margin: 30px;
`;
const Title = styled.h2`
  width: 100%;
  color: black;
  margin: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

// array object for head cell
const headCells = [
  { id: "user_id", label: "User ID" },
  { id: "name", label: "User Full Name" },
  { id: "email", label: "Email Address" },
  { id: "phone_number", label: "Account Created Date" },
  { id: "actions", label: "Actions" },
];

const ViewUsers = () => {
  const paperClasses = useStylesPaper();
  const [formType, setFormType] = useState("view");
  const [changed, setChanged] = useState(false);
  const [selectedID, setSelectedID] = useState(0);
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [openPopup, setOpenPopup] = useState(false);
  const [users, setUsers] = useState([]);
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });

  //get return value from UseTable.jsx
  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    UseTable(users, headCells);

  // update new user or edit user
  const addOrEdit = async (user, resetForm) => {
    if (recordForEdit === null) {
      alert("add")
      console.log(user);
    } else {
      if (changed) {
        try {
          let res
          if (user.password !== undefined) {
            res = await axios.patch("http://localhost:8080/api/v1/user/update-password-admin/" + user.user_id, { password: user.password})
          }
          console.log(user.is_admin === 1)
          res = await axios.patch("http://localhost:8080/api/v1/user/update-info-admin/" + user.user_id, {user: user});
          
          if (res.status === 200) {
            toast.success(res.data.msg, {
              position: "top-center",
            })
            setTimeout(function () {
              window.location.reload();
            }, 3000);
          }
        } catch (err) {
            if (err.request.status === 409) {
              toast.error(err.response.data.msg, {
                position: "top-center",
              })
            } else {
              toast.error("Something went wrong, please try again !!", {
                position: "top-center",
              })
            }
            console.log(err);
          }
      } else {
        toast.error("No new changes made, submission ignored!", {
          position: "top-center",
        });
      }
    }
    setChanged(false);
    resetForm();
    setRecordForEdit(null);
    setOpenPopup(false);
    // toast.success("Successfully submitted user information.", {
    //   position: "top-center",
    // });
  };

  // open popup with selected record
  const openInPopup = (item) => {
    setRecordForEdit(item);
    setOpenPopup(true);
  };

  //delete user
  // const onDelete = (id) => {
  //   if (window.confirm("Are you sure to delete this record? ")) {
  //     userService.deleteUser(id);
  //     setRecords(userService.getAllUsers());
  //     toast.success("Successfully deleted user information.", {
  //       position: "top-center",
  //     });
  //   }
  // };

  //deleted selected
  const onDelete = async (id) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });

    try {
      await axios.delete(`http://localhost:8080/api/v1/user/${id}`);
      window.location.reload();
      window.alert("Deleting");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getAllUserInfo = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/v1/user/");
        if (res.data.length > 0) {
          for (let i = 0; i < res.data.length; i++) {
              var createdDate = new window.Date(res.data[i].created_at)
                  .toISOString().replace(/T.*/,'')
                  .split('-').reverse().join('/')
              var createdTime = new window.Date(res.data[i].created_at)
              .toISOString().slice(11,19)
              res.data[i].created_at = createdDate.concat(" " + createdTime)

              var updatedDate = new window.Date(res.data[i].updated_at)
                  .toISOString().replace(/T.*/,'')
                  .split('-').reverse().join('/')
              var updatedTime = new window.Date(res.data[i].updated_at)
              .toISOString().slice(11,19)
              res.data[i].updated_at = updatedDate.concat(" " + updatedTime) 
            
          }          
        }
        setUsers(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getAllUserInfo();
  }, []);

  return (
    <Container>
      <NavbarAd />
      <Wrapper>
        <Top>
          <Title>Users List</Title>

          <Controls.Button
            style={{
              marginRight: "30px",
              width: "200px",
              textDecoration: "none",
              backgroundColor: "#FFD0DC",
              color: "black",
            }}
            text="+ Add New User"
            onClick={() => {
              setFormType("add");
              setOpenPopup(true);
              setRecordForEdit(null);
            }}
          />
        </Top>
        <Paper className={paperClasses.pageContent}>
          <TblContainer>
            <TblHead />
            <TableBody>
              {recordsAfterPagingAndSorting().map((user) => (
                <TableRow key={user.user_id}>
                  <TableCell>{user.user_id}</TableCell>
                  <TableCell>{user.name} {user.surname}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.created_at}</TableCell>
                  <TableCell>
                  <Controls.ActionButton
                      color="success"
                      onClick={() => {
                        setFormType("view");
                        setSelectedID(user.user_id)
                        openInPopup(user);
                      }}
                    >
                      <SearchIcon fontSize="small" />
                    </Controls.ActionButton>
                    <Controls.ActionButton
                      color="primary"
                      onClick={() => {
                        setFormType("edit");
                        setSelectedID(user.user_id)
                        openInPopup(user);
                      }}
                    >
                      <EditOutlinedIcon fontSize="small" />
                    </Controls.ActionButton>
                    <Controls.ActionButton
                      color="secondary"
                      onClick={() => {
                        setConfirmDialog({
                          isOpen: true,
                          title: "Are you sure to delete this record?",
                          subTitle: "You can't undo this operation",
                          onConfirm: () => {
                            onDelete(user.user_id);
                          },
                        });
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                    </Controls.ActionButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </TblContainer>
          <TblPagination />
        </Paper>
        <PopUp
          title={formType === "view"? `View Details of User ID #${selectedID}` : 
          formType === "edit"? `Edit Details of User ID #${selectedID}` 
          : `Add New User`
        }
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
        >
          <UserForm
            recordForEdit={recordForEdit}
            addOrEdit={addOrEdit}
            formType={formType}
            setChanged={setChanged}
          />
        </PopUp>
        <Confirmation
          confirmDialog={confirmDialog}
          setConfirmDialog={setConfirmDialog}
        />
      </Wrapper>
    </Container>
  );
};

export default ViewUsers;
