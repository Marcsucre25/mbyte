import React, { useContext } from "react";

import { NavigationContainer } from "@react-navigation/native";

import { AuthContext } from "../Context/AuthContext";
import DataNav from "./DataNav";
import DataNavExist from "./DataNavExist";
import LoadingModal from "../components/loadingModal";

const PrincipalNaigation = () => {
  const { isLoading, userToken } = useContext(AuthContext);

  return (
    <NavigationContainer>
      <LoadingModal abrirModal={isLoading} />
      {userToken !== null ? <DataNavExist /> : <DataNav />}
    </NavigationContainer>
  );
};

export default PrincipalNaigation;
