import API from "@/configs/api";
import { useEffect, useState } from "react";

const useTypes = () => {
  const [types, setTypes] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await API.get("type");
        const battleTypes: string[] = data.results.map(
          (type: { name: string }) => type.name,
        );

        setTypes(battleTypes);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return { types, loading };
};

export default useTypes;
