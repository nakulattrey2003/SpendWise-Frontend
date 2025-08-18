import React, { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { use } from "react";

const useUser = () => {
  const { user, setUser } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      return;
    }

    let isMounted = true;
    const fetchUserInfo = async () => {
      try {
        const response = await axiosConfig.get("/profile");

        if (isMounted) {
          setUser(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch user info:", error);
        if (isMounted) {
          setUser(null);
          navigate("/login");
        }
      }
    };

    fetchUserInfo();
    return () => {
      isMounted = false;
    };
  }, [setUser, navigate]);

  return <div>useUser</div>;
};

export default useUser;
