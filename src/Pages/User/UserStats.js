import React from "react";
import Head from "../../Components/Helper/Head";
import UserStatsGraphs from "./UserStatsGraphs";

import useFetch from "../../Hooks/useFetch";

import { GET_STATS } from "../../Api/api";
import Loading from "../../Components/Helper/Loading";
import Error from "../../Components/Helper/Error";


const UserStats = () => {
  const { data, error, loading, request } = useFetch();

  React.useEffect(() => {
    async function getData() {
      const { url, options } = GET_STATS();
      await request(url, options);
    }
    getData();
  }, [request]);

  if (loading) return <Loading />;
  if (error) return <Error error={error} />;
  if (data)
    return (
      <div>
        <Head title="Estatísticas " description="Estatísticas do site dogs" />
        <UserStatsGraphs data={data} />
      </div>
    );
  else return null;
};

export default UserStats;
