import React, { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import debounce from "lodash.debounce";
import Swal from "sweetalert2";
import { DashboardHeading } from "@/modules/Dashboard";
import { Table } from "@/components/Table";
import LabelStatus from "@/components/Label/LabelStatus";
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
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "@/firebase/firebase-config";
import { ActionDelete, ActionView, ActionEdit } from "@/components/Action";
import { categoryStatus } from "@/utils/constant";
import { Button } from "@/components/Button";

const CategoryManage = () => {
  const [categoriesLoad, setCategoriesLoad] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [isDisable, setIsDisable] = useState(true);
  const save = useRef();
  const count = useRef(0);
  const searchRef = useRef();
  const categoriesClone = useRef(categoriesLoad);
  const isDisableClone = useRef(isDisable);
  const handleCategoryList = () => {
    const fetchData = async () => {
      const colRef = collection(db, "categories");
      const snapShot =
        searchValue &&
        query(
          colRef,
          where("name", ">=", searchValue),
          where("name", "<=", searchValue + "\uf8ff")
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
          (v, i) => categoriesLoad.findIndex((c) => v.id == c.id) != -1
        );
        setCategories(result1);
      } else {
        setCategories(categoriesLoad);
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
        const docRef = doc(db, "categories", id);
        await deleteDoc(docRef);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };
  const handleLoadingMore = async () => {
    const colRef = collection(db, "categories");
    const snapshot = await getDocs(colRef);
    setIsDisable(true);
    if (count.current >= snapshot.size - 1) {
      console.log("1");
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
    setCategoriesLoad((categoriesLoad) => [...categoriesLoad, ...data]);
    setIsDisable(false);
    count.current += 1;
  };
  useEffect(() => {
    categoriesClone.current = categoriesLoad;
    handleCategoryList();
  }, [searchValue, categoriesLoad]);
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
    const colRef = collection(db, "categories");
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
                const docRef = doc(db, "categories", docItem.id);
                await updateDoc(docRef, {
                  order: data.order - 1,
                });
              }
            });
          };
          const updateUI = () => {
            const index = categoriesClone.current.findIndex((category) =>
              docs.every((doc) => category.order != doc.data().order)
            );
            let cloneData = [...categoriesClone.current];
            cloneData.splice(index, 1);
            cloneData = cloneData.map((item) => {
              if (item.order > orderDelete) {
                item.order = item.order - 1;
              }
              return item;
            });
            setCategoriesLoad(cloneData);
          };
          updateData();
          updateUI();
        } else if (save.current.length == docs.length) {
          const cloneData = results.filter((docItem) =>
            categoriesClone.current.some((post) => docItem.id == post.id)
          );
          setCategoriesLoad(cloneData);
        } else {
          if (isDisableClone.current) {
            const index = docs.findIndex((doc) =>
              categoriesClone.current.every((category) => category.id != doc.id)
            );
            setCategoriesLoad([
              ...categoriesClone.current,
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
      // const colRef = collection(db, "categories");
      const colRef = query(collection(db, "categories"), orderBy("order"));
      const snapshot = await getDocs(colRef);
      const doc = snapshot.docs[0];
      setCategoriesLoad([
        {
          id: doc.id,
          ...doc.data(),
        },
      ]);
    };
    fetchData();
  }, []);
  return (
    <div>
      <DashboardHeading title="Categories" desc="Manage your category">
        <Button
          kind="ghost"
          height="60px"
          onClick={() => navigate("/manage/add-category")}
        >
          Create category
        </Button>
      </DashboardHeading>
      <div className="flex justify-end mb-5">
        <input
          ref={searchRef}
          type="text"
          placeholder="Search here ..."
          className="inline-block p-4 w-[300px] h-[50px] border border-gray-300 rounded-lg outline-none focus:border-green-500"
          onChange={handleSearchValue}
        />
      </div>
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Slug</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(categories) &&
            categories.length > 0 &&
            categories.map((category) => (
              <tr key={category.id}>
                <td title={category.id}>{category.id.slice(0, 5) + "..."}</td>
                <td>{category.name}</td>
                <td>{category.slug}</td>
                <td>
                  {category.status == categoryStatus.APPROVE && (
                    <LabelStatus type="success">APPROVED</LabelStatus>
                  )}
                  {category.status == categoryStatus.UNAPPROVE && (
                    <LabelStatus type="danger">UNAPPROVED</LabelStatus>
                  )}
                </td>
                <td>
                  <div className="flex">
                    <ActionView></ActionView>
                    <ActionEdit
                      onClick={() =>
                        navigate(`/manage/edit-category?id=${category.id}`)
                      }
                    ></ActionEdit>
                    <ActionDelete
                      onClick={() => handleActionDelete(category.id)}
                    ></ActionDelete>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <Button disabled={isDisable} onClick={handleLoadingMore} className="mt-8">
        Load More
      </Button>
    </div>
  );
};

export default CategoryManage;
