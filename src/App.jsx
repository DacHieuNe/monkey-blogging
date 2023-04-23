import React, { useState, Suspense, lazy } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DashboardPage } from "@/pages/DashboardPage";
import { PostManage, PostAddNew, PostEdit } from "@/modules/Post";
import {
  CategoryAddNew,
  CategoryManage,
  CategoryEdit,
  CategoryPage,
} from "@/modules/Category";
import { UserAddNew, UserManage, UserProfile, UserEdit } from "@/modules/User";

const Home = React.lazy(() => import("./pages/Home/Home"));
const SignIn = React.lazy(() => import("./pages/SignIn/SignIn"));
const SignUp = React.lazy(() => import("./pages/SignUp/SignUp"));
const NotFound = React.lazy(() => import("./pages/NotFound/NotFound"));
const PostDetailPage = React.lazy(() =>
  import("./pages/PostDetailPage/PostDetailPage")
);
const DashboardLayout = React.lazy(() =>
  import("./modules/Dashboard/DashboardLayout")
);

function App() {
  return (
    <div className="app">
      <ToastContainer />
      <Suspense>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="*" element={<NotFound />} />
          <Route
            path="/:slug"
            element={<PostDetailPage></PostDetailPage>}
          ></Route>
          <Route path="/category/:slug" element={<CategoryPage />}></Route>
          <Route element={<DashboardLayout></DashboardLayout>}>
            <Route
              path="/dashboard"
              element={<DashboardPage></DashboardPage>}
            ></Route>
            <Route
              path="/manage/posts"
              element={<PostManage></PostManage>}
            ></Route>
            <Route
              path="/manage/add-post"
              element={<PostAddNew></PostAddNew>}
            ></Route>
            <Route path="/manage/edit-post" element={<PostEdit />}></Route>
            <Route
              path="/manage/edit-category"
              element={<CategoryEdit />}
            ></Route>
            <Route
              path="/manage/category"
              element={<CategoryManage></CategoryManage>}
            ></Route>
            <Route
              path="/manage/add-category"
              element={<CategoryAddNew></CategoryAddNew>}
            ></Route>
            <Route
              path="/manage/user"
              element={<UserManage></UserManage>}
            ></Route>
            <Route
              path="/manage/add-user"
              element={<UserAddNew></UserAddNew>}
            ></Route>
            <Route path="/manage/edit-user" element={<UserEdit />}></Route>
            <Route
              path="/profile"
              element={<UserProfile></UserProfile>}
            ></Route>
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
