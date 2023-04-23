import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Table } from "@/components/Table";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase/firebase-config";
import { ActionEdit, ActionDelete } from "@/components/Action";
import { LabelStatus } from "@/components/Label";
import { userStatus, userRole } from "@/utils/constant";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const UserTable = (props) => {
  const [userList, setUserList] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const colRef = collection(db, "users");
    onSnapshot(colRef, (snapshot) => {
      const results = [];
      snapshot.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setUserList(results);
    });
  }, []);
  const handleActionDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const docRef = doc(db, "users", id);
        await deleteDoc(docRef);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };
  const renderLabelStatus = (status) => {
    switch (status) {
      case userStatus.ACTIVE: {
        return <LabelStatus type="success">ACTIVE</LabelStatus>;
      }
      case userStatus.PENDING: {
        return <LabelStatus type="warning">PENDING</LabelStatus>;
      }
      case userStatus.BAN: {
        return <LabelStatus type="danger">BAN</LabelStatus>;
      }
      default: {
        break;
      }
    }
  };
  const renderUserRole = (role) => {
    switch (role) {
      case userRole.ADMIN: {
        return "Admin";
      }
      case userRole.MOD: {
        return "Mod";
      }
      case userRole.USER: {
        return "User";
      }
      default: {
        break;
      }
    }
  };
  const renderUser = (user) => {
    const { id, email, fullname, username, status, role, image, image_link } =
      user;
    return (
      <tr key={id}>
        <td title={id}>{id.slice(0, 5) + "..."}</td>
        <td>
          <div className="flex gap-x-2">
            <div className="w-[40px] h-[40px]">
              <img
                className="w-full h-full rounded-full object-cover"
                src={
                  image_link ||
                  "https://st4.depositphotos.com/14953852/22772/v/600/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg"
                }
                alt="thumbnail"
              />
            </div>
            <div className="flex-1 whitespace-nowrap">
              <h3 className="text-base">{fullname}</h3>
              <span className="inline-block text-gray-400 text-xs">
                {new Date().toDateString()}
              </span>
            </div>
          </div>
        </td>
        <td>
          <h3 className="leading-relaxed">{username}</h3>
        </td>
        <td title={email}>{email.slice(0, 5) + "..."}</td>
        <td>{renderLabelStatus(status)}</td>
        <td>{renderUserRole(role)}</td>
        <td>
          <div className="flex">
            <ActionEdit
              onClick={() => navigate(`/manage/edit-user?id=${id}`)}
            ></ActionEdit>
            <ActionDelete onClick={() => handleActionDelete(id)}></ActionDelete>
          </div>
        </td>
      </tr>
    );
  };
  return (
    <Table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Info</th>
          <th>Username</th>
          <th>Email address</th>
          <th>Status</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {Array.isArray(userList) &&
          userList.length > 0 &&
          userList.map((user) => renderUser(user))}
      </tbody>
    </Table>
  );
};

UserTable.propTypes = {};

export default UserTable;
