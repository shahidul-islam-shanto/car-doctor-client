import { useEffect, useState } from "react";

const useService = () => {
  const [service, setService] = useState([]);

  useEffect(() => {
    fetch(
      "https://car-doctor-server-bilh9akv6-shahidul-islams-projects-17957188.vercel.app/services"
    )
      .then((res) => res.json())
      .then((data) => {
        setService(data);
      });
  }, []);
  return service;
};

export default useService;
