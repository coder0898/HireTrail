import { Toaster } from "react-hot-toast";
import Content from "../component/layout/Content";
import Header from "../component/layout/Header";
import Sidebar from "../component/layout/SideBar";

const Home = () => {
  return (
    <>
      <div className="h-screen flex flex-col">
        <Header />
        <Toaster position="top-center" />
        <main className="flex flex-col md:flex-row flex-1 overflow-hidden bg-gray-100">
          {/* Sidebar */}
          <Sidebar />

          {/* Content Section */}
          <Content />
        </main>
      </div>
    </>
  );
};

export default Home;
