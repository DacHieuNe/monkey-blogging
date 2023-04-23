import { Pagination } from "@/components/Pagination";
import { Table } from "@/components/Table";
import React, { useEffect, useRef, useState } from "react";
import { DashboardHeading } from "@/modules/Dashboard";
import { Dropdown } from "@/components/Dropdown";
import { Button } from "@/components/Button";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  startAfter,
  startAt,
  updateDoc,
  where,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import debounce from "lodash.debounce";
import Swal from "sweetalert2";
import { db } from "@/firebase/firebase-config";
import { LabelStatus } from "@/components/Label";
import { postStatus } from "@/utils/constant";
import { ActionEdit, ActionView, ActionDelete } from "@/components/Action";

const PostManage = () => {
  const [postsLoad, setPostsLoad] = useState([]);
  const [posts, setPosts] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [isDisable, setIsDisable] = useState(true);
  const save = useRef();
  const count = useRef(0);
  const searchRef = useRef();
  const postsClone = useRef(postsLoad);
  const isDisableClone = useRef(isDisable);
  const handlePostList = () => {
    const fetchData = async () => {
      const colRef = collection(db, "posts");
      const snapShot =
        searchValue &&
        query(
          colRef,
          where("title", ">=", searchValue),
          where("title", "<=", searchValue + "\uf8ff")
        );
      if (snapShot) {
        const snapShotValue = await getDocs(snapShot);
        let result1 = [];
        snapShotValue.forEach((doc) => {
          result1.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        result1 = result1.filter(
          (v, i) => postsLoad.findIndex((c) => v.id == c.id) != -1
        );
        setPosts(result1);
      } else {
        setPosts(postsLoad);
      }
    };
    fetchData();
  };
  const navigate = useNavigate();
  const handleSearchValue = debounce(() => {
    setSearchValue(searchRef.current.value);
  }, 1000);
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
        count.current = count.current - 1;
        const docRef = doc(db, "posts", id);
        await deleteDoc(docRef);
        Swal.fire("Deleted!", "Your post has been deleted.", "success");
      }
    });
  };
  const handleLoadingMore = async () => {
    const colRef = collection(db, "posts");
    const snapshot = await getDocs(colRef);
    setIsDisable(true);
    if (count.current >= snapshot.size - 1) {
      setIsDisable(true);
      return;
    }
    const queryLoad = query(colRef, orderBy("order"));
    const snapShotLoad = await getDocs(queryLoad);
    const docLoad = snapShotLoad.docs[count.current];

    const querySnapshot = query(
      colRef,
      orderBy("order"),
      count.current >= 0 ? startAfter(docLoad) : startAt(0),
      limit(1)
    );
    const snapShotQuery = await getDocs(querySnapshot);
    const data = [];
    snapShotQuery.forEach((doc) => {
      data.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    setPostsLoad((postsLoad) => [...postsLoad, ...data]);
    setIsDisable(false);
    count.current += 1;
  };
  useEffect(() => {
    postsClone.current = postsLoad;
    handlePostList();
  }, [searchValue, postsLoad]);
  useEffect(() => {
    let a = setTimeout(() => {
      setIsDisable(false);
    }, 3000);
    return () => {
      clearTimeout(a);
    };
  }, []);
  useEffect(() => {
    isDisableClone.current = isDisable;
  }, [isDisable]);
  useEffect(() => {
    const colRef = collection(db, "posts");
    console.log(1);
    onSnapshot(colRef, (snapshot) => {
      const docs = snapshot.docs;
      const results = [];
      docs.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      if (!save.current) {
        save.current = [...results];
      } else {
        if (save.current.length > docs.length) {
          const position = save.current.find((s) =>
            docs.every((doc) => {
              const data = doc.data();
              return s.order != data.order;
            })
          );
          const orderDelete = position.order;
          const updateData = () => {
            docs.forEach(async (docItem) => {
              const data = docItem.data();
              if (data.order > orderDelete) {
                const docRef = doc(db, "posts", docItem.id);
                await updateDoc(docRef, {
                  order: data.order - 1,
                });
              }
            });
          };
          const updateUI = () => {
            const index = postsClone.current.findIndex((post) =>
              docs.every((doc) => post.order != doc.data().order)
            );
            let cloneData = [...postsClone.current];
            cloneData.splice(index, 1);
            cloneData = cloneData.map((item) => {
              if (item.order > orderDelete) {
                item.order = item.order - 1;
              }
              return item;
            });
            setPostsLoad(cloneData);
          };
          updateData();
          updateUI();
        } else if (save.current.length == docs.length) {
          const cloneData = results.filter((docItem) =>
            postsClone.current.some((post) => docItem.id == post.id)
          );
          setPostsLoad(cloneData);
        } else {
          if (isDisableClone.current) {
            const index = docs.findIndex((doc) =>
              postsClone.current.every((post) => post.id != doc.id)
            );
            setPostsLoad([
              ...postsClone.current,
              {
                id: docs[index].id,
                ...docs[index].data(),
              },
            ]);
          }
        }
        save.current = [...results];
      }
    });
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      console.log(2);
      const colRef = query(collection(db, "posts"), orderBy("order"));
      const snapshot = await getDocs(colRef);
      const doc = snapshot.docs[0];
      setPostsLoad([
        {
          id: doc.id,
          ...doc.data(),
        },
      ]);
    };
    fetchData();
  }, []);
  const renderPostStatus = (status) => {
    switch (status) {
      case postStatus.APPROVED: {
        return <LabelStatus type="success">APPROVED</LabelStatus>;
      }
      case postStatus.PENDING: {
        return <LabelStatus type="warning">PENDING</LabelStatus>;
      }
      case postStatus.REJECT: {
        return <LabelStatus type="danger">REJECT</LabelStatus>;
      }
    }
  };
  const renderPostItem = (post) => {
    // console.log("manager", post);
    let date = new Date(post.createdAt.seconds).toString();
    date = date.split(" ");
    return (
      <tr key={post.id}>
        <td title={post.id}>{post.id.slice(0, 5) + "..."}</td>
        <td>
          <div className="flex items-center gap-x-3">
            <img
              src={post["image_link"]}
              alt="post-image"
              className="w-[66px] h-[55px] rounded object-cover"
            />
            <div className="flex-1">
              <h3 className="font-semibold">{post.title}</h3>
              <time className="text-sm text-gray-500">
                {date[1]} {date[2]}
              </time>
            </div>
          </div>
        </td>
        <td>
          <span className="text-gray-500">{post.category.name}</span>
        </td>
        <td>
          <span className="text-gray-500">{post.users.fullname}</span>
        </td>
        <td>{renderPostStatus(post.status)}</td>
        <td>
          <div className="flex items-center gap-x-3 text-gray-500">
            <ActionView onClick={() => navigate(`/${post.slug}`)}></ActionView>
            <ActionEdit
              onClick={() => navigate(`/manage/edit-post?id=${post.id}`)}
            ></ActionEdit>
            <ActionDelete
              onClick={() => handleActionDelete(post.id)}
            ></ActionDelete>
          </div>
        </td>
      </tr>
    );
  };
  return (
    <div>
      <DashboardHeading title="All posts" desc="Manage all posts" />
      <div className="mb-10 flex justify-end gap-5">
        <div className="w-full max-w-[200px]">
          <Dropdown>
            <Dropdown.Select placeholder="Category"></Dropdown.Select>
          </Dropdown>
        </div>
        <div className="w-full max-w-[300px]">
          <input
            ref={searchRef}
            type="text"
            placeholder="Search here ..."
            className="inline-block p-4 w-[300px] h-[50px] border border-gray-300 rounded-lg outline-none focus:border-green-500"
            onChange={handleSearchValue}
          />
        </div>
      </div>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Post</th>
            <th>Category</th>
            <th>Author</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(posts) &&
            posts.length > 0 &&
            posts.map((post) => renderPostItem(post))}
        </tbody>
      </Table>
      <div className="mt-10 text-center">
        {/* <Pagination></Pagination> */}
        <Button
          disabled={isDisable}
          onClick={handleLoadingMore}
          className="mt-8"
        >
          Load More
        </Button>
      </div>
    </div>
  );
};

export default PostManage;
