// ** React Imports
import { Outlet } from "react-router-dom";

// ** Core Layout Import
// !Do not remove the Layout import
import Layout from "@layouts/VerticalLayout";

// ** Menu Items Array
import navigation from "@src/navigation/vertical";

const VerticalLayout = (props) => {
  // const [menuData, setMenuData] = useState([])

  // ** For ServerSide navigation
  // useEffect(() => {
  //   axios.get(URL).then(response => setMenuData(response.data))
  // }, [])
  const rol = localStorage?.getItem("rol");
  let filteredNavigation = [];  
  if (rol === "7") {
    filteredNavigation = [navigation[0], navigation[4]]
  } else if (rol === "1") {
    filteredNavigation = navigation;
  }
  // else if (rol === "8" || rol === "6" === rol == "5" || rol === "4" === rol === "3" || rol === "2") {
  //   filteredNavigation = [navigation[0]]
  // }
  else {
    filteredNavigation = [navigation[0], navigation[1]]
  }

  return (
    <Layout menuData={filteredNavigation} {...props}>
      <Outlet />
    </Layout>
  );
};

export default VerticalLayout;
