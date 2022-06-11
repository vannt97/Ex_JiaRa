import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import loadingCSS from "./Loading.module.css";
export default function Loading() {
  let { isLoading } = useSelector((state) => state.LoadingReducer);
  return (
    <Fragment>
      {isLoading ? (
        <div className={loadingCSS.bgLoading}>
          <img src={require("../../../assets/imgLoading/ZWdx.gif")} alt="aaa" />
        </div>
      ) : (
        ""
      )}
    </Fragment>
  );
}
