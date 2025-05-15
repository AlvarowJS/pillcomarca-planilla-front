export const getAuthHeaders = () => {
    const token = localStorage.getItem("accessToken");
    return {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
  };
  