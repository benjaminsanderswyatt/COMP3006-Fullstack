import { Outlet, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Layout = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token'); // Check for token (user is logged in)

  const handleLogout = () => {
    // Remove token from localStorage
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <constainer style={styles.constainer}>
      <div style={styles.header}>
        <h1>Header</h1>
        { token && (
          // Logout
          <button style={styles.logButton} onClick={handleLogout}>Logout</button>
        )}
      </div>
      
      
      <nav style={styles.navbar}>
        { token && (
          <>
            <ul style={styles.navbarLinks}>
              <button style={styles.navbarItem} onClick={() => navigate("/store")}>Store</button>
            </ul>
            <div style={styles.navbarSpacer}></div>
            <ul style={styles.navbarLinks}>
              <button style={styles.navbarItem}>hello</button>
            </ul>
            <div style={styles.navbarSpacer}></div>
            <ul style={styles.navbarLinks}>
              <button style={styles.navbarItem}>Tester button</button>
            </ul>
          </>
        )}
      </nav>

      <container style={styles.content}>
        <Outlet />
      </container>
      
    </constainer>
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
    paddingLeft: "10vw",
    paddingRight: "10vw"
  }



}

export default Layout;
