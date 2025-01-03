import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";

const Layout = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token'); // Check for token (user is logged in)
  const [cartCount, setCartCount] = useState(0);

  // Gets how many items in the cart
  const updateCartCount = () => {
    try {
      const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartCount(Array.isArray(storedCart) ? storedCart.length : 0); // Ensure it's an array before using length

    } catch (error) {
      console.error("Error parsing cart data from localStorage:", error);
      setCartCount(0);

    }
  };

  useEffect(() => {
    if (token) {
      updateCartCount();
    }

    // Listen for changes to local storage
    const handleStorageChange = (event) => {
      if (event.key === "cart") {
        updateCartCount();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    // Stop listening on end
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [token]);


  return (
    <div style={styles.constainer}>
      <div style={styles.header}>
        <h1>E-commerce</h1>
        { token && (
          <div style={styles.cartButtonHolder} onClick={() => navigate("/cart")}>
            {cartCount > 0 && (
              <div style={styles.cartCount}>{cartCount}</div>
            )}

            <div style={styles.cartButton}>Cart</div>
          </div>
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
  cartButtonHolder: {
    position: "relative",
    display: "flex",
    alignItems: "center",
     cursor: "pointer",
  },
  cartButton: {
    padding: "10px 20px",
    backgroundColor: "#ff9f40",
    border: "solid",
    borderRadius: "8px",
    color: "black",
    fontWeight: "bold",
    fontSize: "1.1rem",
  },
  cartCount: {
    position: "absolute",
    top: "-10px",
    right: "-10px",
    backgroundColor: "#ff2085",
    color: "white",
    borderRadius: "50%",
    border: 'solid black',
    fontSize: "1rem",
    fontWeight: "bold",
    height: "25px",
    width: "25px",
    textAlign: "center",
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
