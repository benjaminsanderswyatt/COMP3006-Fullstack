import { Outlet, useNavigate } from "react-router";

const Layout = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token'); // Check for token (user is logged in)

  return (
    <div style={styles.constainer}>
      <div style={styles.header}>
        <h1>Header</h1>
        { token && (
          <button style={styles.cartButton} onClick={() => navigate("/cart")}>Cart</button>
        )}
      </div>
      
      
      <nav style={styles.navbar}>
        { token && (
          <>
            <ul style={styles.navbarLinks}>
              <button style={styles.navbarItem} onClick={() => navigate("/myproducts")}>My Products</button>
            </ul>
            <div style={styles.navbarSpacer}></div>
            <ul style={styles.navbarLinks}>
              <button style={styles.navbarItem} onClick={() => navigate("/store")}>Store</button>
            </ul>
            <div style={styles.navbarSpacer}></div>
            <ul style={styles.navbarLinks}>
              <button style={styles.navbarItem} onClick={() => navigate("/account")}>Account</button>
            </ul>
          </>
        )}
      </nav>

      <div style={styles.content}>
        <Outlet />
      </div>
      
    </div>
  )
};

const styles = {
  constainer: {
    backgroundColor: "#F9FDFF",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#52a5de",
    color: "black",
    minHeight: "12vh",
  },
  cartButton: {
    cursor: "pointer",
    padding: "20px 20px",
    backgroundColor: "#ff9f40",
    border: "solid",
    borderRadius: "8px",
    color: "black",
    fontWeight: "bold",
    fontSize: "1.1rem",
  },
  logButton: {
    cursor: "pointer",
    padding: "10px 20px"
  },
  navbar: {
    display: "flex",
    backgroundColor: "#18284a",
    padding: "0px 20px",
    height: "50px",
    margin: "0",
    gap: "2px",
    listStyle: "none",
    justifyContent: "left",
    alignItems: "center"
  },
  navbarLinks: {
    padding: "0px",
    margin: "0px",
    height: "100%",
    width: "100%",
    minWidth: "15vw"
  },
  navbarItem: {
    cursor: "pointer",
    height: "100%",
    width: "100%",
    border: "none",
    background: "none",
    color: "white",
  },
  navbarSpacer: {
    width: "1px",
    height: "24px",
    backgroundColor: "grey",
    margin: "0 0px",
  },
  content: {
    display: "flex",
    justifyContent: "center",
    padding: "20px",
  }



}

export default Layout;
